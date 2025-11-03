import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Users, Plus, LogIn } from 'lucide-react';

const GroupSwitcher = ({ activeGroup, userGroups, onGroupSwitch, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!activeGroup) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
        aria-label="Switch group"
      >
        <Users size={18} />
        <span className="font-medium">{activeGroup.groupName}</span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - FIXED with solid background */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 z-50">
          {/* YOUR GROUPS Section */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Your Groups</p>
          </div>

          {/* Groups List */}
          <div className="max-h-48 overflow-y-auto">
            {userGroups?.map((group) => (
              <button
                key={group.id}
                onClick={() => {
                  onGroupSwitch(group); // <-- THE FIX: Pass the whole 'group' object, not 'group.id'
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  activeGroup.id === group.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {group.groupName}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700" />

          {/* Create & Join Buttons */}
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                onNavigate('create-group');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Create New Group
            </button>
            <button
              onClick={() => {
                onNavigate('join-group');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors flex items-center gap-2"
            >
              <LogIn size={16} />
              Join Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSwitcher;