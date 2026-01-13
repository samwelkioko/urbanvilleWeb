import axios from "axios";

// Default to production API, can be configured via env
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.sargasso-reclamation.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

export const fetchServices = async () => {
    const response = await api.get("/services/");
    return response.data;
};

export const fetchService = async (slug: string) => {
    const response = await api.get(`/services/${slug}/`);
    return response.data;
};

export const fetchProjects = async () => {
    const response = await api.get("/projects/");
    return response.data;
};

export const fetchProject = async (slug: string) => {
    const response = await api.get(`/projects/${slug}/`);
    return response.data;
};

export const fetchTestimonials = async () => {
    const response = await api.get("/testimonials/");
    return response.data;
};

export const fetchBlogPosts = async () => {
    const response = await api.get("/blog/");
    return response.data;
};

export const fetchBlogPost = async (slug: string) => {
    const response = await api.get(`/blog/${slug}/`);
    return response.data;
};

export const submitContact = async (data: any) => {
    const isFormData = data instanceof FormData;
    const response = await api.post("/contact/", data, {
        headers: isFormData ? { "Content-Type": "multipart/form-data" } : {}
    });
    return response.data;
};
