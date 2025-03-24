// React Core Imports
import React from 'react';

// Internal Component Imports
import ProductCard from '../../../components/cards/product_card';
// Mock Data Imports
import { mockProducts } from '../../../test/mocks/products';

const ProductList: React.FC = () => {
  return (
    <div className="mb-32 flex gap-4">
      {mockProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
