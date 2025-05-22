
/**
 * Formats a WhatsApp number for proper API usage
 * Removes common characters and ensures international format
 */
export const formatWhatsAppNumber = (number: string): string => {
  // Remove all non-numeric characters
  let cleanNumber = number.replace(/\D/g, '');
  
  // Ensure it has international format
  if (cleanNumber.startsWith('0')) {
    cleanNumber = cleanNumber.substring(1);
  }
  
  // Add + if not present
  if (!cleanNumber.startsWith('+')) {
    cleanNumber = '+' + cleanNumber;
  }
  
  return cleanNumber;
};

/**
 * Creates a WhatsApp chat URL from a phone number
 */
export const createWhatsAppUrl = (number: string, message: string = ''): string => {
  const formattedNumber = formatWhatsAppNumber(number).replace('+', '');
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${formattedNumber}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
};

/**
 * Handles Twitter/X URL formatting
 */
export const formatTwitterUrl = (handle: string): string => {
  // Remove @ if present
  const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
  
  return `https://x.com/${cleanHandle}`;
};

/**
 * Creates proper social media URLs from handles/usernames
 */
export const getSocialUrl = (platform: string, value: string): string => {
  if (!value) return '#';
  
  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${value.replace('@', '')}`;
    case 'facebook':
      return `https://facebook.com/${value.replace('@', '')}`;
    case 'twitter':
      return formatTwitterUrl(value);
    case 'youtube':
      return `https://youtube.com/@${value.replace('@', '')}`;
    case 'tiktok':
      return `https://tiktok.com/@${value.replace('@', '')}`;
    case 'linkedin':
      return `https://linkedin.com/in/${value.replace('@', '')}`;
    case 'github':
      return `https://github.com/${value.replace('@', '')}`;
    case 'spotify':
      return `https://open.spotify.com/user/${value.replace('@', '')}`;
    case 'whatsapp':
      return createWhatsAppUrl(value);
    default:
      return `https://${platform}.com/${value.replace('@', '')}`;
  }
};
