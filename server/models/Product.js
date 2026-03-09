const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, default: "" },
        category: {
            type: String,
            enum: ["kitchen", "garden", "gifting", "storage", "home-appliances", "wholesale"],
            required: true,
        },
        images: [{ type: String }],
        retailPrice: { type: Number, required: true },
        wholesalePrice: { type: Number, required: true },
        moq: { type: Number, default: 1 }, // minimum order quantity for wholesale
        stock: { type: Number, default: 0 },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviews: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
