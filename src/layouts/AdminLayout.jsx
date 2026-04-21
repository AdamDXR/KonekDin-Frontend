import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:block">
        <div className="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Admin Panel</h1>
        </div>
        <nav className="p-4 space-y-2">
          {/* Menu items here */}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
