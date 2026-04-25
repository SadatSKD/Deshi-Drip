import api from './api';

export const subscribeEmail = (email) => api.post('/subscribe', { email });
export const getAllTestimonials = () => api.get('/testimonials');
