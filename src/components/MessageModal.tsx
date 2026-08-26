import React, { useState } from 'react';
import { ProfileData } from '../types';
import { X, Send, Mail, CheckCircle2 } from 'lucide-react';

interface MessageModalProps {
  profile: ProfileData;
  onClose: () => void;
  onSendMessage: (senderName: string, message: string) => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  profile,
  onClose,
  onSendMessage,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(senderName || 'Anonymous Visitor', message.trim());
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div
      id="message-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150 border border-neutral-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="py-10 text-center space-y-3 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Message Delivered</h3>
            <p className="text-sm text-neutral-500 max-w-xs mx-auto">
              Your message was sent directly to {profile.name} ({profile.handle}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-11 h-11 rounded-full object-cover border border-neutral-200"
              />
              <div>
                <h3 className="text-base font-bold text-neutral-900 leading-tight">
                  Direct Note to {profile.name}
                </h3>
                <span className="text-xs text-neutral-500 font-medium">
                  {profile.handle}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Miller"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Your Email (optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. alex@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={`Hi ${profile.name.split(' ')[0]}, I wanted to reach out regarding...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors disabled:opacity-50"
              >
                <span>Send Note</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
