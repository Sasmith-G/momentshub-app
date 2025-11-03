// // src/App.jsx
// import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import { getUserGroups } from './api/firestore';
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import PhotoDetailPage from './pages/PhotoDetailPage';
// import GroupGalleryPage from './pages/GroupGalleryPage';
// import UserProfilePage from './pages/UserProfilePage';
// import GetStartedPage from './pages/GetStartedPage';
// import SettingsPage from './pages/SettingsPage';
// import GroupSettingsPage from './pages/GroupSettingsPage'; // NEW
// import './index.css';

// function App() {
//   const [user, setUser] = useState(null);
//   const [userGroups, setUserGroups] = useState([]);
//   const [activeGroup, setActiveGroup] = useState(null); // NEW - Active group state
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [selectedPhotoId, setSelectedPhotoId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const groups = await getUserGroups();
//         setUserGroups(groups);
//         setActiveGroup(groups[0] || null); // Set first group as active
//         setCurrentPage('dashboard');
//       } else {
//         setUserGroups([]);
//         setActiveGroup(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const refreshUserGroups = async () => {
//     setLoading(true);
//     const groups = await getUserGroups();
//     setUserGroups(groups);
    
//     // Keep the same active group if it still exists
//     if (activeGroup) {
//       const stillExists = groups.find(g => g.id === activeGroup.id);
//       setActiveGroup(stillExists || groups[0] || null);
//     } else {
//       setActiveGroup(groups[0] || null);
//     }
    
//     setLoading(false);
//   };

//   const handleGroupSwitch = (group) => {
//     setActiveGroup(group);
//     setCurrentPage('dashboard'); // Return to dashboard when switching groups
//   };

//   const handleNavigate = (page, photoId = null) => {
//     setCurrentPage(page);
//     if (photoId) setSelectedPhotoId(photoId);
//   };

//   const handlePhotoSelect = (photoId) => {
//     setSelectedPhotoId(photoId);
//     setCurrentPage('photo-detail');
//   };

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="min-h-screen bg-app-background flex items-center justify-center">
//           <div className="text-text-primary text-lg">Loading MomentsHub...</div>
//         </div>
//       );
//     }

//     if (!user) {
//       return <LoginPage />;
//     }

//     if (userGroups.length === 0) {
//       return <GetStartedPage onGroupJoined={refreshUserGroups} />;
//     }

//     // Pass activeGroup and related handlers to all pages
//     switch (currentPage) {
//       case 'dashboard':
//         return (
//           <DashboardPage
//             user={user}
//             activeGroup={activeGroup}
//             userGroups={userGroups}
//             onNavigate={handleNavigate}
//             onPhotoSelect={handlePhotoSelect}
//             onGroupSwitch={handleGroupSwitch}
//           />
//         );
//       case 'photo-detail':
//         return (
//           <PhotoDetailPage
//             photoId={selectedPhotoId}
//             onNavigate={handleNavigate}
//             user={user}
//           />
//         );
//       case 'gallery':
//         return (
//           <GroupGalleryPage
//             activeGroup={activeGroup}
//             onNavigate={handleNavigate}
//             onPhotoSelect={handlePhotoSelect}
//           />
//         );
//       case 'profile':
//         return <UserProfilePage user={user} onNavigate={handleNavigate} />;
//       case 'settings':
//         return <SettingsPage onNavigate={handleNavigate} />;
//       case 'group-settings':
//         return (
//           <GroupSettingsPage
//             activeGroup={activeGroup}
//             user={user}
//             onNavigate={handleNavigate}
//             onGroupUpdated={refreshUserGroups}
//           />
//         );
//       case 'get-started':
//         return <GetStartedPage onGroupJoined={refreshUserGroups} />;
//       default:
//         return (
//           <DashboardPage
//             user={user}
//             activeGroup={activeGroup}
//             userGroups={userGroups}
//             onNavigate={handleNavigate}
//             onPhotoSelect={handlePhotoSelect}
//             onGroupSwitch={handleGroupSwitch}
//           />
//         );
//     }
//   };

//   return <div className="App">{renderContent()}</div>;
// }

// export default App;
/// src/App.jsx
// import { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import { getUserGroups } from './api/firestore';
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
// import PhotoDetailPage from './pages/PhotoDetailPage';
// import GroupGalleryPage from './pages/GroupGalleryPage';
// import UserProfilePage from './pages/UserProfilePage';
// import GetStartedPage from './pages/GetStartedPage';
// import SettingsPage from './pages/SettingsPage';
// import GroupSettingsPage from './pages/GroupSettingsPage';
// import { createSparkle } from './utils/sparkles';
// import './index.css';

// function App() {
//   const [user, setUser] = useState(null);
//   const [userGroups, setUserGroups] = useState([]);
//   const [activeGroup, setActiveGroup] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [selectedPhotoId, setSelectedPhotoId] = useState(null);

//   // Double-click sparkle effect
//   useEffect(() => {
//     let clickCount = 0;
//     let clickTimer;

//     const handleDoubleClick = (e) => {
//       clickCount++;
      
//       if (clickCount === 1) {
//         clickTimer = setTimeout(() => {
//           clickCount = 0;
//         }, 300);
//       } else if (clickCount === 2) {
//         clearTimeout(clickTimer);
//         clickCount = 0;
//         createSparkle(e.clientX, e.clientY);
//       }
//     };

//     document.addEventListener('click', handleDoubleClick);

//     return () => {
//       document.removeEventListener('click', handleDoubleClick);
//       if (clickTimer) clearTimeout(clickTimer);
//     };
//   }, []);

//   // Konami code easter egg
//   useEffect(() => {
//     const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
//     let konamiIndex = 0;

//     const handleKonami = (e) => {
//       if (e.key === konamiCode[konamiIndex]) {
//         konamiIndex++;
//         if (konamiIndex === konamiCode.length) {
//           import('./utils/sparkles').then(({ createConfetti }) => {
//             createConfetti();
//           });
//           alert('🎉 Konami Code Activated! Secret Developer Badge Unlocked!');
//           konamiIndex = 0;
//         }
//       } else {
//         konamiIndex = 0;
//       }
//     };

//     document.addEventListener('keydown', handleKonami);
//     return () => document.removeEventListener('keydown', handleKonami);
//   }, []);

//   // Logo click handler for party mode
//   const handleLogoClick = () => {
//     const partyMode = localStorage.getItem('partyMode') === 'true';
//     if (!partyMode) {
//       localStorage.setItem('partyMode', 'true');
//       document.documentElement.classList.add('party-mode');
      
//       import('./utils/sparkles').then(({ createConfetti }) => {
//         createConfetti();
//       });

//       // Party mode lasts 30 seconds
//       setTimeout(() => {
//         localStorage.setItem('partyMode', 'false');
//         document.documentElement.classList.remove('party-mode');
//       }, 30000);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const groups = await getUserGroups();
//         setUserGroups(groups);
//         setActiveGroup(groups[0] || null);
//         setCurrentPage('dashboard');
//       } else {
//         setUserGroups([]);
//         setActiveGroup(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const refreshUserGroups = async () => {
//     setLoading(true);
//     const groups = await getUserGroups();
//     setUserGroups(groups);
    
//     if (activeGroup) {
//       const stillExists = groups.find(g => g.id === activeGroup.id);
//       setActiveGroup(stillExists || groups[0] || null);
//     } else {
//       setActiveGroup(groups[0] || null);
//     }
    
//     setLoading(false);
//   };

//   const handleGroupSwitch = (group) => {
//     setActiveGroup(group);
//     setCurrentPage('dashboard');
//   };

//   const handleNavigate = (page, photoId = null) => {
//     setCurrentPage(page);
//     if (photoId) setSelectedPhotoId(photoId);
//   };

//   const handlePhotoSelect = (photoId) => {
//     setSelectedPhotoId(photoId);
//     setCurrentPage('photo-detail');
//   };

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
//           <div className="loading-dots">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//       );
//     }

//     if (!user) {
//       return <LoginPage />;
//     }

//     if (userGroups.length === 0) {
//       return <GetStartedPage onGroupJoined={refreshUserGroups} />;
//     }

//     switch (currentPage) {
//       case 'dashboard':
//         return (
//           <DashboardPage
//             user={user}
//             activeGroup={activeGroup}
//             userGroups={userGroups}
//             onNavigate={handleNavigate}
//             onPhotoSelect={handlePhotoSelect}
//             onGroupSwitch={handleGroupSwitch}
//             onLogoClick={handleLogoClick}
//           />
//         );
//       case 'photo-detail':
//         return (
//           <PhotoDetailPage
//             photoId={selectedPhotoId}
//             onNavigate={handleNavigate}
//             user={user}
//           />
//         );
//       case 'gallery':
//         return (
//           <GroupGalleryPage
//             activeGroup={activeGroup}
//             onNavigate={handleNavigate}
//             onPhotoSelect={handlePhotoSelect}
//           />
//         );
//       case 'profile':
//         return <UserProfilePage user={user} onNavigate={handleNavigate} />;
//       case 'settings':
//         return <SettingsPage onNavigate={handleNavigate} />;
//       case 'group-settings':
//         return (
//           <GroupSettingsPage
//             activeGroup={activeGroup}
//             user={user}
//             onNavigate={handleNavigate}
//             onGroupUpdated={refreshUserGroups}
//           />
//         );
//       case 'get-started':
//         return <GetStartedPage onGroupJoined={refreshUserGroups} />;
//       default:
//         return (
//           <DashboardPage
//             user={user}
//             activeGroup={activeGroup}
//             userGroups={userGroups}
//             onNavigate={handleNavigate}
//             onPhotoSelect={handlePhotoSelect}
//             onGroupSwitch={handleGroupSwitch}
//             onLogoClick={handleLogoClick}
//           />
//         );
//     }
//   };

//   return <div className="App">{renderContent()}</div>;
// }

// export default App;

/// src/App.jsx
/// src/App.jsx
/// src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUserGroups } from './api/firestore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PhotoDetailPage from './pages/PhotoDetailPage';
import GroupGalleryPage from './pages/GroupGalleryPage';
import UserProfilePage from './pages/UserProfilePage';
import GetStartedPage from './pages/GetStartedPage';
import SettingsPage from './pages/SettingsPage';
import GroupSettingsPage from './pages/GroupSettingsPage';
import NotificationHost from './components/ui/NotificationHost'; // 1. Import
import { createSparkle } from './utils/sparkles';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);

  // Double-click sparkle effect
  useEffect(() => {
    let clickCount = 0;
    let clickTimer;

    const handleDoubleClick = (e) => {
      clickCount++;
      
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 300);
      } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        clickCount = 0;
        createSparkle(e.clientX, e.clientY);
      }
    };

    document.addEventListener('click', handleDoubleClick);

    return () => {
      document.removeEventListener('click', handleDoubleClick);
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKonami = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          import('./utils/sparkles').then(({ createConfetti }) => {
            createConfetti();
          });
          alert('🎉 Konami Code Activated! Secret Developer Badge Unlocked!');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    document.addEventListener('keydown', handleKonami);
    return () => document.removeEventListener('keydown', handleKonami);
  }, []);

  // Logo click handler for party mode
  const handleLogoClick = () => {
    const partyMode = localStorage.getItem('partyMode') === 'true';
    if (!partyMode) {
      localStorage.setItem('partyMode', 'true');
      document.documentElement.classList.add('party-mode');
      
      import('./utils/sparkles').then(({ createConfetti }) => {
        createConfetti();
      });

      // Party mode lasts 30 seconds
      setTimeout(() => {
        localStorage.setItem('partyMode', 'false');
        document.documentElement.classList.remove('party-mode');
      }, 30000);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const groups = await getUserGroups();
        setUserGroups(groups);
        setActiveGroup(groups[0] || null);
        setCurrentPage('dashboard');
      } else {
        setUserGroups([]);
        setActiveGroup(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserGroups = async () => {
    setLoading(true);
    const groups = await getUserGroups();
    setUserGroups(groups);
    
    if (activeGroup) {
      const stillExists = groups.find(g => g.id === activeGroup.id);
      setActiveGroup(stillExists || groups[0] || null);
    } else {
      setActiveGroup(groups[0] || null);
    }
    
    setLoading(false);
  };

  const handleGroupSwitch = (group) => {
    setActiveGroup(group);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page, photoId = null) => {
    setCurrentPage(page);
    if (photoId) setSelectedPhotoId(photoId);
  };

  const handlePhotoSelect = useCallback((photoId) => {
    setSelectedPhotoId(photoId);
    setCurrentPage('photo-detail');
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E3F2FD' }}>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      );
    }

    if (!user) {
      return <LoginPage />;
    }
    
    // User is logged in, but has no groups.
    if (userGroups.length === 0) {
      return <GetStartedPage onGroupJoined={refreshUserGroups} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            user={user}
            activeGroup={activeGroup}
            userGroups={userGroups}
            onNavigate={handleNavigate}
            onPhotoSelect={handlePhotoSelect}
            onGroupSwitch={handleGroupSwitch}
            onLogoClick={handleLogoClick}
          />
        );
      case 'photo-detail':
        return (
          <PhotoDetailPage
            photoId={selectedPhotoId}
            onNavigate={handleNavigate}
            user={user}
          />
        );
      case 'gallery':
        return (
          <GroupGalleryPage
            activeGroup={activeGroup}
            onNavigate={handleNavigate}
            onPhotoSelect={handlePhotoSelect}
          />
        );
      case 'profile':
        return <UserProfilePage user={user} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      case 'group-settings':
        return (
          <GroupSettingsPage
            activeGroup={activeGroup}
            user={user}
            onNavigate={handleNavigate}
            onGroupUpdated={refreshUserGroups}
          />
        );
      case 'create-group':
      case 'join-group':
      case 'get-started':
        return (
          <GetStartedPage 
            onGroupJoined={refreshUserGroups} 
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <DashboardPage
            user={user}
            activeGroup={activeGroup}
            userGroups={userGroups}
            onNavigate={handleNavigate}
            onPhotoSelect={handlePhotoSelect}
            onGroupSwitch={handleGroupSwitch}
            onLogoClick={handleLogoClick}
          />
        );
    }
  };

  return (
    <div className="App">
      <NotificationHost /> {/* 2. Render the host here */}
      {renderContent()}
    </div>
  );
}

export default App;