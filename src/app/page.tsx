"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  companyLocations,
  companyValues,
  productHighlights,
  productCategoriesData,
  supportChannels,
  ecommerceProducts,
  customerReviews,
  EcommerceProduct
} from "@/lib/site-data";

interface CartItem {
  product: EcommerceProduct;
  weight: string;
  quantity: number;
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<EcommerceProduct | null>(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function isExternalWhatsApp(href?: string) {
    return Boolean(href && href.includes("wa.me"));
  }

  const categories = ["All", "Basmati Rice", "Non-Basmati Rice", "Pulses & Dal", "RTS Foods", "Wholesale Bulk"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = ecommerceProducts.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, "")) || 0;
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, "")) || 0;
        return pB - pA;
      });
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleSelectWeight = (productId: string, weight: string) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleAddToCart = (product: EcommerceProduct, qty = 1, customWeight?: string) => {
    const chosenWeight = customWeight || selectedWeights[product.id] || product.weights[0];
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.weight === chosenWeight
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prevCart, { product, weight: chosenWeight, quantity: qty }];
    });

    setToastMessage(`Added ${qty}x ${product.name} (${chosenWeight}) to Cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalCartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalCartValue = useMemo(() => {
    return cart.reduce((total, item) => {
      const priceNum = parseInt(item.product.price.replace(/[^\d]/g, "")) || 0;
      return total + priceNum * item.quantity;
    }, 0);
  }, [cart]);

  const openWhatsAppOrder = () => {
    if (cart.length === 0) {
      window.open("https://wa.me/919953199155?text=Hello%20SNT%20Agro,%20I%20would%20like%20to%20enquire%20about%20your%20products.", "_blank");
      return;
    }
    let message = "Hello SNT Agro, I would like to place an order:\n\n";
    cart.forEach((item, idx) => {
      message += `${idx + 1}. ${item.product.name} (${item.weight}) x ${item.quantity} - ${item.product.price}\n`;
    });
    message += `\nEstimated Total: ₹${totalCartValue}\nPlease confirm availability and delivery timeframe.`;
    window.open(`https://wa.me/919953199155?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="customer-home customer-home--ecom">
      {/* Top Promotional Announcement */}
      <div className="ecom-announcement-bar">
        <div className="container ecom-announcement-bar__inner">
          <span>🔥 Special Mill Offer: Direct Wholesale Discounts for Retailers & Exporters</span>
          <div className="ecom-announcement-bar__right">
            <span>🚚 Fast Dispatch Across India</span>
            <span className="divider">•</span>
            <a href="tel:9953199155">📞 Wholesale Desk: +91 9953199155</a>
          </div>
        </div>
      </div>

      {/* Cart Toast Notification */}
      {toastMessage && (
        <div className="ecom-toast">
          <span className="ecom-toast__icon">🛒</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Cart Button */}
      <button
        type="button"
        className="ecom-floating-cart-btn"
        onClick={() => setIsCartOpen(true)}
        aria-label="View Shopping Cart"
      >
        <span className="cart-icon">🛒</span>
        <span className="cart-text">Bag</span>
        {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
      </button>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="ecom-cart-drawer-scrim" onClick={() => setIsCartOpen(false)}>
          <div className="ecom-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ecom-cart-drawer__head">
              <h3>Shopping Bag ({totalCartCount} items)</h3>
              <button type="button" className="close-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            <div className="ecom-cart-drawer__body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <span className="empty-icon">🛍️</span>
                  <p>Your shopping bag is currently empty.</p>
                  <button
                    type="button"
                    className="btn btn--primary-ecom"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="cart-item-list">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item.product.id}-${item.weight}-${index}`}>
                      <div className="cart-item__image">
                        <Image src={item.product.src} alt={item.product.name} width={60} height={60} />
                      </div>
                      <div className="cart-item__info">
                        <h4>{item.product.name}</h4>
                        <span className="cart-item__weight">Pack: {item.weight}</span>
                        <div className="cart-item__qty-price">
                          <span>Qty: {item.quantity}</span>
                          <strong>{item.product.price}</strong>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() =>
                          setCart((prev) => prev.filter((_, i) => i !== index))
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="ecom-cart-drawer__footer">
                <div className="cart-summary-line">
                  <span>Subtotal (Estimated)</span>
                  <strong>₹{totalCartValue}</strong>
                </div>
                <p className="cart-note">Final price and tax invoice confirmed on checkout.</p>
                <button
                  type="button"
                  className="btn btn--whatsapp-checkout"
                  onClick={openWhatsAppOrder}
                >
                  💬 Send Order on WhatsApp
                </button>
                <button
                  type="button"
                  className="btn btn--clear-cart"
                  onClick={() => setCart([])}
                >
                  Clear Bag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <div className="ecom-modal-scrim" onClick={() => setQuickViewProduct(null)}>
          <div className="ecom-quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="quickview-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="quickview-grid">
              <div className="quickview-media">
                <Image
                  src={quickViewProduct.src}
                  alt={quickViewProduct.name}
                  fill
                  sizes="40vw"
                  className="quickview-img"
                />
              </div>

              <div className="quickview-content">
                <span className="quickview-tag">{quickViewProduct.tag}</span>
                <h2>{quickViewProduct.name}</h2>
                <div className="rating-stars">
                  <span>★★★★★ {quickViewProduct.rating}</span>
                  <small>({quickViewProduct.reviews} customer reviews)</small>
                </div>

                <div className="quickview-price-row">
                  <span className="price-main">{quickViewProduct.price}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="price-old">{quickViewProduct.originalPrice}</span>
                  )}
                  <span className="tax-info">Inclusive of all taxes</span>
                </div>

                <p className="quickview-desc">{quickViewProduct.description}</p>

                {/* Grain & Quality Specs */}
                <div className="quickview-specs">
                  <div className="spec-item">
                    <span>Grain Elongation:</span>
                    <strong>Extra Long (2x Expansion)</strong>
                  </div>
                  <div className="spec-item">
                    <span>Aroma Score:</span>
                    <strong>Authentic Natural Fragrance</strong>
                  </div>
                  <div className="spec-item">
                    <span>Moisture Content:</span>
                    <strong>Below 12.5% (Aged Standard)</strong>
                  </div>
                  <div className="spec-item">
                    <span>Origin:</span>
                    <strong>Panipat & Karnal Paddy Belt</strong>
                  </div>
                </div>

                {/* Pack Weight Selector */}
                <div className="quickview-weight-selector">
                  <label>Select Pack Size:</label>
                  <div className="weight-options">
                    {quickViewProduct.weights.map((w) => {
                      const selected =
                        (selectedWeights[quickViewProduct.id] || quickViewProduct.weights[0]) === w;
                      return (
                        <button
                          key={w}
                          type="button"
                          className={selected ? "weight-pill weight-pill--active" : "weight-pill"}
                          onClick={() => handleSelectWeight(quickViewProduct.id, w)}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Adjustment */}
                <div className="quickview-action-row">
                  <div className="qty-counter">
                    <button
                      type="button"
                      onClick={() => setQuickViewQuantity((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span>{quickViewQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuickViewQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn--primary-ecom"
                    onClick={() => {
                      handleAddToCart(quickViewProduct, quickViewQuantity);
                      setQuickViewProduct(null);
                    }}
                  >
                    Add {quickViewQuantity} to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern E-Commerce Hero */}
      <section className="ecom-hero">
        <div className="container ecom-hero__grid">
          <div className="ecom-hero__content">
            <span className="ecom-badge">🌾 Direct Factory Mill Store</span>
            <h1>Pure Basmati Rice & Quality Food Produce</h1>
            <p className="ecom-hero__subtitle">
              Sourced directly from India’s finest paddy fields. 100% aged Basmati, unpolished pulses, and industrial wholesale packs delivered at mill-direct rates.
            </p>

            {/* Search Bar */}
            <div className="ecom-hero__search">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search Royal Basmati, Non-Basmati, Pulses, or Bulk Sacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" className="clear-search" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>

            <div className="ecom-hero__actions">
              <a href="#products-catalog" className="btn btn--primary-ecom">
                Explore Store Catalog
              </a>
              <a href="https://wa.me/919953199155" target="_blank" rel="noreferrer" className="btn btn--outline-ecom">
                Request Wholesale Quote
              </a>
            </div>

            <div className="ecom-hero__trust-pills">
              <div className="trust-pill">
                <span className="trust-icon">✓</span>
                <span>ISO 22000 Certified Mill</span>
              </div>
              <div className="trust-pill">
                <span className="trust-icon">✓</span>
                <span>Factory Direct Pricing</span>
              </div>
              <div className="trust-pill">
                <span className="trust-icon">✓</span>
                <span>Export & Domestic Supply</span>
              </div>
            </div>
          </div>

          <div className="ecom-hero__banner">
            <div className="hero-product-card">
              <div className="hero-product-card__badge">🔥 Best Seller</div>
              <div className="hero-product-card__image-wrap">
                <Image
                  src="/images/snt1.jpg"
                  alt="SNT Royal Basmati Rice"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="hero-product-card__img"
                />
              </div>
              <div className="hero-product-card__info">
                <h3>SNT Premium Royal Basmati Rice</h3>
                <div className="rating-stars">
                  <span>★★★★★</span>
                  <small>(342 verified reviews)</small>
                </div>
                <div className="hero-product-card__price">
                  <span className="current-price">₹650</span>
                  <span className="old-price">₹780</span>
                  <span className="discount-tag">16% OFF</span>
                </div>
                <div className="hero-card-buttons">
                  <button
                    type="button"
                    className="btn btn--cart-quick"
                    onClick={() => handleAddToCart(ecommerceProducts[0])}
                  >
                    Quick Add +
                  </button>
                  <button
                    type="button"
                    className="btn btn--quickview"
                    onClick={() => {
                      setQuickViewProduct(ecommerceProducts[0]);
                      setQuickViewQuantity(1);
                    }}
                  >
                    Quick View 👁️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <section className="ecom-features-bar">
        <div className="container ecom-features-bar__grid">
          <div className="feature-item">
            <div className="feature-item__icon">🏭</div>
            <div>
              <strong>Direct Mill Rates</strong>
              <p>Zero middlemen. Direct pricing for home & trade.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item__icon">🌾</div>
            <div>
              <strong>100% Aged Grain</strong>
              <p>Naturally aged for maximum fluffy elongation.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item__icon">📦</div>
            <div>
              <strong>Hygienic Moisture Pack</strong>
              <p>Sealed food-grade bags keeping freshness intact.</p>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-item__icon">🚚</div>
            <div>
              <strong>All-India Express Logistics</strong>
              <p>Reliable dispatch for retail stores & exporters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mill Direct Flash Deal Banner */}
      <section className="ecom-flash-banner">
        <div className="container flash-banner__inner">
          <div className="flash-banner__content">
            <span className="flash-tag">⚡ Limited Wholesale Deal</span>
            <h2>Get Special Mill Discount on Orders Over 50 Sacks</h2>
            <p>Direct supply for supermarkets, hotels, restaurants, and export shipments.</p>
          </div>
          <a href="https://wa.me/919953199155?text=Hello%20SNT%20Agro,%20I%20am%20interested%20in%20bulk%20orders%20over%2050%20sacks." target="_blank" rel="noreferrer" className="btn btn--flash-cta">
            Claim Bulk Rate Now →
          </a>
        </div>
      </section>

      {/* Main E-Commerce Product Catalog Section */}
      <section id="products-catalog" className="ecom-catalog-section">
        <div className="container">
          <div className="ecom-catalog-head">
            <div>
              <p className="ecom-section-eyebrow">Store Catalog</p>
              <h2>Explore Our Grain & Food Range</h2>
            </div>

            {/* Controls: Category Tabs & Sorting Dropdown */}
            <div className="ecom-catalog-controls">
              <div className="ecom-category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={selectedCategory === cat ? "cat-tab cat-tab--active" : "cat-tab"}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="ecom-sort-wrapper">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="ecom-sort-select"
                >
                  <option value="featured">Featured Items</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="ecom-no-results">
              <p>No products found matching your filter criteria.</p>
              <button
                type="button"
                className="btn btn--outline-ecom"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSortBy("featured");
                }}
              >
                Reset Store Filters
              </button>
            </div>
          ) : (
            <div className="ecom-product-grid">
              {filteredAndSortedProducts.map((product) => {
                const currentWeight = selectedWeights[product.id] || product.weights[0];
                return (
                  <article className="ecom-product-card" key={product.id}>
                    <div className="ecom-product-card__media">
                      <span className="ecom-product-card__tag">{product.tag}</span>
                      <Image
                        src={product.src}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        className="ecom-product-card__img"
                      />
                      <button
                        type="button"
                        className="card-quick-overlay"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewQuantity(1);
                        }}
                      >
                        Quick View 👁️
                      </button>
                    </div>

                    <div className="ecom-product-card__content">
                      <span className="ecom-product-card__cat">{product.category}</span>
                      <h3
                        className="ecom-product-card__title"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewQuantity(1);
                        }}
                      >
                        {product.name}
                      </h3>

                      <div className="ecom-product-card__rating">
                        <span className="stars">★ {product.rating}</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                      </div>

                      <p className="ecom-product-card__desc">{product.description}</p>

                      {/* Weight Selector */}
                      <div className="ecom-weight-selector">
                        <span className="weight-label">Pack size:</span>
                        <div className="weight-options">
                          {product.weights.map((w) => (
                            <button
                              key={w}
                              type="button"
                              className={currentWeight === w ? "weight-pill weight-pill--active" : "weight-pill"}
                              onClick={() => handleSelectWeight(product.id, w)}
                            >
                              {w}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="ecom-product-card__footer">
                        <div className="ecom-price-box">
                          <span className="price-main">{product.price}</span>
                          {product.originalPrice && <span className="price-old">{product.originalPrice}</span>}
                        </div>

                        <button
                          type="button"
                          className="btn btn--add-cart"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews & Testimonials Section */}
      <section className="ecom-reviews-section">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Customer Feedback</p>
            <h2>Trusted by Thousands of Buyers Across India</h2>
          </div>

          <div className="ecom-reviews-grid">
            {customerReviews.map((rev) => (
              <div className="ecom-review-card" key={rev.name}>
                <div className="review-card__stars">★★★★★</div>
                <p className="review-card__comment">&ldquo;{rev.comment}&rdquo;</p>
                <div className="review-card__user">
                  <strong>{rev.name}</strong>
                  <span>{rev.role} • <small className="verified-badge">✓ {rev.date}</small></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Premium Product Categories Section */}
      <section id="products" className="ecom-categories-section">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Explore By Category</p>
            <h2>Featured Product Lines</h2>
            <p className="ecom-section-subtitle">
              SNT Agro Industries manufactures, processes, and packs premium food grains tailored for home consumption, retail shelves, and bulk exports.
            </p>
          </div>

          <div className="ecom-categories-grid">
            {productCategoriesData.map((cat) => (
              <article
                className="ecom-cat-card"
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.filterKey);
                  const catalogElem = document.getElementById("products-catalog");
                  if (catalogElem) {
                    catalogElem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <div className="ecom-cat-card__media">
                  <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 900px) 100vw, 50vw" className="ecom-cat-card__img" />
                  <div className="ecom-cat-card__overlay" />
                  <span className="ecom-cat-card__badge">{cat.badge}</span>
                  <span className="ecom-cat-card__count">{cat.count}</span>
                </div>

                <div className="ecom-cat-card__content">
                  <div className="ecom-cat-card__header">
                    <span className="ecom-cat-card__icon">{cat.icon}</span>
                    <div>
                      <h3>{cat.name}</h3>
                      <span className="ecom-cat-card__pack">{cat.pack}</span>
                    </div>
                  </div>

                  <p className="ecom-cat-card__desc">{cat.description}</p>

                  <div className="ecom-cat-card__features">
                    {cat.features.map((feat) => (
                      <span key={feat} className="feat-chip">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>

                  <div className="ecom-cat-card__footer">
                    <span className="btn-link-cat">
                      Shop {cat.name} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company Trust & Values */}
      <section className="customer-section customer-section--white border-top-light">
        <div className="container">
          <div className="customer-section__head customer-section__head--wide">
            <p className="customer-eyebrow">Why Choose SNT Agro</p>
            <h2>Uncompromised Quality & Reliable Business Supply</h2>
          </div>
          <div className="customer-value-grid">
            {companyValues.map((item, index) => (
              <article className="customer-value" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale & Institutional Enquiries Portal */}
      <section className="customer-portals">
        <div className="container customer-portals__single">
          <article className="customer-portal customer-portal--public">
            <span>Wholesale & Export Enquiries</span>
            <h2>Direct Factory Order Support for Trade Buyers</h2>
            <p>
              Need bulk quantity bags for commercial, retail, or export requirements? Our sales team provides customized pricing and instant order processing.
            </p>
            <div className="customer-portal__actions">
              <Link href="https://wa.me/919953199155" className="btn btn--dark">
                Instant WhatsApp Quote
              </Link>
              <Link href="#contact" className="customer-text-link">
                View Contact Info <span>-&gt;</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Locations */}
      <section className="customer-section customer-section--white">
        <div className="container">
          <div className="customer-section__head customer-section__head--wide">
            <p className="customer-eyebrow">Operating Units</p>
            <h2>Works & Office Locations</h2>
          </div>
          <div className="customer-location-grid">
            {companyLocations.map((location) => (
              <article className="customer-location" key={location.label}>
                <span>{location.label}</span>
                <p>{location.address}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="customer-contact">
        <div className="container customer-contact__grid">
          <div>
            <p className="customer-eyebrow">Get In Touch</p>
            <h2>Reach SNT Agro Industries Pvt. Ltd.</h2>
          </div>
          <div className="customer-contact__channels">
            {supportChannels.map((item) => (
              <div className="customer-contact__item" key={item.label}>
                <span>{item.label}</span>
                {item.href ? (
                  <strong>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className={isExternalWhatsApp(item.href) ? "contact-action contact-action--whatsapp" : "contact-action"}
                    >
                      {isExternalWhatsApp(item.href) ? (
                        <>
                          <span className="contact-action__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M19.05 4.94A9.9 9.9 0 0 0 12 2a9.93 9.93 0 0 0-8.61 14.88L2 22l5.28-1.38A9.93 9.93 0 1 0 19.05 4.94ZM12 20.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.13.82.84-3.05-.2-.31A8.12 8.12 0 1 1 12 20.13Zm4.45-6.08c-.24-.12-1.4-.69-1.62-.77-.21-.08-.36-.12-.52.12-.15.23-.6.77-.73.93-.13.16-.26.18-.49.06a6.64 6.64 0 0 1-1.95-1.2 7.34 7.34 0 0 1-1.35-1.68c-.14-.23-.01-.35.1-.47.1-.1.23-.26.34-.39.11-.13.14-.22.22-.37.07-.15.04-.29-.02-.41-.06-.12-.52-1.25-.71-1.71-.19-.45-.38-.39-.52-.4h-.44c-.15 0-.4.06-.6.29-.21.23-.8.78-.8 1.89s.82 2.19.93 2.34c.12.15 1.63 2.49 3.95 3.5.55.24.98.38 1.31.49.55.17 1.05.15 1.44.09.44-.07 1.4-.57 1.6-1.12.2-.56.2-1.03.14-1.13-.05-.1-.2-.16-.43-.28Z"
                              />
                            </svg>
                          </span>
                          <span>{item.value}</span>
                        </>
                      ) : (
                        item.value
                      )}
                    </a>
                  </strong>
                ) : (
                  <strong>{item.value}</strong>
                )}
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
