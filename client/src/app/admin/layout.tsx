'use client';

import Sidebar from '../../components/admin/shared/Sidebar';
import TopBar from '../../components/admin/shared/TopBar';
import '../globals.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#f8f9ff] admin-theme font-sans">
            {/* Permanent Sidebar on the Left */}
            <Sidebar />

            {/* Main Content Area on the Right */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Topbar at the top */}
                <TopBar />

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}