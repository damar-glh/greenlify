import {create} from 'zustand';
import {getBlogById} from '@/services/blog.js';

export const useBlogStore = create((set) => ({
    article: null,
    comments: [],
    next: null,
    previous: null,
    total_approved: 0,
    per_page: 4,
    loading: false,
    error: null,

    fetchArticle: async (id, page = 1, limit = 4) => {
        set({loading: true, error: null});
        try {
            const filters = {page, limit};
            const response = await getBlogById(Number(id), filters);
            set({
                article: response.article,
                comments: response.pagination_comment.results,
                next: response.pagination_comment.next,
                previous: response.pagination_comment.previous,
                total_approved: response.pagination_comment.total_approved,
                per_page: response.pagination_comment.per_page,
                loading: false,
            });
        } catch (err) {
            set({
                error: err.message,
                loading: false,
            });
        }
    },

    addComment: (newComment) => {
        set((state) => ({
            comments: [...state.comments, newComment],
        }));
    },
}));