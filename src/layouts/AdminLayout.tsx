import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar role="admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
