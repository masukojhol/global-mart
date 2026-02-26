import { useState } from 'react';
import { Modal } from '../common/Modal';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';
import { formatKRW, toUSD } from '../../utils/helpers';
import { useWindowSize } from '../../hooks/useWindowSize';
import { PRODUCTS, FLASH_DEALS } from '../../data/products';

// Generate fake reviews for demo
const generateReviews = (productId, rating) => {
  const reviewers = [
    { name: 'Ramesh K.', country: 'Nepal', avatar: '🇳🇵' },
    { name: 'Priya S.', country: 'India', avatar: '🇮🇳' },
    { name: 'Ahmed M.', country: 'Pakistan', avatar: '🇵🇰' },
    { name: 'Sujata T.', country: 'Nepal', avatar: '🇳🇵' },
    { name: 'Vikram R.', country: 'India', avatar: '🇮🇳' },
    { name: 'Fatima A.', country: 'Pakistan', avatar: '🇵🇰' },
    { name: 'Min-jun K.', country: 'Korea', avatar: '🇰🇷' },
    { name: 'Binod G.', country: 'Nepal', avatar: '🇳🇵' },
  ];

  const comments = [
    'Exactly like back home! The taste is authentic and brings back memories.',
    'Great quality product. Fast delivery too. Will order again!',
    'Perfect for my family. We use this every week.',
    'Good value for money. Recommended for all expats!',
    'Finally found this in Korea! So happy with the purchase.',
    'The quality is excellent. Just like what my mother used to buy.',
    'Arrived quickly and well packaged. Very satisfied.',
    'Best I have found in Korea. Authentic taste!',
  ];

  const numReviews = 3 + (productId % 5);
  const reviews = [];

  for (let i = 0; i < numReviews; i++) {
    const reviewer = reviewers[(productId + i) % reviewers.length];
    const daysAgo = 1 + ((productId * (i + 1)) % 30);
    reviews.push({
      id: i + 1,
      ...reviewer,
      rating: Math.max(3, Math.min(5, rating - (i % 2))),
      comment: comments[(productId + i) % comments.length],
      date: `${daysAgo} days ago`,
      helpful: 5 + ((productId * i) % 20),
      images: i === 0 ? [`https://picsum.photos/seed/${productId}${i}/200/200`] : [],
    });
  }

  return reviews;
};

// Product specifications based on category
const getSpecifications = (product) => {
  return [
    { label: 'Origin', value: product.origin || 'South Asia' },
    { label: 'Weight', value: product.weight || '500g' },
    { label: 'Brand', value: product.brand || 'Authentic Import' },
    { label: 'Shelf Life', value: '12 months' },
    { label: 'Storage', value: 'Store in cool, dry place' },
    { label: 'Product Code', value: `GM-${product.id.toString().padStart(6, '0')}` },
  ];
};

// Star Rating Component
function StarRating({ rating, size = 14, showCount = false, count = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: size,
              color: star <= rating ? '#ffc107' : '#e0e0e0',
            }}
          >
            ★
          </span>
        ))}
      </div>
      {showCount && (
        <span style={{
          fontSize: 13,
          color: '#666',
          marginLeft: 4,
        }}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

// Review Item Component
function ReviewItem({ review }) {
  const [helpful, setHelpful] = useState(false);

  return (
    <div style={{
      padding: '16px 0',
      borderBottom: '1px solid #f0f0f0',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>
          {review.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>
            {review.name}
          </p>
          <p style={{ fontSize: 11, color: '#999', margin: '2px 0 0' }}>
            {review.country} · {review.date}
          </p>
        </div>
        <StarRating rating={review.rating} size={12} />
      </div>

      <p style={{
        fontSize: 14,
        color: '#333',
        lineHeight: 1.6,
        margin: '0 0 10px',
      }}>
        {review.comment}
      </p>

      {review.images?.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {review.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Review"
              style={{
                width: 70,
                height: 70,
                objectFit: 'cover',
                borderRadius: 6,
                border: '1px solid #eee',
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={() => setHelpful(!helpful)}
        style={{
          background: helpful ? '#f0f7ff' : '#fff',
          border: `1px solid ${helpful ? '#346aff' : '#ddd'}`,
          padding: '6px 12px',
          fontSize: 12,
          color: helpful ? '#346aff' : '#666',
          cursor: 'pointer',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        👍 Helpful ({review.helpful + (helpful ? 1 : 0)})
      </button>
    </div>
  );
}

// Similar Products Component (Coupang-style horizontal scroll)
function SimilarProducts({ currentProduct, onProductClick, addItem }) {
  const allProducts = [...PRODUCTS, ...FLASH_DEALS];
  const similarProducts = allProducts
    .filter(p =>
      p.id !== currentProduct.id &&
      (p.origin === currentProduct.origin || p.category === currentProduct.category)
    )
    .slice(0, 10);

  if (similarProducts.length < 4) {
    const moreProducts = allProducts
      .filter(p => p.id !== currentProduct.id && !similarProducts.find(sp => sp.id === p.id))
      .slice(0, 6 - similarProducts.length);
    similarProducts.push(...moreProducts);
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{
        fontSize: 16,
        fontWeight: 600,
        margin: '0 0 14px',
        color: '#333',
      }}>
        Similar Products
      </h3>

      <div style={{
        display: 'flex',
        gap: 10,
        overflowX: 'auto',
        paddingBottom: 10,
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}>
        {similarProducts.map((product) => {
          const price = product.salePrice || product.price;
          return (
            <div
              key={product.id}
              onClick={() => onProductClick?.(product)}
              style={{
                minWidth: 130,
                maxWidth: 130,
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 8,
                overflow: 'hidden',
                cursor: 'pointer',
                scrollSnapAlign: 'start',
              }}
            >
              <div style={{
                aspectRatio: '1/1',
                background: '#f8f8f8',
                position: 'relative',
              }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {product.discount && (
                  <span style={{
                    position: 'absolute',
                    top: 6,
                    left: 6,
                    background: '#ff4757',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 5px',
                    borderRadius: 3,
                  }}>
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div style={{ padding: 8 }}>
                <p style={{
                  fontSize: 11,
                  color: '#333',
                  margin: 0,
                  lineHeight: 1.3,
                  height: 28,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {product.name}
                </p>
                <p style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: product.discount ? '#ff4757' : '#333',
                  margin: '6px 0 0',
                }}>
                  ₩{formatKRW(price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductDetailModal({ isOpen, onClose, product, onProductClick }) {
  const { isMobile } = useWindowSize();
  const { addItem, openCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('detail');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!product) return null;

  const reviews = generateReviews(product.id, product.rating);
  const specifications = getSpecifications(product);

  // Generate multiple product images
  const images = [
    product.img || product.image,
    `https://picsum.photos/seed/${product.id}a/600/600`,
    `https://picsum.photos/seed/${product.id}b/600/600`,
    `https://picsum.photos/seed/${product.id}c/600/600`,
    `https://picsum.photos/seed/${product.id}d/600/600`,
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    openCart();
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onClose();
    openCart();
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const discountedPrice = product.salePrice || product.price;
  const originalPrice = product.originalPrice || (product.discount ? Math.round(discountedPrice / (1 - product.discount / 100)) : null);
  const reviewCount = 100 + product.id * 23;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="xl"
    >
      <div style={{ margin: '-24px', background: '#fff' }}>
        {/* Breadcrumb */}
        <div style={{
          padding: '12px 20px',
          fontSize: 12,
          color: '#666',
          borderBottom: '1px solid #f0f0f0',
          background: '#fafafa',
        }}>
          <span style={{ color: '#999' }}>Home</span>
          <span style={{ margin: '0 8px', color: '#ccc' }}>›</span>
          <span style={{ color: '#999' }}>{product.origin}</span>
          <span style={{ margin: '0 8px', color: '#ccc' }}>›</span>
          <span style={{ color: '#333' }}>{product.category || 'Products'}</span>
        </div>

        {/* Main Content - Coupang Layout */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          padding: isMobile ? 16 : 24,
          gap: isMobile ? 20 : 32,
        }}>
          {/* Left: Image Gallery */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 12,
            flex: isMobile ? 'none' : '0 0 50%',
          }}>
            {/* Thumbnails - Vertical on desktop */}
            {!isMobile && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: 60,
              }}>
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    onMouseEnter={() => setSelectedImage(idx)}
                    style={{
                      width: 60,
                      height: 60,
                      border: `2px solid ${selectedImage === idx ? '#346aff' : '#e0e0e0'}`,
                      borderRadius: 4,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Main Image with Zoom */}
            <div style={{ flex: 1, position: 'relative' }}>
              <div
                onMouseEnter={() => !isMobile && setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  border: '1px solid #e0e0e0',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: isZoomed ? 'zoom-in' : 'default',
                }}
              >
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: '#fff',
                  }}
                />

                {/* Badges */}
                <div style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}>
                  {product.discount && (
                    <span style={{
                      background: '#ff4757',
                      color: '#fff',
                      padding: '4px 8px',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 4,
                    }}>
                      {product.discount}% OFF
                    </span>
                  )}
                  {product.rocket && (
                    <span style={{
                      background: '#346aff',
                      color: '#fff',
                      padding: '4px 8px',
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      🚀 Rocket
                    </span>
                  )}
                </div>
              </div>

              {/* Zoom Preview Box */}
              {isZoomed && !isMobile && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 'calc(100% + 16px)',
                  width: 350,
                  height: 350,
                  border: '1px solid #e0e0e0',
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: '#fff',
                  zIndex: 10,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}>
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    style={{
                      width: '200%',
                      height: '200%',
                      objectFit: 'cover',
                      transform: `translate(-${zoomPosition.x}%, -${zoomPosition.y}%)`,
                    }}
                  />
                </div>
              )}

              {/* Mobile Dots */}
              {isMobile && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 6,
                  marginTop: 12,
                }}>
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        width: selectedImage === idx ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: selectedImage === idx ? '#346aff' : '#ddd',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div style={{ flex: 1 }}>
            {/* Seller / Origin */}
            <p style={{
              fontSize: 13,
              color: '#346aff',
              margin: '0 0 8px',
              fontWeight: 500,
            }}>
              {product.flag} {product.origin} Store
            </p>

            {/* Product Title */}
            <h1 style={{
              fontSize: isMobile ? 18 : 22,
              fontWeight: 400,
              margin: '0 0 12px',
              lineHeight: 1.4,
              color: '#111',
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}>
              <StarRating rating={product.rating} size={16} />
              <span style={{ fontSize: 14, color: '#346aff', cursor: 'pointer' }}>
                {reviewCount.toLocaleString()} reviews
              </span>
              <span style={{ fontSize: 13, color: '#999' }}>|</span>
              <span style={{ fontSize: 13, color: '#999' }}>
                {(500 + product.id * 17).toLocaleString()}+ sold
              </span>
            </div>

            {/* Price Section */}
            <div style={{
              background: '#fafafa',
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
            }}>
              {product.discount && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: '#ff4757',
                  }}>
                    {product.discount}%
                  </span>
                  {originalPrice && (
                    <span style={{
                      fontSize: 16,
                      color: '#999',
                      textDecoration: 'line-through',
                    }}>
                      ₩{formatKRW(originalPrice)}
                    </span>
                  )}
                </div>
              )}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
              }}>
                <span style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#111',
                }}>
                  ₩{formatKRW(discountedPrice)}
                </span>
                <span style={{
                  fontSize: 14,
                  color: '#666',
                }}>
                  ≈ ${toUSD(discountedPrice)}
                </span>
              </div>
            </div>

            {/* Delivery Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 0',
              borderBottom: '1px solid #f0f0f0',
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 24 }}>🚚</span>
              <div>
                <p style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: product.rocket ? '#346aff' : '#333',
                  margin: 0,
                }}>
                  {product.rocket ? '🚀 Rocket Delivery' : 'Standard Delivery'}
                </p>
                <p style={{
                  fontSize: 13,
                  color: '#666',
                  margin: '2px 0 0',
                }}>
                  {product.rocket ? 'Arrives tomorrow before 7 AM' : 'Arrives in 2-3 business days'}
                </p>
              </div>
            </div>

            {/* Quantity Selector + Buttons */}
            <div style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              marginBottom: 20,
            }}>
              {/* Quantity */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: 4,
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: 36,
                    height: 40,
                    background: '#fff',
                    border: 'none',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  style={{
                    width: 50,
                    height: 40,
                    textAlign: 'center',
                    border: 'none',
                    borderLeft: '1px solid #ddd',
                    borderRight: '1px solid #ddd',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: 36,
                    height: 40,
                    background: '#fff',
                    border: 'none',
                    fontSize: 18,
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  height: 48,
                  background: '#fff',
                  border: '2px solid #346aff',
                  borderRadius: 4,
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#346aff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Put in a shopping cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  height: 48,
                  background: '#346aff',
                  border: 'none',
                  borderRadius: 4,
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
              >
                Buy Now
                <span style={{ fontSize: 18 }}>›</span>
              </button>
            </div>

            {/* Product Specs (Coupang-style bullet list) */}
            <div style={{
              background: '#fafafa',
              padding: 16,
              borderRadius: 8,
            }}>
              <ul style={{
                margin: 0,
                padding: '0 0 0 20px',
                listStyle: 'disc',
              }}>
                {specifications.map((spec, idx) => (
                  <li key={idx} style={{
                    fontSize: 13,
                    color: '#333',
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}>
                    <span style={{ color: '#666' }}>{spec.label}:</span> {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{ borderTop: '8px solid #f5f5f5' }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e0e0e0',
            background: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}>
            {[
              { id: 'detail', label: 'Product Detail' },
              { id: 'reviews', label: `Reviews (${reviews.length})` },
              { id: 'qa', label: 'Q&A' },
              { id: 'shipping', label: 'Shipping Info' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: `3px solid ${activeTab === tab.id ? '#346aff' : 'transparent'}`,
                  fontSize: 14,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#346aff' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: 20 }}>
            {activeTab === 'detail' && (
              <div>
                <p style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: '#333',
                  marginBottom: 20,
                }}>
                  {product.description || `Authentic ${product.name} imported directly from ${product.origin}.
                  This premium quality product brings the authentic taste of home to your kitchen in Korea.
                  Perfect for traditional recipes and everyday cooking.`}
                </p>

                {/* Long Product Images (Coupang-style) */}
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={`https://picsum.photos/seed/${product.id}long1/600/800`}
                    alt="Product detail 1"
                    style={{
                      width: '100%',
                      maxWidth: 500,
                      marginBottom: 16,
                      borderRadius: 4,
                    }}
                  />
                  <img
                    src={`https://picsum.photos/seed/${product.id}long2/600/600`}
                    alt="Product detail 2"
                    style={{
                      width: '100%',
                      maxWidth: 500,
                      marginBottom: 16,
                      borderRadius: 4,
                    }}
                  />
                  <img
                    src={`https://picsum.photos/seed/${product.id}long3/600/700`}
                    alt="Product detail 3"
                    style={{
                      width: '100%',
                      maxWidth: 500,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Rating Summary */}
                <div style={{
                  display: 'flex',
                  gap: 24,
                  padding: 20,
                  background: '#fafafa',
                  borderRadius: 8,
                  marginBottom: 20,
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{
                      fontSize: 48,
                      fontWeight: 300,
                      margin: 0,
                      color: '#111',
                    }}>
                      {product.rating.toFixed(1)}
                    </p>
                    <StarRating rating={product.rating} size={18} />
                    <p style={{
                      fontSize: 13,
                      color: '#999',
                      margin: '8px 0 0',
                    }}>
                      {reviewCount.toLocaleString()} reviews
                    </p>
                  </div>

                  <div style={{ flex: 1 }}>
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percent = star === 5 ? 65 : star === 4 ? 25 : star === 3 ? 7 : star === 2 ? 2 : 1;
                      return (
                        <div key={star} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 4,
                        }}>
                          <span style={{ fontSize: 12, width: 15 }}>{star}</span>
                          <span style={{ fontSize: 12, color: '#ffc107' }}>★</span>
                          <div style={{
                            flex: 1,
                            height: 8,
                            background: '#e0e0e0',
                            borderRadius: 4,
                          }}>
                            <div style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: '#ffc107',
                              borderRadius: 4,
                            }} />
                          </div>
                          <span style={{
                            fontSize: 12,
                            color: '#999',
                            width: 35,
                            textAlign: 'right',
                          }}>
                            {percent}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review List */}
                {reviews.map((review) => (
                  <ReviewItem key={review.id} review={review} />
                ))}
              </div>
            )}

            {activeTab === 'qa' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <span style={{ fontSize: 48, opacity: 0.3 }}>💬</span>
                <p style={{ fontSize: 14, color: '#999', marginTop: 12 }}>
                  No questions yet. Be the first to ask!
                </p>
                <button style={{
                  marginTop: 16,
                  padding: '10px 24px',
                  background: '#346aff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>
                  Ask a Question
                </button>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <div style={{
                  padding: 16,
                  background: '#f0f7ff',
                  borderRadius: 8,
                  marginBottom: 16,
                }}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px', color: '#346aff' }}>
                    🚀 Rocket Delivery
                  </h4>
                  <p style={{ fontSize: 13, color: '#666', margin: 0, lineHeight: 1.6 }}>
                    Order by midnight, receive by 7 AM tomorrow!
                    Available for orders within Korea.
                  </p>
                </div>

                <div style={{
                  padding: 16,
                  background: '#fafafa',
                  borderRadius: 8,
                  marginBottom: 16,
                }}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px' }}>
                    📦 Standard Delivery
                  </h4>
                  <p style={{ fontSize: 13, color: '#666', margin: 0, lineHeight: 1.6 }}>
                    2-3 business days. Free delivery on orders over ₩30,000.
                  </p>
                </div>

                <div style={{
                  padding: 16,
                  background: '#fff9e6',
                  borderRadius: 8,
                }}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px', color: '#f59e0b' }}>
                    ⚠️ Important Notice
                  </h4>
                  <p style={{ fontSize: 13, color: '#666', margin: 0, lineHeight: 1.6 }}>
                    Food products cannot be returned due to hygiene regulations.
                    Please check expiration dates upon delivery.
                  </p>
                </div>
              </div>
            )}

            {/* Similar Products */}
            <SimilarProducts
              currentProduct={product}
              onProductClick={onProductClick}
              addItem={addItem}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;
