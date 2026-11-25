import { useId, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { children, formatFrenchDate } from '../../data/parentData'
import Badge from '../ui/Badge'

const STATUS_LABELS = {
  present: 'Présent',
  absent: 'Absent',
  excused: 'Justifié',
}

// Tableau des absences, utilisé sur l'accueil et sur la page Assiduité.
// searchable/paginate sont activés seulement sur la page Assiduité.
export default function AttendanceTable({
  records = [],
  showChild = false,
  searchable = false,
  paginate = false,
  pageSize = 5,
  caption = 'Relevé des absences',
}) {
  const searchId = useId()
  const sortId = useId()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('date-desc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('fr-FR')
    const list = records.filter((record) => {
      if (!needle) return true
      const childName = children.find((child) => child.id === record.childId)?.name || ''
      return [
        childName,
        record.course,
        record.reason,
        formatFrenchDate(record.date),
        STATUS_LABELS[record.status] || '',
      ]
        .join(' ')
        .toLocaleLowerCase('fr-FR')
        .includes(needle)
    })

    return [...list].sort((a, b) => {
      if (sort === 'date-asc') return a.date.localeCompare(b.date)
      if (sort === 'status') {
        return (
          (STATUS_LABELS[a.status] || '').localeCompare(STATUS_LABELS[b.status] || '', 'fr') ||
          b.date.localeCompare(a.date)
        )
      }
      return b.date.localeCompare(a.date)
    })
  }, [records, query, sort])

  const totalPages = paginate ? Math.max(1, Math.ceil(filtered.length / pageSize)) : 1
  const currentPage = Math.min(page, totalPages)
  const visible = paginate
    ? filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filtered
  const colSpan = showChild ? 5 : 4

  return (
    <div className="hp-card hp-card--flush">
      {searchable && (
        <div className="hp-table-tools">
          <div className="hp-table-search">
            <label className="hp-sr-only" htmlFor={searchId}>Rechercher une absence</label>
            <Search aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              placeholder="Rechercher (cours, motif, date…)"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
            />
          </div>
          <div className="hp-table-search">
            <label className="hp-sr-only" htmlFor={sortId}>Trier les absences</label>
            <select
              id={sortId}
              value={sort}
              onChange={(event) => {
                setSort(event.target.value)
                setPage(1)
              }}
            >
              <option value="date-desc">Plus récentes d’abord</option>
              <option value="date-asc">Plus anciennes d’abord</option>
              <option value="status">Par statut</option>
            </select>
          </div>
        </div>
      )}

      <div className="hp-table-wrap">
        <table className="hp-table">
          <caption className="hp-sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              {showChild && <th scope="col">Enfant</th>}
              <th scope="col">Cours</th>
              <th scope="col">Statut</th>
              <th scope="col">Motif</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={colSpan}>
                  <div className="hp-empty-state">
                    Aucune absence ne correspond à cette recherche.
                  </div>
                </td>
              </tr>
            ) : (
              visible.map((record) => (
                <tr key={record.id}>
                  <td><time dateTime={record.date}>{formatFrenchDate(record.date)}</time></td>
                  {showChild && (
                    <td>{children.find((child) => child.id === record.childId)?.name || '—'}</td>
                  )}
                  <td>{record.course}</td>
                  <td><Badge status={record.status} /></td>
                  <td>{record.reason || 'Motif non renseigné'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginate && totalPages > 1 && (
        <div className="hp-pagination" role="navigation" aria-label="Pages du relevé">
          <button
            type="button"
            aria-label="Page précédente"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span aria-live="polite">Page {currentPage} sur {totalPages}</span>
          <button
            type="button"
            aria-label="Page suivante"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
