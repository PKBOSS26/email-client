import React from 'react';

interface EmailAvatarProps {
  name: string;
  className?: string;
}

export const EmailAvatar: React.FC<EmailAvatarProps> = ({ name, className = '' }) => {
  const initial = name.charAt(0).toUpperCase();
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold ${className}`}>
      {initial}
    </div>
  );
};