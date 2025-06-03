
import React from 'react';

interface SocialLink {
  icon: string;
  url: string;
}

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socialLinks }) => {
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-3 mt-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <span className="text-gray-600">{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
