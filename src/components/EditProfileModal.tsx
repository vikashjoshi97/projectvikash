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
      <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(16,24,40,0.06)] animate-in zoom-in-95 duration-150 border border-[#E4E7EC] max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#667085] hover:text-[#173B57] rounded-full hover:bg-[#F1F3F2] transition-colors"
          aria-label="Close edit profile dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 border-b border-[#E4E7EC] pb-4 mb-5">
          <Sparkles className="w-5 h-5 text-[#2F7D78]" />
          <h2 className="text-xl font-bold text-[#173B57]">
            Edit Profile Information
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#173B57] mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#173B57]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173B57] mb-1">
                Username (@)
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#173B57]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173B57] mb-1">
              Category / Role
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. QA Tester & Automation Engineer"
              className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#173B57]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#173B57] mb-1">
              Bio Description
            </label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#173B57] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#173B57] mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#173B57]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#173B57] mb-1">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-[#E4E7EC] text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#173B57]"
              />
            </div>
          </div>

          {/* Stats Configuration */}
          <div className="pt-2 border-t border-[#E4E7EC]">
            <h4 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-2">
              Profile Statistics (Editable string or number)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#667085] mb-1">
                  Posts Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.posts)}
                  onChange={(e) => handleStatsChange('posts', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F7F5] border border-[#E4E7EC] text-xs font-bold text-[#173B57]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#667085] mb-1">
                  Followers Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.followers)}
                  onChange={(e) => handleStatsChange('followers', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F7F5] border border-[#E4E7EC] text-xs font-bold text-[#173B57]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#667085] mb-1">
                  Following Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.following)}
                  onChange={(e) => handleStatsChange('following', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F7F5] border border-[#E4E7EC] text-xs font-bold text-[#173B57]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#667085] mb-1">
                  Countries Stat
                </label>
                <input
                  type="text"
                  value={String(formData.stats.countries || '47')}
                  onChange={(e) => handleStatsChange('countries', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#F7F7F5] border border-[#E4E7EC] text-xs font-bold text-[#173B57]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E4E7EC]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#667085] hover:text-[#173B57]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#173B57] hover:bg-[#173B57]/90 text-white text-xs font-semibold transition-colors"
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
