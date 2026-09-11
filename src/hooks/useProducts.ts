import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/productsService';
import type { ProductWithId } from '../types/product';

interface UseProductsResult {
  products: ProductWithId[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

/** Encapsula o ciclo de vida da requisição de produtos (loading / erro / dados). */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    fetchProducts(controller.signal)
      .then(setProducts)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Não foi possível carregar os produtos.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return { products, isLoading, error, retry };
}
