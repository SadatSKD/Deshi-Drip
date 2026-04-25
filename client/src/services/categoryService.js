import api from './api';

export const getAllCategories = () => api.get('/categories');
export const getCategoriesByGender = (gender) => api.get(`/categories/${gender}`);
