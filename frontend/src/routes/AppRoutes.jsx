import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import PagePlaceholder from '../components/common/PagePlaceholder';
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/teacher" element={<TeacherLayout />}>
                <Route index element={<PagePlaceholder title="Mon tableau de bord" />} />
                <Route path="classes" element={<PagePlaceholder title="Mes classes" />} />
                <Route path="appel" element={<PagePlaceholder title="Faire l'appel" />} />
                <Route path="emploi-du-temps" element={<PagePlaceholder title="Mon emploi du temps" />} />
                <Route path="historique" element={<PagePlaceholder title="Historique des présences" />} />
                <Route path="rapports" element={<PagePlaceholder title="Mes rapports" />} />
                <Route path="profil" element={<PagePlaceholder title="Mon profil" />} />
            </Route>
        </Routes>
    );
}