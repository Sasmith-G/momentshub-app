// import { useState, useEffect, useRef } from 'react';
// import { Camera, ArrowLeft, User, Flame, Award, Calendar, Settings, Edit3, Check, X, Upload } from 'lucide-react';
// import AbstractIllustration from '../components/ui/AbstractIllustration';
// import { logOut, updateUserDisplayName } from '../api/auth';
// import { getUserProfile, updateUserProfile, getRecentPhotosForUser, uploadProfilePicture } from '../api/firestore';

// const UserProfilePage = ({ onNavigate, user }) => {
//   const [profile, setProfile] = useState(null);
//   const [recentPhotos, setRecentPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editName, setEditName] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const avatarInputRef = useRef(null);

//   const statusEmojis = ['😊', '😎', '🤔', '😴', '🎉', '☕', '🌟', '🔥'];

//   // --- Mock Data (for stats we haven't implemented yet) ---
//   const userStats = {
//     currentStreak: 12, // TODO: Implement streaks
//     longestStreak: 28, // TODO: Implement streaks
//   };
//   const achievements = [
//     { id: 1, title: 'First Week', icon: '🎯', unlocked: true },
//     { id: 2, title: 'Photo Master', icon: '📸', unlocked: true },
//     { id: 3, title: 'Streak Legend', icon: '🔥', unlocked: false },
//   ];
//   // --- End Mock Data ---

//   useEffect(() => {
//     if (!user) return;
//     const fetchData = async () => {
//       setLoading(true);
//       const [profileData, photosData] = await Promise.all([
//         getUserProfile(user.uid),
//         getRecentPhotosForUser(user.uid)
//       ]);
//       setProfile(profileData);
//       setRecentPhotos(photosData);
//       setEditName(profileData?.displayName || user.email);
//       setLoading(false);
//     };
//     fetchData();
//   }, [user]);

//   const handleEmojiSelect = async (emoji) => {
//     if (!user) return;
//     setProfile(prev => ({ ...prev, statusEmoji: emoji }));
//     setShowEmojiPicker(false);
//     await updateUserProfile(user.uid, { statusEmoji: emoji });
//   };

//   const handleSaveProfile = async () => {
//     if (!editName.trim() || editName === profile.displayName) {
//       setIsEditing(false);
//       return;
//     }
//     setIsSaving(true);
//     const success = await updateUserDisplayName(editName);
//     if (success) {
//       setProfile(prev => ({ ...prev, displayName: editName }));
//     } else {
//       setEditName(profile.displayName);
//     }
//     setIsSaving(false);
//     setIsEditing(false);
//   };

//   const handleCancelEdit = () => {
//     setEditName(profile.displayName);
//     setIsEditing(false);
//   };

//   const handleAvatarClick = () => {
//     avatarInputRef.current.click();
//   };

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     const newAvatarUrl = await uploadProfilePicture(file);
//     if (newAvatarUrl) {
//       setProfile(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
//     } else {
//       alert("Failed to upload image. Please try again.");
//     }
//     setLoading(false);
//   };

//   if (loading || !profile) {
//     return <div className="flex items-center justify-center h-screen">Loading profile...</div>;
//   }

//   const displayName = profile.displayName || user.email;
//   const joinDate = profile.createdAt?.toDate().toLocaleString('en-US', { year: 'numeric', month: 'long' }) || 'N/A';
//   const statusEmoji = profile.statusEmoji || '😊';
//   const avatarUrl = profile.avatarUrl || null;

//   return (
//     <div className="min-h-screen bg-background">
//       <AbstractIllustration variant="dashboard" />
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
//         <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
//             <div className="flex items-center gap-4">
//                 <button onClick={() => onNavigate('dashboard')} className="text-gray-600 hover:text-primary-action">
//                     <ArrowLeft size={24} />
//                 </button>
//                 <div className="flex items-center gap-3">
//                     <Camera size={28} className="text-primary-action" />
//                     <h2 className="text-lg font-bold text-text-primary">MomentsHub</h2>
//                 </div>
//             </div>
//             <div className="flex items-center gap-4">
//                 <button onClick={() => onNavigate('settings')}><Settings size={24} className="text-gray-600 hover:text-primary-action" /></button>
//                 <button onClick={logOut} className="text-xs font-semibold text-gray-500 hover:text-red-500">Logout</button>
//             </div>
//         </div>
//       </header>

//       <main className="max-w-4xl mx-auto px-6 py-8">
//         {/* Profile Header Card */}
//         <div className="bg-white rounded-xl shadow-md p-8 mb-8 flex items-center gap-8">
//             <div className="relative">
//               <input
//                 type="file"
//                 ref={avatarInputRef}
//                 onChange={handleAvatarUpload}
//                 className="hidden"
//                 accept="image/png, image/jpeg"
//               />
//               <button
//                 onClick={handleAvatarClick}
//                 className="w-32 h-32 bg-gradient-to-tr from-accent-lavender to-accent-mint rounded-full flex items-center justify-center relative group"
//                 title="Change profile picture"
//               >
//                 {avatarUrl ? (
//                   <img src={avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                 ) : (
//                   <User size={64} className="text-white" />
//                 )}
//                 <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Upload size={32} />
//                 </div>
//               </button>

//               <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-primary-action animate-[float_4s_ease-in-out_infinite]">
//                   {statusEmoji}
//               </button>
//               {showEmojiPicker && (
//                   <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white p-2 rounded-xl shadow-lg grid grid-cols-4 gap-2 z-10">
//                       {statusEmojis.map(emoji => (
//                         <button key={emoji} onClick={() => handleEmojiSelect(emoji)} className="p-2 text-2xl rounded-lg hover:bg-gray-100">
//                           {emoji}
//                         </button>
//                       ))}
//                   </div>
//               )}
//             </div>

//             <div className="flex-grow">
//               {isEditing ? (
//                 <div className="flex items-center gap-4">
//                   <input
//                     type="text"
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                     className="text-3xl font-bold p-2 border-2 border-primary-action rounded-lg"
//                     disabled={isSaving}
//                   />
//                   <button onClick={handleSaveProfile} disabled={isSaving} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                     <Check size={16} />
//                   </button>
//                   <button onClick={handleCancelEdit} disabled={isSaving} className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-4">
//                   <h1 className="text-3xl font-bold">{displayName}</h1>
//                   <button onClick={() => setIsEditing(true)} className="p-2 border-2 border-primary-action text-primary-action rounded-lg hover:bg-primary-action hover:text-white transition-colors">
//                     <Edit3 size={16} />
//                   </button>
//                 </div>
//               )}
//               <p className="text-gray-500">{user.email}</p>
//               <p className="text-sm text-gray-400 mt-2 flex items-center gap-2"><Calendar size={16} /> Joined {joinDate}</p>
//             </div>
//         </div>

//         {/* --- RESTORED: Stats Grid --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-lg bg-accent-lavender flex items-center justify-center text-primary-action shadow-[0_0_20px_rgba(91,93,180,0.4)] animate-[pulseGlow_2s_ease-in-out_infinite]"><Flame size={24} /></div>
//                 <div><p className="text-2xl font-bold">{userStats.currentStreak}</p><p className="text-sm text-gray-500">Current Streak</p></div>
//             </div>
//              <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-lg bg-accent-lavender flex items-center justify-center text-primary-action"><Award size={24} /></div>
//                 <div><p className="text-2xl font-bold">{userStats.longestStreak}</p><p className="text-sm text-gray-500">Longest Streak</p></div>
//             </div>
//              <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
//                 <div className="w-12 h-12 rounded-lg bg-accent-lavender flex items-center justify-center text-primary-action"><Camera size={24} /></div>
//                 <div><p className="text-2xl font-bold">{recentPhotos.length}</p><p className="text-sm text-gray-500">Photos Shared</p></div>
//             </div>
//         </div>

//         {/* --- RESTORED: Achievements & Recent Photos --- */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-1">
//                 <h3 className="text-xl font-bold mb-4">Achievements</h3>
//                 <div className="space-y-4">
//                     {achievements.map(ach => (
//                         <div key={ach.id} className={`bg-white p-4 rounded-xl shadow-md flex items-center gap-4 ${!ach.unlocked && 'opacity-50'}`}>
//                             <div className="text-3xl w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">{ach.icon}</div>
//                             <div><p className="font-semibold">{ach.title}</p></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="lg:col-span-2">
//                 <h3 className="text-xl font-bold mb-4">Recent Photos</h3>
//                 {recentPhotos.length > 0 ? (
//                   <div className="grid grid-cols-3 gap-4">
//                       {recentPhotos.map((photo) => (
//                           <div key={photo.id} className="aspect-square rounded-xl overflow-hidden group">
//                               <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
//                           </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No photos shared yet.</p>
//                 )}
//             </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserProfilePage;

// import { useState, useEffect, useRef } from 'react';
// import { Camera, ArrowLeft, User, Flame, Award, Calendar, Settings, Edit3, Check, X, Upload } from 'lucide-react';
// import AbstractIllustration from '../components/ui/AbstractIllustration';
// import { logOut, updateUserDisplayName } from '../api/auth';
// import { getUserProfile, updateUserProfile, getRecentPhotosForUser, uploadProfilePicture } from '../api/firestore';

// const UserProfilePage = ({ onNavigate, user }) => {
//     const [profile, setProfile] = useState(null);
//     const [recentPhotos, setRecentPhotos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editName, setEditName] = useState('');
//     const [isSaving, setIsSaving] = useState(false);
//     const avatarInputRef = useRef(null);
//     const emojiPickerRef = useRef(null);

//     const statusEmojis = [
//         '😊', '😎', '🤔', '😴', '🎉', '☕', '🌟', '🔥',
//         '💪', '🎯', '📚', '🎮', '🎵', '🍕', '🏃', '💻',
//         '🌈', '⚡', '🎨', '🚀', '🌙', '☀️', '🌸', '🎭'
//     ];

//     const userStats = {
//         currentStreak: 12,
//         longestStreak: 28,
//     };

//     const achievements = [
//         { id: 1, title: 'First Week', icon: '🎯', unlocked: true },
//         { id: 2, title: 'Photo Master', icon: '📸', unlocked: true },
//         { id: 3, title: 'Streak Legend', icon: '🔥', unlocked: false },
//     ];

//     useEffect(() => {
//         if (!user) return;

//         const fetchData = async () => {
//             setLoading(true);
//             const [profileData, photosData] = await Promise.all([
//                 getUserProfile(user.uid),
//                 getRecentPhotosForUser(user.uid)
//             ]);
//             setProfile(profileData);
//             setRecentPhotos(photosData);
//             setEditName(profileData?.displayName || user.email);
//             setLoading(false);
//         };

//         fetchData();
//     }, [user]);

//     const handleEmojiSelect = async (emoji) => {
//         if (!user) return;
//         setProfile(prev => ({ ...prev, statusEmoji: emoji }));
//         setShowEmojiPicker(false);
//         await updateUserProfile(user.uid, { statusEmoji: emoji });
//     };

//     const handleSaveProfile = async () => {
//         if (!editName.trim() || editName === profile.displayName) {
//             setIsEditing(false);
//             return;
//         }

//         setIsSaving(true);
//         const success = await updateUserDisplayName(editName);
//         if (success) {
//             setProfile(prev => ({ ...prev, displayName: editName }));
//         } else {
//             setEditName(profile.displayName);
//         }
//         setIsSaving(false);
//         setIsEditing(false);
//     };

//     const handleCancelEdit = () => {
//         setEditName(profile.displayName);
//         setIsEditing(false);
//     };

//     const handleAvatarClick = () => {
//         avatarInputRef.current.click();
//     };

//     const handleAvatarUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         setLoading(true);
//         const newAvatarUrl = await uploadProfilePicture(file);
//         if (newAvatarUrl) {
//             setProfile(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
//         } else {
//             alert("Failed to upload image. Please try again.");
//         }
//         setLoading(false);
//     };

//     if (loading || !profile) {
//         return (
//             <div className="flex items-center justify-center h-screen bg-app-background text-text-primary">
//                 Loading profile...
//             </div>
//         );
//     }

//     const displayName = profile.displayName || user.email;

//     return (
//         <div className="min-h-screen bg-app-background pb-20">
//             {/* Header */}
//             <header className="bg-card-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
//                 <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                         <button
//                             onClick={() => onNavigate('dashboard')}
//                             className="text-text-secondary hover:text-primary-action transition-colors"
//                         >
//                             <ArrowLeft size={24} />
//                         </button>
//                         <div className="flex items-center gap-3">
//                             <Camera size={28} className="text-primary-action" />
//                             <h2 className="text-lg font-bold text-text-primary">MomentsHub</h2>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => logOut()}
//                         className="text-sm text-text-secondary hover:text-primary-action transition-colors"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </header>

//             <main className="max-w-4xl mx-auto px-4 py-6">
//                 {/* Profile Header Card */}
//                 <div className="bg-card-background rounded-2xl shadow-lg p-8 mb-6 relative overflow-hidden">
//                     <AbstractIllustration className="absolute top-0 right-0 opacity-20" />

//                     <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
//                         {/* Avatar with Upload Button */}
//                         <div className="relative flex-shrink-0">
//                             <div
//                                 className="w-32 h-32 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-4 border-primary-action/20 shadow-lg"
//                                 onClick={handleAvatarClick}
//                             >
//                                 {profile.avatarUrl ? (
//                                     <img
//                                         src={profile.avatarUrl}
//                                         alt={displayName}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
//                                         <User size={48} className="text-white" />
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Upload Button - TOP RIGHT of Avatar */}
//                             <button
//                                 onClick={handleAvatarClick}
//                                 className="absolute -top-1 -right-1 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all border-2 border-white dark:border-gray-800"
//                                 title="Upload profile picture"
//                             >
//                                 <Upload size={16} />
//                             </button>

//                             <input
//                                 ref={avatarInputRef}
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleAvatarUpload}
//                                 className="hidden"
//                             />

//                             {/* Status Emoji - BOTTOM RIGHT of Avatar */}
//                             <button
//                                 onClick={() => setShowEmojiPicker(true)}
//                                 className="absolute -bottom-1 -right-1 text-3xl hover:scale-110 transition-transform cursor-pointer bg-white dark:bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 shadow-lg"
//                                 title="Change status emoji"
//                             >
//                                 {profile.statusEmoji || '😊'}
//                             </button>
//                         </div>

//                         {/* Name & Info */}
//                         <div className="flex-1 text-center md:text-left">
//                             <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2">
//                                 {isEditing ? (
//                                     <div className="flex items-center gap-2">
//                                         <input
//                                             type="text"
//                                             value={editName}
//                                             onChange={(e) => setEditName(e.target.value)}
//                                             className="px-3 py-2 text-xl font-bold bg-gray-100 dark:bg-gray-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-action"
//                                             autoFocus
//                                         />
//                                         <button
//                                             onClick={handleSaveProfile}
//                                             disabled={isSaving}
//                                             className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                                         >
//                                             <Check size={18} />
//                                         </button>
//                                         <button
//                                             onClick={handleCancelEdit}
//                                             disabled={isSaving}
//                                             className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                                         >
//                                             <X size={18} />
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <h1 className="text-3xl font-bold text-text-primary">{displayName}</h1>
//                                         <button
//                                             onClick={() => setIsEditing(true)}
//                                             className="p-1.5 text-text-secondary hover:text-primary-action hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
//                                             title="Edit name"
//                                         >
//                                             <Edit3 size={18} />
//                                         </button>
//                                     </>
//                                 )}
//                             </div>

//                             <p className="text-sm text-text-secondary mb-4">{user.email}</p>

//                             <p className="text-xs text-text-secondary flex items-center justify-center md:justify-start gap-2">
//                                 <Calendar size={14} />
//                                 Joined {profile.createdAt?.toDate ? new Date(profile.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'November 2025'}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                     <div className="bg-card-background rounded-xl p-6 flex items-center gap-4 shadow-md">
//                         <div className="bg-accent-coral/20 p-3 rounded-full">
//                             <Flame size={28} className="text-accent-coral" />
//                         </div>
//                         <div>
//                             <p className="text-2xl font-bold text-text-primary">{userStats.currentStreak}</p>
//                             <p className="text-sm text-text-secondary">Current Streak</p>
//                         </div>
//                     </div>

//                     <div className="bg-card-background rounded-xl p-6 flex items-center gap-4 shadow-md">
//                         <div className="bg-primary-action/20 p-3 rounded-full">
//                             <Award size={28} className="text-primary-action" />
//                         </div>
//                         <div>
//                             <p className="text-2xl font-bold text-text-primary">{userStats.longestStreak}</p>
//                             <p className="text-sm text-text-secondary">Longest Streak</p>
//                         </div>
//                     </div>

//                     <div className="bg-card-background rounded-xl p-6 flex items-center gap-4 shadow-md">
//                         <div className="bg-accent-mint/20 p-3 rounded-full">
//                             <Camera size={28} className="text-accent-mint" />
//                         </div>
//                         <div>
//                             <p className="text-2xl font-bold text-text-primary">{recentPhotos.length}</p>
//                             <p className="text-sm text-text-secondary">Photos Shared</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Achievements */}
//                 <div className="bg-card-background rounded-xl p-6 mb-6 shadow-md">
//                     <h3 className="text-lg font-bold text-text-primary mb-4">Achievements</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                         {achievements.map((ach) => (
//                             <div
//                                 key={ach.id}
//                                 className={`p-4 rounded-lg text-center ${ach.unlocked
//                                         ? 'bg-primary-action/10 border-2 border-primary-action/30'
//                                         : 'bg-gray-100 dark:bg-gray-800 opacity-50'
//                                     }`}
//                             >
//                                 <div className="text-3xl mb-2">{ach.icon}</div>
//                                 <p className="text-xs font-medium text-text-primary">{ach.title}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Recent Photos */}
//                 <div className="bg-card-background rounded-xl p-6 shadow-md">
//                     <h3 className="text-lg font-bold text-text-primary mb-4">Recent Photos</h3>
//                     {recentPhotos.length > 0 ? (
//                         <div className="grid grid-cols-3 gap-2">
//                             {recentPhotos.map((photo) => (
//                                 <div key={photo.id} className="aspect-square overflow-hidden rounded-lg">
//                                     <img
//                                         src={photo.imageUrl}
//                                         alt={photo.caption}
//                                         className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
//                                         onClick={() => onNavigate('photo-detail', photo.id)}
//                                     />
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <p className="text-center text-text-secondary py-8">No photos shared yet.</p>
//                     )}
//                 </div>
//             </main>

//             {/* Emoji Picker Modal - FULLSCREEN OVERLAY */}
//             {showEmojiPicker && (
//                 <div
//                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//                     onClick={() => setShowEmojiPicker(false)}
//                 >
//                     <div
//                         className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
//                             Choose your status emoji
//                         </h3>

//                         <div className="grid grid-cols-6 gap-3 mb-6">
//                             {statusEmojis.map((emoji) => (
//                                 <button
//                                     key={emoji}
//                                     onClick={() => handleEmojiSelect(emoji)}
//                                     className={`text-4xl p-3 rounded-xl transition-all hover:scale-125 ${profile.statusEmoji === emoji
//                                             ? 'bg-indigo-100 dark:bg-indigo-900/50 ring-2 ring-indigo-500 scale-110'
//                                             : 'hover:bg-gray-100 dark:hover:bg-gray-700'
//                                         }`}
//                                 >
//                                     {emoji}
//                                 </button>
//                             ))}
//                         </div>

//                         <button
//                             onClick={() => setShowEmojiPicker(false)}
//                             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition-colors font-semibold"
//                         >
//                             Done
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserProfilePage;

import { useState, useEffect, useRef } from 'react';
import { Camera, ArrowLeft, User, Flame, Award, Calendar, Settings, Edit3, Check, X, Upload } from 'lucide-react';
import AbstractIllustration from '../components/ui/AbstractIllustration';
import { logOut, updateUserDisplayName } from '../api/auth';
import { getUserProfile, updateUserProfile, getRecentPhotosForUser, uploadProfilePicture, calculateUserStreaks, updateUserStats } from '../api/firestore';
import ResponsiveContainer from '../components/ui/ResponsiveContainer';
import useThemePersist from '../hooks/useThemePersist';
import { CameraDoodle, StarDoodle, HeartDoodle } from '../components/ui/Doodles';

const UserProfilePage = ({ onNavigate, user }) => {
  const { theme } = useThemePersist();
  const [profile, setProfile] = useState(null);
  const [recentPhotos, setRecentPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [userStats, setUserStats] = useState({ currentStreak: 0, longestStreak: 0, totalPhotos: 0, totalReactions: 0 });
  const avatarInputRef = useRef(null);

  const statusEmojis = [
    '😊', '😎', '🤔', '😴', '🎉', '☕', '🌟', '🔥',
    '💪', '🎯', '📚', '🎮', '🎵', '🍕', '🏃', '💻',
    '🌈', '⚡', '🎨', '🚀', '🌙', '☀️', '🌸', '🎭'
  ];

  // Achievements are now dynamic based on userStats
  const achievementsList = [
    { id: 1, title: 'First Shot', icon: '📸', description: 'Share your first photo', unlocked: userStats.totalPhotos >= 1 },
    { id: 2, title: 'Week Warrior', icon: '🔥', description: '7-day streak', unlocked: userStats.longestStreak >= 7 },
    { id: 3, title: 'Popular', icon: '💖', description: '50 total reactions', unlocked: userStats.totalReactions >= 50 },
    { id: 4, title: 'Collector', icon: '📷', description: 'Share 10 photos', unlocked: userStats.totalPhotos >= 10 },
    { id: 5, title: 'Memory Master', icon: '⭐', description: 'Share 25 photos', unlocked: userStats.totalPhotos >= 25 },
    { id: 6, title: 'Legend', icon: '👑', description: 'Share 50 photos', unlocked: userStats.totalPhotos >= 50 },
  ];

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      
      const [profileData, photosData, statsData] = await Promise.all([
        getUserProfile(user.uid),
        getRecentPhotosForUser(user.uid, 6), // Fetch 6 recent photos
        calculateUserStreaks(user.uid)
      ]);
      
      setProfile(profileData);
      setRecentPhotos(photosData);
      setEditName(profileData?.displayName || user.email);
      
      // Combine stats
      const newStats = {
        ...statsData,
        totalReactions: 0, // TODO: This is not calculated yet in firestore.js
      };
      setUserStats(newStats);

      // Update Firestore with latest stats (don't await)
      updateUserStats(user.uid, newStats);
      
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleEmojiSelect = async (emoji) => {
    if (!user) return;
    setProfile(prev => ({ ...prev, statusEmoji: emoji }));
    setShowEmojiPicker(false);
    await updateUserProfile(user.uid, { statusEmoji: emoji });
  };

  const handleSaveProfile = async () => {
    if (!editName.trim() || editName === profile.displayName) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    const success = await updateUserDisplayName(editName);
    if (success) {
      setProfile(prev => ({ ...prev, displayName: editName }));
    } else {
      setEditName(profile.displayName);
    }
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditName(profile.displayName);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show loading on profile to indicate upload
    setProfile(prev => ({ ...prev, avatarUrl: 'uploading' })); 
    const newAvatarUrl = await uploadProfilePicture(file);
    if (newAvatarUrl) {
      setProfile(prev => ({ ...prev, avatarUrl: newAvatarUrl }));
    } else {
      alert("Failed to upload image. Please try again.");
      setProfile(prev => ({ ...prev, avatarUrl: user.photoURL })); // Revert on fail
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-app-background text-text-primary">
        <div className="loading-dots text-blue-400">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  const displayName = profile.displayName || user.email;

  return (
    <div className={`min-h-screen pb-24 ${theme === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Animated Background Doodles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 right-20 opacity-20 animate-pulse" style={{ animationDuration: '4s' }}>
          <StarDoodle className="text-yellow-400 dark:text-yellow-500" size={60} />
        </div>
        <div className="absolute bottom-40 left-10 opacity-25 animate-pulse" style={{ animationDuration: '3s' }}>
          <HeartDoodle className="text-pink-400 dark:text-pink-500" size={50} />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-15" >
          <CameraDoodle className="text-blue-400 dark:text-blue-500" size={80} />
        </div>
      </div>

      {/* Header */}
      <header className="bg-card-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-text-secondary hover:text-primary-action transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <Camera size={28} className="text-primary-action" />
              <h2 className="text-lg font-bold text-text-primary">MomentsHub</h2>
            </div>
          </div>
          <button
            onClick={() => logOut()}
            className="text-sm text-text-secondary hover:text-primary-action transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20">
        <ResponsiveContainer className="py-6">
          {/* Profile Header Card */}
          <div className="bg-card-background rounded-2xl shadow-lg mb-6 relative overflow-hidden">
            {/* Banner Element */}
            <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
              <AbstractIllustration className="absolute top-0 right-0 opacity-20" />
            </div>
            
            {/* Content shifted down with margin-top */}
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 p-8 mt-16">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-4 border-white dark:border-gray-800 shadow-lg"
                  onClick={handleAvatarClick}
                >
                  {profile.avatarUrl === 'uploading' ? (
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                       <div className="loading-dots text-blue-400">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  ) : profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleAvatarClick}
                  className="absolute -top-1 -right-1 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all border-2 border-white dark:border-gray-800"
                  title="Upload profile picture"
                >
                  <Upload size={16} />
                </button>
                
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />

                <button
                  onClick={() => setShowEmojiPicker(true)}
                  className="absolute -bottom-1 -right-1 text-3xl hover:scale-110 transition-transform cursor-pointer bg-white dark:bg-gray-800 w-14 h-14 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                  title="Change status emoji"
                >
                  {profile.statusEmoji || '😊'}
                </button>
              </div>

              {/* Name & Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-3 mb-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-3 py-2 text-xl font-bold bg-gray-100 dark:bg-gray-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-action"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-text-primary">{displayName}</h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 text-text-secondary hover:text-primary-action hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                        title="Edit name"
                      >
                        <Edit3 size={18} />
                      </button>
                    </>
                  )}
                </div>

                <p className="text-sm text-text-secondary mb-4">{user.email}</p>

                <p className="text-xs text-text-secondary flex items-center justify-center md:justify-start gap-2">
                  <Calendar size={14} />
                  Joined {profile.createdAt?.toDate ? new Date(profile.createdAt.toDate()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'November 2025'}
                </p>
              </div>
            </div>

            {/* Stats Grid - Enhanced */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 pb-8">
              {[
                { label: 'Current Streak', value: userStats.currentStreak, icon: '🔥', color: 'from-orange-400 to-red-500' },
                { label: 'Longest Streak', value: userStats.longestStreak, icon: '⭐', color: 'from-yellow-400 to-orange-500' },
                { label: 'Photos Shared', value: userStats.totalPhotos || 0, icon: '📸', color: 'from-blue-400 to-indigo-500' },
                { label: 'Total Reactions', value: userStats.totalReactions || 0, icon: '💖', color: 'from-pink-400 to-red-400' },
              ].map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.icon}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-8 bg-card-background rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {achievementsList.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-6 rounded-xl text-center transition-all transform hover:scale-105 ${
                    ach.unlocked
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-400 dark:border-yellow-600 shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 opacity-50'
                  }`}
                  title={ach.description}
                >
                  <div className="text-4xl mb-2">{ach.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{ach.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{ach.description}</p>
                  {ach.unlocked && (
                    <div className="mt-2 inline-block px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-semibold">
                      ✓ Unlocked
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Photos Section */}
          <div className="bg-card-background rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="text-blue-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Moments</h2>
            </div>
            {recentPhotos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-gray-200 dark:bg-gray-700"
                    style={{ aspectRatio: '1' }}
                    onClick={() => onNavigate('photo-detail', photo.id)}
                  >
                    <img
                      src={photo.imageUrl}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                      <div className="text-white">
                        <p className="font-semibold text-sm line-clamp-2">{photo.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Camera className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 dark:text-gray-400 font-medium">No photos shared yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Share your first moment to get started!</p>
              </div>
            )}
          </div>
        </ResponsiveContainer>
      </main>

      {/* Emoji Picker Modal */}
      {showEmojiPicker && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowEmojiPicker(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Choose your status emoji
            </h3>
            
            <div className="grid grid-cols-6 gap-3 mb-6">
              {statusEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`text-4xl p-3 rounded-xl transition-all hover:scale-125 ${
                    profile.statusEmoji === emoji 
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 ring-2 ring-indigo-500 scale-110' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowEmojiPicker(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition-colors font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;