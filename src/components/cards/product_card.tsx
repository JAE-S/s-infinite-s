// React Core Imports
import React, { useState } from 'react';

// Types & Interfaces Imports
import { ProductDataProps } from '@/types/product';
// Internal Component Imports
import ShoppingCartIcon from '@/components/icons/shopping-cart';
import StarIcon from '@/components/icons/star';
import InfoIcon from '@/components/icons/info';

type ProductCardProps = {
  product: ProductDataProps;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Render rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            width={16}
            height={16}
            className={i < Math.floor(rating) ? 'text-primary' : 'text-gray-300'}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{rating} out of 5 stars</span>
      </div>
    );
  };

  return (
    <article
      className="flex h-96 w-72 flex-col gap-4 rounded-lg bg-gray-200 p-4 shadow-md"
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className="flex items-center justify-between">
        {/* Badge with info icon and tooltip */}
        <div className="relative">
          <button
            className="ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Product information for ${product.title}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
          >
            <InfoIcon width={16} height={16} />
          </button>
          {showTooltip && (
            <div
              className="absolute z-10 mt-2 w-64 rounded-md bg-white p-2 text-sm text-gray-700 shadow-lg"
              role="tooltip"
            >
              {product.description}
            </div>
          )}
        </div>

        {/* Rating display */}
        {product.rating && renderRating(product.rating)}
      </div>

      {/* Image with optimization */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={product.images[0]}
          alt={`${product.title}`}
          width={400}
          height={400}
          loading="lazy"
          fetchPriority="high"
          className="h-full w-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
          }}
        />
      </div>

      <div className="mt-auto flex items-center gap-3 bg-white p-3">
        <div>
          <h2 id={`product-title-${product.id}`} className="text-base font-medium">
            {product.title}
          </h2>
          <p className="text-sm text-gray-400">
            From <span className="font-semibold">${product.price}</span>
          </p>
        </div>
        <div className="ml-auto w-px self-stretch bg-gray-400" aria-hidden="true" />
        <button
          className="ml-2 mr-2 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Add ${product.title} to cart`}
          disabled={true}
        >
          <ShoppingCartIcon width={24} height={24} />
        </button>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.title,
            image: product.images[0],
            description: product.description,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'USD',
            },
            ...(product.rating && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
              },
            }),
          }),
        }}
      />
    </article>
  );
};

export default ProductCard;
