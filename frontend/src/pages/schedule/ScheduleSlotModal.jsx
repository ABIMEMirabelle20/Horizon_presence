import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, BookOpen, AlertTriangle } from 'lucide-react';

const DAYS = [
  { id: 1, label: 'Lundi' },
  { id: 2, label: 'Mardi' },
  { id: 3, label: 'Mercredi' },
  { id: 4, label: 'Jeudi' },
  { id: 5, label: 'Vendredi' },
  { id: 6, label: 'Samedi' },
];

export default function ScheduleSlotModal({
  isOpen,
  onClose,
  onSave,
  slot,
  courses = [],
  classes = [],
  selectedClassId,
}) {
  const [formData, setFormData] = useState({
    course_id: '',
    school_class_id: selectedClassId || '',
    day_of_week: 1,
    start_time: '08:00',
    end_time: '10:00',
    room: 'Salle 101',
  });

  const [errors, setErrors] = useState({});
  const [conflictError, setConflictError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (slot) {
      setFormData({
        course_id: slot.course_id || '',
        school_class_id: slot.school_class_id || selectedClassId || '',
        day_of_week: slot.day_of_week || 1,
        start_time: slot.start_time || '08:00',
        end_time: slot.end_time || '10:00',
        room: slot.room || 'Salle 101',
      });
    } else {
      setFormData({
        course_id: courses[0]?.id || '',
        school_class_id: selectedClassId || classes[0]?.id || '',
        day_of_week: 1,
        start_time: '08:00',
        end_time: '10:00',
        room: 'Salle 101',
      });
    }
    setErrors({});
    setConflictError(null);
  }, [slot, courses, classes, selectedClassId, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.course_id) errs.course_id = 'Veuillez sélectionner un cours.';
    if (!formData.school_class_id) errs.school_class_id = 'Veuillez sélectionner une classe.';
    if (!formData.start_time) errs.start_time = 'L\'heure de début est requise.';
    if (!formData.end_time) errs.end_time = 'L\'heure de fin est requise.';
    if (formData.start_time && formData.end_time && formData.end_time <= formData.start_time) {
      errs.end_time = 'L\'heure de fin doit être strictement après l\'heure de début.';
    }
    if (!formData.room.trim()) errs.room = 'La salle est requise.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConflictError(null);
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSave(formData);
      onClose();
    } catch (err) {
      if (err.errors?.conflict) {
        setConflictError(err.errors.conflict[0] || err.message);
      } else if (err.errors) {
        setErrors(err.errors);
      } else {
        setConflictError(err.message || 'Conflit d\'horaire détecté.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-mist/60 text-royal rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink">
                {slot ? 'Modifier le créneau horaire' : 'Ajouter un créneau horaire'}
              </h3>
              <p className="text-xs text-slate-500">
                Planification hebdomadaire avec contrôle automatique des chevauchements
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {conflictError && (
            <div className="p-3.5 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-danger mt-0.5" />
              <div>
                <strong className="font-semibold block">Conflit d'horaire détecté</strong>
                <span className="text-xs">{conflictError}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
              Cours <span className="text-danger">*</span>
            </label>
            <select
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                errors.course_id ? 'border-danger' : 'border-slate-200'
              }`}
            >
              <option value="">Sélectionner un cours</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.code}) - {course.teacher_name}
                </option>
              ))}
            </select>
            {errors.course_id && <p className="mt-1 text-xs text-danger">{errors.course_id}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Classe <span className="text-danger">*</span>
              </label>
              <select
                value={formData.school_class_id}
                onChange={(e) => setFormData({ ...formData, school_class_id: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                  errors.school_class_id ? 'border-danger' : 'border-slate-200'
                }`}
              >
                <option value="">Sélectionner une classe</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.level})
                  </option>
                ))}
              </select>
              {errors.school_class_id && (
                <p className="mt-1 text-xs text-danger">{errors.school_class_id}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Jour de la semaine <span className="text-danger">*</span>
              </label>
              <select
                value={formData.day_of_week}
                onChange={(e) => setFormData({ ...formData, day_of_week: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-sm bg-cloud border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
              >
                {DAYS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Heure de début <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                  errors.start_time ? 'border-danger' : 'border-slate-200'
                }`}
              />
              {errors.start_time && <p className="mt-1 text-xs text-danger">{errors.start_time}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Heure de fin <span className="text-danger">*</span>
              </label>
              <input
                type="time"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                  errors.end_time ? 'border-danger' : 'border-slate-200'
                }`}
              />
              {errors.end_time && <p className="mt-1 text-xs text-danger">{errors.end_time}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
              Salle de cours <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="ex. Amphi 1 ou Salle 102"
              className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                errors.room ? 'border-danger' : 'border-slate-200'
              }`}
            />
            {errors.room && <p className="mt-1 text-xs text-danger">{errors.room}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-royal hover:bg-royal/90 rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Validation...' : slot ? 'Enregistrer les modifications' : 'Ajouter le créneau'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
