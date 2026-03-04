import React, { useState } from 'react';
import { X, Copy, Check, BookOpen } from 'lucide-react';
import { PROMPT_LIBRARY, PromptCategory } from '../data/prompts';

interface PromptLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ isOpen, onClose, onSelectPrompt }) => {
  const [activeCategory, setActiveCategory] = useState<string>(PROMPT_LIBRARY[0].id);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (prompt: string, id: string) => {
    onSelectPrompt(prompt);
    setCopiedIndex(id);
    setTimeout(() => {
      setCopiedIndex(null);
      onClose();
    }, 500);
  };

  const currentCategory = PROMPT_LIBRARY.find(c => c.id === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            Prompt Library
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Categories */}
          <div className="w-48 bg-slate-50 border-r border-slate-100 overflow-y-auto p-4 space-y-2">
            {PROMPT_LIBRARY.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${activeCategory === category.id 
                    ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Prompts List */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              {currentCategory?.name} Prompts
            </h3>
            <div className="space-y-3">
              {currentCategory?.prompts.map((prompt, index) => {
                const uniqueId = `${activeCategory}-${index}`;
                const isCopied = copiedIndex === uniqueId;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(prompt, uniqueId)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md hover:bg-indigo-50/30 transition-all group relative"
                  >
                    <p className="text-slate-700 text-sm leading-relaxed pr-8">
                      {prompt}
                    </p>
                    <div className="absolute top-4 right-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-center">
          Click any prompt to apply it to your configuration.
        </div>
      </div>
    </div>
  );
};
