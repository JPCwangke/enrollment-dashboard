import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ManagementDashboard from './pages/ManagementDashboard';
import AdsDashboard from './pages/AdsDashboard';

export default function App() {
  const [activeDashboard, setActiveDashboard] = useState('management');

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar active={activeDashboard} onChange={setActiveDashboard} />
      <main className="flex-1 overflow-y-auto">
        {activeDashboard === 'management' ? <ManagementDashboard /> : <AdsDashboard />}
      </main>
    </div>
  );
}
