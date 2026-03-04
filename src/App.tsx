import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { SettingsModal } from './components/SettingsModal';
import { PromptLibrary } from './components/PromptLibrary';
import { AppConfig, ApiConfig, AppStatus, Scene, ModelId } from './types';
import { generateMirrorSelfie, editImage } from './services/geminiService';
import { Settings, Download, Sparkles, AlertTriangle, Smartphone, User, Loader2, BookOpen, Wand2 } from 'lucide-react';
import { EDIT_OPTIONS } from './data/editOptions';

function App() {
  // --- State ---
  const [config, setConfig] = useState<AppConfig>({
    kocImage: null,
    outfitImage: null,
    scene: Scene.BEDROOM,
    additionalPrompt: '',
    holdingPhone: true,
  });

  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    keys: [],
    activeKeyIndex: 0,
    activeModel: ModelId.FLASH,
  });

  const [status, setStatus] = useState<AppStatus>({
    isGenerating: false,
    progress: 0,
    resultUrl: null,
    error: null,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const [selectedEditOption, setSelectedEditOption] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editProgress, setEditProgress] = useState(0);

  // --- Effects ---
  // Load settings from localStorage on mount
  useEffect(() => {
    const savedApiConfig = localStorage.getItem('koc_api_config');
    if (savedApiConfig) {
      try {
        setApiConfig(JSON.parse(savedApiConfig));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);

  // Save settings to localStorage when changed
  useEffect(() => {
    localStorage.setItem('koc_api_config', JSON.stringify(apiConfig));
  }, [apiConfig]);

  // --- Handlers ---
  const handleGenerate = async () => {
    if (!config.kocImage || !config.outfitImage) {
      setStatus(prev => ({ ...prev, error: "Please upload both KOC and Outfit images." }));
      return;
    }

    setStatus({
      isGenerating: true,
      progress: 0,
      resultUrl: null,
      error: null,
    });

    try {
      const { imageUrl, nextKeyIndex } = await generateMirrorSelfie(
        config,
        apiConfig,
        (progress) => setStatus(prev => ({ ...prev, progress }))
      );

      // Update the active key index if it changed during rotation
      if (nextKeyIndex !== apiConfig.activeKeyIndex) {
        setApiConfig(prev => ({ ...prev, activeKeyIndex: nextKeyIndex }));
      }

      setStatus(prev => ({
        ...prev,
        isGenerating: false,
        progress: 100,
        resultUrl: imageUrl,
      }));
    } catch (error: any) {
      setStatus(prev => ({
        ...prev,
        isGenerating: false,
        error: error.message || "An unknown error occurred",
      }));
    }
  };

  const handleEdit = async () => {
    if (!status.resultUrl || !selectedEditOption) return;

    const option = EDIT_OPTIONS.find(o => o.id === selectedEditOption);
    if (!option) return;

    setIsEditing(true);
    setEditProgress(0);
    setStatus(prev => ({ ...prev, error: null }));

    try {
      const { imageUrl, nextKeyIndex } = await editImage(
        status.resultUrl,
        option.prompt,
        apiConfig,
        (progress) => setEditProgress(progress)
      );

      if (nextKeyIndex !== apiConfig.activeKeyIndex) {
        setApiConfig(prev => ({ ...prev, activeKeyIndex: nextKeyIndex }));
      }

      setStatus(prev => ({
        ...prev,
        resultUrl: imageUrl,
      }));
    } catch (error: any) {
      setStatus(prev => ({
        ...prev,
        error: error.message || "Failed to edit image",
      }));
    } finally {
      setIsEditing(false);
    }
  };

  const handleDownload = () => {
    if (status.resultUrl) {
      const link = document.createElement('a');
      link.href = status.resultUrl;
      link.download = `koc-selfie-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiConfig={apiConfig}
        setApiConfig={setApiConfig}
      />

      <PromptLibrary
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectPrompt={(prompt) => setConfig(prev => ({ ...prev, additionalPrompt: prompt }))}
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
              K
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              KOC Selfie Gương
            </h1>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Image Uploads */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">1</span>
                Upload Images
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <ImageUploader 
                  label="KOC Face" 
                  image={config.kocImage} 
                  onImageChange={(img) => setConfig(prev => ({ ...prev, kocImage: img }))} 
                />
                <ImageUploader 
                  label="Outfit" 
                  image={config.outfitImage} 
                  onImageChange={(img) => setConfig(prev => ({ ...prev, outfitImage: img }))} 
                />
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">2</span>
                Configuration
              </h2>

              {/* Pose Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Pose Style</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, holdingPhone: true }))}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                      ${config.holdingPhone 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-200 hover:border-indigo-200 text-slate-600'
                      }
                    `}
                  >
                    <Smartphone className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">Mirror Selfie</span>
                  </button>
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, holdingPhone: false }))}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all
                      ${!config.holdingPhone 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-slate-200 hover:border-indigo-200 text-slate-600'
                      }
                    `}
                  >
                    <User className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">Natural Pose</span>
                  </button>
                </div>
              </div>

              {/* Scene Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Scene</label>
                <select
                  value={config.scene}
                  onChange={(e) => setConfig(prev => ({ ...prev, scene: e.target.value as Scene }))}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  {Object.values(Scene).map((scene) => (
                    <option key={scene} value={scene}>{scene}</option>
                  ))}
                </select>
              </div>

              {/* Custom Prompt */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-700">Additional Details (Optional)</label>
                  <button
                    onClick={() => setIsLibraryOpen(true)}
                    className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    <BookOpen className="w-3 h-3" />
                    Browse Library
                  </button>
                </div>
                <textarea
                  value={config.additionalPrompt}
                  onChange={(e) => setConfig(prev => ({ ...prev, additionalPrompt: e.target.value }))}
                  placeholder="e.g., sunset lighting, smiling gently, luxury vibe..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none h-24 text-sm"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={status.isGenerating || !config.kocImage || !config.outfitImage}
                className={`
                  w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
                  ${status.isGenerating || !config.kocImage || !config.outfitImage
                    ? 'bg-slate-300 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-300'
                  }
                `}
              >
                {status.isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating... {status.progress}%
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Photo
                  </>
                )}
              </button>

              {status.error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p>{status.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-full min-h-[600px] flex flex-col overflow-hidden relative">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="font-semibold text-slate-800">Result</h2>
                {status.resultUrl && (
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
              
              <div className="flex-1 bg-slate-100 flex items-center justify-center p-8 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                {status.resultUrl ? (
                  <div className="flex flex-col items-center w-full z-10 gap-6">
                    <img 
                      src={status.resultUrl} 
                      alt="Generated Result" 
                      className="max-w-full max-h-[60vh] rounded-lg shadow-2xl object-contain"
                    />
                    
                    {/* Edit Controls */}
                    <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Refine & Edit Image</label>
                      <div className="flex gap-2">
                        <select
                          value={selectedEditOption}
                          onChange={(e) => setSelectedEditOption(e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        >
                          <option value="">Select an edit style...</option>
                          {EDIT_OPTIONS.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={handleEdit}
                          disabled={isEditing || !selectedEditOption}
                          className={`
                            px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors
                            ${isEditing || !selectedEditOption
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }
                          `}
                        >
                          {isEditing ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {editProgress}%
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4" />
                              Apply
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 z-10">
                    {status.isGenerating ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="font-medium text-slate-600">Creating magic...</p>
                        <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                            style={{ width: `${status.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
                          <Sparkles className="w-10 h-10 text-indigo-200" />
                        </div>
                        <p className="text-lg font-medium text-slate-500">Ready to create</p>
                        <p className="text-sm max-w-xs mx-auto">Upload your photos and choose settings to generate a stunning mirror selfie.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
