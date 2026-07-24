export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/milestones", label: "Milestones" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/redeem", label: "Redeem" },
  { href: "/helpdesk", label: "Helpdesk" },
  { href: "/terms", label: "Terms" }
];

export const adminNav = [
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
    label: "Retailer care",
    value: "+91 98765 43210",
    detail: "Monday to Saturday, 10:00 AM to 6:00 PM"
  },
  {
    label: "Email",
    value: "support@sntrice.com",
    detail: "For invoices, login help, and reward questions"
  },
  {
    label: "Campaign desk",
    value: "Mumbai operations hub",
    detail: "Escalations, admin review, and slab changes"
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
    title: "Submissions",
    text: "Review invoice entries, approve or reject, and inspect Aadhaar images."
  },
  {
    title: "Registrations",
    text: "View retailers, apply slab overrides, and reset campaign data when required."
  },
  {
    title: "Slabs",
    text: "Create, edit, and delete reward tiers with attached gift images."
  },
  {
    title: "Support",
    text: "Resolve retailer tickets and keep the helpdesk queue tidy."
  }
];

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
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
