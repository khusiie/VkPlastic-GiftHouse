import { apiFetch } from "./api";

export interface Product {
    _id: string;
    name: string;
    category: any;
    retailPrice?: number;
    wholesalePrice?: number;
    images: string[];
    [key: string]: any;
}

export interface ProductsResponse {
    products: Product[];
    pages: number;
    total: number;
}

export interface FetchProductsParams {
    type?: string;
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
}

export const productService = {
    getProducts: async (params: FetchProductsParams): Promise<ProductsResponse> => {
        const paramsObj: Record<string, string> = {};
        
        if (params.type) paramsObj.type = params.type;
        if (params.page) paramsObj.page = String(params.page);
        if (params.limit) paramsObj.limit = String(params.limit);
        if (params.category) paramsObj.category = params.category;
        if (params.search) paramsObj.search = params.search;

        const query = new URLSearchParams(paramsObj).toString();
        return apiFetch(`/api/products?${query}`);
    },

    getProductById: async (id: string): Promise<Product> => {
        return apiFetch(`/api/products/${id}`);
    }
};
