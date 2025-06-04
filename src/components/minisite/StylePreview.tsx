
import React from 'react';
import { PageStyle } from '@/pages/Dashboard';

interface StylePreviewProps {
  styleType: PageStyle['type'];
}

const StylePreview: React.FC<StylePreviewProps> = ({ styleType }) => {
  const getPreviewContent = (type: PageStyle['type']) => {
    switch (type) {
      case 'traditional':
        return (
          <div className="w-full h-20 bg-white border rounded-lg p-2 flex flex-col justify-center items-center">
            <div className="w-full h-6 bg-[#6A0DAD] rounded mb-1"></div>
            <div className="w-3/4 h-6 bg-[#6A0DAD] rounded"></div>
          </div>
        );
      
      case 'novabrandflix':
        return (
          <div className="w-full h-20 bg-black rounded-lg p-2 grid grid-cols-3 gap-1">
            <div className="bg-red-600 rounded"></div>
            <div className="bg-red-600 rounded"></div>
            <div className="bg-red-600 rounded"></div>
          </div>
        );
      
      case 'arcade':
        return (
          <div className="w-full h-20 bg-[#0E0B1D] rounded-lg p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full">
              <div className="w-3/4 h-4 bg-cyan-400 rounded mb-1 animate-pulse"></div>
              <div className="w-1/2 h-4 bg-purple-400 rounded animate-pulse"></div>
            </div>
          </div>
        );
      
      case 'y2k':
        return (
          <div className="w-full h-20 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-lg p-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full">
              <div className="w-3/4 h-4 bg-white rounded mb-1 shadow-lg"></div>
              <div className="w-1/2 h-4 bg-white rounded shadow-lg"></div>
            </div>
          </div>
        );
      
      case 'polaroid':
        return (
          <div className="w-full h-20 bg-gray-100 rounded-lg p-2">
            <div className="bg-white border-4 border-white rounded shadow-md h-full flex flex-col">
              <div className="flex-1 bg-gray-200 rounded-t"></div>
              <div className="h-3 bg-white rounded-b"></div>
            </div>
          </div>
        );
      
      case 'recipe':
        return (
          <div className="w-full h-20 bg-yellow-50 rounded-lg p-2 border-2 border-dashed border-yellow-300">
            <div className="text-xs text-yellow-800 font-mono">
              <div className="mb-1">📝 Ingredientes:</div>
              <div className="h-1 bg-yellow-300 rounded mb-1"></div>
              <div className="h-1 bg-yellow-300 rounded w-3/4"></div>
            </div>
          </div>
        );
      
      case 'reality':
        return (
          <div className="w-full h-20 bg-black rounded-lg p-2 relative">
            <div className="absolute top-1 right-1 text-xs text-red-500 font-bold animate-pulse">🔴 AO VIVO</div>
            <div className="h-full flex flex-col justify-center items-center">
              <div className="w-3/4 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded mb-1"></div>
              <div className="w-1/2 h-4 bg-white rounded"></div>
            </div>
          </div>
        );
      
      case 'vhs':
        return (
          <div className="w-full h-20 bg-gray-800 rounded-lg p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center">
              <div className="w-3/4 h-4 bg-green-400 rounded mb-1 filter blur-[0.5px]"></div>
              <div className="w-1/2 h-4 bg-green-400 rounded filter blur-[0.5px]"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-20 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
            <div className="text-xs text-gray-500">Preview</div>
          </div>
        );
    }
  };

  return (
    <div className="mt-2">
      {getPreviewContent(styleType)}
    </div>
  );
};

export default StylePreview;
