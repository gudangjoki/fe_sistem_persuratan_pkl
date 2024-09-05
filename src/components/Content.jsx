import React from 'react';
import SubContent from './SubContent';
import SubMenu from './SubMenu';

export default function Content() {
    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="p-4 space-y-4 sm:p-6 sm:space-y-6">
                <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-3">
                    {/* Sidebar Menu */}
                    <SubMenu />

                    {/* Main Content Area */}
                    <SubContent />
                </div>
            </div>
        </div>
    );
}
