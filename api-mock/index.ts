// Мок-данные и функции для имитации API заявок, статусов и сценариев

export type ApplicationStatus = 'draft' | 'submitted' | 'scoring' | 'approved' | 'rejected' | 'issued';
export type Scenario = 'ideal' | 'gray' | 'reject' | 'error';

export interface Application {
  id: string;
  clientName: string;
  product: 'mortgage' | 'autoloan';
  status: ApplicationStatus;
  scenario: Scenario;
  createdAt: string;
}

const STORAGE_KEY = 'mock_applications';

export function getApplications(): Application[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveApplications(apps: Application[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function addApplication(app: Application) {
  const apps = getApplications();
  apps.push(app);
  saveApplications(apps);
}

export function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === id);
  if (idx !== -1) {
    apps[idx].status = status;
    saveApplications(apps);
  }
}

export function getApplicationById(id: string): Application | undefined {
  return getApplications().find(a => a.id === id);
} 