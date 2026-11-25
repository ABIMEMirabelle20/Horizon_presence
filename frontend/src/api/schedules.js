import { initialSchedules } from './mocks/schedules';
import { initialCourses, initialClasses, initialTeachers } from './mocks/courses';

const STORAGE_KEY_SCHEDULES = 'horizon_mock_schedules';
const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

function loadSchedules() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SCHEDULES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(initialSchedules));
      return initialSchedules;
    }
    return JSON.parse(raw);
  } catch {
    return initialSchedules;
  }
}

function saveSchedules(list) {
  try {
    localStorage.setItem(STORAGE_KEY_SCHEDULES, JSON.stringify(list));
  } catch {
    // Ignore storage error in mock mode
  }
}

let schedulesList = loadSchedules();

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function checkConflict(newSlot, ignoreId = null) {
  const newStart = timeToMinutes(newSlot.start_time);
  const newEnd = timeToMinutes(newSlot.end_time);

  if (newEnd <= newStart) {
    const err = new Error("L'heure de fin doit être strictement supérieure à l'heure de début.");
    err.status = 422;
    err.errors = { end_time: ["L'heure de fin doit être strictement après l'heure de début."] };
    throw err;
  }

  for (const slot of schedulesList) {
    if (ignoreId && Number(slot.id) === Number(ignoreId)) continue;
    if (Number(slot.day_of_week) !== Number(newSlot.day_of_week)) continue;

    const slotStart = timeToMinutes(slot.start_time);
    const slotEnd = timeToMinutes(slot.end_time);

    // Overlap condition: startA < endB && startB < endA
    const overlaps = newStart < slotEnd && slotStart < newEnd;

    if (overlaps) {
      if (Number(slot.school_class_id) === Number(newSlot.school_class_id)) {
        const err = new Error(`Conflit d'horaire : La classe ${slot.school_class_name} a déjà le cours "${slot.course_name}" de ${slot.start_time} à ${slot.end_time}.`);
        err.status = 422;
        err.errors = {
          conflict: [`Conflit avec le cours ${slot.course_name} (${slot.start_time} - ${slot.end_time}) pour cette classe.`],
        };
        throw err;
      }

      if (Number(slot.teacher_id) === Number(newSlot.teacher_id)) {
        const err = new Error(`Conflit d'horaire : L'enseignant ${slot.teacher_name} est déjà occupé de ${slot.start_time} à ${slot.end_time} avec la classe ${slot.school_class_name}.`);
        err.status = 422;
        err.errors = {
          conflict: [`L'enseignant ${slot.teacher_name} est déjà affecté sur ce créneau.`],
        };
        throw err;
      }
    }
  }
}

export async function getSchedules(params = {}) {
  await wait();
  let list = [...schedulesList];

  if (params.school_class_id) {
    list = list.filter((s) => Number(s.school_class_id) === Number(params.school_class_id));
  }

  if (params.teacher_id) {
    list = list.filter((s) => Number(s.teacher_id) === Number(params.teacher_id));
  }

  if (params.day_of_week) {
    list = list.filter((s) => Number(s.day_of_week) === Number(params.day_of_week));
  }

  return { data: list };
}

export async function getClassSchedule(schoolClassId) {
  await wait();
  const list = schedulesList.filter(
    (s) => Number(s.school_class_id) === Number(schoolClassId)
  );
  return { data: list };
}

export async function createSchedule(payload) {
  await wait();

  const course = initialCourses.find((c) => Number(c.id) === Number(payload.course_id));
  const schoolClass = initialClasses.find(
    (cl) => Number(cl.id) === Number(payload.school_class_id || (course ? course.school_class_id : 1))
  );
  const teacher = initialTeachers.find(
    (t) => Number(t.id) === Number(payload.teacher_id || (course ? course.teacher_id : 1))
  );

  const slot = {
    id: Date.now(),
    course_id: Number(payload.course_id),
    course_name: course ? course.name : payload.course_name || 'Cours',
    course_code: course ? course.code : 'CODE',
    school_class_id: Number(schoolClass ? schoolClass.id : payload.school_class_id),
    school_class_name: schoolClass ? schoolClass.name : 'Classe',
    teacher_id: Number(teacher ? teacher.id : payload.teacher_id),
    teacher_name: teacher ? teacher.name : 'Enseignant',
    day_of_week: Number(payload.day_of_week),
    start_time: payload.start_time,
    end_time: payload.end_time,
    room: payload.room ? payload.room.trim() : 'Salle principale',
    theme: course ? course.theme : 'blue',
  };

  checkConflict(slot);

  schedulesList = [...schedulesList, slot];
  saveSchedules(schedulesList);

  return { data: slot };
}

export async function updateSchedule(id, payload) {
  await wait();
  const index = schedulesList.findIndex((s) => Number(s.id) === Number(id));
  if (index === -1) {
    throw new Error('Créneau introuvable');
  }

  const existing = schedulesList[index];
  const course = initialCourses.find((c) => Number(c.id) === Number(payload.course_id || existing.course_id));
  const schoolClass = initialClasses.find(
    (cl) => Number(cl.id) === Number(payload.school_class_id || existing.school_class_id)
  );
  const teacher = initialTeachers.find(
    (t) => Number(t.id) === Number(payload.teacher_id || existing.teacher_id)
  );

  const updatedSlot = {
    ...existing,
    course_id: Number(payload.course_id || existing.course_id),
    course_name: course ? course.name : existing.course_name,
    course_code: course ? course.code : existing.course_code,
    school_class_id: Number(schoolClass ? schoolClass.id : existing.school_class_id),
    school_class_name: schoolClass ? schoolClass.name : existing.school_class_name,
    teacher_id: Number(teacher ? teacher.id : existing.teacher_id),
    teacher_name: teacher ? teacher.name : existing.teacher_name,
    day_of_week: Number(payload.day_of_week || existing.day_of_week),
    start_time: payload.start_time || existing.start_time,
    end_time: payload.end_time || existing.end_time,
    room: payload.room ? payload.room.trim() : existing.room,
    theme: course ? course.theme : existing.theme,
  };

  checkConflict(updatedSlot, id);

  schedulesList[index] = updatedSlot;
  saveSchedules(schedulesList);

  return { data: updatedSlot };
}

export async function deleteSchedule(id) {
  await wait();
  schedulesList = schedulesList.filter((s) => Number(s.id) !== Number(id));
  saveSchedules(schedulesList);
  return { data: { success: true } };
}
