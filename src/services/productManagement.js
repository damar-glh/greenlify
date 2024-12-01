import axios from "axios";
import {PRODUCT_MANAGEMENT_ENDPOINT, PRODUCT_PAGINATION_ENDPOINT} from "@/constants/routesAPI";


export async function getProductsManagement(start = 1, limit = 5) {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${PRODUCT_PAGINATION_ENDPOINT}?start=${start}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API Response:', response.data); 
      return response.data.data;
    } catch (error) {
      console.error("Gagal mendapatkan data produk:", error.response || error.message);
      throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function createProductManagement(product) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.post(PRODUCT_MANAGEMENT_ENDPOINT, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal membuat produk:", error.response || error.message);
        throw new Error("Gagal membuat produk. Silakan coba lagi.");
    }
}

export async function updateProductManagement(productId, product) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.put(`${PRODUCT_MANAGEMENT_ENDPOINT}/${productId}`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal memperbarui produk:", error.response || error.message);
        throw new Error("Gagal memperbarui produk. Silakan coba lagi.");
    }
}

export async function deleteProductManagement(productId) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.delete(`${PRODUCT_MANAGEMENT_ENDPOINT}/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal menghapus produk:", error.response || error.message);
        throw new Error("Gagal menghapus produk. Silakan coba lagi.");
    }
}

export async function getProductsByCategoryManagement(category) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(`${PRODUCT_MANAGEMENT_ENDPOINT}?category=${category}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export async function getProductsBySearchManagement(search) {
    try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(`${PRODUCT_MANAGEMENT_ENDPOINT}?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Gagal mendapatkan data produk:", error.response || error.message);
        throw new Error("Gagal mengambil data produk. Silakan coba lagi.");
    }
}

export const paginationProductsManagement = async (page = 1, limit = 3) => {
    const response = await axios.get(
        `${PRODUCT_PAGINATION_ENDPOINT}?start=${(page - 1) * limit}&limit=${limit}`
    );
    return response.data;
};