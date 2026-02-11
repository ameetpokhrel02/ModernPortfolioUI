// API configuration and service functions
import { config } from '@/config/env';

const API_BASE_URL = config.API_BASE_URL;

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface NewsletterFormData {
    email: string;
}

export interface ApiResponse<T = any> {
    message?: string;
    error?: string;
    id?: number;
    data?: T;
}

// Contact API
export const contactAPI = {
    async submitContact(data: ContactFormData): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE_URL}/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }

        return response.json();
    }
};

// Newsletter API
export const newsletterAPI = {
    async subscribe(data: NewsletterFormData): Promise<ApiResponse> {
        const response = await fetch(`${API_BASE_URL}/newsletter/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to subscribe');
        }

        return response.json();
    }
};