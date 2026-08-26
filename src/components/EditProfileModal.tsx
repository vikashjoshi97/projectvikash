import React, { useState } from 'react';
import { ProfileData } from '../types';
import { X, Save, Sparkles } from 'lucide-react';

interface EditProfileModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSave: (updatedProfile: ProfileData) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatsChange = (field: 'posts' | 'followers' | 'following' | 'countries', value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="edit-profile-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 border border-neutral-100 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Close edit profile dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4 mb-5">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-neutral-900">
            Edit Profile Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                Username (@)
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1">
              Category / Role
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Creator & Technologist"
              className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-1">
              Bio Description
            </label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 mb-1">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Stats Configuration */}
          <div className="pt-2 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
              Profile Statistics (Editable string or number)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Posts Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.posts)}
                  onChange={(e) => handleStatsChange('posts', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Followers Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.followers)}
                  onChange={(e) => handleStatsChange('followers', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Following Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.following)}
                  onChange={(e) => handleStatsChange('following', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Countries Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.countries || '47')}
                  onChange={(e) => handleStatsChange('countries', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
