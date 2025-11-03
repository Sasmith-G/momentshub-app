// import { useState } from 'react';
// import Modal from '../ui/Modal';
// import { uploadPhoto } from '../../api/firestore';
// import { ImageUp } from 'lucide-react';

// const UploadPhotoModal = ({ isOpen, onClose, groupId, onUploadSuccess }) => {
//   // ... (all the existing state variables remain the same)
//   const [caption, setCaption] = useState('');
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !caption.trim()) {
//       setError('Please select a photo and add a caption.');
//       return;
//     }
//     setLoading(true);
//     setError('');

//     const success = await uploadPhoto(file, caption, groupId);

//     if (success) {
//       // THIS IS THE KEY CHANGE: Call the refresh function from the parent
//       onUploadSuccess();
//       handleClose(); // Close the modal
//     } else {
//       setError('Failed to upload photo. Please try again.');
//     }
//     setLoading(false);
//   };

//   const handleClose = () => {
//     setFile(null);
//     setPreview(null);
//     setCaption('');
//     setError('');
//     onClose();
//   };

//   return (
//     // ... (The entire JSX for the modal remains exactly the same)
//     <Modal isOpen={isOpen} onClose={handleClose} title="Share a New Moment">
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//                 <label htmlFor="photo-upload" className="block text-sm font-medium text-gray-700">Photo</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                     {preview ? (
//                         <img src={preview} alt="Preview" className="mx-auto h-48 w-auto rounded-md" />
//                     ) : (
//                         <>
//                         <ImageUp className="mx-auto h-12 w-12 text-gray-400" />
//                         <div className="flex text-sm text-gray-600">
//                             <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-action hover:text-indigo-500">
//                             <span>Upload a file</span>
//                             <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" />
//                             </label>
//                             <p className="pl-1">or drag and drop</p>
//                         </div>
//                         <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
//                         </>
//                     )}
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
//                 <textarea
//                     id="caption"
//                     rows={3}
//                     value={caption}
//                     onChange={(e) => setCaption(e.target.value)}
//                     className="w-full mt-1 px-4 py-2 text-sm bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:border-primary-action"
//                     placeholder="Add a caption to your moment..."
//                 />
//             </div>

//             {error && <p className="text-sm text-red-500">{error}</p>}

//             <div className="flex justify-end gap-4">
//                 <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
//                     Cancel
//                 </button>
//                 <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-primary-action rounded-lg hover:bg-opacity-90 disabled:opacity-50">
//                     {loading ? 'Uploading...' : 'Share Moment'}
//                 </button>
//             </div>
//         </form>
//     </Modal>
//   );
// };

// export default UploadPhotoModal;

// import { useState, useEffect } from 'react';
// import Modal from '../ui/Modal';
// import { uploadPhoto, checkDailyUploadLimit } from '../../api/firestore';
// import { auth } from '../../firebase';
// import { ImageUp, AlertCircle } from 'lucide-react';
// import { checkRateLimit } from '../../utils/rateLimiter';
// import { validateCaption, validateImageFile } from '../../utils/validators';

// const UploadPhotoModal = ({ isOpen, onClose, groupId, onUploadSuccess }) => {
//   const [caption, setCaption] = useState('');
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [dailyLimitReached, setDailyLimitReached] = useState(false);
//   const [existingPhoto, setExistingPhoto] = useState(null);
//   const [checkingLimit, setCheckingLimit] = useState(true);

//   // Check daily limit when modal opens
//   useEffect(() => {
//     const checkLimit = async () => {
//       if (!isOpen || !groupId) return;

//       setCheckingLimit(true);
//       const currentUser = auth.currentUser;
//       if (currentUser) {
//         const { canUpload, existingPhoto } = await checkDailyUploadLimit(groupId, currentUser.uid);
//         setDailyLimitReached(!canUpload);
//         setExistingPhoto(existingPhoto);
//       }
//       setCheckingLimit(false);
//     };

//     checkLimit();
//   }, [isOpen, groupId]);

//   // const handleFileChange = (e) => {
//   //   const selectedFile = e.target.files[0];
//   //   if (selectedFile) {
//   //     setFile(selectedFile);
//   //     setPreview(URL.createObjectURL(selectedFile));
//   //   }
//   // };
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       // Validate file
//       const validation = validateImageFile(selectedFile);
//       if (!validation.valid) {
//         setError(validation.error);
//         return;
//       }

//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//       setError(''); // Clear any previous errors
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate caption
//     const captionValidation = validateCaption(caption);
//     if (!captionValidation.valid) {
//       setError(captionValidation.error);
//       return;
//     }

//     if (!file) {
//       setError('Please select a photo.');
//       return;
//     }

//     // Check rate limit
//     if (!checkRateLimit('photoUpload', 3, 60000)) {
//       setError('Too many upload attempts. Please wait a minute and try again.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     const success = await uploadPhoto(file, caption, groupId);
//     if (success) {
//       onUploadSuccess();
//       handleClose();
//     } else {
//       setError('Failed to upload photo. Please try again.');
//     }

//     setLoading(false);
//   };

//   const handleClose = () => {
//     setFile(null);
//     setPreview(null);
//     setCaption('');
//     setError('');
//     setDailyLimitReached(false);
//     setExistingPhoto(null);
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose}>
//       <h2 className="text-2xl font-bold text-text-primary mb-6">Share Your Moment</h2>

//       {checkingLimit ? (
//         <div className="text-center py-8 text-text-secondary">
//           Checking upload permissions...
//         </div>
//       ) : dailyLimitReached ? (
//         // Daily Limit Reached Message
//         <div className="text-center py-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
//             <AlertCircle size={32} className="text-yellow-600 dark:text-yellow-500" />
//           </div>
//           <h3 className="text-lg font-semibold text-text-primary mb-2">
//             Daily Moment Already Shared
//           </h3>
//           <p className="text-text-secondary mb-4">
//             You've already shared your moment for today. Come back tomorrow to share another!
//           </p>
//           {existingPhoto && (
//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
//               <p className="text-sm text-text-secondary mb-2">Today's moment:</p>
//               <p className="text-text-primary font-medium">"{existingPhoto.caption}"</p>
//               <p className="text-xs text-text-secondary mt-1">
//                 Posted at {new Date(existingPhoto.createdAt?.seconds * 1000).toLocaleTimeString()}
//               </p>
//             </div>
//           )}
//           <button
//             onClick={handleClose}
//             className="bg-primary-action text-white px-6 py-2 rounded-lg hover:bg-primary-action/90 transition-colors"
//           >
//             Got it
//           </button>
//         </div>
//       ) : (
//         // Upload Form
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Photo Upload */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">Photo</label>
//             {preview ? (
//               <div className="relative">
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="w-full h-64 object-cover rounded-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setFile(null);
//                     setPreview(null);
//                   }}
//                   className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
//                 <ImageUp size={48} className="text-gray-400 mb-2" />
//                 <p className="text-sm text-text-primary font-medium">Upload a file</p>
//                 <p className="text-xs text-text-secondary">or drag and drop</p>
//                 <p className="text-xs text-text-secondary mt-1">PNG, JPG up to 10MB</p>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           {/* Caption */}
//           <div>
//             <label className="block text-sm font-medium text-text-primary mb-2">Caption</label>
//             <textarea
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//               className="w-full mt-1 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:border-primary-action text-text-primary"
//               placeholder="Add a caption to your moment..."
//               rows={3}
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-text-primary rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading || !file || !caption.trim()}
//               className="flex-1 px-6 py-3 bg-primary-action text-white rounded-lg hover:bg-primary-action/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Uploading...' : 'Share Moment'}
//             </button>
//           </div>
//         </form>
//       )}
//     </Modal>
//   );
// };

// export default UploadPhotoModal;

import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import { uploadPhoto, checkDailyUploadLimit } from '../../api/firestore';
import { auth } from '../../firebase';
import { ImageUp, AlertCircle, Tag, X } from 'lucide-react';
import { checkRateLimit } from '../../utils/rateLimiter';
import { validateCaption, validateImageFile } from '../../utils/validators';
import { useNotifications } from '../../context/NotificationContext';

const UploadPhotoModal = ({ isOpen, onClose, groupId, onUploadSuccess }) => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dailyLimitReached, setDailyLimitReached] = useState(false);
  const [existingPhoto, setExistingPhoto] = useState(null);
  const [checkingLimit, setCheckingLimit] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { addNotification } = useNotifications();

  const MAX_TAGS = 5;

  // Check daily limit when modal opens
  useEffect(() => {
    const checkLimit = async () => {
      if (!isOpen || !groupId) return;

      setCheckingLimit(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const { canUpload, existingPhoto } = await checkDailyUploadLimit(
          groupId,
          currentUser.uid
        );
        setDailyLimitReached(!canUpload);
        setExistingPhoto(existingPhoto);
      }
      setCheckingLimit(false);
    };

    checkLimit();
  }, [isOpen, groupId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file
      const validation = validateImageFile(selectedFile);
      if (!validation.valid) {
        setError(validation.error);
        addNotification(validation.error, 'error');
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
      addNotification('📸 Image selected successfully!', 'success');
    }
  };

  // Add tag
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();

    if (!trimmedTag) {
      setError('Tag cannot be empty');
      return;
    }

    if (tags.length >= MAX_TAGS) {
      setError(`Maximum ${MAX_TAGS} tags allowed`);
      return;
    }

    if (tags.includes(trimmedTag)) {
      setError('Tag already added');
      return;
    }

    setTags([...tags, trimmedTag]);
    setTagInput('');
    setError('');
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle tag keypress
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate caption
    const captionValidation = validateCaption(caption);
    if (!captionValidation.valid) {
      setError(captionValidation.error);
      addNotification(captionValidation.error, 'error');
      return;
    }

    if (!file) {
      setError('Please select a photo.');
      addNotification('❌ Please select a photo', 'error');
      return;
    }

    // Check rate limit
    if (!checkRateLimit('photoUpload', 3, 60000)) {
      setError('Too many upload attempts. Please wait a minute and try again.');
      addNotification(
        '⏳ Too many uploads. Please wait before trying again.',
        'warning'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Show uploading notification
      addNotification('📤 Uploading your moment...', 'info');

      // Prepare photo data with tags
      const photoData = {
        caption: caption.trim(),
        tags: tags.length > 0 ? tags : [],
      };

      const success = await uploadPhoto(file, caption, groupId, photoData);

      if (success) {
        addNotification(
          `✅ Moment posted successfully! ${tags.length > 0 ? `With ${tags.length} tag(s)` : ''}`,
          'success'
        );
        onUploadSuccess?.();
        handleClose();
      } else {
        setError('Failed to upload photo. Please try again.');
        addNotification('❌ Upload failed. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('An error occurred during upload.');
      addNotification(
        `❌ Error: ${err.message || 'Upload failed'}`,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setCaption('');
    setTags([]);
    setTagInput('');
    setError('');
    setDailyLimitReached(false);
    setExistingPhoto(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Share Your Moment
      </h2>

      {checkingLimit ? (
        <div className="text-center py-8 text-text-secondary">
          Checking upload permissions...
        </div>
      ) : dailyLimitReached ? (
        // Daily Limit Reached Message
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <AlertCircle
              size={32}
              className="text-yellow-600 dark:text-yellow-500"
            />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Daily Moment Already Shared
          </h3>
          <p className="text-text-secondary mb-4">
            You've already shared your moment for today. Come back tomorrow to
            share another!
          </p>
          {existingPhoto && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-text-secondary mb-2">
                Today's moment:
              </p>
              <p className="text-text-primary font-medium">
                "{existingPhoto.caption}"
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Posted at{' '}
                {new Date(
                  existingPhoto.createdAt?.seconds * 1000
                ).toLocaleTimeString()}
              </p>
            </div>
          )}
          <button
            onClick={handleClose}
            className="bg-primary-action text-white px-6 py-2 rounded-lg hover:bg-primary-action/90 transition-colors"
          >
            Got it
          </button>
        </div>
      ) : (
        // Upload Form
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Photo
            </label>
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ImageUp size={48} className="text-gray-400 mb-2" />
                <p className="text-sm text-text-primary font-medium">
                  Upload a file
                </p>
                <p className="text-xs text-text-secondary">
                  or drag and drop
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  PNG, JPG up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Caption <span className="text-red-500">*</span>
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={loading}
              className="w-full mt-1 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:border-primary-action text-text-primary disabled:opacity-50"
              placeholder="Add a caption to your moment..."
              rows={3}
            />
          </div>

          {/* Tags Section */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
              <Tag size={16} />
              Tags (Optional)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                disabled={loading || tags.length >= MAX_TAGS}
                placeholder="Add a tag and press Enter"
                className="flex-1 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:border-primary-action text-text-primary disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={loading || !tagInput.trim() || tags.length >= MAX_TAGS}
                className="px-4 py-2 bg-primary-action text-white rounded-lg hover:bg-primary-action/90 transition-colors disabled:opacity-50 font-medium text-sm"
              >
                Add
              </button>
            </div>

            {/* Tags Display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      disabled={loading}
                      className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-text-secondary">
              {tags.length}/{MAX_TAGS} tags added
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Ready Status */}
          {file && caption.trim() && !error && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg text-sm">
              ✅ Ready to share! All required fields filled.
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 sticky bottom-0 bg-white dark:bg-gray-900 pt-4 -mx-6 px-6 pb-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-text-primary rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !file || !caption.trim()}
              className="flex-1 px-6 py-3 bg-primary-action text-white rounded-lg hover:bg-primary-action/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Uploading...' : 'Share Moment'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default UploadPhotoModal;

