// // src/components/ui/PhotoThumbnail.jsx
// import { Heart } from 'lucide-react';

// const PhotoThumbnail = ({ photo, onClick }) => {
//   const totalLikes = photo.reactionCounts 
//     ? Object.values(photo.reactionCounts).reduce((sum, count) => sum + count, 0)
//     : 0;
//   return (
//     <div 
//       onClick={onClick}
//       className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
//     >
//       <img 
//         src={photo.imageUrl} 
//         alt={photo.caption} 
//         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <div className="absolute bottom-0 left-0 p-3 text-white">
//           <p className="font-bold text-sm">{photo.uploaderName}</p>
//           <div className="flex items-center gap-1 text-xs">
//             <Heart size={14} />
//             <span>{totalLikes}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoThumbnail;

import React from 'react';

const PhotoThumbnail = ({ photo, onClick }) => {
  return (
    <div
      onClick={() => onClick(photo.id)} // FIXED: Pass photo.id, not the event
      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
    >
      <img
        src={photo.imageUrl}
        alt={photo.caption}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PhotoThumbnail;
