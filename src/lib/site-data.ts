export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Products" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" }
];

export const brandLogoSrc = "/images/sntrice.jpg";

export const vendorNav = [
  { href: "/vendor", label: "Overview" },
  { href: "/vendor/dashboard", label: "Dashboard" },
  { href: "/vendor/invoices", label: "Invoices" },
  { href: "/vendor/milestones", label: "Milestones" },
  { href: "/vendor/redeem", label: "Redeem" },
  { href: "/vendor/helpdesk", label: "Helpdesk" }
];

export const customerStats = [
  { value: "100%", label: "Pure & Hygienic" },
  { value: "25+", label: "Years of Trust" },
  { value: "50k+", label: "Happy Customers" }
];

export const productHighlights = [
  {
    title: "100% Grain Selection",
    text: "Milled and processed under strict quality controls to ensure long-grain aromatic perfection."
  },
  {
    title: "Direct Mill Pricing",
    text: "Get factory-direct rates for home, retail shop, export, and wholesale bulk orders."
  },
  {
    title: "Nationwide Express Shipping",
    text: "Reliable logistics partners ensuring safe and timely delivery for all product quantities."
  }
];

export interface EcommerceProduct {
  id: string;
  name: string;
  category: "Basmati Rice" | "Non-Basmati Rice" | "Pulses & Dal" | "RTS Foods" | "Wholesale Bulk";
  src: string;
  tag: string;
  rating: number;
  reviews: number;
  weights: string[];
  price: string;
  originalPrice?: string;
  description: string;
}

export const ecommerceProducts: EcommerceProduct[] = [
  {
    id: "snt-01",
    name: "SNT Premium Royal Basmati Rice",
    category: "Basmati Rice",
    src: "/images/snt1.jpg",
    tag: "Best Seller",
    rating: 4.9,
    reviews: 342,
    weights: ["5 kg", "10 kg", "26 kg", "50 kg Bulk"],
    price: "₹650",
    originalPrice: "₹780",
    description: "Extra long grain aged aromatic Basmati rice. Perfect for Biryani and celebratory dishes."
  },
  {
    id: "snt-02",
    name: "SNT Silver XL Extra Long Grain Rice",
    category: "Basmati Rice",
    src: "/images/snt2.jpg",
    tag: "Export Grade",
    rating: 4.8,
    reviews: 215,
    weights: ["5 kg", "10 kg", "26 kg"],
    price: "₹580",
    originalPrice: "₹690",
    description: "Fluffy, non-sticky rice grains processed for exceptional aroma and taste."
  },
  {
    id: "snt-03",
    name: "SNT Daily Feast Classic Rice",
    category: "Non-Basmati Rice",
    src: "/images/snt3.jpg",
    tag: "Popular",
    rating: 4.7,
    reviews: 189,
    weights: ["5 kg", "10 kg", "26 kg", "50 kg Bulk"],
    price: "₹380",
    originalPrice: "₹450",
    description: "Nutritious daily meal rice curated for softness and rich natural flavor."
  },
  {
    id: "snt-04",
    name: "SNT Heritage Tradition Basmati",
    category: "Basmati Rice",
    src: "/images/snt4.jpg",
    tag: "Premium Quality",
    rating: 5.0,
    reviews: 412,
    weights: ["10 kg", "26 kg"],
    price: "₹890",
    originalPrice: "₹1,050",
    description: "Traditionally aged reserve Basmati rice with exquisite aroma and delicate texture."
  },
  {
    id: "snt-05",
    name: "SNT Select Organic Pulses & Dal",
    category: "Pulses & Dal",
    src: "/images/snt5.jpg",
    tag: "High Protein",
    rating: 4.9,
    reviews: 156,
    weights: ["1 kg", "5 kg", "10 kg"],
    price: "₹190",
    originalPrice: "₹230",
    description: "Unpolished, nutrient-packed pulse selection sourced directly from verified farms."
  },
  {
    id: "snt-06",
    name: "SNT Ready-To-Serve Gourmet Pack",
    category: "RTS Foods",
    src: "/images/snt6.jpg",
    tag: "New Arrival",
    rating: 4.6,
    reviews: 88,
    weights: ["500g", "1 kg"],
    price: "₹140",
    originalPrice: "₹175",
    description: "Quick-cook instant food solution packed under vacuum sealed hygienic conditions."
  },
  {
    id: "snt-07",
    name: "SNT Commercial Bulk Rice Sacks",
    category: "Wholesale Bulk",
    src: "/images/snt7.jpg",
    tag: "Wholesale Special",
    rating: 4.9,
    reviews: 290,
    weights: ["26 kg Bag", "50 kg Bag", "1 Ton Bulk"],
    price: "₹2,100",
    originalPrice: "₹2,500",
    description: "Industrial wholesale supply packs for hotels, restaurants, caterers, and export markets."
  },
  {
    id: "snt-08",
    name: "SNT Superfine Golden Grain Rice",
    category: "Basmati Rice",
    src: "/images/snt8.jpg",
    tag: "Top Rated",
    rating: 4.8,
    reviews: 177,
    weights: ["5 kg", "10 kg", "26 kg"],
    price: "₹620",
    originalPrice: "₹720",
    description: "Silky textured golden grain rice with rich nutritional retention."
  }
];

export interface ProductCategoryItem {
  id: string;
  name: string;
  filterKey: string;
  badge: string;
  count: string;
  pack: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
}

export const productCategoriesData: ProductCategoryItem[] = [
  {
    id: "cat-basmati",
    name: "Royal Basmati Rice",
    filterKey: "Basmati Rice",
    badge: "Export Quality",
    count: "4 Variants Available",
    pack: "1kg • 5kg • 10kg • 26kg",
    description: "Extra long-grain aged aromatic Basmati rice. Double polished & optically sorted for fine dining & exports.",
    image: "/images/snt1.jpg",
    icon: "🌾",
    features: ["Aged 2+ Years", "Extra Long Elongation", "Natural Aroma"]
  },
  {
    id: "cat-non-basmati",
    name: "Daily Feast Rice",
    filterKey: "Non-Basmati Rice",
    badge: "Popular Value",
    count: "3 Variants Available",
    pack: "5kg • 10kg • 26kg • 50kg",
    description: "High-yield daily consumption rice varieties engineered for softness, high nutritional retention, and superior taste.",
    image: "/images/snt3.jpg",
    icon: "🥣",
    features: ["High Yield", "Soft Texture", "Zero Impurities"]
  },
  {
    id: "cat-pulses",
    name: "Unpolished Pulses & Dal",
    filterKey: "Pulses & Dal",
    badge: "100% Organic",
    count: "2 Variants Available",
    pack: "1kg • 5kg • 10kg",
    description: "Farm-fresh protein rich pulse selection cleaned and packaged without any chemical polishing or artificial coloring.",
    image: "/images/snt5.jpg",
    icon: "🫘",
    features: ["Unpolished", "High Protein", "Farm Sourced"]
  },
  {
    id: "cat-bulk",
    name: "Bulk Mill Supply",
    filterKey: "Wholesale Bulk",
    badge: "Factory Direct",
    count: "Institutional Sacks",
    pack: "26kg • 50kg • 1 Ton Bulk",
    description: "Industrial wholesale supply bags for hotels, restaurants, caterers, retail chains, and international export partners.",
    image: "/images/snt7.jpg",
    icon: "📦",
    features: ["Direct Mill Rates", "Custom Branding", "Bulk Logistics"]
  }
];

export const productShowcaseItems = [
  { src: "/images/snt1.jpg", alt: "SNT Royal Basmati Rice Pack", title: "Royal Basmati 5kg", note: "Best Seller" },
  { src: "/images/snt2.jpg", alt: "SNT XL Long Grain Rice Pack", title: "XL Long Grain 10kg", note: "Export Quality" },
  { src: "/images/snt3.jpg", alt: "SNT Daily Feast Rice Pack", title: "Daily Feast 26kg", note: "Value Pack" },
  { src: "/images/snt4.jpg", alt: "SNT Heritage Reserve Basmati", title: "Heritage Reserve 10kg", note: "Aged 2 Years" },
  { src: "/images/snt5.jpg", alt: "SNT Organic Pulses Selection", title: "Organic Pulses 5kg", note: "100% Unpolished" },
  { src: "/images/snt6.jpg", alt: "SNT RTS Gourmet Pack", title: "RTS Gourmet Pack", note: "Instant Ready" },
  { src: "/images/snt7.jpg", alt: "SNT Commercial Bulk Supply", title: "Bulk Wholesale Sack", note: "Factory Direct" },
  { src: "/images/snt8.jpg", alt: "SNT Superfine Golden Grain", title: "Golden Grain 5kg", note: "Premium Quality" }
];

export const companyValues = [
  {
    title: "Modern Rice Milling Technology",
    text: "State-of-the-art sorting, de-stoning, and hygienic packaging systems ensuring uncompromised grain cleanliness."
  },
  {
    title: "Wholesale & Global Export",
    text: "Established supply network fulfilling high-volume demands across retail chains, distributors, and overseas partners."
  },
  {
    title: "Direct From Origin",
    text: "Sourced directly from fertile paddy fields with full traceability and strict moisture and quality standards."
  }
];

export const customerGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/29798195/pexels-photo-29798195.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Rice bags being transported through a rural field",
    title: "Bulk rice bags"
  },
  {
    src: "https://images.pexels.com/photos/14238105/pexels-photo-14238105.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Packed rice bags prepared for store and shipment handling",
    title: "Retail pack stock"
  },
  {
    src: "https://images.pexels.com/photos/32630924/pexels-photo-32630924.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Workers loading sacks of rice onto a vehicle in a field",
    title: "Dispatch network"
  }
];

export const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/slabs", label: "Slabs" },
  { href: "/admin/support", label: "Support" }
];

export const heroStats = [
  { value: "4", label: "flows" },
  { value: "250+", label: "bags target" },
  { value: "2026", label: "campaign" }
];

export const campaignSteps = [
  {
    title: "Register",
    text: "Shop details, phone, email, and Aadhaar upload."
  },
  {
    title: "Submit invoice",
    text: "Add invoice number, date, and bag quantity."
  },
  {
    title: "Track slab",
    text: "Approved quantity moves the retailer up the reward ladder."
  },
  {
    title: "Redeem",
    text: "Pick the gift once campaign rewards are unlocked."
  }
];

export const rewardSlabs = [
  {
    level: "Level 1",
    target: "50 bags",
    gift: "Basic appliance or branded gift",
    tone: "Starter"
  },
  {
    level: "Level 2",
    target: "100 bags",
    gift: "Premium home appliance",
    tone: "Growth"
  },
  {
    level: "Level 3",
    target: "200 bags",
    gift: "High-value consumer device",
    tone: "Momentum"
  },
  {
    level: "Mega",
    target: "250+ bags",
    gift: "Top-tier reward, bike, or flagship device",
    tone: "Elite"
  }
];

export const flowHighlights = [
  {
    title: "Retailer-first clarity",
    text: "Every screen gives a retailer a next step instead of dumping all campaign detail at once."
  },
  {
    title: "Admin-ready structure",
    text: "Submissions, registrations, slabs, and support are split into crisp operational pages."
  },
  {
    title: "Reward confidence",
    text: "The milestone ladder and redeem flow make the campaign economics easy to understand."
  }
];

export const vendorWorkspaceCards = [
  {
    title: "Vendor dashboard",
    href: "/vendor/dashboard",
    status: "Live status",
    text: "See approved bags, pending invoices, slab position, and your next action in one view."
  },
  {
    title: "Invoice submissions",
    href: "/vendor/invoices",
    status: "Daily task",
    text: "Submit invoice proof, quantity, and notes so the admin team can review faster."
  },
  {
    title: "Milestones",
    href: "/vendor/milestones",
    status: "Reward tracking",
    text: "Understand current slab position, the next target, and what unlocks after approval."
  },
  {
    title: "Redemption",
    href: "/vendor/redeem",
    status: "Claim flow",
    text: "Check if rewards are open and which slab gifts are currently eligible for your account."
  },
  {
    title: "Helpdesk",
    href: "/vendor/helpdesk",
    status: "Support",
    text: "Raise campaign questions related to login, invoices, or reward status."
  },
  {
    title: "Vendor login",
    href: "/vendor/login",
    status: "Access",
    text: "Open the retailer workspace using WhatsApp OTP or connected Google sign-in."
  }
];

export const dashboardRows = [
  {
    label: "Accepted quantity",
    value: "184 bags",
    detail: "Across 5 approved invoice entries"
  },
  {
    label: "Current slab",
    value: "Level 3",
    detail: "Manual overrides are supported for special cases"
  },
  {
    label: "Gift status",
    value: "Ready to claim",
    detail: "Redeem unlocks after rewardsDistributed becomes true"
  }
];

export const supportChannels = [
  {
    label: "Call",
    value: "9953199155",
    detail: "Direct business, wholesale, export, and product enquiries",
    href: "tel:9953199155"
  },
  {
    label: "WhatsApp enquiry",
    value: "Chat on WhatsApp",
    detail: "Quick product and business enquiries on WhatsApp",
    href: "https://wa.me/919953199155"
  },
  {
    label: "Email",
    value: "snt.agro@gmail.com",
    detail: "For product, wholesale, export, and business communication",
    href: "mailto:snt.agro@gmail.com"
  }
];

export const customerReviews = [
  {
    name: "Rajesh Sharma",
    role: "Wholesale Trader, Delhi",
    rating: 5,
    date: "Verified Purchase",
    comment: "SNT Royal Basmati has exceptional grain elongation and aroma. Our supermarket customers love the consistency of every batch."
  },
  {
    name: "Vikram Sethi",
    role: "Hotel Operations Director, Gurugram",
    rating: 5,
    date: "Verified Bulk Buyer",
    comment: "Direct mill pricing with zero quality compromise. We order 50kg sacks monthly for our catering chain without any hassle."
  },
  {
    name: "Anita Gupta",
    role: "Home Chef & Retailer, Panipat",
    rating: 5,
    date: "Verified Purchase",
    comment: "The 10kg pack is perfectly sealed and ultra clean. No stones or broken grains. Highly recommended for daily cooking."
  }
];

export const companyLocations = [
  {
    label: "Work 1",
    address:
      "Khewat No. 235/8, Khasra No. 65//23/1/3(3-10), 73//3/2(7-10) 4(3-19), Machhrauli, Samalkha, Panipat, Haryana 132101"
  },
  {
    label: "Work 2",
    address: "Khara 33/4, Village Sannoth, Narela, Delhi 110040"
  },
  {
    label: "Work 3",
    address: "H-100, Sector 1, Bawana Industrial Area, Delhi 110039"
  },
  {
    label: "Office",
    address: "2644, 1st Floor, Naya Bazar, Delhi 110006"
  }
];

export const faqItems = [
  {
    question: "How does registration work?",
    answer: "Retailers submit business details, verify email by OTP or password, and upload Aadhaar front and back before the account is saved."
  },
  {
    question: "When can rewards be claimed?",
    answer: "Claiming is unlocked only after the campaign team flips the global reward setting for redemption."
  },
  {
    question: "What counts toward slabs?",
    answer: "Accepted or claimed submissions contribute toward the total quantity used to determine the current slab."
  },
  {
    question: "Can an admin override the slab?",
    answer: "Yes. The admin registration screen can force a specific slab for special cases or manual approvals."
  }
];

export const adminOverviewStats = [
  {
    value: "4",
    label: "operational desks",
    detail: "Submissions, registrations, slabs, and support are separated into dedicated pages."
  },
  {
    value: "24h",
    label: "review rhythm",
    detail: "Operators can clear invoice and support queues on a predictable daily cycle."
  },
  {
    value: "1",
    label: "control point",
    detail: "The admin dashboard centralizes campaign moderation, slab control, and redemption readiness."
  }
];

export const termsSections = [
  {
    title: "Eligibility",
    points: [
      "The campaign is intended for registered retailers in the designated market.",
      "A retailer must provide valid contact and shop information to participate.",
      "Campaign participation may be limited by geography or distributor coverage."
    ]
  },
  {
    title: "Submission rules",
    points: [
      "Invoice date, invoice number, and quantity should be entered accurately.",
      "Duplicate or unverifiable submissions may be rejected by the review team.",
      "Aadhaar images are collected for verification and support purposes."
    ]
  },
  {
    title: "Reward rules",
    points: [
      "Rewards are based on the approved quantity total against the current slab table.",
      "Gift selection becomes available only when campaign redemption is unlocked.",
      "The organizer may substitute gifts or adjust reward logic if stock changes."
    ]
  }
];

export const adminModules = [
  {
    href: "/admin/submissions",
    title: "Submissions",
    text: "Review invoice entries, approve or reject, and inspect Aadhaar images."
  },
  {
    href: "/admin/registrations",
    title: "Registrations",
    text: "View retailers, apply slab overrides, and reset campaign data when required."
  },
  {
    href: "/admin/slabs",
    title: "Slabs",
    text: "Create, edit, and delete reward tiers with attached gift images."
  },
  {
    href: "/admin/support",
    title: "Support",
    text: "Resolve retailer tickets and keep the helpdesk queue tidy."
  }
];

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
};

export type SupportChannel = {
  label: string;
  value: string;
  detail: string;
  href?: string;
};

export const homeGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/16296436/pexels-photo-16296436.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "A farmer working in a bright green rice field",
    title: "Field sourcing"
  },
  {
    src: "https://images.pexels.com/photos/18134864/pexels-photo-18134864.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Wide rice fields under a clear sky",
    title: "Open fields"
  },
  {
    src: "https://images.pexels.com/photos/8289978/pexels-photo-8289978.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Farmers walking through rice fields",
    title: "Farmer network"
  }
];

export const dashboardGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/14238105/pexels-photo-14238105.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Rice packed in clear bags",
    title: "Packed stock"
  },
  {
    src: "https://images.pexels.com/photos/29798195/pexels-photo-29798195.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Rice sacks stacked near a field",
    title: "Dispatch ready"
  },
  {
    src: "https://images.pexels.com/photos/11032708/pexels-photo-11032708.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "People working in a rice field",
    title: "Campaign supply"
  }
];

export const milestoneGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/10804653/pexels-photo-10804653.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Green rice terraces on a hillside",
    title: "Growth ladder"
  },
  {
    src: "https://images.pexels.com/photos/14244365/pexels-photo-14244365.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Farmers working across a rice field from above",
    title: "Team progress"
  },
  {
    src: "https://images.pexels.com/photos/8287250/pexels-photo-8287250.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Rice grains and packaged food on a table",
    title: "Reward season"
  }
];

export const invoiceGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/35029019/pexels-photo-35029019.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "A hand signing financial documents with a calculator on the desk",
    title: "Invoice review"
  },
  {
    src: "https://images.pexels.com/photos/33175649/pexels-photo-33175649.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "A person calculating financial data on office documents",
    title: "Quantity checks"
  },
  {
    src: "https://images.pexels.com/photos/6368831/pexels-photo-6368831.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Paperwork, pens, and a calculator on a work desk",
    title: "Submission proof"
  }
];

export const redeemGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/17796/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Colorful wrapped gift boxes with ribbons",
    title: "Reward claim"
  },
  {
    src: "https://images.pexels.com/photos/1303082/pexels-photo-1303082.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Wrapped gift boxes on a wooden surface",
    title: "Gift catalog"
  },
  {
    src: "https://images.pexels.com/photos/13975271/pexels-photo-13975271.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "Two gift boxes with red ribbons",
    title: "Handover"
  }
];

export const helpdeskGalleryImages: GalleryImage[] = [
  {
    src: "https://images.pexels.com/photos/8681895/pexels-photo-8681895.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "A customer service agent working with a headset",
    title: "Support desk"
  },
  {
    src: "https://images.pexels.com/photos/7682103/pexels-photo-7682103.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "A customer support professional working on a laptop",
    title: "Issue review"
  },
  {
    src: "https://images.pexels.com/photos/7709257/pexels-photo-7709257.jpeg?auto=compress&cs=tinysrgb&w=1000",
    alt: "A call center agent focused on support work",
    title: "Retailer care"
  }
];
