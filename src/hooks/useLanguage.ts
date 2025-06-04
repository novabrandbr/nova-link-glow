
import { useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
];

// Traduções básicas
const translations: Record<string, Record<string, string>> = {
  'pt-BR': {
    'dashboard': 'Dashboard',
    'minisite': 'Minisite',
    'stats': 'Estatísticas',
    'profile': 'Perfil',
    'plans': 'Planos',
    'help': 'Ajuda',
    'notifications': 'Notificações',
    'settings': 'Configurações',
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'edit': 'Editar',
    'delete': 'Excluir',
    'create': 'Criar',
    'welcome': 'Bem-vindo'
  },
  'en-US': {
    'dashboard': 'Dashboard',
    'minisite': 'Minisite',
    'stats': 'Statistics',
    'profile': 'Profile',
    'plans': 'Plans',
    'help': 'Help',
    'notifications': 'Notifications',
    'settings': 'Settings',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'create': 'Create',
    'welcome': 'Welcome'
  },
  'es-ES': {
    'dashboard': 'Panel',
    'minisite': 'Minisitio',
    'stats': 'Estadísticas',
    'profile': 'Perfil',
    'plans': 'Planes',
    'help': 'Ayuda',
    'notifications': 'Notificaciones',
    'settings': 'Configuración',
    'save': 'Guardar',
    'cancel': 'Cancelar',
    'edit': 'Editar',
    'delete': 'Eliminar',
    'create': 'Crear',
    'welcome': 'Bienvenido'
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('pt-BR');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    languages
  };
};
