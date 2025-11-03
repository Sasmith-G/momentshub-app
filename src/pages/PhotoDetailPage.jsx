// import { useState, useEffect, useRef } from 'react';
// import { Camera, ArrowLeft, Heart, MessageCircle, Share, Send, User } from 'lucide-react';
// import { logOut } from '../api/auth';
// import {
//   getPhotoById,
//   addCommentToPhoto,
//   getCommentsForPhoto,
//   addReactionToPhoto,
//   getCurrentUserReaction
// } from '../api/firestore';

// const PhotoDetailPage = ({ onNavigate, photoId }) => {
//   const [comment, setComment] = useState('');
//   const [reactions, setReactions] = useState([]);
//   const photoRef = useRef(null);

//   // --- State for Live Data ---
//   const [photo, setPhoto] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [currentUserReaction, setCurrentUserReaction] = useState(null); // <-- New state for user's reaction

//   const emojiOptions = ['❤️', '😂', '🎉', '🙏', '✨'];

//   // --- Data Fetching Function ---
//   const fetchPhotoAndComments = async () => {
//     if (!photoId) return;
//     setLoading(true);
//     const photoData = await getPhotoById(photoId);
//     const commentsData = await getCommentsForPhoto(photoId);
//     setPhoto(photoData);
//     setComments(commentsData);
//     setLoading(false);
//   };

//   // --- Fetch data on component load ---
//   useEffect(() => {
//     fetchPhotoAndComments();
//   }, [photoId]);

//   // --- Comments (FR2.4) ---
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment.trim() || !photoId) return;

//     setIsSubmitting(true);
//     const success = await addCommentToPhoto(photoId, comment);
//     if (success) {
//       setComment(''); // Clear input
//       fetchPhotoAndComments(); // Refresh comments list
//     } else {
//       alert("Failed to post comment.");
//     }
//     setIsSubmitting(false);
//   };

//   // --- Reactions (FR2.5) ---
//   const handleEmojiReaction = async (emoji, event) => {
//     if (!photoRef.current) return;
//     const rect = photoRef.current.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     // Trigger animation
//     const newReactions = Array.from({ length: 15 }, (_, i) => ({
//       id: Date.now() + i,
//       emoji,
//       x: x + (Math.random() - 0.5) * 100,
//       y: y + (Math.random() - 0.5) * 50
//     }));
//     setReactions(prev => [...prev, ...newReactions]);

//     // Send to backend
//     const success = await addReactionToPhoto(photoId, emoji);
//     if (success) {
//       // Refresh the photo data to get new counts
//       const updatedPhoto = await getPhotoById(photoId);
//       setPhoto(updatedPhoto);
//     } else {
//       console.error("Failed to add reaction");
//     }
//   };
//   const handleHeartClick = () => {
//     // This toggles the '❤️' reaction.
//     // Our `addReactionToPhoto` function already handles the toggle logic.
//     handleEmojiReaction('❤️', null); // Pass null for event
//   };

//   // Helper to remove animated emoji from DOM
//   const removeReaction = (id) => {
//     setReactions(prev => prev.filter(r => r.id !== id));
//   };

//   // --- Loading and Error States ---
//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading moment...</div>;
//   }

//   if (!photo) {
//     return <div className="flex items-center justify-center h-screen">Photo not found.</div>;
//   }

//   // --- Helper to calculate total likes ---
//   const totalLikes = photo.reactionCounts
//     ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0)
//     : 0;
//   // --- NEW: Check if user has liked with a heart ---
//   const hasUserLiked = currentUserReaction && currentUserReaction.emoji === '❤️';

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button onClick={() => onNavigate('dashboard')} className="text-gray-600 hover:text-primary-action">
//               <ArrowLeft size={24} />
//             </button>
//             <div className="flex items-center gap-3">
//               <Camera size={28} className="text-primary-action" />
//               <h2 className="text-lg font-bold text-text-primary">MomentsHub</h2>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button onClick={() => onNavigate('profile')} title="Profile" className="text-gray-600 hover:text-primary-action">
//               <User size={24} />
//             </button>
//             <button onClick={logOut} className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-5xl mx-auto px-6 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//           {/* Left Column: Photo & Reactions */}
//           <div className="lg:col-span-2 sticky top-28">
//             <div ref={photoRef} className="relative w-full rounded-xl overflow-hidden shadow-lg mb-4">
//               <img src={photo.imageUrl} alt={photo.caption} className="w-full h-auto" />

//               {/* Falling Emojis */}
//               {reactions.map((reaction) => (
//                 <div
//                   key={reaction.id}
//                   onAnimationEnd={() => removeReaction(reaction.id)}
//                   className="absolute text-3xl animate-[fallReaction_2s_ease-out_forwards]"
//                   style={{
//                     left: `${reaction.x}px`,
//                     top: `${reaction.y}px`,
//                     '--rotation': `${(Math.random() - 0.5) * 90}deg`
//                   }}
//                 >
//                   {reaction.emoji}
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-3 justify-center p-3 bg-white rounded-full shadow-md w-fit mx-auto">
//               {emojiOptions.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={(e) => handleEmojiReaction(emoji, e)}
//                   className="text-3xl hover:scale-125 transition-transform"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Details & Comments */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(46,46,46,0.08)] p-6">
//               {/* --- Live User Data --- */}
//               <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
//                 <div className="w-10 h-10 bg-accent-lavender rounded-full flex-shrink-0 flex items-center justify-center">
//                   <User size={20} className="text-primary-action" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">{photo.uploaderName}</p>
//                   <p className="text-xs text-gray-500">{new Date(photo.createdAt?.toDate()).toLocaleString()}</p>
//                 </div>
//               </div>
//               {/* --- Live Caption --- */}
//               <p className="py-4 text-sm">{photo.caption}</p>

//               {/* --- Live Counts ---
//               <div className="flex items-center gap-4 py-3 border-y border-gray-200">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Heart size={20} /> <span className="text-sm font-medium">{totalLikes}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MessageCircle size={20} /> <span className="text-sm font-medium">{photo.commentsCount || 0}</span>
//                 </div>
//                 <button className="flex items-center gap-2 text-gray-600">
//                   <Share size={20} />
//                 </button>
//               </div> */}
//               {/* --- MODIFIED: Interactive Counts --- */}
//               <div className="flex items-center gap-4 py-3 border-y border-gray-200">
//                 <button
//                   onClick={handleHeartClick}
//                   className={`flex items-center gap-2 transition-colors ${hasUserLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
//                     }`}
//                 >
//                   {hasUserLiked ? <HeartFilled size={20} fill="currentColor" /> : <Heart size={20} />}
//                   <span className="text-sm font-medium">{totalLikes}</span>
//                 </button>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MessageCircle size={20} /> <span className="text-sm font-medium">{photo.commentsCount || 0}</span>
//                 </div>
//                 <button className="flex items-center gap-2 text-gray-600">
//                   <Share size={20} />
//                 </button>
//               </div>

//               {/* --- Live Comments --- */}
//               <div className="py-4 space-y-4">
//                 <h4 className="font-semibold text-sm">Comments ({comments.length})</h4>
//                 {comments.map((c) => (
//                   <div key={c.id} className="flex gap-3">
//                     <div className="w-8 h-8 bg-accent-mint rounded-full flex-shrink-0 flex items-center justify-center">
//                       <User size={16} />
//                     </div>
//                     <div>
//                       <p className="text-xs">
//                         <span className="font-semibold">{c.uploaderName}</span>
//                         <span className="text-gray-500 ml-2">{new Date(c.createdAt?.toDate()).toLocaleTimeString()}</span>
//                       </p>
//                       <p className="text-sm">{c.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* --- Comment Form --- */}
//               <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-4 border-t border-gray-200">
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   className="flex-grow px-4 py-2 text-sm bg-gray-100 border-2 border-transparent rounded-full focus:outline-none focus:border-primary-action transition-colors"
//                 />
//                 <button
//                   type="submit"
//                   className="w-9 h-9 bg-primary-action text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50"
//                   disabled={!comment.trim() || isSubmitting}
//                 >
//                   <Send size={16} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PhotoDetailPage;
// import { useState, useEffect, useRef } from 'react';
// import { Camera, ArrowLeft, Heart, MessageCircle, Share, Send, User, Heart as HeartFilled } from 'lucide-react';
// import { logOut } from '../api/auth';
// import {
//   getPhotoById,
//   addCommentToPhoto,
//   getCommentsForPhoto,
//   addReactionToPhoto,
//   getCurrentUserReaction
// } from '../api/firestore';

// const PhotoDetailPage = ({ onNavigate, photoId }) => {
//   const [comment, setComment] = useState('');
//   const [reactions, setReactions] = useState([]);
//   const photoRef = useRef(null); // Ref is still used for the main content

//   // --- State for Live Data ---
//   const [photo, setPhoto] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [currentUserReaction, setCurrentUserReaction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const emojiOptions = ['❤️', '😂', '🎉', '🙏', '✨'];

//   // --- Data Fetching Function (no change) ---
//   const fetchPhotoAndComments = async () => {
//     if (!photoId) return;
//     setLoading(true);

//     const [photoData, commentsData, reactionData] = await Promise.all([
//       getPhotoById(photoId),
//       getCommentsForPhoto(photoId),
//       getCurrentUserReaction(photoId)
//     ]);

//     setPhoto(photoData);
//     setComments(commentsData);
//     setCurrentUserReaction(reactionData);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPhotoAndComments();
//   }, [photoId]);

//   // --- Comments (FR2.4) (no change) ---
//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment.trim() || !photoId) return;

//     setIsSubmitting(true);
//     const success = await addCommentToPhoto(photoId, comment);
//     if (success) {
//       setComment(''); 
//       fetchPhotoAndComments(); 
//     } else {
//       alert("Failed to post comment.");
//     }
//     setIsSubmitting(false);
//   };

//   /**
//    * --- MODIFIED: Full-screen & De-clustered Animation ---
//    */
//   const handleEmojiReaction = async (emoji) => {
//     // Generate 15 emojis
//     const newReactions = Array.from({ length: 15 }, (_, i) => ({
//       id: Date.now() + i,
//       emoji,
//       // Spread across the full width of the screen
//       x: Math.random() * window.innerWidth,
//       // Start just above the top of the screen
//       y: (Math.random() * -100) - 50,
//       // Add a random delay to stagger the fall
//       delay: Math.random() * 0.5, // 0 to 0.5 second delay
//       // Add random horizontal drift
//       drift: (Math.random() - 0.5) * 200 // -100px to +100px
//     }));

//     setReactions(prev => [...prev, ...newReactions]);

//     // Send to backend (no change here)
//     const success = await addReactionToPhoto(photoId, emoji);
//     if (success) {
//       const [updatedPhoto, updatedReaction] = await Promise.all([
//         getPhotoById(photoId),
//         getCurrentUserReaction(photoId)
//       ]);
//       setPhoto(updatedPhoto);
//       setCurrentUserReaction(updatedReaction);
//     } else {
//       console.error("Failed to add reaction");
//     }
//   };

//   // --- Click handler for the Heart icon (no change) ---
//   const handleHeartClick = () => {
//     handleEmojiReaction('❤️'); 
//   };

//   // Helper to remove animated emoji from DOM
//   const removeReaction = (id) => {
//     setReactions(prev => prev.filter(r => r.id !== id));
//   };

//   // --- Loading and Error States (no change) ---
//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading moment...</div>;
//   }
//   if (!photo) {
//     return <div className="flex items-center justify-center h-screen">Photo not found.</div>;
//   }

//   // --- Helpers (no change) ---
//   const totalLikes = photo.reactionCounts
//     ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0)
//     : 0;
//   const hasUserLiked = currentUserReaction && currentUserReaction.emoji === '❤️';

//   return (
//     <div className="min-h-screen bg-background relative"> 

//       {/* --- NEW: Full-screen Reaction Container --- */}
//       {/* This is now outside the main content, fixed to the viewport */}
//       <div className="fixed inset-0 pointer-events-none z-[100]">
//         {reactions.map((reaction) => (
//           <div
//             key={reaction.id}
//             onAnimationEnd={() => removeReaction(reaction.id)}
//             // Increased duration to 3s for a better effect
//             className="absolute text-3xl animate-[fallReaction_3s_ease-out_forwards]"
//             style={{
//               left: `${reaction.x}px`,
//               top: `${reaction.y}px`,
//               '--rotation': `${(Math.random() - 0.5) * 180}deg`, // More spin
//               '--drift': `${reaction.drift}px`, // Use drift variable
//               animationDelay: `${reaction.delay}s` // Use delay variable
//             }}
//           >
//             {reaction.emoji}
//           </div>
//         ))}
//       </div>

//       {/* Header (no change) */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <button onClick={() => onNavigate('dashboard')} className="text-gray-600 hover:text-primary-action">
//               <ArrowLeft size={24} />
//             </button>
//             <div className="flex items-center gap-3">
//               <Camera size={28} className="text-primary-action" />
//               <h2 className="text-lg font-bold text-text-primary">MomentsHub</h2>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button onClick={() => onNavigate('profile')} title="Profile" className="text-gray-600 hover:text-primary-action">
//               <User size={24} />
//             </button>
//             <button onClick={logOut} className="text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content (add relative z-10 to stay above bg but below emojis) */}
//       <main className="max-w-5xl mx-auto px-6 py-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//           {/* Left Column: Photo & Reactions */}
//           <div className="lg:col-span-2 sticky top-28">
//             <div ref={photoRef} className="relative w-full rounded-xl overflow-hidden shadow-lg mb-4">
//               <img src={photo.imageUrl} alt={photo.caption} className="w-full h-auto" />

//               {/* --- EMOJIS HAVE BEEN MOVED FROM HERE --- */}
//             </div>
//             {/* Emoji Picker (no change) */}
//             <div className="flex gap-3 justify-center p-3 bg-white rounded-full shadow-md w-fit mx-auto">
//               {emojiOptions.map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => handleEmojiReaction(emoji)}
//                   className={`text-3xl hover:scale-125 transition-transform ${
//                     currentUserReaction && currentUserReaction.emoji === emoji ? 'scale-125' : ''
//                   }`}
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right Column: Details & Comments (no change) */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(46,46,46,0.08)] p-6">
//               {/* --- Live User Data --- */}
//               <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
//                 <div className="w-10 h-10 bg-accent-lavender rounded-full flex-shrink-0 flex items-center justify-center">
//                   <User size={20} className="text-primary-action" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm">{photo.uploaderName}</p>
//                   <p className="text-xs text-gray-500">{new Date(photo.createdAt?.toDate()).toLocaleString()}</p>
//                 </div>
//               </div>
//               {/* --- Live Caption --- */}
//               <p className="py-4 text-sm">{photo.caption}</p>

//               {/* --- Interactive Counts --- */}
//               <div className="flex items-center gap-4 py-3 border-y border-gray-200">
//                 <button 
//                   onClick={handleHeartClick} 
//                   className={`flex items-center gap-2 transition-colors ${
//                     hasUserLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
//                   }`}
//                 >
//                   {hasUserLiked ? <HeartFilled size={20} fill="currentColor" /> : <Heart size={20} />} 
//                   <span className="text-sm font-medium">{totalLikes}</span>
//                 </button>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MessageCircle size={20} /> <span className="text-sm font-medium">{photo.commentsCount || 0}</span>
//                 </div>
//                 <button className="flex items-center gap-2 text-gray-600">
//                   <Share size={20} />
//                 </button>
//               </div>

//               {/* --- Live Comments --- */}
//               <div className="py-4 space-y-4">
//                 <h4 className="font-semibold text-sm">Comments ({comments.length})</h4>
//                 {comments.map((c) => (
//                   <div key={c.id} className="flex gap-3">
//                     <div className="w-8 h-8 bg-accent-mint rounded-full flex-shrink-0 flex items-center justify-center">
//                       <User size={16} />
//                     </div>
//                     <div>
//                       <p className="text-xs">
//                         <span className="font-semibold">{c.uploaderName}</span>
//                         <span className="text-gray-500 ml-2">{new Date(c.createdAt?.toDate()).toLocaleTimeString()}</span>
//                       </p>
//                       <p className="text-sm">{c.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* --- Comment Form --- */}
//               <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-4 border-t border-gray-200">
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   className="flex-grow px-4 py-2 text-sm bg-gray-100 border-2 border-transparent rounded-full focus:outline-none focus:border-primary-action transition-colors"
//                 />
//                 <button 
//                   type="submit" 
//                   className="w-9 h-9 bg-primary-action text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50" 
//                   disabled={!comment.trim() || isSubmitting}
//                 >
//                   <Send size={16} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PhotoDetailPage;

import { useState, useEffect, useRef } from 'react';
import { Camera, ArrowLeft, Heart, MessageCircle, Share, Send, User, Heart as HeartFilled } from 'lucide-react';
import { logOut } from '../api/auth';
import { getPhotoById, addCommentToPhoto, getCommentsForPhoto, addReactionToPhoto, getCurrentUserReaction } from '../api/firestore';
import { checkRateLimit } from '../utils/rateLimiter';

const PhotoDetailPage = ({ onNavigate, photoId, user }) => {
  const [comment, setComment] = useState('');
  const [reactions, setReactions] = useState([]);
  const photoRef = useRef(null);

  // --- State for Live Data ---
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserReaction, setCurrentUserReaction] = useState(null);

  const emojiOptions = ['❤️', '😂', '😮', '😢', '🎉'];

  // --- Data Fetching Function ---
  const fetchPhotoAndComments = async () => {
    if (!photoId) {
      console.error('No photoId provided to PhotoDetailPage');
      setLoading(false);
      return;
    }

    console.log('Fetching photo with ID:', photoId);
    setLoading(true);

    try {
      const [photoData, commentsData, reactionData] = await Promise.all([
        getPhotoById(photoId),
        getCommentsForPhoto(photoId),
        getCurrentUserReaction(photoId),
      ]);

      console.log('Fetched photo:', photoData);
      setPhoto(photoData);
      setComments(commentsData);
      setCurrentUserReaction(reactionData);
    } catch (error) {
      console.error('Error fetching photo details:', error);
    }

    setLoading(false);
  };

  // --- Fetch data on component load ---
  useEffect(() => {
    fetchPhotoAndComments();
  }, [photoId]);

  // --- Comments (FR2.4) ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !photoId) return;

    if (!checkRateLimit('comment', 10, 60000)) {
      alert('Too many comments. Please slow down.');
      return;
    }

    setIsSubmitting(true);
    const success = await addCommentToPhoto(photoId, comment);
    if (success) {
      setComment('');
      fetchPhotoAndComments();
    } else {
      alert('Failed to post comment.');
    }
    setIsSubmitting(false);
  };

  // --- Reactions (FR2.5) ---
  const handleEmojiReaction = async (emoji) => {
    // Generate 15 emojis
    const newReactions = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      emoji,
      x: Math.random() * window.innerWidth,
      y: Math.random() * (-100 - 50),
      delay: Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 200,
    }));

    setReactions((prev) => [...prev, ...newReactions]);

    const success = await addReactionToPhoto(photoId, emoji);
    if (success) {
      const [updatedPhoto, updatedReaction] = await Promise.all([
        getPhotoById(photoId),
        getCurrentUserReaction(photoId),
      ]);
      setPhoto(updatedPhoto);
      setCurrentUserReaction(updatedReaction);
    } else {
      console.error('Failed to add reaction');
    }
  };

  const handleHeartClick = () => {
    handleEmojiReaction('❤️');
  };

  const removeReaction = (id) => {
    setReactions((prev) => prev.filter((r) => r.id !== id));
  };

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-app-background text-text-primary">
        Loading moment...
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-app-background flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📸</div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Photo not found</h2>
          <p className="text-text-secondary mb-6">This photo may have been deleted or doesn't exist.</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-primary-action text-white px-6 py-2 rounded-lg hover:bg-primary-action/90 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- Helper to calculate total likes ---
  const totalLikes = photo.reactionCounts
    ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0)
    : 0;

  const hasUserLiked = currentUserReaction && currentUserReaction.emoji;

  return (
    <div className="min-h-screen bg-app-background relative">
      {/* Full-screen Reaction Container - FIXED z-index */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            onAnimationEnd={() => removeReaction(reaction.id)}
            className="absolute text-3xl animate-fall"
            style={{
              left: `${reaction.x}px`,
              top: `${reaction.y}px`,
              '--rotation': `${(Math.random() - 0.5) * 180}deg`,
              '--drift': `${reaction.drift}px`,
              animationDelay: `${reaction.delay}s`,
              animationDuration: '3s',
            }}
          >
            {reaction.emoji}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Photo & Reactions */}
          <div className="lg:col-span-2">
            <div ref={photoRef} className="relative w-full rounded-xl overflow-hidden shadow-lg mb-4">
              <img src={photo.imageUrl} alt={photo.caption} className="w-full h-auto" />
            </div>

            {/* Emoji Picker */}
            <div className="flex gap-3 justify-center p-3 bg-card-background rounded-full shadow-md w-fit mx-auto">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiReaction(emoji)}
                  className={`text-3xl hover:scale-125 transition-transform ${currentUserReaction && currentUserReaction.emoji === emoji ? 'scale-125' : ''
                    }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Comments */}
          <div className="lg:col-span-1">
            <div className="bg-card-background rounded-xl shadow-lg p-6">
              {/* User Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="w-10 h-10 bg-accent-lavender rounded-full flex-shrink-0 flex items-center justify-center">
                  <User size={20} className="text-primary-action" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">{photo.uploaderName}</p>
                  <p className="text-xs text-text-secondary">
                    {photo.createdAt?.toDate ? new Date(photo.createdAt.toDate()).toLocaleString() : 'Recently'}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <p className="py-4 text-sm text-text-primary">{photo.caption}</p>

              {/* Interactive Counts */}
              <div className="flex items-center gap-4 py-3 border-y border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleHeartClick}
                  className={`flex items-center gap-2 transition-colors ${hasUserLiked ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
                    }`}
                >
                  {hasUserLiked ? (
                    <HeartFilled size={20} fill="currentColor" />
                  ) : (
                    <Heart size={20} />
                  )}
                  <span className="text-sm font-medium">{totalLikes}</span>
                </button>
                <div className="flex items-center gap-2 text-text-secondary">
                  <MessageCircle size={20} />
                  <span className="text-sm font-medium">{photo.commentsCount || 0}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="py-4 space-y-4 max-h-96 overflow-y-auto">
                <h4 className="font-semibold text-sm text-text-primary">Comments ({comments.length})</h4>
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-accent-mint rounded-full flex-shrink-0 flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-xs">
                        <span className="font-semibold text-text-primary">{c.uploaderName}</span>
                        <span className="text-text-secondary ml-2">
                          {c.createdAt?.toDate ? new Date(c.createdAt.toDate()).toLocaleTimeString() : 'Just now'}
                        </span>
                      </p>
                      <p className="text-sm text-text-primary">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-grow px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-full focus:outline-none focus:border-primary-action transition-colors text-text-primary"
                />
                <button
                  type="submit"
                  className="w-9 h-9 bg-primary-action text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50"
                  disabled={!comment.trim() || isSubmitting}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetailPage;
