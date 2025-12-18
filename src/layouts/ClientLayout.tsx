import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function ClientLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar role="client" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
