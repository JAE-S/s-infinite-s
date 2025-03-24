// React Core Imports
import React, { useState, useCallback, useEffect, useRef, memo, useMemo } from 'react';
import { debounce } from 'lodash';

// Store Imports
import { useGetProductsQuery, useLazyGetProductsQuery } from '@/store/apis/product_api';
// Internal Component Imports
import ProductCard from '@/components/cards/product_card';
import Loader from '@/components/loaders/loader';

const ITEMS_PER_PAGE = 10;

// Memoized ProductCard component to prevent unnecessary re-renders
const MemoizedProductCard = memo(ProductCard);

const ProductList: React.FC = () => {
  // State for pagination and products
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [preloadTriggered, setPreloadTriggered] = useState(false);

  // Container ref for scroll detection
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  // RTK Query hook for initial data
  const {
    data: initialData,
    error: _error,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery(
    { limit: ITEMS_PER_PAGE, skip: 0 },
    {
      refetchOnFocus: false,
      refetchOnReconnect: true,
    }
  );

  // Lazy query for pagination - using offset-based approach with skip
  const [fetchMore, { data: newData, isFetching }] = useLazyGetProductsQuery();

  // Progressive loading - preload next batch before user reaches the end
  const preloadNextBatch = useCallback(
    debounce(() => {
      if (hasMore && !isFetching && !preloadTriggered) {
        setPreloadTriggered(true);
        // Preload data but don't update the UI yet
        fetchMore({ limit: ITEMS_PER_PAGE, skip }).then(() => {
          setPreloadTriggered(false);
        });
      }
    }, 300),
    [fetchMore, hasMore, isFetching, preloadTriggered, skip]
  );

  // Debounced function to fetch more products and update UI
  const loadMoreProducts = useCallback(
    debounce(() => {
      if (hasMore && !isFetching) {
        fetchMore({ limit: ITEMS_PER_PAGE, skip });
        setSkip(prev => prev + ITEMS_PER_PAGE);
      }
    }, 300),
    [fetchMore, hasMore, isFetching, skip]
  );

  // Update product list when initial data loads
  useEffect(() => {
    if (initialData && isFirstLoad) {
      setAllProducts(initialData.products);
      setIsFirstLoad(false);
      setHasMore(initialData.total > ITEMS_PER_PAGE);
      setSkip(ITEMS_PER_PAGE);
    }
  }, [initialData, isFirstLoad]);

  // Update product list when new data is fetched
  useEffect(() => {
    if (newData && !isFirstLoad) {
      setAllProducts(prev => [...prev, ...newData.products]);
      setHasMore(newData.skip + newData.products.length < newData.total);
      setIsScrolledToBottom(false); // Reset bottom flag after new data loaded
    }
  }, [newData, isFirstLoad]);

  // Set up Intersection Observer for infinite scroll detection
  useEffect(() => {
    if (!loaderRef.current) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !isFetching) {
        setIsScrolledToBottom(true);
        loadMoreProducts();
      }
    };

    // Create observer with a bit of margin to start loading before reaching the exact bottom
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px 0px',
      threshold: 0.1,
    });

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
      loadMoreProducts.cancel();
    };
  }, [hasMore, isFetching, loadMoreProducts]);

  // Set up Intersection Observer for preloading next batch
  useEffect(() => {
    if (!preloaderRef.current) return;

    const handlePreloadIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !isFetching && !preloadTriggered) {
        preloadNextBatch();
      }
    };

    // Create observer with a larger margin to start preloading well before reaching the bottom
    const preloadObserver = new IntersectionObserver(handlePreloadIntersection, {
      rootMargin: '500px 0px',
      threshold: 0.1,
    });

    preloadObserver.observe(preloaderRef.current);

    return () => {
      preloadObserver.disconnect();
      preloadNextBatch.cancel();
    };
  }, [hasMore, isFetching, preloadNextBatch, preloadTriggered]);

  // Memoize the product cards for better rendering performance
  const productCards = useMemo(() => {
    return allProducts.map(product => <MemoizedProductCard key={product.id} product={product} />);
  }, [allProducts]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      loadMoreProducts.cancel();
      preloadNextBatch.cancel();
    };
  }, [loadMoreProducts, preloadNextBatch]);

  // Loading states
  if (isLoading && !initialData) {
    return (
      <div className="flex w-full justify-center py-10" aria-live="polite">
        <Loader size="large" text="Loading products..." />
      </div>
    );
  }

  // Error state
  if (isError && !initialData) {
    return (
      <div className="flex w-full flex-col items-center py-10" aria-live="assertive">
        <p className="mb-4 text-red-500">Failed to load products</p>
        <button
          onClick={() => refetch()}
          className="rounded bg-blue-600 px-4 py-2 text-white"
          data-testid="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (allProducts.length === 0 && !isLoading) {
    return (
      <div className="flex w-full justify-center py-10" aria-live="polite">
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full"
      data-testid="product-list-container"
      ref={containerRef}
      aria-live="polite"
      aria-busy={isFetching}
    >
      <div>
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productCards}
        </div>

        {/* Loading overlay - only shown when scrolled to bottom and fetching */}
        {isScrolledToBottom && isFetching && (
          <div
            className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-white bg-opacity-90 py-8 shadow-md"
            aria-live="polite"
            role="status"
          >
            <Loader size="medium" text="Loading more products..." />
          </div>
        )}

        {/* End of results message */}
        {!hasMore && allProducts.length > 0 && !isFetching && (
          <div className="py-8 text-center text-gray-500" aria-live="polite">
            You've reached the end of the list
          </div>
        )}

        {/* Preload trigger element - starts loading next batch before user reaches bottom */}
        <div
          ref={preloaderRef}
          className="h-1 opacity-0"
          data-testid="preload-trigger"
          aria-hidden="true"
        />

        {/* Intersection Observer trigger element */}
        <div
          ref={loaderRef}
          className="mt-4 h-10 opacity-0"
          data-testid="load-more-trigger"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProductList;
