import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  image: string | null;
  onImageChange: (image: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, image, onImageChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      
      {image ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-[3/4] bg-slate-50">
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
          <button 
            onClick={() => onImageChange(null)}
            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-600 hover:text-red-500 hover:bg-white transition-colors shadow-sm"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div 
          className={`
            relative flex flex-col items-center justify-center w-full aspect-[3/4] 
            border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer
            ${isDragging 
              ? 'border-rose-500 bg-rose-50' 
              : 'border-slate-300 bg-slate-50 hover:border-rose-400 hover:bg-slate-100'
            }
          `}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            accept="image/*"
            onChange={onInputChange}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <div className="p-3 bg-white rounded-full shadow-sm mb-3">
              <Upload className={`w-6 h-6 ${isDragging ? 'text-rose-600' : 'text-slate-400'}`} />
            </div>
            <p className="mb-1 text-sm font-medium text-slate-700">
              Click or drag image
            </p>
            <p className="text-xs text-slate-500">
              PNG, JPG (Max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
