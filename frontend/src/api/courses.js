import { initialCourses, initialClasses, initialTeachers } from './mocks/courses';

const STORAGE_KEY_COURSES = 'horizon_mock_courses';
const STORAGE_KEY_CLASSES = 'horizon_mock_classes';
const STORAGE_KEY_TEACHERS = 'horizon_mock_teachers';

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage errors in mock mode
  }
}

let coursesList = loadFromStorage(STORAGE_KEY_COURSES, initialCourses);
let classesList = loadFromStorage(STORAGE_KEY_CLASSES, initialClasses);
let teachersList = loadFromStorage(STORAGE_KEY_TEACHERS, initialTeachers);

export async function getCourses(filters = {}) {
  await wait();
  let result = [...coursesList];

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.teacher_name.toLowerCase().includes(q)
    );
  }

  if (filters.level && filters.level !== 'all') {
    result = result.filter(
      (c) => c.level === filters.level || c.school_class_name === filters.level
    );
  }

  if (filters.school_class_id) {
    result = result.filter(
      (c) => Number(c.school_class_id) === Number(filters.school_class_id)
    );
  }

  return { data: result };
}

export async function getCourseById(id) {
  await wait();
  const course = coursesList.find((c) => Number(c.id) === Number(id));
  if (!course) {
    throw new Error('Cours non trouvé');
  }
  return { data: course };
}

export async function createCourse(payload) {
  await wait();

  if (!payload.name || !payload.code || !payload.school_class_id || !payload.teacher_id) {
    const error = new Error('Veuillez remplir tous les champs obligatoires.');
    error.status = 422;
    error.errors = {
      name: !payload.name ? ['Le nom du cours est obligatoire.'] : undefined,
      code: !payload.code ? ['Le code du cours est obligatoire.'] : undefined,
      school_class_id: !payload.school_class_id ? ['La classe est obligatoire.'] : undefined,
      teacher_id: !payload.teacher_id ? ['L\'enseignant est obligatoire.'] : undefined,
    };
    throw error;
  }

  const selectedClass = classesList.find((c) => Number(c.id) === Number(payload.school_class_id));
  const selectedTeacher = teachersList.find((t) => Number(t.id) === Number(payload.teacher_id));

  const newCourse = {
    id: Date.now(),
    name: payload.name.trim(),
    code: payload.code.trim().toUpperCase(),
    school_class_id: Number(payload.school_class_id),
    school_class_name: selectedClass ? selectedClass.name : 'N/A',
    level: selectedClass ? selectedClass.level.split(' ')[0] || selectedClass.name : 'N/A',
    teacher_id: Number(payload.teacher_id),
    teacher_name: selectedTeacher ? selectedTeacher.name : 'N/A',
    hours: Number(payload.hours) || 30,
    theme: payload.theme || 'blue',
  };

  coursesList = [newCourse, ...coursesList];
  saveToStorage(STORAGE_KEY_COURSES, coursesList);

  return { data: newCourse };
}

export async function updateCourse(id, payload) {
  await wait();
  const index = coursesList.findIndex((c) => Number(c.id) === Number(id));
  if (index === -1) {
    throw new Error('Cours introuvable');
  }

  const selectedClass = classesList.find((c) => Number(c.id) === Number(payload.school_class_id));
  const selectedTeacher = teachersList.find((t) => Number(t.id) === Number(payload.teacher_id));

  const updatedCourse = {
    ...coursesList[index],
    name: payload.name.trim(),
    code: payload.code.trim().toUpperCase(),
    school_class_id: Number(payload.school_class_id),
    school_class_name: selectedClass ? selectedClass.name : coursesList[index].school_class_name,
    level: selectedClass ? selectedClass.level.split(' ')[0] || selectedClass.name : coursesList[index].level,
    teacher_id: Number(payload.teacher_id),
    teacher_name: selectedTeacher ? selectedTeacher.name : coursesList[index].teacher_name,
    hours: Number(payload.hours) || coursesList[index].hours,
    theme: payload.theme || coursesList[index].theme,
  };

  coursesList[index] = updatedCourse;
  saveToStorage(STORAGE_KEY_COURSES, coursesList);

  return { data: updatedCourse };
}

export async function deleteCourse(id) {
  await wait();
  coursesList = coursesList.filter((c) => Number(c.id) !== Number(id));
  saveToStorage(STORAGE_KEY_COURSES, coursesList);
  return { data: { success: true, message: 'Cours supprimé avec succès' } };
}

export async function getClasses() {
  await wait(100);
  return { data: classesList };
}

export async function getTeachers() {
  await wait(100);
  return { data: teachersList };
}
