import { apiFetch } from './api';

export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
    pendingOrders: number;
    lowStockCount: number;
    recentOrders: any[];
}

export interface InventoryProduct {
    id: number;
    name: string;
    price: number;
    stock: number;
    tags: string;
}

export const adminService = {
    // Dashboard
    getStats: async (): Promise<DashboardStats> => {
        return apiFetch('/api/admin/stats');
    },

    // Products (admin)
    createProduct: async (data: any) => {
        return apiFetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    updateProduct: async (id: number, data: any) => {
        return apiFetch(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    deleteProduct: async (id: number) => {
        return apiFetch(`/api/products/${id}`, { method: 'DELETE' });
    },
    listProducts: async (skip = 0, take = 10) => {
        return apiFetch(`/api/products?skip=${skip}&take=${take}`);
    },
    getProductById: async (id: number) => {
        return apiFetch(`/api/products/${id}`);
    },

    // Orders (admin)
    listAllOrders: async (skip = 0, status?: string) => {
        const params = new URLSearchParams({ skip: String(skip) });
        if (status) params.append('status', status);
        return apiFetch(`/api/orders/index?${params}`);
    },
    getOrderById: async (id: number) => {
        return apiFetch(`/api/orders/${id}`);
    },
    changeOrderStatus: async (id: number, status: string) => {
        return apiFetch(`/api/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },

    // Users (admin)
    listUsers: async (skip = 0) => {
        return apiFetch(`/api/addresses/users?skip=${skip}`);
    },
    changeUserRole: async (id: number, role: string) => {
        return apiFetch(`/api/addresses/users/${id}/role`, {
            method: 'PUT',
            body: JSON.stringify({ role }),
        });
    },

    // Inventory
    updateStock: async (id: number, stock: number) => {
        return apiFetch(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ stock }),
        });
    },
};
