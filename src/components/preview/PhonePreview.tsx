
import React from "react";
import { LinkType, UserProfile } from "@/pages/Dashboard";

type PhonePreviewProps = {
  profile: UserProfile;
  links: LinkType[];
};

const PhonePreview = ({ profile, links }: PhonePreviewProps) => {
  const activeLinks = links.filter(link => link.active);
  
  return (
    <div className="w-[320px]">
      <div className="border-[10px] border-gray-800 rounded-[40px] overflow-hidden shadow-xl">
        <div className="bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-1/3 h-5 rounded-full bg-gray-700"></div>
        </div>
        
        <div 
          className="h-[600px] overflow-y-auto"
          style={{ backgroundColor: profile.backgroundColor }}
        >
          <div className="flex flex-col items-center p-6">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {profile.name.substring(0, 1)}
                </span>
              </div>
            )}
            
            <h2 
              className="mt-4 text-xl font-bold" 
              style={{ fontFamily: profile.font }}
            >
              {profile.name}
            </h2>
            
            <p className="text-gray-600 text-sm text-center mt-2">
              {profile.bio}
            </p>
            
            <div className="w-full mt-6 space-y-3">
              {activeLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-3 rounded-md flex items-center justify-center transition-all transform hover:scale-105"
                  style={{ 
                    backgroundColor: link.color,
                    color: "#FFFFFF",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {link.title}
                </div>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 mt-8">
              novabrand.io/{profile.username}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        Pré-visualização em tempo real
      </p>
    </div>
  );
};

export default PhonePreview;
