import AppRoutes from './routes/AppRoutes.jsx'
import { ParentProvider } from './context/ParentContext.jsx'

export default function App() {
  return (
    <ParentProvider>
      <AppRoutes />
    </ParentProvider>
  )
}
