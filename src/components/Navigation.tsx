import React from 'react';
import { TrendingUp, Calendar, Bed, Users } from 'lucide-react';
import type { TabType } from '../types/hotel';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => (
  <nav className="bg-white shadow-sm min-w-screen">
    <div className="min-w-screen mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-8">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'bookings', label: 'Bookings', icon: Calendar },
          { id: 'rooms', label: 'Rooms', icon: Bed },
          { id: 'guests', label: 'Guests', icon: Users }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as TabType)}
            className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
              activeTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default Navigation;