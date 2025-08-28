import React from 'react';
import { User, Activity, BarChart3, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MedPredict</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('checker')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'checker'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Symptom Checker
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                My History
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'trends'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Health Trends
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'doctors'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Find Doctors
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex space-x-1 py-2">
            <button
              onClick={() => setActiveTab('checker')}
              className={`flex-1 flex items-center justify-center py-2 text-xs font-medium transition-colors ${
                activeTab === 'checker'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <Activity className="w-4 h-4 mb-1" />
              Checker
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center py-2 text-xs font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <BarChart3 className="w-4 h-4 mb-1" />
              History
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`flex-1 flex items-center justify-center py-2 text-xs font-medium transition-colors ${
                activeTab === 'trends'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <BarChart3 className="w-4 h-4 mb-1" />
              Trends
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 flex items-center justify-center py-2 text-xs font-medium transition-colors ${
                activeTab === 'doctors'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <Users className="w-4 h-4 mb-1" />
              Doctors
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;