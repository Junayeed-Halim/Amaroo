export type Locale = "en" | "bn";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge: string;
  imageLabel: string;
  accent: string;
  delivery: string;
  eta: string;
  seller: string;
  stock: string;
  highlights: string[];
  variants: string[];
  gallery: string[];
};

export const categories = [
  {
    name: "Home & Living",
    subtitle: "Stylish upgrades for Dhaka homes",
    accent: "from-sky-500 via-cyan-500 to-teal-500",
  },
  {
    name: "Electronics",
    subtitle: "Flagship gadgets with fast warranty support",
    accent: "from-slate-900 via-slate-700 to-slate-500",
  },
  {
    name: "Fashion",
    subtitle: "Everyday premium looks for city life",
    accent: "from-rose-500 via-orange-400 to-amber-300",
  },
  {
    name: "Beauty",
    subtitle: "Trusted skincare and wellness picks",
    accent: "from-fuchsia-500 via-pink-400 to-rose-300",
  },
  {
    name: "Groceries",
    subtitle: "Essentials with reliable delivery slots",
    accent: "from-emerald-600 via-lime-500 to-amber-300",
  },
  {
    name: "Baby & Toys",
    subtitle: "Safe favourites for family shopping",
    accent: "from-violet-500 via-indigo-500 to-sky-400",
  },
] as const;

export const trustSignals = {
  payments: ["bKash", "Nagad", "Rocket", "SSLCommerz", "AmarPay"],
  shipping: ["Pathao", "Steadfast", "REDX", "Paperfly", "Sundarban"],
  promises: [
    "100% authentic store partners",
    "Fast Dhaka & nationwide delivery tracking",
    "Easy returns on eligible products",
    "Secure checkout with COD and digital wallets",
  ],
};

export const featuredProducts: Product[] = [
  {
    id: 1,
    slug: "walton-inverter-ac-1-5-ton",
    name: "Walton Inverter AC 1.5 Ton",
    category: "Electronics",
    price: 62990,
    originalPrice: 69990,
    rating: 4.8,
    reviewCount: 238,
    badge: "Best Seller",
    imageLabel: "Cooling",
    accent: "from-sky-500 via-cyan-400 to-teal-300",
    delivery: "Free installation in Dhaka metro",
    eta: "Tomorrow",
    seller: "Walton Premium Store",
    stock: "In stock",
    highlights: [
      "Twin rotary inverter compressor",
      "4-way airflow with turbo mode",
      "Official brand warranty",
    ],
    variants: ["1 Ton", "1.5 Ton", "2 Ton"],
    gallery: ["Front View", "Smart Display", "Indoor Unit", "Remote Kit"],
  },
  {
    id: 2,
    slug: "samsung-galaxy-a55-5g",
    name: "Samsung Galaxy A55 5G",
    category: "Electronics",
    price: 54999,
    originalPrice: 59999,
    rating: 4.7,
    reviewCount: 512,
    badge: "Flash Deal",
    imageLabel: "5G",
    accent: "from-slate-800 via-indigo-700 to-violet-500",
    delivery: "Official VAT invoice available",
    eta: "Same day in Dhaka",
    seller: "Samsung Smart Plaza",
    stock: "Limited stock",
    highlights: [
      "Super AMOLED display",
      "All-day battery with 25W charging",
      "IP67 water resistance",
    ],
    variants: ["128GB", "256GB", "256GB + Buds"],
    gallery: ["Front", "Back", "Camera", "In Hand"],
  },
  {
    id: 3,
    slug: "luxury-cotton-bed-sheet-set",
    name: "Luxury Cotton Bed Sheet Set",
    category: "Home & Living",
    price: 3250,
    originalPrice: 3990,
    rating: 4.6,
    reviewCount: 189,
    badge: "Top Rated",
    imageLabel: "Soft",
    accent: "from-emerald-500 via-teal-400 to-cyan-300",
    delivery: "Cash on delivery available",
    eta: "2 days",
    seller: "Shades of Home",
    stock: "In stock",
    highlights: [
      "300 thread-count breathable cotton",
      "King size with 2 pillow covers",
      "Fade-resistant dye finish",
    ],
    variants: ["Queen", "King", "Family"],
    gallery: ["Set", "Texture", "Bedroom", "Packaging"],
  },
  {
    id: 4,
    slug: "aarong-jamdani-saree",
    name: "Aarong Inspired Jamdani Saree",
    category: "Fashion",
    price: 8450,
    originalPrice: 9990,
    rating: 4.9,
    reviewCount: 94,
    badge: "Premium Pick",
    imageLabel: "Style",
    accent: "from-rose-500 via-pink-400 to-orange-300",
    delivery: "Gift packaging available",
    eta: "Tomorrow",
    seller: "Heritage Fashion House",
    stock: "In stock",
    highlights: [
      "Soft handwoven look",
      "Elegant festive color palette",
      "Includes blouse piece",
    ],
    variants: ["Ruby Red", "Royal Blue", "Classic Black"],
    gallery: ["Full Saree", "Detail", "Drape", "Gift Box"],
  },
  {
    id: 5,
    slug: "neutrogena-hydro-boost-water-gel",
    name: "Neutrogena Hydro Boost Water Gel",
    category: "Beauty",
    price: 2190,
    originalPrice: 2550,
    rating: 4.8,
    reviewCount: 341,
    badge: "Authentic Import",
    imageLabel: "Glow",
    accent: "from-blue-500 via-sky-400 to-cyan-200",
    delivery: "Temperature-safe packaging",
    eta: "Next day",
    seller: "Beauty Vault BD",
    stock: "In stock",
    highlights: [
      "Hyaluronic acid hydration",
      "Lightweight non-greasy formula",
      "Verified import source",
    ],
    variants: ["50ml", "2-pack"],
    gallery: ["Jar", "Texture", "Routine", "Box"],
  },
  {
    id: 6,
    slug: "smart-rice-cooker-2-2l",
    name: "Smart Rice Cooker 2.2L",
    category: "Home & Living",
    price: 4790,
    originalPrice: 5490,
    rating: 4.5,
    reviewCount: 143,
    badge: "Kitchen Essential",
    imageLabel: "Cook",
    accent: "from-amber-500 via-orange-400 to-red-300",
    delivery: "Warranty card included",
    eta: "2 days",
    seller: "Kitchen Hub Bangladesh",
    stock: "In stock",
    highlights: [
      "Auto keep-warm mode",
      "Non-stick inner pot",
      "Ideal for family meals",
    ],
    variants: ["2.2L", "2.8L"],
    gallery: ["Cooker", "Open Lid", "Accessories", "Countertop"],
  },
];

export const catalogProducts: Product[] = [
  ...featuredProducts,
  {
    id: 7,
    slug: "pathao-rider-helmet-pro",
    name: "Pathao Rider Helmet Pro",
    category: "Lifestyle",
    price: 2890,
    originalPrice: 3350,
    rating: 4.4,
    reviewCount: 67,
    badge: "City Essential",
    imageLabel: "Ride",
    accent: "from-zinc-900 via-zinc-700 to-zinc-500",
    delivery: "Road-safe packaging",
    eta: "Tomorrow",
    seller: "Urban Gear BD",
    stock: "In stock",
    highlights: [
      "ISI-style durable shell",
      "Comfort mesh lining",
      "Quick-release buckle",
    ],
    variants: ["Matte Black", "Pearl White"],
    gallery: ["Side", "Front", "Strap", "Lifestyle"],
  },
  {
    id: 8,
    slug: "premium-basmati-rice-10kg",
    name: "Premium Basmati Rice 10kg",
    category: "Groceries",
    price: 1690,
    originalPrice: 1890,
    rating: 4.7,
    reviewCount: 208,
    badge: "Family Value",
    imageLabel: "Fresh",
    accent: "from-lime-500 via-emerald-400 to-yellow-300",
    delivery: "Fresh stock guaranteed",
    eta: "Today",
    seller: "Daily Basket",
    stock: "In stock",
    highlights: [
      "Long grain aromatic rice",
      "Sealed moisture-safe bag",
      "Ideal for pulao and biryani",
    ],
    variants: ["5kg", "10kg", "20kg"],
    gallery: ["Pack", "Grains", "Kitchen", "Serving"],
  },
];

export const cartItems = [
  {
    productId: 2,
    quantity: 1,
    note: "Official warranty card included",
  },
  {
    productId: 4,
    quantity: 1,
    note: "Gift wrap selected",
  },
  {
    productId: 8,
    quantity: 2,
    note: "Monthly essentials refill",
  },
];

export const accountOrders = [
  {
    id: "AMR-240518",
    date: "08 May 2026",
    status: "On the way",
    total: 7680,
    items: 2,
  },
  {
    id: "AMR-240477",
    date: "05 May 2026",
    status: "Delivered",
    total: 54999,
    items: 1,
  },
  {
    id: "AMR-240451",
    date: "02 May 2026",
    status: "Awaiting payment",
    total: 2190,
    items: 1,
  },
];

export const checkoutSteps = ["Shipping", "Payment", "Review"] as const;

export const translations = {
  en: {
    brand: "Amaroo",
    nav: {
      home: "Home",
      shop: "Shop",
      deals: "Deals",
      account: "Account",
      cart: "Cart",
    },
    header: {
      location: "Deliver to Dhaka 1207",
      searchPlaceholder: "Search for phones, groceries, fashion, and more",
      language: "BN",
      support: "24/7 buyer care",
    },
    footer: {
      title: "Shop smarter with Bangladesh-first trust built in.",
      blurb:
        "Amaroo brings premium product discovery, trusted payments, and transparent delivery across Bangladesh.",
    },
    home: {
      heroEyebrow: "Bangladesh's trust-first online marketplace",
      heroTitle: "Premium everyday shopping, built for speed, clarity, and confidence.",
      heroCopy:
        "Discover curated electronics, fashion, home upgrades, and essentials with trusted payments, visible delivery promises, and a premium storefront experience.",
      primaryCta: "Shop best sellers",
      secondaryCta: "See today's deals",
      categoryTitle: "Top categories for every household",
      featuredTitle: "Featured picks buyers are adding right now",
      trustTitle: "Why Amaroo feels dependable from the first click",
      promoTitle: "Mega savings for Dhaka, Chattogram, and beyond",
      promoCopy:
        "Bank discounts, wallet cashback, and courier-tracked delivery windows — designed for Bangladesh shoppers who value certainty.",
    },
    plp: {
      title: "Shop all products",
      subtitle: "Browse a premium catalog experience with filter-first discovery.",
    },
    pdp: {
      deliveryTitle: "Delivery & trust",
      reviewsTitle: "Ratings snapshot",
      addToCart: "Add to cart",
      buyNow: "Buy now",
    },
    cart: {
      title: "Your cart",
      subtitle: "Ready when you are — review quantities and checkout with confidence.",
      checkout: "Proceed to checkout",
    },
    checkout: {
      title: "Secure checkout",
      subtitle: "A single-page stepper designed for clarity and trust.",
      placeOrder: "Place order",
    },
    account: {
      title: "Your Amaroo account",
      subtitle: "See your recent orders, profile, and saved buyer perks.",
    },
  },
  bn: {
    brand: "Amaroo BN",
    nav: {
      home: "Home",
      shop: "Shop",
      deals: "Offer",
      account: "Account",
      cart: "Cart",
    },
    header: {
      location: "Delivery: Dhaka 1207",
      searchPlaceholder: "Mobile, grocery, fashion shoho aro ponno khujun",
      language: "EN",
      support: "24/7 buyer care",
    },
    footer: {
      title: "Bangladesher jonno toiri bishwasto smart shopping.",
      blurb:
        "Amaroo apnake day premium ponno khojar oviggota, nirapod payment ebong swachchho delivery update.",
    },
    home: {
      heroEyebrow: "Bangladesher trust-first online marketplace",
      heroTitle: "Druto, porishkar o atmobishwashi shopping-er jonno premium storefront.",
      heroCopy:
        "Electronics, fashion, home ebong dainondin proyojoniyo ponno khujun nirapod payment o sposto delivery protishruti-r sathe.",
      primaryCta: "Best seller dekhun",
      secondaryCta: "Ajker offer dekhun",
      categoryTitle: "Protiti poribarer jonno jonopriyo category",
      featuredTitle: "Je ponno-gulo ekhon shobcheye beshi dekha hocche",
      trustTitle: "Prothom click thekei keno Amaroo bhoroshar",
      promoTitle: "Dhaka, Chattogram o saradeshe boro savings",
      promoCopy:
        "Bank discount, wallet cashback ebong courier-tracked delivery — Bangladeshi kretader jonno toiri.",
    },
    plp: {
      title: "Shob ponno dekhun",
      subtitle: "Filter-first premium catalog experience upobhog korun.",
    },
    pdp: {
      deliveryTitle: "Delivery o bhorosha",
      reviewsTitle: "Ratings sarongsho",
      addToCart: "Cart-e jog korun",
      buyNow: "Ekhoni kinun",
    },
    cart: {
      title: "Apnar cart",
      subtitle: "Poriman thik korun ebong atmobishwasher sathe checkout korun.",
      checkout: "Checkout-e jan",
    },
    checkout: {
      title: "Nirapod checkout",
      subtitle: "Ek patay sajano porishkar o bishwasto stepper UI.",
      placeOrder: "Order korun",
    },
    account: {
      title: "Apnar Amaroo account",
      subtitle: "Samprotik order, profile o buyer perks ek nojor-e.",
    },
  },
} satisfies Record<
  Locale,
  {
    brand: string;
    nav: Record<string, string>;
    header: Record<string, string>;
    footer: Record<string, string>;
    home: Record<string, string>;
    plp: Record<string, string>;
    pdp: Record<string, string>;
    cart: Record<string, string>;
    checkout: Record<string, string>;
    account: Record<string, string>;
  }
>;

export function getProductBySlug(slug: string) {
  return catalogProducts.find((product) => product.slug === slug);
}
