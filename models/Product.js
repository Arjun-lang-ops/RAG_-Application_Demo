import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },

    tenantId: {
      type: String,
      required: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    embedding: {
      type: [Number],
      default: undefined,
    },

    embeddingModel: {
      type: String,
      default: "text-embedding-3-small",
    },

    embeddingVersion: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);


productSchema.index({
  tenantId: 1,
  category: 1,
  isActive: 1,
});

const Product=mongoose.model('Product',productSchema)

export default Product
