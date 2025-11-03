import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, RefreshCw, Users, Shield, Trash2, Check } from 'lucide-react';
import { regenerateInviteCode, removeUserFromGroup, getUsersByIds } from '../api/firestore';

const GroupSettingsPage = ({ activeGroup, user, onNavigate, onGroupUpdated }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [currentInviteCode, setCurrentInviteCode] = useState(activeGroup?.inviteCode || '');

  const isAdmin = user?.uid === activeGroup?.createdBy;

  useEffect(() => {
    const fetchMembers = async () => {
      if (!activeGroup) return;
      
      setLoading(true);
      const fetchedMembers = await getUsersByIds(activeGroup.members);
      setMembers(fetchedMembers);
      setLoading(false);
    };

    fetchMembers();
  }, [activeGroup]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentInviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateCode = async () => {
    if (!isAdmin) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to regenerate the invite code? The old code will stop working.'
    );
    
    if (!confirmed) return;

    setRegenerating(true);
    const newCode = await regenerateInviteCode(activeGroup.id);
    if (newCode) {
      setCurrentInviteCode(newCode);
      alert('Invite code regenerated successfully!');
      onGroupUpdated(); // Refresh groups
    } else {
      alert('Failed to regenerate code. Please try again.');
    }
    setRegenerating(false);
  };

  const handleRemoveMember = async (memberId, memberName) => {
    if (!isAdmin) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to remove ${memberName} from the group?`
    );
    
    if (!confirmed) return;

    const success = await removeUserFromGroup(activeGroup.id, memberId);
    if (success) {
      setMembers(members.filter(m => m.id !== memberId));
      alert(`${memberName} has been removed from the group.`);
      onGroupUpdated(); // Refresh groups
    } else {
      alert('Failed to remove member. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-app-background pb-20">
      {/* Header */}
      <header className="bg-card-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-text-secondary hover:text-primary-action transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-text-primary">Group Settings</h1>
          {isAdmin && (
            <span className="ml-auto px-3 py-1 bg-primary-action/10 text-primary-action text-xs font-semibold rounded-full flex items-center gap-1">
              <Shield size={14} />
              Admin
            </span>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Group Info */}
        <div className="bg-card-background rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-text-primary mb-4">Group Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-text-secondary">Group Name</p>
              <p className="text-text-primary font-medium">{activeGroup?.groupName}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary">Members</p>
              <p className="text-text-primary font-medium">{activeGroup?.members.length}</p>
            </div>
          </div>
        </div>

        {/* Invite Code Section */}
        <div className="bg-card-background rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-text-primary mb-4">Invite Code</h2>
          <p className="text-sm text-text-secondary mb-4">
            Share this code with friends to invite them to the group.
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 font-mono text-2xl text-center text-primary-action font-bold tracking-widest">
              {currentInviteCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-primary-action text-white px-4 py-3 rounded-lg hover:bg-primary-action/90 transition-colors flex items-center gap-2"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {isAdmin && (
            <button
              onClick={handleRegenerateCode}
              disabled={regenerating}
              className="mt-4 w-full bg-gray-200 dark:bg-gray-700 text-text-primary px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={18} className={regenerating ? 'animate-spin' : ''} />
              {regenerating ? 'Regenerating...' : 'Regenerate Code'}
            </button>
          )}
        </div>

        {/* Members Section */}
        <div className="bg-card-background rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <Users size={20} />
            Members ({members.length})
          </h2>

          {loading ? (
            <div className="text-center py-8 text-text-secondary">Loading members...</div>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-action/20 flex items-center justify-center text-primary-action font-semibold">
                        {member.displayName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-text-primary">{member.displayName}</p>
                      {member.id === activeGroup.createdBy && (
                        <span className="text-xs text-primary-action">Admin</span>
                      )}
                    </div>
                  </div>

                  {isAdmin && member.id !== activeGroup.createdBy && member.id !== user.uid && (
                    <button
                      onClick={() => handleRemoveMember(member.id, member.displayName)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupSettingsPage;
