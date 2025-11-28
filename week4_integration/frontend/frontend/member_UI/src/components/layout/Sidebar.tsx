import React from 'react';
import { Home, Users, UserCog, Book, Copy, ArrowLeftRight, DollarSign, Library } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Sidebar({ isOpen, currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'staff', label: 'Staff', icon: UserCog },
    { id: 'books', label: 'Books', icon: Book },
    { id: 'book-copies', label: 'Book Copies', icon: Copy },
    { id: 'borrows', label: 'Borrowing', icon: ArrowLeftRight },
    { id: 'fines', label: 'Fines', icon: DollarSign },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Library className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-gray-900">Library System</h1>
            <p className="text-xs text-gray-500">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || currentView.startsWith(item.id);
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Library Management System
          <div className="text-gray-400">Version 1.0.0</div>
        </div>
      </div>
    </aside>
  );
}
