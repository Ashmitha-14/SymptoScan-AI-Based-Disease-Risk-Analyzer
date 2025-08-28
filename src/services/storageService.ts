import { HealthCheck, User } from '../types';

const STORAGE_KEYS = {
  USER: 'medapp_user',
  HEALTH_CHECKS: 'medapp_health_checks'
};

export const saveUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
};

export const saveHealthCheck = (healthCheck: HealthCheck): void => {
  const existing = getHealthChecks();
  const updated = [healthCheck, ...existing];
  localStorage.setItem(STORAGE_KEYS.HEALTH_CHECKS, JSON.stringify(updated));
};

export const getHealthChecks = (): HealthCheck[] => {
  const data = localStorage.getItem(STORAGE_KEYS.HEALTH_CHECKS);
  return data ? JSON.parse(data) : [];
};

export const clearUserData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.HEALTH_CHECKS);
};