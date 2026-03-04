import React, { useState } from 'react';
import { Settings, Plus, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ApiConfig, ModelId } from '../types';
import { validateApiKey } from '../services/geminiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiConfig: ApiConfig;
  setApiConfig: (config: ApiConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, apiConfig, setApiConfig }) => {
  const [newKey, setNewKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMsg, setValidationMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!isOpen) return null;

  const handleAddKey = async () => {
    if (!newKey.trim()) return;
    
    setIsValidating(true);
    setValidationMsg(null);
    
    const isValid = await validateApiKey(newKey);
    
    setIsValidating(false);
    
    if (isValid) {
      setApiConfig({
        ...apiConfig,
        keys: [...apiConfig.keys, newKey]
      });
      setNewKey('');
      setValidationMsg({ type: 'success', text: 'Key added successfully!' });
      setTimeout(() => setValidationMsg(null), 3000);
    } else {
      setValidationMsg({ type: 'error', text: 'Invalid API Key or Network Error.' });
    }
  };

  const removeKey = (index: number) => {
    const newKeys = apiConfig.keys.filter((_, i) => i !== index);
    setApiConfig({
      ...apiConfig,
      keys: newKeys,
      activeKeyIndex: 0 // Reset to first key to avoid out of bounds
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-rose-600" />
            Settings
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">AI Model</label>
            <select 
              value={apiConfig.activeModel}
              onChange={(e) => setApiConfig({ ...apiConfig, activeModel: e.target.value as ModelId })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
            >
              <option value={ModelId.FLASH}>Gemini 2.5 Flash Image (Fast & Free-tier)</option>
              <option value={ModelId.PRO}>Gemini 3 Pro Image Preview (High Quality - Paid)</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">
              "Pro" requires a billed project. "Flash" is faster but may have lower resolution consistency.
            </p>
          </div>

          {/* API Key Management */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">API Keys (Rotation Pool)</label>
            
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Paste Gemini API Key..."
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none text-sm"
              />
              <button 
                onClick={handleAddKey}
                disabled={isValidating || !newKey}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[80px]"
              >
                {isValidating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>

            {validationMsg && (
              <div className={`mb-3 text-xs flex items-center gap-1.5 ${validationMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {validationMsg.type === 'success' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {validationMsg.text}
              </div>
            )}

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {apiConfig.keys.length === 0 && (
                <div className="text-center py-4 text-slate-400 text-sm border border-dashed border-slate-200 rounded-lg">
                  No keys added. Using system default if available.
                </div>
              )}
              {apiConfig.keys.map((key, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm group">
                  <span className="font-mono text-slate-600 truncate max-w-[200px]">
                    {key.substring(0, 8)}...{key.substring(key.length - 4)}
                  </span>
                  <div className="flex items-center gap-2">
                    {idx === apiConfig.activeKeyIndex && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
                    )}
                    <button 
                      onClick={() => removeKey(idx)}
                      className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Keys are stored locally in your browser. Add multiple keys to enable automatic rotation when rate limits are hit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
