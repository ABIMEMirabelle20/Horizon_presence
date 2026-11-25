import { X, Clock, MapPin, User, Calendar, BookOpen, Edit2, Trash2 } from 'lucide-react';

const DAYS_NAMES = {
  1: 'Lundi',
  2: 'Mardi',
  3: 'Mercredi',
  4: 'Jeudi',
  5: 'Vendredi',
  6: 'Samedi',
};

export default function ScheduleDetailsModal({ isOpen, onClose, slot, isAdmin, onEdit, onDelete }) {
  if (!isOpen || !slot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-mist/60 text-royal rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink">Détails de la séance</h3>
              <p className="text-xs text-slate-500">{slot.school_class_name}</p>
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

        <div className="p-6 space-y-4">
          <div className="p-4 bg-cloud rounded-xl border border-slate-200/70">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-mist text-royal">
                  {slot.course_code}
                </span>
                <h4 className="text-lg font-bold text-ink mt-1.5">{slot.course_name}</h4>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-royal" />
              <span>
                <strong className="text-ink font-semibold">{DAYS_NAMES[slot.day_of_week]}</strong> : {slot.start_time} - {slot.end_time}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-royal" />
              <span>
                Salle : <strong className="text-ink font-semibold">{slot.room}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-royal" />
              <span>
                Enseignant : <strong className="text-ink font-semibold">{slot.teacher_name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-royal" />
              <span>
                Classe : <strong className="text-ink font-semibold">{slot.school_class_name}</strong>
              </span>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onDelete(slot.id);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(slot);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-royal hover:bg-royal/90 rounded-xl transition-colors shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                Modifier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
