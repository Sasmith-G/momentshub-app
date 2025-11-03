import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'; // Import serverTimestamp
import { auth, db } from '../firebase';

/**
 * --- HELPER FUNCTION ---
 * Checks if a user document exists. If not, creates one.
 * This ensures all login methods have a corresponding user profile.
 */
const ensureUserProfile = async (user, displayName = null) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userDocRef);

  let newName = 'Anonymous';
  if (displayName) newName = displayName;
  else if (user.displayName) newName = user.displayName;

  if (!userDoc.exists()) {
    // New user: create the document
    await setDoc(userDocRef, {
      email: user.email || 'guest@moments.hub',
      displayName: newName,
      createdAt: serverTimestamp(),
      avatarUrl: user.photoURL || null, // Saves Google Photo
      statusEmoji: '😊',
    });
  } else {
    // Existing user: update if Google info is newer
    await updateDoc(userDocRef, {
      displayName: newName,
      avatarUrl: user.photoURL || userDoc.data().avatarUrl || null,
    });
  }
};


/**
 * Signs up a new user with email and password and creates a user document in Firestore.
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Use the helper function to create the profile
    await ensureUserProfile(user, displayName);
    return { data: user, error: null };
  } catch (error) {
    console.error("Error signing up:", error);
    return { data: null, error: error.message };
  }
};

/**
 * --- MODIFIED ---
 * Signs in an existing user and ensures their profile exists.
 */
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Add check to ensure profile exists
    await ensureUserProfile(userCredential.user);
    return { data: userCredential.user, error: null };
  } catch (error) {
    console.error("Error signing in:", error);
    return { data: null, error: error.message };
  }
};

/**
 * Signs in a user with their Google account via a popup.
 * Creates a user document in Firestore if it's their first time.
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    // Use the helper function to create the profile
    await ensureUserProfile(userCredential.user);
    return { data: userCredential.user, error: null };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { data: null, error: error.message };
  }
};

/**
 * --- MODIFIED ---
 * Signs in a user anonymously and ensures their profile exists.
 */
export const signInAsGuest = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    // Add check to ensure profile exists
    await ensureUserProfile(userCredential.user, 'Guest User');
    return { data: userCredential.user, error: null };
  } catch (error) {
    console.error("Error signing in as guest:", error);
    return { data: null, error: error.message };
  }
};


/**
 * Signs out the current user.
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserDisplayName = async (newDisplayName) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated.");

    // 1. Update Firebase Auth profile
    await updateProfile(currentUser, {
      displayName: newDisplayName
    });

    // 2. Update Firestore 'users' document
    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, {
      displayName: newDisplayName
    });

    return true;
  } catch (error) {
    console.error("Error updating display name:", error);
    return false;
  }
};