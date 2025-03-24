// React Core Imports
import React from 'react';

// Types & Interfaces Imports
import { ProductDataProps } from '../../types/product';
// Relative Imports
import ShoppingCartIcon from '../icons/shopping-cart';

type ProductCardProps = {
  product: ProductDataProps;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex w-fit flex-col gap-4 bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">{product.badgeText}</span>
        <button className="rounded-full bg-white/60 px-4 py-1 text-sm">Customize</button>
      </div>
      <img src={product.imageSrc} alt={`${product.name} image`} width={400} height={400} />
      <div className="flex items-center gap-3 bg-white p-3">
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-sm text-gray-400">From ${product.price.toFixed(2)}</p>
        </div>
        <div className="ml-auto w-px self-stretch bg-gray-400" />
        <div className="ml-1 mr-2">
          <ShoppingCartIcon width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
