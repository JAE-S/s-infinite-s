// React Core Imports
import React, { useState, useMemo, useCallback } from 'react';
// Types & Interfaces Imports
import { ProductDataProps } from '@/types/product';
// Internal Component Imports
import InfoIcon from '@/components/icons/info';
import ShoppingCartIcon from '@/components/icons/shopping-cart';
import StarIcon from '@/components/icons/star';

type ProductCardProps = {
  product: ProductDataProps;
  layoutSize?: 'default' | 'compact';
};

// Class functions outside of component to prevent recreation on each render
const getClassesByLayout = {
  card: {
    base: 'flex flex-col gap-3 rounded-lg bg-gray-200 p-4 shadow-md h-full',
    compact: 'w-full',
    default: 'w-full max-w-72',
  },
  image: {
    base: 'relative w-full overflow-hidden',
    compact: 'h-40',
    default: 'h-48',
  },
  title: {
    compact: 'text-sm font-medium',
    default: 'text-base font-medium',
  },
  price: {
    compact: 'text-xs text-gray-400',
    default: 'text-sm text-gray-400',
  },
  iconSize: {
    compact: 14,
    default: 16,
  },
  cartIconSize: {
    compact: 20,
    default: 24,
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product, layoutSize = 'default' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Memoize class computations to prevent recalculation on every render
  const cardClasses = useMemo(
    () => `${getClassesByLayout.card.base} ${getClassesByLayout.card[layoutSize]}`,
    [layoutSize]
  );

  const imageClasses = useMemo(
    () => `${getClassesByLayout.image.base} ${getClassesByLayout.image[layoutSize]}`,
    [layoutSize]
  );

  const titleClasses = useMemo(
    () => `${getClassesByLayout.title[layoutSize]} line-clamp-2 overflow-hidden`,
    [layoutSize]
  );

  const priceClasses = useMemo(() => getClassesByLayout.price[layoutSize], [layoutSize]);

  const iconSize = getClassesByLayout.iconSize[layoutSize];
  const cartIconSize = getClassesByLayout.cartIconSize[layoutSize];

  // Toggle tooltip handlers with proper inline functions for exhaustive-deps
  const handleTooltipShow = useCallback(() => setShowTooltip(true), []);
  const handleTooltipHide = useCallback(() => setShowTooltip(false), []);

  // Handle image loading error
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder-image.jpg';
  }, []);

  // Memoize the rating component to prevent recreation on each render
  const ratingComponent = useMemo(() => {
    if (!product.rating) return null;

    return (
      <div
        className="flex items-center"
        aria-label={`Rating: ${product.rating} out of 5 stars`}
        data-testid={`product-rating-${product.id}`}
      >
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={`start-icon-${i}`}
            width={iconSize}
            height={iconSize}
            className={i < Math.floor(product.rating) ? 'text-primary' : 'text-gray-300'}
            aria-hidden="true"
            data-testid={`star-icon-${product.id}-${i}`}
          />
        ))}
        <span className="sr-only">{product.rating} out of 5 stars</span>
      </div>
    );
  }, [product.rating, iconSize, product.id]);

  return (
    <article
      className={cardClasses}
      aria-labelledby={`product-title-${product.id}`}
      data-testid={`product-card-${product.id}`}
      itemScope
      itemType="https://schema.org/Product"
      id={`product-${product.id}`}
    >
      <div className="flex items-center justify-between">
        {/* Info icon and tooltip */}
        <div className="relative">
          <button
            className="ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Product information for ${product.title}`}
            onMouseEnter={handleTooltipShow}
            onMouseLeave={handleTooltipHide}
            onFocus={handleTooltipShow}
            onBlur={handleTooltipHide}
            data-testid={`product-info-button-${product.id}`}
          >
            <InfoIcon width={iconSize} height={iconSize} />
          </button>
          {showTooltip && (
            <div
              className="absolute z-10 mt-2 w-64 rounded-md bg-white p-2 text-sm text-gray-700 shadow-lg"
              role="tooltip"
              data-testid={`product-tooltip-${product.id}`}
            >
              {product.description}
            </div>
          )}
        </div>

        {/* Rating display */}
        {ratingComponent}
      </div>

      {/* Image container with optimized loading */}
      <div className={imageClasses} data-testid={`product-image-container-${product.id}`}>
        <img
          src={product.images[0]}
          alt={`${product.title}`}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
          {...{ fetchpriority: 'high' }}
          onError={handleImageError}
          data-testid={`product-image-${product.id}`}
          itemProp="image"
        />
      </div>

      <div
        className="mt-auto flex items-center gap-3 bg-white p-3"
        data-testid={`product-details-${product.id}`}
      >
        <div className="flex h-16 flex-col justify-between">
          <h2
            id={`product-title-${product.id}`}
            className={titleClasses}
            data-testid={`product-title-${product.id}`}
            itemProp="name"
          >
            {product.title}
          </h2>
          <p className={priceClasses} data-testid={`product-price-${product.id}`}>
            From{' '}
            <span className="font-semibold" itemProp="price">
              ${product.price}
            </span>
            <meta itemProp="priceCurrency" content="USD" />
          </p>
          <meta itemProp="description" content={product.description} />
        </div>
        <div className="ml-auto w-px self-stretch bg-gray-400" aria-hidden="true" />
        <button
          className="ml-2 mr-2 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Add ${product.title} to cart`}
          disabled={true}
          data-testid={`add-to-cart-button-${product.id}`}
        >
          <ShoppingCartIcon width={cartIconSize} height={cartIconSize} />
        </button>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
