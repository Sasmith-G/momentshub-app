// // src/api/firestore.js

// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   query,
//   where,
//   getDocs,
//   orderBy,
//   updateDoc,
//   arrayUnion,
//   limit,
//   runTransaction, // Add runTransaction
//   increment, // Add increment
// } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db, storage, auth } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';

// /**
//  * Creates a new group in Firestore.
//  * @param {string} groupName - The name of the new group.
//  * @returns {Promise<string|null>} - The ID of the new group or null on error.
//  */
// export const createGroup = async (groupName) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) throw new Error("User not authenticated.");

//     const groupDocRef = await addDoc(collection(db, 'groups'), {
//       groupName: groupName,
//       createdBy: currentUser.uid,
//       members: [currentUser.uid], // Creator is the first member
//       createdAt: serverTimestamp(),
//       inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
//     });
    
//     return groupDocRef.id;
//   } catch (error) {
//     console.error("Error creating group:", error);
//     return null;
//   }
// };

// /**
//  * Allows a user to join an existing group using an invite code.
//  * @param {string} inviteCode - The invite code for the group.
//  * @returns {Promise<{success: boolean, error: string|null}>}
//  */
// export const joinGroup = async (inviteCode) => {
//     try {
//         const currentUser = auth.currentUser;
//         if (!currentUser) throw new Error("User not authenticated.");

//         const groupsRef = collection(db, 'groups');
//         const q = query(groupsRef, where("inviteCode", "==", inviteCode), limit(1));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//             return { success: false, error: "Invalid invite code." };
//         }

//         const groupDoc = querySnapshot.docs[0];
//         const groupData = groupDoc.data();

//         if (groupData.members.includes(currentUser.uid)) {
//             return { success: false, error: "You are already a member of this group." };
//         }
        
//         await updateDoc(groupDoc.ref, {
//             members: arrayUnion(currentUser.uid)
//         });

//         return { success: true, error: null };
//     } catch (error) {
//         console.error("Error joining group:", error);
//         return { success: false, error: "An error occurred while trying to join the group." };
//     }
// };

// /**
//  * Fetches the groups that the current user is a member of.
//  * @returns {Promise<Array>} - An array of group objects.
//  */
// export const getUserGroups = async () => {
//     try {
//         const currentUser = auth.currentUser;
//         if (!currentUser) return [];

//         const groupsRef = collection(db, 'groups');
//         const q = query(groupsRef, where("members", "array-contains", currentUser.uid));
//         const querySnapshot = await getDocs(q);

//         const groups = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         return groups;
//     } catch (error) {
//         console.error("Error fetching user groups:", error);
//         return [];
//     }
// };

// /**
//  * Uploads a photo file to Storage and its metadata to Firestore.
//  * @param {File} file - The image file to upload.
//  * @param {string} caption - The photo's caption.
//  * @param {string} groupId - The ID of the group to add the photo to.
//  * @returns {Promise<boolean>} - True on success, false on error.
//  */
// // export const uploadPhoto = async (file, caption, groupId) => {
// //   try {
// //     const currentUser = auth.currentUser;
// //     if (!currentUser) throw new Error("User not authenticated.");
// //     if (!file) throw new Error("No file provided.");

// //     const filePath = `photos/${groupId}/${Date.now()}_${file.name}`;
// //     const storageRef = ref(storage, filePath);
// //     const snapshot = await uploadBytes(storageRef, file);
// //     const downloadURL = await getDownloadURL(snapshot.ref);

// //     await addDoc(collection(db, 'photos'), {
// //       groupId: groupId,
// //       uploaderId: currentUser.uid,
// //       uploaderName: currentUser.displayName || 'Anonymous',
// //       imageUrl: downloadURL,
// //       caption: caption,
// //       createdAt: serverTimestamp(),
// //       likes: [],
// //       commentsCount: 0,
// //     });
    
// //     return true;
// //   } catch (error) {
// //     console.error("Error uploading photo:", error);
// //     return false;
// //   }
// // };

// // * --- MODIFICATION ---
// //  * Uploads a photo file to Storage and its metadata to Firestore.
// //  * We are changing `likes: []` to `reactionCounts: {}` to support FR2.5.
// //  */
// export const uploadPhoto = async (file, caption, groupId) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) throw new Error("User not authenticated.");
//     if (!file) throw new Error("No file provided.");

//     const filePath = `photos/${groupId}/${Date.now()}_${file.name}`;
//     const storageRef = ref(storage, filePath);
//     const snapshot = await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(snapshot.ref);

//     await addDoc(collection(db, 'photos'), {
//       groupId: groupId,
//       uploaderId: currentUser.uid,
//       uploaderName: currentUser.displayName || 'Anonymous',
//       imageUrl: downloadURL,
//       caption: caption,
//       createdAt: serverTimestamp(),
//       reactionCounts: {}, // <-- MODIFIED: Was likes: []
//       commentsCount: 0,
//     });
    
//     return true;
//   } catch (error) {
//     console.error("Error uploading photo:", error);
//     return false;
//   }
// };

// /**
//  * Fetches all photos for a given group, ordered by creation date.
//  * @param {string} groupId - The ID of the group.
//  * @returns {Promise<Array>} - An array of photo objects.
//  */
// export const getPhotosForGroup = async (groupId) => {
//   try {
//     const photosCol = collection(db, 'photos');
//     const q = query(photosCol, where("groupId", "==", groupId), orderBy("createdAt", "desc"));
    
//     const querySnapshot = await getDocs(q);
//     const photos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
//     return photos;
//   } catch (error) {
//     console.error("Error fetching photos:", error);
//     return [];
//   }
// };

// export const getPhotoById = async (photoId) => {
//   try {
//     const photoRef = doc(db, 'photos', photoId);
//     const docSnap = await getDoc(photoRef);
//     if (docSnap.exists()) {
//       return { id: docSnap.id, ...docSnap.data() };
//     } else {
//       console.error("No such photo document!");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching photo by ID:", error);
//     return null;
//   }
// };


// export const addReactionToPhoto = async (photoId, emoji) => {
//   try {
//     const currentUser = auth.currentUser;
//     if (!currentUser) throw new Error("User not authenticated.");

//     const photoRef = doc(db, 'photos', photoId);
//     // This doc ID (userId) ensures a user can only have one reaction.
//     const reactionRef = doc(db, 'photos', photoId, 'reactions', currentUser.uid);

//     await runTransaction(db, async (transaction) => {
//       const photoDoc = await transaction.get(photoRef);
//       const reactionDoc = await transaction.get(reactionRef);

//       if (!photoDoc.exists()) {
//         throw "Photo does not exist!";
//       }

//       // The key for the map uses a special format to be a valid Firestore field name.
//       const countField = `reactionCounts.${emoji}`;

//       if (reactionDoc.exists()) {
//         // Reaction already exists
//         const oldEmoji = reactionDoc.data().emoji;
//         if (oldEmoji === emoji) {
//           // User clicked the same emoji - remove reaction
//           const oldField = `reactionCounts.${oldEmoji}`;
//           transaction.delete(reactionRef);
//           transaction.update(photoRef, { [oldField]: increment(-1) });
//         } else {
//           // User changed emoji
//           const oldField = `reactionCounts.${oldEmoji}`;
//           transaction.update(reactionRef, { emoji: emoji });
//           transaction.update(photoRef, {
//             [oldField]: increment(-1),
//             [countField]: increment(1),
//           });
//         }
//       } else {
//         // New reaction
//         transaction.set(reactionRef, {
//           emoji: emoji,
//           userId: currentUser.uid,
//           createdAt: serverTimestamp(),
//         });
//         transaction.update(photoRef, { [countField]: increment(1) });
//       }
//     });

//     return true;
//   } catch (error) {
//     console.error("Error adding reaction:", error);
//     return false;
//   }
// };

// src/api/firestore.js

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  arrayUnion,
  limit,
  doc,
  getDoc,
  runTransaction,
  increment,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { updateProfile } from 'firebase/auth'; // Import updateProfile

// ... (createGroup, joinGroup, getUserGroups, uploadPhoto, getPhotosForGroup, getPhotoById, addCommentToPhoto, getCommentsForPhoto... all remain the same)
export const createGroup = async (groupName) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");

    const groupDocRef = await addDoc(collection(db, 'groups'), {
      groupName: groupName,
      createdBy: currentUser.uid,
      members: [currentUser.uid], // Creator is the first member
      createdAt: serverTimestamp(),
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    });
    
    return groupDocRef.id;
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const joinGroup = async (inviteCode) => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) throw new Error("User not authenticated.");

        const groupsRef = collection(db, 'groups');
        const q = query(groupsRef, where("inviteCode", "==", inviteCode), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, error: "Invalid invite code." };
        }

        const groupDoc = querySnapshot.docs[0];
        const groupData = groupDoc.data();

        if (groupData.members.includes(currentUser.uid)) {
            return { success: false, error: "You are already a member of this group." };
        }
        
        await updateDoc(groupDoc.ref, {
            members: arrayUnion(currentUser.uid)
        });

        return { success: true, error: null };
    } catch (error) {
        console.error("Error joining group:", error);
        return { success: false, error: "An error occurred while trying to join the group." };
    }
};

export const getUserGroups = async () => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) return [];

        const groupsRef = collection(db, 'groups');
        const q = query(groupsRef, where("members", "array-contains", currentUser.uid));
        const querySnapshot = await getDocs(q);

        const groups = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return groups;
    } catch (error) {
        console.error("Error fetching user groups:", error);
        return [];
    }
};

export const uploadPhoto = async (file, caption, groupId) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");
    if (!file) throw new Error("No file provided.");
    const now = new Date();

    const filePath = `photos/${groupId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'photos'), {
      groupId: groupId,
      uploaderId: currentUser.uid,
      uploaderName: currentUser.displayName || 'Anonymous',
      imageUrl: downloadURL,
      caption: caption,
      createdAt: serverTimestamp(),
      reactionCounts: {}, // Changed from likes: []
      commentsCount: 0,
      createdAtMonth: now.getMonth() + 1, // JS months are 0-11
      createdAtDay: now.getDate(),
      createdAtYear: now.getFullYear(),
    });
    
    return true;
  } catch (error) {
    console.error("Error uploading photo:", error);
    return false;
  }
};

export const getPhotosForGroup = async (groupId) => {
  try {
    const photosCol = collection(db, 'photos');
    const q = query(photosCol, where("groupId", "==", groupId), orderBy("createdAt", "desc"));
    
    const querySnapshot = await getDocs(q);
    const photos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

export const getPhotoById = async (photoId) => {
  try {
    const photoRef = doc(db, 'photos', photoId);
    const docSnap = await getDoc(photoRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such photo document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching photo by ID:", error);
    return null;
  }
};

export const addCommentToPhoto = async (photoId, commentText) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");

    const photoRef = doc(db, 'photos', photoId);
    const commentsColRef = collection(db, 'photos', photoId, 'comments');
    
    const newComment = {
      text: commentText,
      uploaderId: currentUser.uid,
      uploaderName: currentUser.displayName || 'Anonymous',
      createdAt: serverTimestamp(),
    };

    await runTransaction(db, async (transaction) => {
      const photoDoc = await transaction.get(photoRef);
      if (!photoDoc.exists()) {
        throw "Photo does not exist!";
      }

      transaction.set(doc(commentsColRef), newComment);
      transaction.update(photoRef, { commentsCount: increment(1) });
    });
    
    return true;
  } catch (error) {
    console.error("Error adding comment: ", error);
    return false;
  }
};

export const getCommentsForPhoto = async (photoId) => {
  try {
    const commentsCol = collection(db, 'photos', photoId, 'comments');
    const q = query(commentsCol, orderBy("createdAt", "asc"));
    
    const querySnapshot = await getDocs(q);
    const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

/**
 * --- MODIFIED: FIX FOR 'failed-precondition' ERROR ---
 * This function is now more robust. It manually reads, calculates,
 * and writes the new reactionCounts map instead of relying on increment(),
 * which prevents transaction failures.
 */
export const addReactionToPhoto = async (photoId, emoji) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");

    const photoRef = doc(db, 'photos', photoId);
    const reactionRef = doc(db, 'photos', photoId, 'reactions', currentUser.uid);

    await runTransaction(db, async (transaction) => {
      const photoDoc = await transaction.get(photoRef);
      const reactionDoc = await transaction.get(reactionRef);

      if (!photoDoc.exists()) {
        throw "Photo does not exist!";
      }

      // Get current counts, or default to {}
      const currentCounts = photoDoc.data().reactionCounts || {};

      if (reactionDoc.exists()) {
        // User is changing or removing an existing reaction
        const oldEmoji = reactionDoc.data().emoji;
        
        // Decrement old emoji count, ensuring it doesn't go below 0
        if (currentCounts[oldEmoji]) {
          currentCounts[oldEmoji] = Math.max(0, currentCounts[oldEmoji] - 1);
        }

        if (oldEmoji === emoji) {
          // User clicked the same emoji - remove reaction
          transaction.delete(reactionRef);
        } else {
          // User changed emoji - increment new one
          currentCounts[emoji] = (currentCounts[emoji] || 0) + 1;
          transaction.update(reactionRef, { emoji: emoji });
        }
      } else {
        // This is a new reaction
        currentCounts[emoji] = (currentCounts[emoji] || 0) + 1;
        transaction.set(reactionRef, {
          emoji: emoji,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
        });
      }
      
      // Update the photo doc with the new counts map
      transaction.update(photoRef, { reactionCounts: currentCounts });
    });

    return true;
  } catch (error) {
    console.error("Error adding reaction:", error);
    return false;
  }
};

export const getCurrentUserReaction = async (photoId) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    const reactionRef = doc(db, 'photos', photoId, 'reactions', currentUser.uid);
    const docSnap = await getDoc(reactionRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user reaction:", error);
    return null;
  }
};

export const getOnThisDayPhoto = async (groupId) => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const currentYear = today.getFullYear();

    const photosCol = collection(db, 'photos');
    
    // Query for photos in the same group, on the same month/day,
    // but from a year *before* the current one.
    const q = query(
      photosCol,
      where("groupId", "==", groupId),
      where("createdAtMonth", "==", month),
      where("createdAtDay", "==", day),
      where("createdAtYear", "<", currentYear),
      orderBy("createdAtYear", "desc"), // Get the most recent one
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Return the first (and only) doc
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };

  } catch (error) {
    console.error("Error fetching 'On This Day' photo:", error);
    return null;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, data);
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

export const getRecentPhotosForUser = async (userId) => {
  try {
    const photosCol = collection(db, 'photos');
    const q = query(
      photosCol,
      where("uploaderId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    
    const querySnapshot = await getDocs(q);
    const photos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return photos;
  } catch (error) {
    console.error("Error fetching recent photos:", error);
    return [];
  }
};

export const uploadProfilePicture = async (file) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");

    // 1. Upload file to Firebase Storage
    const filePath = `avatars/${currentUser.uid}/${file.name}`;
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // 2. Update Firebase Auth profile
    await updateProfile(currentUser, { photoURL: downloadURL });

    // 3. Update Firestore 'users' document
    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, { avatarUrl: downloadURL });

    return downloadURL; // Return the new URL
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
};


export const regenerateInviteCode = async (groupId) => {
  try {
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const groupDocRef = doc(db, 'groups', groupId);
    await updateDoc(groupDocRef, { inviteCode: newCode });
    return newCode;
  } catch (error) {
    console.error('Error regenerating invite code:', error);
    return null;
  }
};

/**
 * Removes a user from a group (Admin only)
 * @param {string} groupId - The ID of the group
 * @param {string} userId - The ID of the user to remove
 * @returns {Promise<boolean>} - Success status
 */
export const removeUserFromGroup = async (groupId, userId) => {
  try {
    const groupDocRef = doc(db, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    
    if (!groupDoc.exists()) {
      console.error('Group not found');
      return false;
    }

    const currentMembers = groupDoc.data().members || [];
    const updatedMembers = currentMembers.filter(memberId => memberId !== userId);

    await updateDoc(groupDocRef, { members: updatedMembers });
    return true;
  } catch (error) {
    console.error('Error removing user from group:', error);
    return false;
  }
};

/**
 * Gets detailed user info for a list of user IDs
 * @param {Array<string>} userIds - Array of user IDs
 * @returns {Promise<Array>} - Array of user objects
 */
export const getUsersByIds = async (userIds) => {
  try {
    const users = [];
    for (const userId of userIds) {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        users.push({ id: userId, ...userDoc.data() });
      }
    }
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

/**
 * Checks if a user can upload a photo today (one per day limit)
 * @param {string} groupId - The ID of the group
 * @param {string} userId - The ID of the user
 * @returns {Promise<{canUpload: boolean, existingPhoto: object|null}>}
 */
export const checkDailyUploadLimit = async (groupId, userId) => {
  try {
    const today = new Date();
    const photosCol = collection(db, 'photos');
    
    const q = query(
      photosCol,
      where("groupId", "==", groupId),
      where("uploaderId", "==", userId),
      where("createdAtDay", "==", today.getDate()),
      where("createdAtMonth", "==", today.getMonth() + 1),
      where("createdAtYear", "==", today.getFullYear())
    );

    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { canUpload: true, existingPhoto: null };
    } else {
      const existingPhoto = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      return { canUpload: false, existingPhoto };
    }
  } catch (error) {
    console.error('Error checking daily upload limit:', error);
    // On error, allow upload (fail open)
    return { canUpload: true, existingPhoto: null };
  }
};

/**
 * Calculates user streaks based on their photo upload history
 * @param {string} userId - The user's ID
 * @returns {Promise<{currentStreak: number, longestStreak: number, totalPhotos: number}>}
 */
export const calculateUserStreaks = async (userId) => {
  try {
    const photosCol = collection(db, 'photos');
    const q = query(
      photosCol,
      where("uploaderId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const photos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    if (photos.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalPhotos: 0 };
    }

    // Convert Firestore timestamps to dates
    const photoDates = photos.map(photo => {
      const timestamp = photo.createdAt;
      if (timestamp?.toDate) {
        return timestamp.toDate();
      }
      return new Date(timestamp.seconds * 1000);
    });

    // Sort by date (newest first)
    photoDates.sort((a, b) => b - a);

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user posted today or yesterday to start streak
    const mostRecentDate = new Date(photoDates[0]);
    mostRecentDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today - mostRecentDate) / (1000 * 60 * 60 * 24));

    if (daysDiff <= 1) {
      // Start counting streak
      currentStreak = 1;
      let checkDate = new Date(mostRecentDate);

      for (let i = 1; i < photoDates.length; i++) {
        const photoDate = new Date(photoDates[i]);
        photoDate.setHours(0, 0, 0, 0);
        
        const prevDate = new Date(photoDates[i - 1]);
        prevDate.setHours(0, 0, 0, 0);

        const diff = Math.floor((prevDate - photoDate) / (1000 * 60 * 60 * 24));

        if (diff === 1) {
          currentStreak++;
        } else if (diff > 1) {
          break; // Streak broken
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 1; i < photoDates.length; i++) {
      const currentDate = new Date(photoDates[i]);
      currentDate.setHours(0, 0, 0, 0);
      
      const prevDate = new Date(photoDates[i - 1]);
      prevDate.setHours(0, 0, 0, 0);

      const diff = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));

      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else if (diff > 1) {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    return {
      currentStreak,
      longestStreak,
      totalPhotos: photos.length
    };

  } catch (error) {
    console.error('Error calculating streaks:', error);
    return { currentStreak: 0, longestStreak: 0, totalPhotos: 0 };
  }
};

/**
 * Updates user stats in Firestore
 * @param {string} userId - The user's ID
 * @param {object} stats - The stats to update
 */
export const updateUserStats = async (userId, stats) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      currentStreak: stats.currentStreak,
      longestStreak: stats.longestStreak,
      totalPhotos: stats.totalPhotos,
      lastStatsUpdate: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user stats:', error);
    return false;
  }
};
