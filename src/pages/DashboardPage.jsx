// import { useState, useEffect } from 'react';
// import { Home, Grid, User, Settings as SettingsIcon, Plus, LogOut } from 'lucide-react';
// import PhotoCard from '../components/ui/PhotoCard';
// import UploadPhotoModal from '../components/domain/UploadPhotoModal';
// import GroupSwitcher from '../components/domain/GroupSwitcher'; // NEW
// // import { getPhotos, getOnThisDayPhoto } from '../api/firestore';
// import { getPhotosForGroup, getOnThisDayPhoto } from '../api/firestore';

// import { logOut } from '../api/auth';



// const DashboardPage = ({ user, activeGroup, userGroups, onNavigate, onPhotoSelect, onGroupSwitch }) => {
//   const [photos, setPhotos] = useState([]);
//   const [onThisDayPhoto, setOnThisDayPhoto] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

//   const fetchPhotos = async () => {
//     if (!activeGroup) return;

//     setLoading(true);
//     const fetchedPhotos = await getPhotosForGroup(activeGroup.id); // Changed
//     setPhotos(fetchedPhotos);

//     const todayPhoto = await getOnThisDayPhoto(activeGroup.id);
//     setOnThisDayPhoto(todayPhoto);

//     setLoading(false);
//   };


//   useEffect(() => {
//     fetchPhotos();
//   }, [activeGroup]); // Refetch when activeGroup changes

//   const handleUploadSuccess = () => {
//     fetchPhotos(); // Refresh photos after upload
//   };

//   const handleLogout = async () => {
//     await logOut();
//   };

//   return (
//     <div className="min-h-screen bg-app-background">
//       {/* Header */}
//       {/* // In DashboardPage.jsx, update the header section: */}
//       <header className="bg-card-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <h1 className="text-2xl font-bold text-primary-action">MomentsHub</h1>
//               <GroupSwitcher
//                 activeGroup={activeGroup}
//                 userGroups={userGroups}
//                 onGroupSwitch={onGroupSwitch}
//                 onNavigate={onNavigate}
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               {/* NEW: Group Settings Button */}
//               <button
//                 onClick={() => onNavigate('group-settings')}
//                 className="p-2 text-text-secondary hover:text-primary-action transition-colors"
//                 title="Group Settings"
//               >
//                 <SettingsIcon size={20} />
//               </button>
//               <button
//                 onClick={() => setIsUploadModalOpen(true)}
//                 className="bg-primary-action text-white p-2 rounded-full hover:bg-primary-action/90 transition-colors shadow-lg"
//               >
//                 <Plus size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>


//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-4 py-6">
//         {/* On This Day */}
//         {onThisDayPhoto && (
//           <div className="mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
//             <h2 className="text-xl font-bold text-text-primary mb-2">📅 On This Day</h2>
//             <p className="text-sm text-text-secondary mb-4">
//               From {onThisDayPhoto.createdAtYear}
//             </p>
//             <PhotoCard photo={onThisDayPhoto} onPhotoClick={onPhotoSelect} />
//           </div>
//         )}

//         {/* Today's Moments */}
//         <h2 className="text-xl font-bold text-text-primary mb-4">
//           Today's Moments in "{activeGroup?.groupName}"
//         </h2>

//         {loading ? (
//           <div className="text-center py-12 text-text-secondary">Loading moments...</div>
//         ) : photos.length > 0 ? (
//           <div className="space-y-6">
//             {photos.map((photo) => (
//               <PhotoCard key={photo.id} photo={photo} onPhotoClick={onPhotoSelect} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-card-background rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
//             <div className="text-6xl mb-4">📸</div>
//             <h3 className="text-lg font-semibold text-text-primary mb-2">
//               Share the First Moment
//             </h3>
//             <p className="text-text-secondary">
//               No moments have been shared in this group yet. Click the '+' button to add one!
//             </p>
//           </div>
//         )}
//       </main>

//       {/* Bottom Navigation */}
//       <nav className="fixed bottom-0 left-0 right-0 bg-card-background border-t border-gray-200 dark:border-gray-700 z-40">
//         <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-around">
//           <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center gap-1 text-primary-action">
//             <Home size={24} />
//             <span className="text-xs font-medium">Home</span>
//           </button>
//           <button onClick={() => onNavigate('gallery')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary-action transition-colors">
//             <Grid size={24} />
//             <span className="text-xs">Gallery</span>
//           </button>
//           <button onClick={() => onNavigate('profile')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary-action transition-colors">
//             <User size={24} />
//             <span className="text-xs">Profile</span>
//           </button>
//           <button onClick={() => onNavigate('settings')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-primary-action transition-colors">
//             <SettingsIcon size={24} />
//             <span className="text-xs">Settings</span>
//           </button>
//         </div>
//       </nav>

//       {/* Upload Modal */}
//       <UploadPhotoModal
//         isOpen={isUploadModalOpen}
//         onClose={() => setIsUploadModalOpen(false)}
//         groupId={activeGroup?.id} // Use activeGroup
//         onUploadSuccess={handleUploadSuccess}
//       />
//     </div>
//   );
// };

// export default DashboardPage;
// import { useState, useEffect, useCallback } from 'react';
// import { Home, Grid, User, Settings as SettingsIcon, Plus, LogOut, Users, Menu, X } from 'lucide-react';
// import PhotoCard from '../components/ui/PhotoCard';
// import UploadPhotoModal from '../components/domain/UploadPhotoModal';
// import GroupSwitcher from '../components/domain/GroupSwitcher';
// import ThemeToggle from '../components/ui/ThemeToggle';
// import ResponsiveContainer from '../components/ui/ResponsiveContainer';
// import useThemePersist from '../hooks/useThemePersist';
// import { getPhotosForGroup, getOnThisDayPhoto } from '../api/firestore';
// import { logOut } from '../api/auth';
// // import { PhoneIllustration, CozyRoomIllustration, PianoIllustration, PhotoGalleryIllustration, HeartSparklesIllustration } from '../components/ui/Doodles';
// import { SmileyDoodle, SquiggleDoodle } from '../components/ui/Doodles';



// const DashboardPage = ({
//   user,
//   activeGroup,
//   userGroups,
//   onNavigate,
//   onPhotoSelect,
//   onGroupSwitch,
//   onLogoClick
// }) => {
//   const { theme, toggleTheme } = useThemePersist();
//   const [photos, setPhotos] = useState([]);
//   const [onThisDayPhoto, setOnThisDayPhoto] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchPhotos = useCallback(async () => {
//     if (!activeGroup?.id) {
//       setPhotos([]);
//       setOnThisDayPhoto(null);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const [fetchedPhotos, todayPhoto] = await Promise.all([
//         getPhotosForGroup(activeGroup.id),
//         getOnThisDayPhoto(activeGroup.id),
//       ]);

//       console.log('Fetched photos:', fetchedPhotos); // DEBUG
//       setPhotos(Array.isArray(fetchedPhotos) ? fetchedPhotos : []);
//       setOnThisDayPhoto(todayPhoto || null);
//     } catch (err) {
//       console.error('Failed to fetch photos:', err);
//       setError('Failed to load photos. Please try again.');
//       setPhotos([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [activeGroup?.id]);

//   useEffect(() => {
//     fetchPhotos();
//   }, [fetchPhotos]);

//   const handleUploadSuccess = useCallback(() => {
//     setIsUploadModalOpen(false);
//     fetchPhotos();
//   }, [fetchPhotos]);

//   const handleLogout = useCallback(async () => {
//     try {
//       await logOut();
//     } catch (error) {
//       console.error('Logout failed:', error);
//       alert('Logout failed. Please try again.');
//     }
//   }, []);

//   const handlePhotoSelect = useCallback((photoId) => {
//     onPhotoSelect?.(photoId);
//   }, [onPhotoSelect]);

//   return (
//     <div className={`min-h-screen pb-24 ${theme === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
//       {/* Header */}
//       <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
//         <ResponsiveContainer className="py-3 sm:py-4">
//           <div className="flex items-center justify-between">
//             {/* Logo Section */}
//             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
//               <button
//                 onClick={onLogoClick}
//                 className="flex-shrink-0 p-2 hover:scale-110 transition-transform duration-200"
//                 aria-label="MomentsHub home"
//               >
//                 <Home size={24} className="text-blue-400" />
//               </button>
//               <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white hidden sm:block">
//                 MomentsHub
//               </h1>
//             </div>
//             {/* Decorative doodles - top right */}
//             <div className="absolute top-20 right-10 w-24 h-24 opacity-50 pointer-events-none">
//               <SmileyDoodle className="text-blue-400" />
//             </div>

//             {/* Decorative doodles - bottom left */}
//             <div className="absolute bottom-40 left-5 w-32 h-32 opacity-50 pointer-events-none hidden md:block">
//               <SquiggleDoodle className="text-purple-400" />
//             </div>


//             {/* Desktop Actions */}
//             <div className="hidden md:flex items-center gap-2">
//               <ThemeToggle theme={theme} onToggle={toggleTheme} />

//               <button
//                 onClick={() => onNavigate('group-settings')}
//                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
//                 title="Group Settings"
//                 aria-label="Group settings"
//               >
//                 <Users size={20} />
//               </button>

//               <button
//                 onClick={() => onNavigate('settings')}
//                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
//                 title="Settings"
//                 aria-label="Settings"
//               >
//                 <SettingsIcon size={20} />
//               </button>

//               <button
//                 onClick={handleLogout}
//                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
//                 title="Logout"
//                 aria-label="Logout"
//               >
//                 <LogOut size={20} />
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2 animate-in fade-in slide-in-from-top-2">
//               <button
//                 onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
//                 className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
//               </button>
//               <button
//                 onClick={() => { onNavigate('group-settings'); setIsMobileMenuOpen(false); }}
//                 className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 👥 Group Settings
//               </button>
//               <button
//                 onClick={() => { onNavigate('settings'); setIsMobileMenuOpen(false); }}
//                 className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//               >
//                 ⚙️ Settings
//               </button>
//               <button
//                 onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
//                 className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </ResponsiveContainer>

//         {/* Group Switcher */}
//         {userGroups?.length > 0 && (
//           <div className="border-t border-gray-200 dark:border-gray-800">
//             <ResponsiveContainer className="py-2">
//               <GroupSwitcher
//                 groups={userGroups}
//                 activeGroupId={activeGroup?.id}
//                 onGroupChange={onGroupSwitch}
//               />
//             </ResponsiveContainer>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="flex-1">
//         <ResponsiveContainer className="py-6">
//           {/* On This Day Section */}
//           {onThisDayPhoto && (
//             <div className="mb-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg animate-in fade-in scale-in duration-500">
//               <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">📅 On This Day</h2>
//               <p className="text-xs text-gray-600 dark:text-gray-400">
//                 From {onThisDayPhoto.createdAtYear || new Date(onThisDayPhoto.createdAt?.toDate?.()).getFullYear()}
//               </p>
//             </div>
//           )}

//           {/* Today's Moments Header */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//               Today's Moments in "{activeGroup?.groupName || 'Loading...'}"
//             </h2>
//             <button
//               onClick={() => setIsUploadModalOpen(true)}
//               className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center flex-shrink-0 hover:scale-110"
//               aria-label="Upload photo"
//             >
//               <Plus size={24} />
//             </button>
//           </div>

//           {/* Error State */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
//               <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <div className="loading-dots text-blue-400">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           ) : photos && photos.length > 0 ? (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
//               {photos.map((photo) => (
//                 <PhotoCard
//                   key={photo.id}
//                   photo={photo}
//                   onPhotoSelect={handlePhotoSelect}
//                   currentUserId={user?.uid}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20">
//               📸 No photos yet
//             </div>
//           )}

//         </ResponsiveContainer>
//       </main>

//       {/* Bottom Navigation */}
//       <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40">
//         <ResponsiveContainer>
//           <div className="flex items-center justify-around py-2">
//             <button
//               onClick={() => onNavigate('dashboard')}
//               className="flex flex-col items-center gap-1 px-3 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//               aria-label="Home"
//             >
//               <Home size={24} />
//               <span className="text-xs font-medium hidden sm:inline">Home</span>
//             </button>
//             <button
//               onClick={() => onNavigate('gallery')}
//               className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//               aria-label="Gallery"
//             >
//               <Grid size={24} />
//               <span className="text-xs font-medium hidden sm:inline">Gallery</span>
//             </button>
//             <button
//               onClick={() => onNavigate('profile')}
//               className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//               aria-label="Profile"
//             >
//               <User size={24} />
//               <span className="text-xs font-medium hidden sm:inline">Profile</span>
//             </button>
//             <button
//               onClick={() => onNavigate('settings')}
//               className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
//               aria-label="Settings"
//             >
//               <SettingsIcon size={24} />
//               <span className="text-xs font-medium hidden sm:inline">Settings</span>
//             </button>
//           </div>
//         </ResponsiveContainer>
//       </nav>

//       {/* Upload Modal */}
//       {isUploadModalOpen && (
//         <UploadPhotoModal
//           groupId={activeGroup?.id}
//           onClose={() => setIsUploadModalOpen(false)}
//           onSuccess={handleUploadSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default DashboardPage;
import { useState, useEffect, useCallback } from 'react';
import { Home, Grid, User, Settings as SettingsIcon, Plus, LogOut, Users, Menu, X } from 'lucide-react';
import PhotoCard from '../components/ui/PhotoCard';
import UploadPhotoModal from '../components/domain/UploadPhotoModal';
import GroupSwitcher from '../components/domain/GroupSwitcher';
import ThemeToggle from '../components/ui/ThemeToggle';
import ResponsiveContainer from '../components/ui/ResponsiveContainer';
import useThemePersist from '../hooks/useThemePersist';
import { getPhotosForGroup, getOnThisDayPhoto } from '../api/firestore';
import { logOut } from '../api/auth';
import { CameraDoodle, StarDoodle, HeartDoodle, SparklesDoodle, BlobDoodle, SquiggleDoodle } from '../components/ui/Doodles';

const DashboardPage = ({
  user,
  activeGroup,
  userGroups,
  onNavigate,
  onPhotoSelect,
  onGroupSwitch,
  onLogoClick
}) => {
  const { theme, toggleTheme } = useThemePersist();
  const [photos, setPhotos] = useState([]);
  const [onThisDayPhoto, setOnThisDayPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async () => {
    if (!activeGroup?.id) {
      setPhotos([]);
      setOnThisDayPhoto(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const [fetchedPhotos, todayPhoto] = await Promise.all([
        getPhotosForGroup(activeGroup.id),
        getOnThisDayPhoto(activeGroup.id),
      ]);

      setPhotos(Array.isArray(fetchedPhotos) ? fetchedPhotos : []);
      setOnThisDayPhoto(todayPhoto || null);
    } catch (err) {
      console.error('Failed to fetch photos:', err);
      setError('Failed to load photos. Please try again.');
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [activeGroup?.id]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleUploadSuccess = useCallback(() => {
    setIsUploadModalOpen(false);
    fetchPhotos();
  }, [fetchPhotos]);

  const handleLogout = useCallback(async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  }, []);

  const handlePhotoSelect = useCallback((photoId) => {
    onPhotoSelect?.(photoId);
  }, [onPhotoSelect]);

  return (
    <div className={`min-h-screen pb-24 ${theme === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      {/* Artistic Doodles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 opacity-30">
          <BlobDoodle color="#93c5fd" />
        </div>
        <div className="absolute bottom-32 right-10 opacity-25">
          <BlobDoodle color="#f9a8d4" />
        </div>

        <div className="absolute top-40 right-12 opacity-40 hidden lg:block animate-pulse" style={{ animationDuration: '4s' }}>
          <SquiggleDoodle className="text-blue-400 dark:text-blue-500" />
        </div>

        <div className="absolute top-1/2 left-8 opacity-35 hidden xl:block transform -translate-y-1/2">
          <HeartDoodle className="text-pink-400 dark:text-pink-500" size={80} />
        </div>

        <div className="absolute top-2/3 right-16 opacity-40 animate-pulse" style={{ animationDuration: '3s' }}>
          <StarDoodle className="text-yellow-400 dark:text-yellow-500" size={50} />
        </div>

        <div className="absolute top-1/4 left-12 opacity-30 hidden lg:block">
          <CameraDoodle className="text-indigo-400 dark:text-indigo-500" size={90} />
        </div>

        <div className="absolute top-1/3 right-1/4 opacity-40 animate-pulse" style={{ animationDuration: '2s' }}>
          <SparklesDoodle className="text-purple-400 dark:text-purple-500" size={60} />
        </div>
        
        <div className="absolute bottom-1/3 left-1/4 opacity-35 hidden md:block">
          <StarDoodle className="text-blue-300 dark:text-blue-600" size={35} />
        </div>
        
        <div className="absolute top-1/2 right-20 opacity-30 hidden lg:block">
          <SparklesDoodle className="text-pink-300 dark:text-pink-600" size={40} />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <ResponsiveContainer>
          {/* Main header row with Logo, GroupSwitcher, and Actions */}
          <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={onLogoClick}
                className="flex-shrink-0 p-2 hover:scale-110 transition-transform duration-200"
                aria-label="MomentsHub home"
              >
                <Home size={24} className="text-blue-400" />
              </button>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white hidden sm:block whitespace-nowrap">
                MomentsHub
              </h1>
            </div>

            {/* Group Switcher - Center of header - FIXED */}
            {userGroups && Array.isArray(userGroups) && userGroups.length > 0 && (
              <div className="flex-1 flex justify-center px-2 min-w-0">
                <GroupSwitcher
                  userGroups={userGroups}
                  activeGroup={activeGroup}
                  onGroupSwitch={onGroupSwitch}
                  onNavigate={onNavigate}
                />
              </div>
            )}

            {/* Desktop Actions - Right side */}
            <div className="hidden md:flex items-center gap-1 flex-shrink-0">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />

              <button
                onClick={() => onNavigate('group-settings')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                title="Group Settings"
                aria-label="Group settings"
              >
                <Users size={20} />
              </button>

              <button
                onClick={() => onNavigate('settings')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                title="Settings"
                aria-label="Settings"
              >
                <SettingsIcon size={20} />
              </button>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mb-3 pb-3 border-t border-gray-200 dark:border-gray-800 space-y-2 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
              <button
                onClick={() => { onNavigate('group-settings'); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                👥 Group Settings
              </button>
              <button
                onClick={() => { onNavigate('settings'); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </ResponsiveContainer>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-20">
        <ResponsiveContainer className="py-6">
          {onThisDayPhoto && (
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg animate-in fade-in scale-in duration-500">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">📅 On This Day</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                From {onThisDayPhoto.createdAtYear || new Date(onThisDayPhoto.createdAt?.toDate?.()).getFullYear()}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Today's Moments in "{activeGroup?.groupName || 'Select a group'}"
            </h2>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              disabled={!activeGroup?.id}
              className="w-12 h-12 bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center flex-shrink-0 hover:scale-110 active:scale-95"
              aria-label="Upload photo"
              type="button"
            >
              <Plus size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="loading-dots text-blue-400">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : photos && photos.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {photos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onPhotoSelect={handlePhotoSelect}
                  currentUserId={user?.uid}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              📸 No photos yet
            </div>
          )}
        </ResponsiveContainer>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <ResponsiveContainer>
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex flex-col items-center gap-1 px-3 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              aria-label="Home"
            >
              <Home size={24} />
              <span className="text-xs font-medium hidden sm:inline">Home</span>
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              aria-label="Gallery"
            >
              <Grid size={24} />
              <span className="text-xs font-medium hidden sm:inline">Gallery</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              aria-label="Profile"
            >
              <User size={24} />
              <span className="text-xs font-medium hidden sm:inline">Profile</span>
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="flex flex-col items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <SettingsIcon size={24} />
              <span className="text-xs font-medium hidden sm:inline">Settings</span>
            </button>
          </div>
        </ResponsiveContainer>
      </nav>

      {/* Upload Modal */}
      {isUploadModalOpen && activeGroup?.id && (
        <UploadPhotoModal
          isOpen={isUploadModalOpen}
          groupId={activeGroup.id}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default DashboardPage;