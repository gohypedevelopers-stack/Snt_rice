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
  getProductPrice,
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
        const weightA = selectedWeights[a.id] || a.weights[0];
        const weightB = selectedWeights[b.id] || b.weights[0];
        const pA = parseInt(getProductPrice(a, weightA).price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(getProductPrice(b, weightB).price.replace(/[^\d]/g, "")) || 0;
        return pA - pB;
      });
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => {
        const weightA = selectedWeights[a.id] || a.weights[0];
        const weightB = selectedWeights[b.id] || b.weights[0];
        const pA = parseInt(getProductPrice(a, weightA).price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(getProductPrice(b, weightB).price.replace(/[^\d]/g, "")) || 0;
        return pB - pA;
      });
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, selectedWeights]);

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
      const priceObj = getProductPrice(item.product, item.weight);
      const priceNum = parseInt(priceObj.price.replace(/[^\d]/g, "")) || 0;
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
      const priceObj = getProductPrice(item.product, item.weight);
      message += `${idx + 1}. ${item.product.name} (${item.weight}) x ${item.quantity} - ${priceObj.price}\n`;
    });
    message += `\nEstimated Total: ₹${totalCartValue.toLocaleString()}\nPlease confirm availability and delivery timeframe.`;
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
                  {cart.map((item, index) => {
                    const priceObj = getProductPrice(item.product, item.weight);
                    return (
                      <div className="cart-item" key={`${item.product.id}-${item.weight}-${index}`}>
                        <div className="cart-item__image">
                          <Image src={item.product.src} alt={item.product.name} width={60} height={60} />
                        </div>
                        <div className="cart-item__info">
                          <h4>{item.product.name}</h4>
                          <span className="cart-item__weight">Pack: {item.weight}</span>
                          <div className="cart-item__qty-price">
                            <span>Qty: {item.quantity}</span>
                            <strong>{priceObj.price}</strong>
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
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="ecom-cart-drawer__footer">
                <div className="cart-summary-line">
                  <span>Subtotal (Estimated)</span>
                  <strong>₹{totalCartValue.toLocaleString()}</strong>
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
      {quickViewProduct && (() => {
        const qvWeight = selectedWeights[quickViewProduct.id] || quickViewProduct.weights[0];
        const qvPriceObj = getProductPrice(quickViewProduct, qvWeight);
        return (
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
                    <span className="price-main">{qvPriceObj.price}</span>
                    {qvPriceObj.originalPrice && (
                      <span className="price-old">{qvPriceObj.originalPrice}</span>
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
                        const selected = qvWeight === w;
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
                        handleAddToCart(quickViewProduct, quickViewQuantity, qvWeight);
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
        );
      })()}

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
            {(() => {
              const heroProduct = ecommerceProducts[0];
              const heroWeight = selectedWeights[heroProduct.id] || heroProduct.weights[0];
              const heroPriceObj = getProductPrice(heroProduct, heroWeight);
              return (
                <div className="hero-product-card">
                  <div className="hero-product-card__badge">🔥 Best Seller</div>
                  <div className="hero-product-card__image-wrap">
                    <Image
                      src={heroProduct.src}
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

                    {/* Weight pills in Hero */}
                    <div className="ecom-weight-selector" style={{ marginBottom: "12px" }}>
                      <span className="weight-label">Pack size:</span>
                      <div className="weight-options">
                        {heroProduct.weights.map((w) => (
                          <button
                            key={w}
                            type="button"
                            className={heroWeight === w ? "weight-pill weight-pill--active" : "weight-pill"}
                            onClick={() => handleSelectWeight(heroProduct.id, w)}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="hero-product-card__price">
                      <span className="current-price">{heroPriceObj.price}</span>
                      {heroPriceObj.originalPrice && (
                        <span className="old-price">{heroPriceObj.originalPrice}</span>
                      )}
                    </div>

                    <div className="hero-card-buttons">
                      <button
                        type="button"
                        className="btn btn--cart-quick"
                        onClick={() => handleAddToCart(heroProduct, 1, heroWeight)}
                      >
                        Quick Add +
                      </button>
                      <button
                        type="button"
                        className="btn btn--quickview"
                        onClick={() => {
                          setQuickViewProduct(heroProduct);
                          setQuickViewQuantity(1);
                        }}
                      >
                        Quick View 👁️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
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
                const currentPriceObj = getProductPrice(product, currentWeight);
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
                          <span className="price-main">{currentPriceObj.price}</span>
                          {currentPriceObj.originalPrice && (
                            <span className="price-old">{currentPriceObj.originalPrice}</span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="btn btn--add-cart"
                          onClick={() => handleAddToCart(product, 1, currentWeight)}
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

      {/* Company Trust & Values (Pure White & Modern UI) */}
      <section className="ecom-trust-section">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Why Choose SNT Agro</p>
            <h2>Uncompromised Quality & Reliable Business Supply</h2>
          </div>

          <div className="ecom-trust-grid">
            {companyValues.map((item, index) => {
              const icons = ["🏭", "🌍", "🌾"];
              return (
                <article className="ecom-trust-card" key={item.title}>
                  <div className="ecom-trust-card__top">
                    <span className="ecom-trust-icon">{icons[index % icons.length]}</span>
                    <span className="ecom-trust-number">0{index + 1}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Wholesale & Institutional Enquiries Portal (Pure White Box) */}
      <section className="ecom-portal-section">
        <div className="container">
          <div className="ecom-portal-card">
            <span className="ecom-portal-tag">Wholesale & Export Enquiries</span>
            <h2>Direct Factory Order Support for Trade Buyers</h2>
            <p>
              Need bulk quantity bags for commercial, retail, or export requirements? Our sales team provides customized pricing, sample testing, and instant order processing.
            </p>
            <div className="ecom-portal-actions">
              <Link href="https://wa.me/919953199155" target="_blank" rel="noreferrer" className="btn btn--primary-ecom">
                💬 Instant WhatsApp Quote
              </Link>
              <Link href="#contact" className="btn btn--outline-ecom">
                📞 View Contact Info →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations (Pure White Modern Card Grid) */}
      <section className="ecom-locations-section">
        <div className="container">
          <div className="ecom-section-center">
            <p className="ecom-section-eyebrow">Operating Units</p>
            <h2>Works & Office Locations</h2>
          </div>

          <div className="ecom-locations-grid">
            {companyLocations.map((location) => (
              <article className="ecom-location-card" key={location.label}>
                <div className="ecom-location-header">
                  <span className="location-pin">📍</span>
                  <h3>{location.label}</h3>
                </div>
                <p>{location.address}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Pure White Clean Layout) */}
      <section id="contact" className="ecom-contact-section">
        <div className="container ecom-contact-grid">
          <div className="ecom-contact-info">
            <p className="ecom-section-eyebrow">Get In Touch</p>
            <h2>Reach SNT Agro Industries Pvt. Ltd.</h2>
            <p className="contact-subtitle">
              Have questions regarding product catalog, bulk pricing, or mill dispatches? Reach out directly via Phone, WhatsApp, or Email.
            </p>
          </div>

          <div className="ecom-contact-channels">
            {supportChannels.map((item) => (
              <div className="ecom-contact-channel-card" key={item.label}>
                <span>{item.label}</span>
                {item.href ? (
                  <strong>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {item.value}
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
