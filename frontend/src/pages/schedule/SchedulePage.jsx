import { useState, useEffect } from 'react';
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { getClasses } from '../../api/courses';
import { getCourses } from '../../api/courses';
import {
  getClassSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../../api/schedules';
import ScheduleGrid from './ScheduleGrid';
import ScheduleSlotModal from './ScheduleSlotModal';
import ScheduleDetailsModal from './ScheduleDetailsModal';

export default function SchedulePage({ isAdmin = false }) {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(2); // L2-IA default
  const [courses, setCourses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [activeDetailsSlot, setActiveDetailsSlot] = useState(null);

  const loadData = async (classId) => {
    try {
      setIsLoading(true);
      setError(null);
      const [classesRes, coursesRes, schedulesRes] = await Promise.all([
        getClasses(),
        getCourses({ school_class_id: classId }),
        getClassSchedule(classId),
      ]);
      setClasses(classesRes.data);
      setCourses(coursesRes.data);
      setSchedules(schedulesRes.data);
    } catch (err) {
      setError(err.message || "Erreur de chargement de l'emploi du temps.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedClassId);
  }, [selectedClassId]);

  const handleClassChange = (e) => {
    setSelectedClassId(Number(e.target.value));
  };

  const handleOpenAddModal = () => {
    setEditingSlot(null);
    setIsSlotModalOpen(true);
  };

  const handleAddSlotAt = (dayOfWeek, startTime, endTime) => {
    setEditingSlot({
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
      school_class_id: selectedClassId,
    });
    setIsSlotModalOpen(true);
  };

  const handleSlotClick = (slot) => {
    setActiveDetailsSlot(slot);
  };

  const handleSaveSlot = async (formData) => {
    if (editingSlot && editingSlot.id) {
      await updateSchedule(editingSlot.id, formData);
    } else {
      await createSchedule({ ...formData, school_class_id: selectedClassId });
    }
    await loadData(selectedClassId);
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce créneau horaire ?')) {
      await deleteSchedule(slotId);
      await loadData(selectedClassId);
    }
  };

  const handleEditFromDetails = (slot) => {
    setEditingSlot(slot);
    setIsSlotModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink tracking-tight">Emploi du temps</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Consultez l'emploi du temps par classe.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedClassId}
              onChange={handleClassChange}
              className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal text-ink shadow-xs transition-all cursor-pointer"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-royal hover:bg-royal/90 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau créneau</span>
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="h-6 bg-slate-100 rounded-lg w-1/4 animate-pulse"></div>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-slate-50 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-slate-100">
          <div className="inline-flex p-3 bg-danger/10 text-danger rounded-2xl mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-ink">Erreur de chargement</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{error}</p>
          <button
            type="button"
            onClick={() => loadData(selectedClassId)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-royal text-white text-sm font-medium rounded-xl hover:bg-royal/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        </div>
      ) : (
        <ScheduleGrid
          schedules={schedules}
          isAdmin={isAdmin}
          onSlotClick={handleSlotClick}
          onAddSlotAt={handleAddSlotAt}
        />
      )}

      {isAdmin && (
        <ScheduleSlotModal
          isOpen={isSlotModalOpen}
          onClose={() => setIsSlotModalOpen(false)}
          onSave={handleSaveSlot}
          slot={editingSlot}
          courses={courses}
          classes={classes}
          selectedClassId={selectedClassId}
        />
      )}

      <ScheduleDetailsModal
        isOpen={Boolean(activeDetailsSlot)}
        onClose={() => setActiveDetailsSlot(null)}
        slot={activeDetailsSlot}
        isAdmin={isAdmin}
        onEdit={handleEditFromDetails}
        onDelete={handleDeleteSlot}
      />
    </div>
  );
}
