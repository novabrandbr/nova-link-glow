
import React from 'react';
import { PageStyle } from '@/pages/Dashboard';

interface LinkCardProps {
  title: string;
  url: string;
  pageStyle?: PageStyle;
  linkColor?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ 
  title, 
  url, 
  pageStyle = { type: 'traditional' },
  linkColor = '#6A0DAD'
}) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full p-4 rounded-lg border transition-colors hover:opacity-80"
      style={{ 
        backgroundColor: linkColor,
        color: 'white',
        borderColor: linkColor
      }}
    >
      {title}
    </button>
  );
};

export default LinkCard;
