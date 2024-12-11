import {BLOG_ENDPOINT} from "@/constants/routesAPI";
import axios from "axios";

export const getBlogs = async (filters) => {
    try {
        let url = BLOG_ENDPOINT;
        if (Object.keys(filters).length > 0) {
            const queryParams = new URLSearchParams();
            if (filters.keyword) {
                queryParams.append('keyword', filters.keyword);
            }
            if (filters.page) {
                const start = (filters.page - 1) * (filters.limit || 4) + 1;
                queryParams.append('start', start);
            }
            if (filters.limit) {
                queryParams.append('limit', filters.limit);
            }
            url += `?${queryParams.toString()}`;
        }
        const response = await axios.get(url);
        const data = response.data.data;
        return {
            latest_article: data.latest_article,
            articles: data.pagination.results,
            pagination: {
                next: data.pagination.next,
                previous: data.pagination.previous,
                per_page: data.pagination.per_page,
                start_index: data.pagination.start_index,
                total_data: data.pagination.total_data
            }
        };
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Gagal mengambil data artikel');
        } else if (error.request) {
            throw new Error('Kegagalan dalam mengambil data dari server');
        } else {
            throw new Error('Kesalahan dalam mengatur request');
        }
    }
};

export const getBlogById = async (id, filters = {}) => {
    try {
        let url = `${BLOG_ENDPOINT}/${id}`;

        if (Object.keys(filters).length > 0) {
            const queryParams = new URLSearchParams();
            if (filters.page) {
                const start = (filters.page - 1) * (filters.limit || 4) + 1;
                queryParams.append('start', start);
            }
            if (filters.limit) {
                queryParams.append('limit', filters.limit);
            }
            url += `?${queryParams.toString()}`;
        }
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Galat dalam mengambil data artikel');
        } else if (error.request) {
            throw new Error('Tidak ada respon dari server');
        } else {
            throw new Error('Kesanalah dalam mengatur request');
        }
    }
}

export const addComment = async (articleId, comment) => {
    try {
        const response = await axios.post(`${BLOG_ENDPOINT}/${articleId}`, comment);
        if (response.data.status === 'success') {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Gagal menambahkan komentar');
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Gagal menambahkan komentar');
        } else if (error.request) {
            throw new Error('Tidak ada respon dari server');
        } else {
            throw new Error('Kesanalah dalam mengatur request');
        }
    }
};