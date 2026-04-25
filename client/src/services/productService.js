import api from './api';

export const getFeaturedProducts = () => api.get('/products/featured');
export const getAllProducts = (params = {}) => api.get('/products', { params });
export const getProductsByGender = (gender) => api.get('/products', { params: { gender } });
export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
