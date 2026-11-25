import { Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentSchedule from '../pages/student/StudentSchedule';
import StudentAttendance from '../pages/student/StudentAttendance';
import StudentAbsences from '../pages/student/StudentAbsences';
import StudentRequests from '../pages/student/StudentRequests';
import StudentNotifications from '../pages/student/StudentNotifications';
import StudentProfile from '../pages/student/StudentProfile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student" replace />} />

      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="emploi-du-temps" element={<StudentSchedule />} />
        <Route path="presences" element={<StudentAttendance />} />
        <Route path="absences" element={<StudentAbsences />} />
        <Route path="demandes" element={<StudentRequests />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="profil" element={<StudentProfile />} />
      </Route>
    </Routes>
  );
}