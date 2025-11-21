import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/apiClient';

const ProfilePage = () => {
  const { user, session, refreshUser } = useAuth();
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    company: user?.user_metadata?.company || '',
    address: user?.user_metadata?.address || '',
    city: user?.user_metadata?.city || '',
    postalCode: user?.user_metadata?.postal_code || '',
    bio: user?.user_metadata?.bio || ''
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(user?.user_metadata?.profile_picture_url || null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if image is too large
          if (width > 800) {
            height *= 800 / width;
            width = 800;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to base64 with quality 0.7
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
      };
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size should be less than 5MB');
        setMessageType('error');
        return;
      }

      // Create preview and compress
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreviewPhoto(reader.result);
        // Compress the image
        const compressed = await compressImage(file);
        setProfilePhoto(compressed); // Store compressed base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewPhoto(null);
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!session) {
      setMessage('Not authenticated');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name: profileData.fullName,
        phone: profileData.phone
      };

      // Add profile picture if it exists (compressed base64)
      if (profilePhoto && typeof profilePhoto === 'string') {
        payload.profile_picture_base64 = profilePhoto;
      }

      const result = await api.put('/api/users/profile', payload, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!result.success) throw new Error(result.error);
      
      // Refresh user data from Supabase to reflect changes immediately
      await refreshUser();
      
      setMessage('Profile updated successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Profile update error:', err);
      setMessage(err.message || 'Failed to update profile. Please ensure the server is running.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      const result = await api.post('/api/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!result.success) throw new Error(result.error);
      
      setMessage('Password changed successfully!');
      setMessageType('success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setShowPasswordModal(false), 2000);
    } catch (err) {
      console.error('Password change error:', err);
      setMessage(err.message || 'Failed to change password. Please ensure the server is running.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet><title>Profile Settings</title></Helmet>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your account and profile details</p>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                messageType === 'success'
                  ? 'bg-success/10 text-success border border-success/20'
                  : 'bg-error/10 text-error border border-error/20'
              }`}
            >
              <Icon name={messageType === 'success' ? 'CheckCircle' : 'AlertCircle'} size={20} />
              <p>{message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-8">
          {/* Profile Photo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">Profile Photo</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Photo Preview */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden border-2 border-primary/30"
                >
                  {previewPhoto ? (
                    <img src={previewPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Icon name="User" size={64} className="text-muted-foreground" />
                  )}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                  title="Upload photo"
                >
                  <Icon name="Camera" size={18} />
                </motion.button>
              </div>

              {/* Upload Info */}
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-2">Upload Your Photo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  JPG, PNG or GIF. Max file size is 5MB.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Choose Photo
                  </Button>
                  {previewPhoto && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePhoto}
                      iconName="X"
                      iconPosition="left"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>

              {/* Hidden Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">Personal Information</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
                <Input
                  label="Email"
                  name="email"
                  value={user?.email || ''}
                  disabled
                  placeholder="Your email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 712 345 678"
                  type="tel"
                />
                <Input
                  label="Company"
                  name="company"
                  value={profileData.company}
                  onChange={handleInputChange}
                  placeholder="Your company"
                />
              </div>

              <Input
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                placeholder="Street address"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={profileData.postalCode}
                  onChange={handleInputChange}
                  placeholder="00100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" loading={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Security & Privacy</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your password and security settings</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSecuritySettings(!showSecuritySettings)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name={showSecuritySettings ? 'ChevronUp' : 'ChevronDown'} size={24} />
              </motion.button>
            </div>

            <AnimatePresence>
              {showSecuritySettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 border-t border-border pt-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPasswordModal(true)}
                        iconName="Lock"
                        iconPosition="left"
                      >
                        Change
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <div className="flex items-center w-12 h-7 bg-muted rounded-full">
                        <div className="w-5 h-5 bg-white rounded-full ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-error/5 border border-error/20 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-error mb-4">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Irreversible actions that require careful consideration
            </p>
            <Button variant="ghost" className="text-error hover:bg-error/10">
              Delete Account
            </Button>
          </motion.div>
        </div>

        {/* Change Password Modal */}
        <AnimatePresence>
          {showPasswordModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPasswordModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card border border-border rounded-2xl max-w-md w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h3 className="text-xl font-bold text-foreground">Change Password</h3>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
                  <Input
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                    placeholder="Enter your current password"
                  />

                  <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                    placeholder="Enter new password"
                  />

                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                    placeholder="Confirm new password"
                  />

                  <div className="flex gap-3 justify-end pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowPasswordModal(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" loading={loading}>
                      {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
