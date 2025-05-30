// frontend/src/utils/session.ts
export const getRequesterId = () => localStorage.getItem('requesterId');
export const setRequesterId = (id) => localStorage.setItem('requesterId', id);
export const clearRequesterId = () => localStorage.removeItem('requesterId');
export const getProviderId = () => localStorage.getItem('providerId');
export const setProviderId = (id) => localStorage.setItem('providerId', id);
export const clearProviderId = () => localStorage.removeItem('providerId');
