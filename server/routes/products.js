const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* ── Seed demo data (GET /api/products/seed) ── */
router.get("/seed", async (req, res) => {
    try {
        await Product.deleteMany({});
        const demo = [
            {
                name: "Premium Pressure Cooker 5L",
                description: "Stainless steel body, triple-safety valve, ideal for all cooktops.",
                category: "kitchen",
                images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"],
                retailPrice: 1499,
                wholesalePrice: 950,
                moq: 50,
                stock: 500,
                rating: 4.5,
                reviews: 128,
                tags: ["kitchen", "cooking", "bestseller"],
            },
            {
                name: "Airtight Storage Jar Set (6 pcs)",
                description: "BPA-free food-grade plastic with silicone seal.",
                category: "storage",
                images: ["https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&q=80"],
                retailPrice: 699,
                wholesalePrice: 420,
                moq: 100,
                stock: 1000,
                rating: 4.3,
                reviews: 89,
                tags: ["storage", "kitchen", "organizer"],
            },
            {
                name: "Garden Watering Can 5L",
                description: "Lightweight durable plastic with long-reach spout.",
                category: "garden",
                images: ["https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80"],
                retailPrice: 349,
                wholesalePrice: 200,
                moq: 50,
                stock: 300,
                rating: 4.1,
                reviews: 45,
                tags: ["garden", "outdoor"],
            },
            {
                name: "Luxury Gift Hamper Set",
                description: "Premium ceramic and plastic gift set. Perfect for festive gifting.",
                category: "gifting",
                images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80"],
                retailPrice: 1299,
                wholesalePrice: 850,
                moq: 30,
                stock: 150,
                rating: 4.6,
                reviews: 67,
                tags: ["gifting", "festive", "premium"],
            },
            {
                name: "Plastic Dinner Set (24 pcs)",
                description: "Elegant bone-china-finish dinner set. Microwave & dishwasher safe.",
                category: "wholesale",
                images: ["https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80"],
                retailPrice: 2499,
                wholesalePrice: 1600,
                moq: 25,
                stock: 400,
                rating: 4.4,
                reviews: 203,
                tags: ["wholesale", "dinnerware", "bestseller"],
            },
        ];
        await Product.insertMany(demo);
        res.json({ message: "Seeded successfully", count: demo.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ── GET all products (/api/products) ──────────────────────── */
// Query params: ?category=kitchen&type=retail|wholesale&search=keyword
router.get("/", async (req, res) => {
    try {
        const { category, type, search, page = 1, limit = 12 } = req.query;
        const query = { isActive: true };

        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: "i" };

        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        // Apply pricing based on type
        const result = products.map((p) => {
            const obj = p.toObject();
            return {
                ...obj,
                displayPrice: type === "wholesale" ? obj.wholesalePrice : obj.retailPrice,
                priceType: type === "wholesale" ? "Wholesale" : "Retail",
            };
        });

        res.json({ products: result, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ── GET single product (/api/products/:id) ────────────────── */
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ── POST create product (/api/products) ───────────────────── */
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ── PUT update product (/api/products/:id) ────────────────── */
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ── DELETE product (/api/products/:id) ────────────────────── */
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
