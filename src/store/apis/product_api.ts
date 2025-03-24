// Redux Core Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types & Interfaces Imports
import { ProductDataProps } from '../../types/product';

export interface ProductsResponse {
  products: ProductDataProps[];
  total: number;
  skip: number;
  limit: number;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: headers => {
      // Cache control headers for better browser caching
      headers.set('Cache-Control', 'max-age=60'); // 1 minute
      return headers;
    },
  }),
  // Keep unused data in cache for 1 minute
  keepUnusedDataFor: 60,
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit = 10, skip = 0 }) => `products?limit=${limit}&skip=${skip}`,

      // Better cache key generation for improved caching
      serializeQueryArgs: ({ queryArgs }) => {
        return `products-${queryArgs.skip}-${queryArgs.limit}`;
      },

      // Merge incoming data with existing cache data for infinite scroll
      merge: (currentCache, newItems) => {
        // If this is not the first page (skip > 0), merge the products
        if (newItems.skip > 0) {
          // Create a Set of existing IDs to avoid duplicates
          const existingIds = new Set(currentCache.products.map(product => product.id));

          // Only add products that don't already exist in cache
          const uniqueNewProducts = newItems.products.filter(
            product => !existingIds.has(product.id)
          );

          return {
            ...newItems,
            products: [...currentCache.products, ...uniqueNewProducts],
          };
        }
        // If it's the first page, just return the new items
        return newItems;
      },

      // Using providesTags allows for cache invalidation
      providesTags: result =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],

      // Transform response for any data normalization/formatting
      transformResponse: (response: ProductsResponse) => {
        // Normalize the data to ensure consistent structure and optimization
        const normalizedProducts = response.products.map(product => ({
          id: product.id,
          title: product.title || '',
          description: product.description || '',
          price: typeof product.price === 'number' ? product.price : 0,
          // Ensure we have at least an empty array for images
          images: Array.isArray(product.images) ? product.images : [],
          // Ensure rating is a number
          rating: typeof product.rating === 'number' ? product.rating : 0,
        }));

        return {
          products: normalizedProducts,
          total: response.total,
          skip: response.skip,
          limit: response.limit,
        };
      },
    }),

    getProductById: builder.query<ProductDataProps, string>({
      query: id => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
      keepUnusedDataFor: 120, // 2 minutes for individual products
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductsQuery, // For manual triggering
  util: { updateQueryData, prefetch },
} = productApi;

// Export the API for middleware setup
export default productApi;
