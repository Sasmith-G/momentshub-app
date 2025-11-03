// import { useState, useEffect } from 'react';
// import { User, Heart, MessageCircle, Share, Heart as HeartFilled } from 'lucide-react';
// import { getCurrentUserReaction, addReactionToPhoto, getPhotoById } from '../../api/firestore';
// import { auth } from '../../firebase'; // Import auth to get the current user

// const PhotoCard = ({ photo, onPhotoClick }) => {
//   // --- State for Live Data ---
//   const [totalLikes, setTotalLikes] = useState(
//     photo.reactionCounts ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0) : 0
//   );
//   const [hasUserLiked, setHasUserLiked] = useState(false);
//   const [isLikeLoading, setIsLikeLoading] = useState(true); // Tracks initial fetch
//   const [isSubmitting, setIsSubmitting] = useState(false); // Tracks click action

//   // Fetch the user's "like" status when the card mounts
//   useEffect(() => {
//     // Only run this if a user is logged in
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       setIsLikeLoading(false);
//       return;
//     }

//     const fetchReaction = async () => {
//       setIsLikeLoading(true);
//       const reaction = await getCurrentUserReaction(photo.id);
//       if (reaction && reaction.emoji === '❤️') {
//         setHasUserLiked(true);
//       } else {
//         setHasUserLiked(false);
//       }
//       setIsLikeLoading(false);
//     };
//     fetchReaction();
//   }, [photo.id]);

//   const handleHeartClick = async (e) => {
//     // --- THIS IS THE KEY ---
//     // Stop the click from propagating to the parent 'onPhotoClick'
//     e.stopPropagation();

//     if (isSubmitting || isLikeLoading) return; // Prevent double-clicks
//     setIsSubmitting(true);

//     // --- Optimistic Update ---
//     // Instantly update the UI for a snappy feel
//     const originalLikeStatus = hasUserLiked;
//     const originalLikeCount = totalLikes;

//     setHasUserLiked(!originalLikeStatus);
//     setTotalLikes(originalLikeStatus ? originalLikeCount - 1 : originalLikeCount + 1);
//     // ------------------------

//     const success = await addReactionToPhoto(photo.id, '❤️');

//     // --- Data Verification ---
//     // After the API call, fetch the true data to self-correct
//     if (success) {
//       const [updatedPhoto, updatedReaction] = await Promise.all([
//         getPhotoById(photo.id),
//         getCurrentUserReaction(photo.id)
//       ]);

//       const newTotalLikes = updatedPhoto.reactionCounts 
//         ? Object.values(updatedPhoto.reactionCounts).reduce((sum, count) => sum + count, 0) 
//         : 0;

//       setHasUserLiked(updatedReaction && updatedReaction.emoji === '❤️');
//       setTotalLikes(newTotalLikes);
//     } else {
//       // Rollback on failure
//       setHasUserLiked(originalLikeStatus);
//       setTotalLikes(originalLikeCount);
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div 
//       // onClick={onPhotoClick}
//       onClick={() => onPhotoClick(photo.id)}
//       className="bg-white rounded-xl shadow-[0_2px_10px_rgba(46,46,46,0.08)] overflow-hidden transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(46,46,46,0.15)] cursor-pointer"
//     >
//       {/* Card Header */}
//       <div className="p-5 flex items-center gap-3">
//         <div className="w-10 h-10 bg-accent-lavender rounded-full flex items-center justify-center">
//           <User size={20} className="text-primary-action" />
//         </div>
//         <div>
//           <p className="font-semibold text-sm text-text-primary">{photo.uploaderName}</p>
//           <p className="text-xs text-gray-500">{new Date(photo.createdAt?.toDate()).toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Card Image */}
//       <div className="w-full h-96 bg-gray-200">
//         <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover" />
//       </div>

//       {/* Card Content & Actions */}
//       <div className="p-5">
//         <div className="flex items-center gap-4 mb-3">

//           {/* --- MODIFIED: Interactive Heart Button --- */}
//           <button 
//             onClick={handleHeartClick}
//             disabled={isLikeLoading || isSubmitting}
//             className={`flex items-center gap-2 transition-colors ${
//               hasUserLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
//             } disabled:opacity-50`}
//           >
//             {hasUserLiked ? <HeartFilled size={20} fill="currentColor" /> : <Heart size={20} />}
//             <span className="text-sm font-medium">{totalLikes}</span>
//           </button>

//           <button 
//             onClick={(e) => {
//               e.stopPropagation(); // Stop navigation
//               onPhotoClick(); // Manually call the navigation
//             }}
//             className="flex items-center gap-2 text-gray-600 hover:text-primary-action transition-colors"
//           >
//             <MessageCircle size={20} />
//             <span className="text-sm font-medium">{photo.commentsCount || 0}</span>
//           </button>
//           <button 
//             onClick={(e) => e.stopPropagation()} // Just stop propagation
//             className="flex items-center gap-2 text-gray-600 hover:text-primary-action transition-colors"
//           >
//             <Share size={20} />
//           </button>
//         </div>
//         <p className="text-sm text-text-primary truncate">{photo.caption}</p>
//       </div>
//     </div>
//   );
// };

// export default PhotoCard;

// import { useState, useEffect } from 'react';
// import { User, Heart, MessageCircle, Share, Heart as HeartFilled } from 'lucide-react';
// import { getCurrentUserReaction, addReactionToPhoto, getPhotoById } from '../../api/firestore';
// import { auth } from '../../firebase';

// const PhotoCard = ({ photo, onPhotoClick }) => {
//   const [totalLikes, setTotalLikes] = useState(
//     photo.reactionCounts ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0) : 0
//   );
//   const [hasUserLiked, setHasUserLiked] = useState(false);
//   const [isLikeLoading, setIsLikeLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       setIsLikeLoading(false);
//       return;
//     }

//     const fetchReaction = async () => {
//       setIsLikeLoading(true);
//       const reaction = await getCurrentUserReaction(photo.id);
//       if (reaction && reaction.emoji === '❤️') {
//         setHasUserLiked(true);
//       } else {
//         setHasUserLiked(false);
//       }
//       setIsLikeLoading(false);
//     };

//     fetchReaction();
//   }, [photo.id]);

//   const handleHeartClick = async (e) => {
//     e.stopPropagation();
//     if (isSubmitting || isLikeLoading) return;

//     setIsSubmitting(true);
//     const originalLikeStatus = hasUserLiked;
//     const originalLikeCount = totalLikes;

//     setHasUserLiked(!originalLikeStatus);
//     setTotalLikes(originalLikeStatus ? originalLikeCount - 1 : originalLikeCount + 1);

//     const success = await addReactionToPhoto(photo.id, '❤️');

//     if (success) {
//       const [updatedPhoto, updatedReaction] = await Promise.all([
//         getPhotoById(photo.id),
//         getCurrentUserReaction(photo.id),
//       ]);
//       const newTotalLikes = updatedPhoto.reactionCounts
//         ? Object.values(updatedPhoto.reactionCounts).reduce((sum, count) => sum + count, 0)
//         : 0;
//       setHasUserLiked(updatedReaction && updatedReaction.emoji === '❤️');
//       setTotalLikes(newTotalLikes);
//     } else {
//       setHasUserLiked(originalLikeStatus);
//       setTotalLikes(originalLikeCount);
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div 
//       onClick={() => onPhotoClick(photo.id)} // FIXED: Pass photo.id, not the event
//       className="bg-card-background rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//     >
//       {/* Header */}
//       <div className="p-4 flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-accent-lavender flex items-center justify-center">
//           <User size={20} className="text-primary-action" />
//         </div>
//         <div>
//           <p className="font-semibold text-sm text-text-primary">{photo.uploaderName}</p>
//           <p className="text-xs text-text-secondary">
//             {new Date(photo.createdAt?.toDate()).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Image */}
//       <img src={photo.imageUrl} alt={photo.caption} className="w-full h-80 object-cover" />

//       {/* Actions */}
//       <div className="p-4">
//         <p className="text-sm text-text-primary mb-3">{photo.caption}</p>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleHeartClick}
//             className={`flex items-center gap-2 transition-colors ${
//               hasUserLiked ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
//             }`}
//           >
//             {hasUserLiked ? <HeartFilled size={20} fill="currentColor" /> : <Heart size={20} />}
//             <span className="text-sm font-medium">{totalLikes}</span>
//           </button>
//           <div className="flex items-center gap-2 text-text-secondary">
//             <MessageCircle size={20} />
//             <span className="text-sm">{photo.commentsCount || 0}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoCard;

// import { useState } from 'react';
// import { Heart, MessageCircle, Share2 } from 'lucide-react';

// const PhotoCard = ({ photo, onPhotoSelect, currentUserId }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(photo.likes || 0);

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
//       onClick={() => onPhotoSelect?.(photo.id)}
//     >
//       {/* Image - Simple Fixed Height */}
//       {photo.imageUrl && (
//         <img
//           src={photo.url}
//           alt={photo.caption || 'Photo'}
//           style={{ width: '100%', height: '400px', objectFit: 'cover' }}
//         />
//       )}

//       {/* Content */}
//       <div className="p-4">
//         {/* User Info */}
//         <p className="font-semibold text-gray-900">{photo.uploadedBy || 'Anonymous'}</p>
//         <p className="text-xs text-gray-500">
//           {photo.createdAt ? new Date(photo.createdAt.toDate?.()).toLocaleString() : 'Recently'}
//         </p>

//         {/* Caption */}
//         {photo.caption && <p className="text-gray-700 mt-2">{photo.caption}</p>}

//         {/* Actions */}
//         <div className="flex gap-4 mt-4 pt-4 border-t">
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsLiked(!isLiked);
//               setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
//             }}
//             className="flex items-center gap-1 text-red-500 hover:text-red-600"
//           >
//             <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
//             <span>{likeCount}</span>
//           </button>
//           <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
//             <MessageCircle size={18} />
//             <span>0</span>
//           </button>
//           <button className="flex items-center gap-1 text-gray-600 hover:text-green-500">
//             <Share2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoCard;

// import { useState, useEffect } from 'react';
// import { User, Heart, MessageCircle, Heart as HeartFilled } from 'lucide-react';
// import { getCurrentUserReaction, addReactionToPhoto, getPhotoById } from '../../api/firestore';
// import { auth } from '../../firebase';

// const PhotoCard = ({ photo, onPhotoSelect }) => {
//   const [totalLikes, setTotalLikes] = useState(
//     photo.reactionCounts ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0) : 0
//   );
//   const [hasUserLiked, setHasUserLiked] = useState(false);
//   const [isLikeLoading, setIsLikeLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       setIsLikeLoading(false);
//       return;
//     }

//     const fetchReaction = async () => {
//       setIsLikeLoading(true);
//       const reaction = await getCurrentUserReaction(photo.id);
//       if (reaction && reaction.emoji === '❤️') {
//         setHasUserLiked(true);
//       } else {
//         setHasUserLiked(false);
//       }
//       setIsLikeLoading(false);
//     };

//     fetchReaction();
//   }, [photo.id]);

//   const handleHeartClick = async (e) => {
//     e.stopPropagation();
//     if (isSubmitting || isLikeLoading) return;

//     setIsSubmitting(true);
//     const originalLikeStatus = hasUserLiked;
//     const originalLikeCount = totalLikes;

//     setHasUserLiked(!originalLikeStatus);
//     setTotalLikes(originalLikeStatus ? originalLikeCount - 1 : originalLikeCount + 1);

//     const success = await addReactionToPhoto(photo.id, '❤️');

//     if (success) {
//       const [updatedPhoto, updatedReaction] = await Promise.all([
//         getPhotoById(photo.id),
//         getCurrentUserReaction(photo.id),
//       ]);
//       const newTotalLikes = updatedPhoto.reactionCounts
//         ? Object.values(updatedPhoto.reactionCounts).reduce((sum, count) => sum + count, 0)
//         : 0;
//       setHasUserLiked(updatedReaction && updatedReaction.emoji === '❤️');
//       setTotalLikes(newTotalLikes);
//     } else {
//       setHasUserLiked(originalLikeStatus);
//       setTotalLikes(originalLikeCount);
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div 
//       onClick={() => onPhotoSelect?.(photo.id)}
//       className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
//     >
//       {/* Header */}
//       <div className="p-4 flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
//           <User size={20} className="text-blue-500 dark:text-blue-300" />
//         </div>
//         <div>
//           <p className="font-semibold text-sm text-gray-900 dark:text-white">{photo.uploaderName}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             {new Date(photo.createdAt?.toDate()).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Image */}
//       <img 
//         src={photo.imageUrl} 
//         alt={photo.caption} 
//         className="w-full h-80 object-cover"
//       />

//       {/* Actions */}
//       <div className="p-4">
//         <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{photo.caption}</p>
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleHeartClick}
//             className={`flex items-center gap-2 transition-colors ${
//               hasUserLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
//             }`}
//             disabled={isSubmitting || isLikeLoading}
//           >
//             {hasUserLiked ? <HeartFilled size={20} fill="currentColor" /> : <Heart size={20} />}
//             <span className="text-sm font-medium">{totalLikes}</span>
//           </button>
//           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//             <MessageCircle size={20} />
//             <span className="text-sm">{photo.commentsCount || 0}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoCard;

import { useState, useEffect, memo } from 'react'; // <-- FIXED: Import memo
import { User, Heart, MessageCircle, Heart as HeartFilled, Share2, X } from 'lucide-react';
import { getCurrentUserReaction, addReactionToPhoto, getPhotoById } from '../../api/firestore';
import { auth } from '../../firebase';

const PhotoCard = ({ photo, onPhotoSelect }) => {
  const [totalLikes, setTotalLikes] = useState(
    photo.reactionCounts ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0) : 0
  );
  const [hasUserLiked, setHasUserLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setIsLikeLoading(false);
      return;
    }

    const fetchReaction = async () => {
      setIsLikeLoading(true);
      const reaction = await getCurrentUserReaction(photo.id);
      if (reaction && reaction.emoji === '❤️') {
        setHasUserLiked(true);
      } else {
        setHasUserLiked(false);
      }
      setIsLikeLoading(false);
    };

    fetchReaction();
  }, [photo.id]);

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    if (isSubmitting || isLikeLoading) return;

    setIsSubmitting(true);
    const originalLikeStatus = hasUserLiked;
    const originalLikeCount = totalLikes;

    setHasUserLiked(!originalLikeStatus);
    setTotalLikes(originalLikeStatus ? originalLikeCount - 1 : originalLikeCount + 1);

    triggerHeartBurst(e);

    const success = await addReactionToPhoto(photo.id, '❤️');

    if (success) {
      const [updatedPhoto, updatedReaction] = await Promise.all([
        getPhotoById(photo.id),
        getCurrentUserReaction(photo.id),
      ]);
      const newTotalLikes = updatedPhoto.reactionCounts
        ? Object.values(updatedPhoto.reactionCounts).reduce((sum, count) => sum + count, 0)
        : 0;
      setHasUserLiked(updatedReaction && updatedReaction.emoji === '❤️');
      setTotalLikes(newTotalLikes);
    } else {
      setHasUserLiked(originalLikeStatus);
      setTotalLikes(originalLikeCount);
    }

    setIsSubmitting(false);
  };

  const triggerHeartBurst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'heart-burst-animation';
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = 150;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 100;
      
      heart.style.left = (rect.left + rect.width / 2) + 'px';
      heart.style.top = (rect.top + rect.height / 2) + 'px';
      heart.style.setProperty('--tx', tx + 'px');
      heart.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 800);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MomentsHub - Photo',
          text: photo.caption || 'Check out this moment!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    setShowShareMenu(false);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      console.log('Comment added:', commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  return (
    <div 
      onClick={() => onPhotoSelect?.(photo.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-transparent dark:from-gray-700 dark:to-transparent">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center animate-pulse-slow">
          <User size={20} className="text-blue-500 dark:text-blue-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{photo.uploaderName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(photo.createdAt?.toDate()).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img 
          src={photo.imageUrl} 
          alt={photo.caption} 
          className={`w-full h-80 object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        {/* --- FIXED: Removed the text but kept the overlay --- */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm animate-fade-in" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {photo.caption && (
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 hover:line-clamp-none transition-all">
            {photo.caption}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleHeartClick}
            disabled={isSubmitting || isLikeLoading}
            className={`flex items-center gap-2 transition-all duration-200 ${
              hasUserLiked 
                ? 'text-red-500 scale-110' 
                : 'text-gray-500 dark:text-gray-400 hover:text-red-500 hover:scale-105'
            } disabled:opacity-50 active:scale-95`}
          >
            {hasUserLiked ? (
              <HeartFilled size={20} className="fill-current animate-heart-beat" />
            ) : (
              <Heart size={20} />
            )}
            <span className="text-sm font-medium">{totalLikes}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCommentInput(!showCommentInput);
            }}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 active:scale-95"
          >
            <MessageCircle size={20} />
            <span className="text-sm">{photo.commentsCount || 0}</span>
          </button>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200 active:scale-95"
            >
              <Share2 size={20} />
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 animate-slide-in-down">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare();
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-lg transition-colors"
                >
                  📤 Share Link
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(photo.imageUrl);
                    alert('Image URL copied!');
                    setShowShareMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  🔗 Copy Link
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-lg transition-colors"
                >
                  ❌ Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comment Input */}
        {showCommentInput && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2 animate-slide-in-down">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value.substring(0, 280))}
              placeholder="Add a comment..."
              maxLength={280}
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none transition-all"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">{commentText.length}/280</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowCommentInput(false);
                    setCommentText('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 rounded-lg transition-colors active:scale-95"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PhotoCard); // <-- FIXED: Export with memo