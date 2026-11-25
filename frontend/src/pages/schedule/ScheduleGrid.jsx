import { useState } from 'react';
import { MapPin, User, Plus } from 'lucide-react';

const DAYS = [
  { id: 1, name: 'Lundi' },
  { id: 2, name: 'Mardi' },
  { id: 3, name: 'Mercredi' },
  { id: 4, name: 'Jeudi' },
  { id: 5, name: 'Vendredi' },
  { id: 6, name: 'Samedi' },
];

const TIME_SLOTS = [
  { label: '08h - 10h', start: '08:00', end: '10:00' },
  { label: '10h - 12h', start: '10:00', end: '12:00' },
  { label: '14h - 16h', start: '14:00', end: '16:00' },
  { label: '16h - 18h', start: '16:00', end: '18:00' },
];

function getThemeClasses(theme) {
  switch (theme) {
    case 'green':
    case 'emerald':
    case 'teal':
      return 'bg-[#E6F9F5] text-[#148375] border border-[#B6F0E7]/80 hover:bg-[#D7F5EE]';
    case 'purple':
    case 'indigo':
      return 'bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF]/80 hover:bg-[#EDE0FB]';
    case 'amber':
    case 'orange':
      return 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]/80 hover:bg-[#FDEBB6]';
    case 'blue':
    default:
      return 'bg-[#EAF2FC] text-[#2864DC] border border-[#DCEBFA]/90 hover:bg-[#DFECFB]';
  }
}

export default function ScheduleGrid({
  schedules = [],
  isAdmin = false,
  onSlotClick,
  onAddSlotAt,
}) {
  const [selectedMobileDay, setSelectedMobileDay] = useState(1);

  const findSlot = (dayId, slotStart, slotEnd) => {
    return schedules.find((s) => {
      if (Number(s.day_of_week) !== dayId) return false;
      return s.start_time <= slotStart && s.end_time >= slotEnd;
    }) || schedules.find((s) => Number(s.day_of_week) === dayId && s.start_time === slotStart);
  };

  const mobileDaySchedules = schedules
    .filter((s) => Number(s.day_of_week) === Number(selectedMobileDay))
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  return (
    <div className="w-full">
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="py-4 px-4 w-28 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                  Horaire
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day.id}
                    className="py-4 px-3 text-sm font-bold text-ink tracking-tight text-center"
                  >
                    {day.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {TIME_SLOTS.map((time) => (
                <tr key={time.label} className="h-28">
                  <td className="py-3 px-4 font-semibold text-slate-500 text-xs bg-slate-50/30 whitespace-nowrap align-middle">
                    {time.label}
                  </td>
                  {DAYS.map((day) => {
                    const slot = findSlot(day.id, time.start, time.end);

                    if (slot) {
                      return (
                        <td key={day.id} className="p-2 align-middle">
                          <button
                            type="button"
                            onClick={() => onSlotClick(slot)}
                            className={`w-full h-24 p-3 rounded-2xl transition-all duration-200 text-center flex flex-col justify-center items-center shadow-xs cursor-pointer group ${getThemeClasses(
                              slot.theme
                            )}`}
                          >
                            <span className="font-bold text-sm tracking-tight leading-tight line-clamp-2">
                              {slot.course_name}
                            </span>
                            <span className="text-[11px] opacity-80 mt-1 font-medium">
                              {slot.room}
                            </span>
                          </button>
                        </td>
                      );
                    }

                    return (
                      <td key={day.id} className="p-2 align-middle">
                        <div className="w-full h-24 rounded-2xl border border-dashed border-transparent hover:border-slate-200 flex items-center justify-center transition-colors group">
                          {isAdmin ? (
                            <button
                              type="button"
                              onClick={() => onAddSlotAt && onAddSlotAt(day.id, time.start, time.end)}
                              className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-royal p-2 rounded-xl transition-all flex items-center gap-1 text-xs"
                              title="Ajouter un créneau"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-slate-300 font-medium text-sm select-none">—</span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {DAYS.map((day) => {
            const isSelected = selectedMobileDay === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedMobileDay(day.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-royal text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {day.name}
              </button>
            );
          })}
        </div>

        {mobileDaySchedules.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-400">Aucun cours planifié ce jour.</p>
            {isAdmin && (
              <button
                type="button"
                onClick={() => onAddSlotAt && onAddSlotAt(selectedMobileDay, '08:00', '10:00')}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-royal bg-mist/60 rounded-xl"
              >
                <Plus className="w-3.5 h-3.5" />
                Ajouter un cours
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {mobileDaySchedules.map((slot) => (
              <div
                key={slot.id}
                onClick={() => onSlotClick(slot)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-xs ${getThemeClasses(
                  slot.theme
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-white/80 backdrop-blur-xs">
                    {slot.start_time} - {slot.end_time}
                  </span>
                  <span className="text-xs font-mono font-medium">{slot.course_code}</span>
                </div>
                <h4 className="font-bold text-base tracking-tight mb-2">{slot.course_name}</h4>
                <div className="flex items-center gap-4 text-xs opacity-90">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {slot.room}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {slot.teacher_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
