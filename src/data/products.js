// Product data for GlobalMart

export const CATEGORIES = [
  { id: "new", label: "New In", badge: null },
  { id: "nepal", label: "Nepal", badge: "HOT" },
  { id: "india", label: "India", badge: null },
  { id: "pakistan", label: "Pakistan", badge: null },
  { id: "korea", label: "Korea", badge: null },
  { id: "grocery", label: "Grocery", badge: null },
  { id: "spices", label: "Spices", badge: null },
  { id: "fashion", label: "Fashion", badge: null },
  { id: "sale", label: "Sale", badge: "SALE" },
];

export const FLASH_DEALS = [
  {
    id: 1,
    name: "Nepali Masala Chiya Set (Premium)",
    originalPrice: 25000,
    salePrice: 17500,
    discount: 30,
    img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=533&fit=crop",
    sold: 92,
    rating: 4.9,
    reviews: 1240,
    category: "nepal",
    categoryLabel: "Nepal",
    flag: "🇳🇵",
    description: "Premium Nepali masala tea blend with authentic spices. Perfect for making traditional chiya at home.",
    stock: 45
  },
  {
    id: 2,
    name: "Basmati Rice Premium (5kg)",
    originalPrice: 32000,
    salePrice: 22000,
    discount: 31,
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=533&fit=crop",
    sold: 88,
    rating: 4.8,
    reviews: 3420,
    category: "india",
    categoryLabel: "India",
    flag: "🇮🇳",
    description: "Long grain premium basmati rice from India. Aged for perfect aroma and texture.",
    stock: 120
  },
  {
    id: 3,
    name: "Pakistani Biryani Masala Bundle",
    originalPrice: 28000,
    salePrice: 18900,
    discount: 33,
    img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=533&fit=crop",
    sold: 85,
    rating: 4.7,
    reviews: 2180,
    category: "pakistan",
    categoryLabel: "Pakistan",
    flag: "🇵🇰",
    description: "Complete biryani masala set with all essential spices for authentic Pakistani biryani.",
    stock: 78
  },
  {
    id: 4,
    name: "Korean Gochujang Premium Set",
    originalPrice: 35000,
    salePrice: 24500,
    discount: 30,
    img: "https://images.unsplash.com/photo-1583224874284-0a3d38c1c0c3?w=400&h=533&fit=crop",
    sold: 78,
    rating: 4.8,
    reviews: 4560,
    category: "korea",
    categoryLabel: "Korea",
    flag: "🇰🇷",
    description: "Traditional Korean red chili paste set. Includes gochujang, doenjang, and ssamjang.",
    stock: 95
  },
];

export const PRODUCTS = [
  // Nepal Products
  {
    id: 5,
    name: "Nepali Gundruk (Dried Leafy Greens)",
    price: 15000,
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=533&fit=crop",
    rating: 4.9,
    reviews: 1520,
    tag: "Best Seller",
    rocket: true,
    category: "nepal",
    categoryLabel: "Nepal",
    flag: "🇳🇵",
    description: "Authentic Nepali fermented leafy greens. Traditional superfood rich in probiotics.",
    stock: 60
  },
  {
    id: 6,
    name: "Himalayan Pink Salt (Premium 1kg)",
    price: 18000,
    img: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&h=533&fit=crop",
    rating: 4.8,
    reviews: 2870,
    tag: null,
    rocket: true,
    category: "nepal",
    categoryLabel: "Nepal",
    flag: "🇳🇵",
    description: "Pure Himalayan pink salt from Nepal. Rich in minerals and trace elements.",
    stock: 200
  },
  // India Products
  {
    id: 7,
    name: "MDH Garam Masala Bundle (5 Pack)",
    price: 25000,
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=533&fit=crop",
    rating: 4.7,
    reviews: 4230,
    tag: "Popular",
    rocket: true,
    category: "india",
    categoryLabel: "India",
    flag: "🇮🇳",
    description: "India's most trusted spice brand. Complete garam masala collection for all your cooking needs.",
    stock: 150
  },
  {
    id: 8,
    name: "Indian Ghee (Amul Premium 1L)",
    price: 28000,
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=533&fit=crop",
    rating: 4.8,
    reviews: 3890,
    rocket: true,
    category: "india",
    categoryLabel: "India",
    flag: "🇮🇳",
    description: "Pure cow ghee from Amul. Perfect for cooking, baking, and traditional recipes.",
    stock: 80
  },
  // Pakistan Products
  {
    id: 9,
    name: "Shan Nihari Masala Pack",
    price: 12000,
    img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=533&fit=crop",
    rating: 4.6,
    reviews: 1720,
    tag: "Top Rated",
    rocket: true,
    category: "pakistan",
    categoryLabel: "Pakistan",
    flag: "🇵🇰",
    description: "Authentic Shan nihari masala for making traditional Pakistani slow-cooked meat dish.",
    stock: 90
  },
  {
    id: 10,
    name: "Pakistani Kurtis (Traditional)",
    price: 45000,
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=533&fit=crop",
    rating: 4.9,
    reviews: 890,
    tag: "New",
    rocket: true,
    category: "pakistan",
    categoryLabel: "Pakistan",
    flag: "🇵🇰",
    description: "Beautiful traditional Pakistani kurti with intricate embroidery. Multiple sizes available.",
    stock: 35
  },
  // Korea Products
  {
    id: 11,
    name: "Korean Kimchi (Premium 1kg)",
    price: 22000,
    img: "https://images.unsplash.com/photo-1583224874284-0a3d38c1c0c3?w=400&h=533&fit=crop",
    rating: 4.7,
    reviews: 5640,
    category: "korea",
    categoryLabel: "Korea",
    flag: "🇰🇷",
    description: "Authentic Korean kimchi made with traditional recipe. Fermented to perfection.",
    stock: 100
  },
  {
    id: 12,
    name: "Korean Ramen Variety Box (20pk)",
    price: 32000,
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=533&fit=crop",
    rating: 4.5,
    reviews: 4890,
    tag: "Trending",
    category: "korea",
    categoryLabel: "Korea",
    flag: "🇰🇷",
    description: "Assorted Korean instant ramen pack. Includes popular flavors like Shin Ramyun, Jin Ramen, and more.",
    stock: 75
  },
];

export const getAllProducts = () => [...FLASH_DEALS, ...PRODUCTS];

export const getProductById = (id) => {
  return getAllProducts().find(p => p.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return getAllProducts();
  return getAllProducts().filter(p => p.category === category);
};
