import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Role = 'client' | 'staff' | null;
type Scenario = 'ideal' | 'gray' | 'reject' | 'error' | null;

type AuthContextType = {
  role: Role;
  setRole: (role: Role) => void;
  scenario: Scenario;
  setScenario: (scenario: Scenario) => void;
  language: string;
  setLanguage: (lang: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [scenario, setScenario] = useState<Scenario>(null);
  const [language, setLanguage] = useState<string>('ru');

  // Сохраняем состояние в localStorage
  useEffect(() => {
    if (role) localStorage.setItem('role', role);
    if (scenario) localStorage.setItem('scenario', scenario);
    if (language) localStorage.setItem('language', language);
  }, [role, scenario, language]);

  // Восстанавливаем состояние из localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('role') as Role;
    const savedScenario = localStorage.getItem('scenario') as Scenario;
    const savedLanguage = localStorage.getItem('language');
    if (savedRole) setRole(savedRole);
    if (savedScenario) setScenario(savedScenario);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole, scenario, setScenario, language, setLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 