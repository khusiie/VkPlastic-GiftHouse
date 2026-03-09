"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (i) => i._id === action.payload._id && i.mode === action.payload.mode
            );
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i._id === action.payload._id && i.mode === action.payload.mode
                            ? { ...i, qty: i.qty + (action.payload.qty || 1) }
                            : i
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }],
            };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (i) => !(i._id === action.payload._id && i.mode === action.payload.mode)
                ),
            };
        case "UPDATE_QTY":
            return {
                ...state,
                items: state.items.map((i) =>
                    i._id === action.payload._id && i.mode === action.payload.mode
                        ? { ...i, qty: Math.max(1, action.payload.qty) }
                        : i
                ),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        case "HYDRATE":
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem("vk_cart");
            if (stored) dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
        } catch { }
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        localStorage.setItem("vk_cart", JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (product, mode = "retail", qty = 1) => {
        const price = mode === "wholesale" ? product.wholesalePrice : product.retailPrice;
        dispatch({
            type: "ADD_ITEM",
            payload: {
                _id: product._id,
                name: product.name,
                image: product.images?.[0] || "",
                price,
                mode,
                qty,
                moq: product.moq || 1,
                category: product.category,
            },
        });
    };

    const removeItem = (_id, mode) => dispatch({ type: "REMOVE_ITEM", payload: { _id, mode } });
    const updateQty = (_id, mode, qty) => dispatch({ type: "UPDATE_QTY", payload: { _id, mode, qty } });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
