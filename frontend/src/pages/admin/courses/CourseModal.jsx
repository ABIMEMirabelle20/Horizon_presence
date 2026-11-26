import { useState } from 'react';
import { X, BookOpen } from 'lucide-react';

export default function CourseModal({ isOpen, onClose, onSave, course, classes = [], teachers = [] }) {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    code: course?.code || '',
    school_class_id: course?.school_class_id || (classes[0]?.id ?? ''),
    teacher_id: course?.teacher_id || (teachers[0]?.id ?? ''),
    hours: course?.hours || 30,
    theme: course?.theme || 'blue',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Le nom du cours est obligatoire.';
    if (!formData.code.trim()) errs.code = 'Le code du cours est obligatoire.';
    if (!formData.school_class_id) errs.school_class_id = 'Veuillez sélectionner une classe.';
    if (!formData.teacher_id) errs.teacher_id = 'Veuillez assigner un enseignant.';
    if (!formData.hours || formData.hours <= 0) errs.hours = 'Le volume horaire doit être supérieur à 0.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSave(formData);
      onClose();
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ general: err.message || 'Une erreur est survenue lors de l\'enregistrement.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-mist/60 text-royal rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">
                {course ? 'Modifier le cours' : 'Ajouter un cours'}
              </h3>
              <p className="text-xs text-slate-500">
                {course ? 'Mettez à jour les paramètres pédagogiques' : 'Remplissez les informations du nouveau cours'}
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {errors.general && (
            <div className="p-3 text-sm text-danger bg-danger/10 border border-danger/20 rounded-xl">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
              Nom du cours <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ex. Intelligence Artificielle"
                className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                  errors.name ? 'border-danger' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Code Matière <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="ex. INF-201"
                  className={`w-full px-3.5 py-2.5 text-sm uppercase bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                    errors.code ? 'border-danger' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.code && <p className="mt-1 text-xs text-danger">{errors.code}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Volume horaire (heures)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-cloud border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all"
                />
              </div>
              {errors.hours && <p className="mt-1 text-xs text-danger">{errors.hours}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Classe / Niveau <span className="text-danger">*</span>
              </label>
              <select
                value={formData.school_class_id}
                onChange={(e) => setFormData({ ...formData, school_class_id: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                  errors.school_class_id ? 'border-danger' : 'border-slate-200'
                }`}
              >
                <option value="">Sélectionner une classe</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} ({cls.level})
                  </option>
                ))}
              </select>
              {errors.school_class_id && (
                <p className="mt-1 text-xs text-danger">{errors.school_class_id}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Enseignant assigné <span className="text-danger">*</span>
              </label>
              <select
                value={formData.teacher_id}
                onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-cloud border rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all ${
                  errors.teacher_id ? 'border-danger' : 'border-slate-200'
                }`}
              >
                <option value="">Sélectionner un enseignant</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              {errors.teacher_id && (
                <p className="mt-1 text-xs text-danger">{errors.teacher_id}</p>
              )}
            </div>
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
              {isSubmitting ? 'Enregistrement...' : course ? 'Mettre à jour' : 'Créer le cours'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
