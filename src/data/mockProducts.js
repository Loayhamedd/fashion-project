export const mockProducts = [
  {
    id: 1,
    name: "Nordic Chair",
    description: "Modern Nordic design chair with comfortable seating",
    price: 3000,
    originalPrice: 3500,
    category: "chairs",
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.5,
    reviews: 24,
    stock: 15,
    dimensions: "H 80cm x W 60cm x D 65cm",
    material: "Oak Wood, Cotton",
    color: "Natural",
    featured: true,
    discount: 14
  },
  {
    id: 2,
    name: "Nordic Chair",
    description: "Elegant chair with minimalist design",
    price: 2600,
    originalPrice: 3000,
    category: "chairs",
    images: [
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.8,
    reviews: 18,
    stock: 8,
    dimensions: "H 85cm x W 55cm x D 60cm",
    material: "Walnut, Linen",
    color: "Brown",
    featured: true,
    discount: 13
  },
  {
    id: 3,
    name: "Nordic Chair",
    description: "Contemporary chair with ergonomic design",
    price: 2600,
    category: "chairs",
    images: [
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    ],
    rating: 4.3,
    reviews: 31,
    stock: 20,
    dimensions: "H 75cm x W 58cm x D 62cm",
    material: "Beech Wood, Wool",
    color: "Beige",
    featured: true,
    isNew: true
  }
];

export const categories = [
  { id: 1, name: "Chairs", slug: "chairs", count: 45 },
  { id: 2, name: "Sofas", slug: "sofas", count: 32 },
  { id: 3, name: "Tables", slug: "tables", count: 28 },
  { id: 4, name: "Beds", slug: "beds", count: 18 },
  { id: 5, name: "Storage", slug: "storage", count: 24 },
  { id: 6, name: "Lighting", slug: "lighting", count: 36 }
];