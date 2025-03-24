// React Core Imports
import React, { useState } from 'react';

// Store Imports
import { useGetProductsQuery } from '../../../store/apis/product_api';
// Internal Component Imports
import ProductCard from '../../../components/cards/product_card';

const ITEMS_PER_PAGE = 10;

const ProductList: React.FC = () => {
  // State for pagination
  const [skip] = useState(0);

  // Data fetching with RTK Query
  const {
    data: products,
    // error,
    isLoading,
    // isFetching,
    // refetch,
  } = useGetProductsQuery(
    { limit: ITEMS_PER_PAGE, skip },
    {
      // TODO: add error handling
      // Don't refetch on window focus for better performance
      refetchOnFocus: false,
    }
  );

  return (
    <div className="mb-32 flex gap-4">
      {/* Product grid */}
      {products && products.products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {/* No products found */}
      {products && products.products.length === 0 && !isLoading && (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-600">No products found</h2>
          <p className="mt-2 text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
