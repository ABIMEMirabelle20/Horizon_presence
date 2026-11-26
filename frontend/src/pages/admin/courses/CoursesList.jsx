import { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getCourses, createCourse, updateCourse, deleteCourse, getClasses, getTeachers } from '../../../api/courses';
import CourseModal from './CourseModal';

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [coursesRes, classesRes, teachersRes] = await Promise.all([
        getCourses(),
        getClasses(),
        getTeachers(),
      ]);
      setCourses(coursesRes.data);
      setClasses(classesRes.data);
      setTeachers(teachersRes.data);
    } catch (err) {
      setError(err.message || 'Impossible de charger la liste des cours.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (formData) => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, formData);
    } else {
      await createCourse(formData);
    }
    await loadData();
  };

  const handleDeleteCourse = async (id) => {
    try {
      setIsDeleting(true);
      await deleteCourse(id);
      setDeleteConfirmId(null);
      await loadData();
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.school_class_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      selectedLevel === 'all' ||
      course.level === selectedLevel ||
      course.school_class_name === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink tracking-tight">Gestion des cours</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Organisez les cours et les programmes par classe (primaire et secondaire).
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-royal hover:bg-royal/90 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un cours</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Rechercher une matière, classe..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-cloud border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 px-3.5 py-2 text-sm bg-cloud border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal text-ink transition-all"
          >
            <option value="all">Tous les niveaux</option>
            <option value="Primaire">Primaire (CP, CE, CM)</option>
            <option value="Collège">Collège (6ème - 3ème)</option>
            <option value="Lycée">Lycée (2nde, Tle)</option>
            <option value="Lycée Technique">Enseignement Technique</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="h-6 bg-slate-100 rounded-lg w-1/4 animate-pulse"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse"></div>
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
            onClick={loadData}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-royal text-white text-sm font-medium rounded-xl hover:bg-royal/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <div className="inline-flex p-3.5 bg-mist/60 text-royal rounded-2xl mb-3">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-ink">Aucun cours trouvé</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery || selectedLevel !== 'all'
              ? 'Aucun résultat ne correspond à vos critères de recherche.'
              : 'Commencez par ajouter un cours pour une classe.'}
          </p>
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-royal text-white text-sm font-medium rounded-xl hover:bg-royal/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Créer un cours
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-semibold text-ink/70 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Matière / Cours</th>
                  <th className="py-3.5 px-6">Classe & Niveau</th>
                  <th className="py-3.5 px-6">Enseignant</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-ice/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-royal/70 group-hover:scale-125 transition-transform"></div>
                        <div>
                          <p className="font-semibold text-ink leading-snug">{course.name}</p>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{course.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-mist text-royal">
                          {course.school_class_name}
                        </span>
                        <span className="text-xs text-slate-400">
                          ({course.level})
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      {course.teacher_name}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(course)}
                          className="p-1.5 text-slate-400 hover:text-royal hover:bg-royal/10 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(course.id)}
                          className="p-1.5 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500">
            <div>
              Affichage de {paginatedCourses.length} sur {filteredCourses.length} cours
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 text-slate-500 hover:text-royal hover:bg-white border border-transparent hover:border-slate-200 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg font-medium transition-all ${currentPage === page
                      ? 'bg-royal text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:border hover:border-slate-200'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 text-slate-500 hover:text-royal hover:bg-white border border-transparent hover:border-slate-200 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <CourseModal
          key={editingCourse?.id || 'create'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCourse}
          course={editingCourse}
          classes={classes}
          teachers={teachers}
        />
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl border border-slate-100 p-6 text-center">
            <div className="inline-flex p-3 bg-danger/10 text-danger rounded-2xl mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-ink">Supprimer le cours</h3>
            <p className="text-sm text-slate-500 mt-1">
              Êtes-vous sûr de vouloir supprimer ce cours ? Cette action supprimera également ses créneaux associés.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCourse(deleteConfirmId)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-danger hover:bg-danger/90 rounded-xl transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
