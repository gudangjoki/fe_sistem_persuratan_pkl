import React from 'react';
import SubContent from './SubContent';
import SubMenu from './SubMenu';

export default function Content() {
    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="h-full p-4 space-y-4 sm:p-6 sm:space-y-6">
                <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-3">
                    {/* Sidebar Menu */}
                    <div className="h-auto lg:col-span-1">
                        <SubMenu />
                    </div>
                    
                    <div className="h-full lg:col-span-2">
                        <SubContent />
                    </div>
                    {/* Main Content Area */}
                </div>
            </div>
        </div>
    );
}
