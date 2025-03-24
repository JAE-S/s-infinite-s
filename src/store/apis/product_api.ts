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
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit = 10, skip = 0 }) => `products?limit=${limit}&skip=${skip}`,
      // Using providesTags allows for cache invalidation
      providesTags: result =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
      transformResponse: (response: ProductsResponse) => {
        return response;
      },
    }),
    getProductById: builder.query<ProductDataProps, string>({
      query: id => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductsQuery, // For manual triggering
} = productApi;
