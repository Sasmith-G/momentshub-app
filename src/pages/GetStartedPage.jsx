import { useState } from 'react';
import { Camera, Users, Plus, LogIn } from 'lucide-react';
import { createGroup, joinGroup } from '../api/firestore';
import { validateGroupName, validateInviteCode } from '../utils/validators';

const GetStartedPage = ({ onGroupJoined, onNavigate }) => {
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validateGroupName(groupName);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    const newGroupId = await createGroup(groupName);
    if (newGroupId) {
      alert(`Group "${groupName}" created!`);
      onGroupJoined();
    } else {
      setError('Could not create group. Please try again.');
    }
    setLoading(false);
  };

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validateInviteCode(inviteCode);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    const result = await joinGroup(inviteCode);
    if (result.success) {
      alert('Successfully joined group!');
      onGroupJoined();
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Camera size={40} className="text-primary-action" />
          <h1 className="text-4xl font-bold text-text-primary">
            Welcome to <span className="text-primary-action">MomentsHub!</span>
          </h1>
        </div>
        <p className="text-text-secondary text-lg max-w-md">
          It looks like you're not in a group yet. Get started by creating one or joining a friend's.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Create Group Card */}
        <div className="bg-white border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <Plus size={28} className="text-primary-action" />
            <h2 className="text-2xl font-bold text-text-primary">Create a New Group</h2>
          </div>

          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                disabled={loading}
                placeholder="e.g., College Friends, Family"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text-primary rounded-lg focus:outline-none focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 disabled:opacity-50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !groupName.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary-action to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {loading ? 'Creating...' : '✨ Create Group'}
            </button>
          </form>
        </div>

        {/* Join Group Card */}
        <div className="bg-white border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <LogIn size={28} className="text-primary-action" />
            <h2 className="text-2xl font-bold text-text-primary">Join an Existing Group</h2>
          </div>

          <form onSubmit={handleJoinGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Invite Code
              </label>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                disabled={loading}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-text-primary rounded-lg focus:outline-none focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 disabled:opacity-50 transition-colors"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !inviteCode.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {loading ? 'Joining...' : '🎯 Join Group'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg font-medium">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => onNavigate('dashboard')}
        className="mt-8 px-6 py-2 text-text-secondary hover:text-text-primary font-medium transition-colors hover:underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default GetStartedPage;
