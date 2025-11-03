// // src/pages/GroupGalleryPage.jsx
// import { useState, useEffect } from 'react';
// import { Camera, ArrowLeft, Filter, User } from 'lucide-react';
// import { getPhotosForGroup } from '../api/firestore';
// import PhotoThumbnail from '../components/ui/PhotoThumbnail';
// import { logOut } from '../api/auth';

// // --- Accept userGroups prop ---
// const GroupGalleryPage = ({ onNavigate, onPhotoSelect, userGroups }) => {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- Use the prop to find the active group ---
//   const activeGroup = userGroups.length > 0 ? userGroups[0] : null;
//   const groupId = activeGroup?.id;
//   const groupName = activeGroup?.groupName || "Gallery";
  
//   useEffect(() => {
//     const fetchPhotos = async () => {
//       if (!groupId) {
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       // --- Use the dynamic groupId ---
//       const fetchedPhotos = await getPhotosForGroup(groupId);
//       setPhotos(fetchedPhotos);
//       setLoading(false);
//     };
//     fetchPhotos();
//   }, [groupId]); // Re-run if the groupId changes

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header (no change) */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
//         {/* ... (header JSX) ... */}
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-6 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             {/* --- Use dynamic groupName --- */}
//             <h1 className="text-3xl font-bold text-text-primary">{groupName}</h1>
//             <p className="text-gray-500">All shared memories</p>
//           </div>
//           <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border">
//             {/* ... (filter dropdown) ... */}
//           </div>
//         </div>

//         {loading ? (
//           <p>Loading gallery...</p>
//         ) : photos.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//             {photos.map(photo => (
//               <PhotoThumbnail key={photo.id} photo={photo} onClick={() => onPhotoSelect(photo.id)} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <h3 className="text-xl font-semibold">The Gallery is Empty</h3>
//             <p className="text-gray-500 mt-2">Be the first to upload a photo to this group!</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default GroupGalleryPage;

// import { useState, useEffect } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import PhotoThumbnail from '../components/ui/PhotoThumbnail';
// // import { getPhotos } from '../api/firestore';
// import { getPhotosForGroup } from '../api/firestore';

// const GroupGalleryPage = ({ activeGroup, onNavigate, onPhotoSelect }) => {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       if (!activeGroup) return;
      
//       setLoading(true);
//       // const fetchedPhotos = await getPhotos(activeGroup.id); // Use activeGroup
//       const fetchedPhotos = await getPhotosForGroup(activeGroup.id);
//       setPhotos(fetchedPhotos);
//       setLoading(false);
//     };

//     fetchPhotos();
//   }, [activeGroup]); // Refetch when activeGroup changes

//   return (
//     <div className="min-h-screen bg-app-background pb-20">
//       {/* Header */}
//       <header className="bg-card-background border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
//         <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
//           <button
//             onClick={() => onNavigate('dashboard')}
//             className="text-text-secondary hover:text-primary-action transition-colors"
//           >
//             <ArrowLeft size={24} />
//           </button>
//           <h1 className="text-xl font-bold text-text-primary">
//             {activeGroup?.groupName} Gallery
//           </h1>
//         </div>
//       </header>

//       {/* Gallery Grid */}
//       <main className="max-w-4xl mx-auto px-4 py-6">
//         {loading ? (
//           <div className="text-center py-12 text-text-secondary">Loading gallery...</div>
//         ) : photos.length > 0 ? (
//           <div className="grid grid-cols-3 gap-2">
//             {photos.map((photo) => (
//               <PhotoThumbnail
//                 key={photo.id}
//                 photo={photo}
//                 onClick={() => onPhotoSelect(photo.id)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🖼️</div>
//             <p className="text-text-secondary">No photos yet in this group</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default GroupGalleryPage;

import { useState, useEffect } from 'react';
import { Home, Grid, User, Settings as SettingsIcon, Menu, X } from 'lucide-react';
import PhotoThumbnail from '../components/ui/PhotoThumbnail';
import ResponsiveContainer from '../components/ui/ResponsiveContainer';
import useThemePersist from '../hooks/useThemePersist';
import ThemeToggle from '../components/ui/ThemeToggle';
import { getPhotosForGroup } from '../api/firestore';

const GroupGalleryPage = ({ user, activeGroup, onNavigate }) => {
  const { theme, toggleTheme } = useThemePersist();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (activeGroup?.id) {
        try {
          const fetchedPhotos = await getPhotosForGroup(activeGroup.id);
          setPhotos(fetchedPhotos || []);
        } catch (error) {
          console.error('Failed to fetch photos:', error);
        }
      }
      setLoading(false);
    };

    fetchPhotos();
  }, [activeGroup?.id]);

  return (
    <div className={`min-h-screen pb-24 ${theme === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
        <ResponsiveContainer className="py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gallery</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </ResponsiveContainer>
      </header>

      {/* Main Content */}
      <main>
        <ResponsiveContainer className="py-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="loading-dots text-blue-400">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
              {photos.map((photo, index) => (
                <div key={photo.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <PhotoThumbnail
                    photo={photo}
                    onClick={() => onNavigate('photo-detail', photo.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <Grid size={48} className="mx-auto mb-4 opacity-50" />
              <p>No photos in gallery yet</p>
            </div>
          )}
        </ResponsiveContainer>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40">
        <ResponsiveContainer>
          <div className="flex items-center justify-around py-2">
            <button onClick={() => onNavigate('dashboard')} className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <Home size={24} />
            </button>
            <button onClick={() => onNavigate('gallery')} className="p-3 text-blue-500">
              <Grid size={24} />
            </button>
            <button onClick={() => onNavigate('profile')} className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <User size={24} />
            </button>
            <button onClick={() => onNavigate('settings')} className="p-3 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
              <SettingsIcon size={24} />
            </button>
          </div>
        </ResponsiveContainer>
      </nav>
    </div>
  );
};

export default GroupGalleryPage;
