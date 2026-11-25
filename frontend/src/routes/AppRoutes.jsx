import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import CoursesList from '../pages/admin/courses/CoursesList';
import SchedulePage from '../pages/schedule/SchedulePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/admin/cours" replace />}
      />

      <Route
        path="/admin/cours"
        element={
          <DashboardLayout>
            <CoursesList />
          </DashboardLayout>
        }
      />

      <Route
        path="/admin/emplois-du-temps"
        element={
          <DashboardLayout>
            <SchedulePage isAdmin={true} />
          </DashboardLayout>
        }
      />

      <Route
        path="/emploi-du-temps"
        element={
          <DashboardLayout>
            <SchedulePage isAdmin={false} />
          </DashboardLayout>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/admin/cours" replace />}
      />
    </Routes>
  );
}
