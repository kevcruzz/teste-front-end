import { useEffect, useMemo, useState } from 'react';
import { CategoryTabs } from '../CategoryTabs/CategoryTabs';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductModal } from '../ProductModal/ProductModal';
import { useProducts } from '../../hooks/useProducts';
import { useVisibleSlides } from '../../hooks/useVisibleSlides';
import type { ProductWithId } from '../../types/product';
import styles from './ProductShowcase.module.scss';

export function ProductShowcase() {
  const { products, isLoading, error, retry } = useProducts();
  const visibleSlides = useVisibleSlides();

  const [activeCategory, setActiveCategory] = useState('celular');
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithId | null>(null);

  // A API só retorna produtos de celular e não envia campo de categoria.
  // As abas "Celular" e "Ver todos" exibem a lista; as demais ficam vazias
  // até que a API passe a devolver produtos das outras categorias.
  const visibleProducts = useMemo(() => {
    const categoriasComProdutos = ['celular', 'todos'];
    return categoriasComProdutos.includes(activeCategory) ? products : [];
  }, [products, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / visibleSlides));

  // Evita ficar numa página inexistente ao redimensionar a janela
  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  function goToPrevious() {
    setPage((current) => (current === 0 ? totalPages - 1 : current - 1));
  }

  function goToNext() {
    setPage((current) => (current === totalPages - 1 ? 0 : current + 1));
  }

  return (
    <section className={styles.section} aria-labelledby="titulo-vitrine">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="titulo-vitrine" className={styles.title}>
            Produtos relacionados
          </h2>
        </header>

        <CategoryTabs
          activeCategory={activeCategory}
          onChange={(categoryId) => {
            setActiveCategory(categoryId);
            setPage(0);
          }}
        />

        <div
          className={styles.carousel}
          id="painel-vitrine"
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
        >
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={goToPrevious}
            disabled={isLoading || visibleProducts.length <= visibleSlides}
            aria-label="Ver produtos anteriores"
          >
            <Chevron direction="left" />
          </button>

          <div className={styles.viewport}>
            {isLoading && <SkeletonList amount={visibleSlides} />}

            {error && !isLoading && (
              <div className={styles.feedback} role="alert">
                <p>{error}</p>
                <button type="button" className={styles.retry} onClick={retry}>
                  Tentar novamente
                </button>
              </div>
            )}

            {!isLoading && !error && visibleProducts.length === 0 && (
              <p className={styles.empty}>
                Nenhum produto disponível nesta categoria no momento.
              </p>
            )}

            {!isLoading && !error && visibleProducts.length > 0 && (
              <ul
                className={styles.track}
                style={{ transform: `translateX(-${page * 100}%)` }}
              >
                {visibleProducts.map((product) => (
                  <li
                    key={product.id}
                    className={styles.slide}
                    style={{ flexBasis: `${100 / visibleSlides}%` }}
                  >
                    <ProductCard product={product} onSelect={setSelectedProduct} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={goToNext}
            disabled={isLoading || visibleProducts.length <= visibleSlides}
            aria-label="Ver próximos produtos"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="30" viewBox="0 0 18 30" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M16 2L3 15L16 28' : 'M2 2L15 15L2 28'}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkeletonList({ amount }: { amount: number }) {
  return (
    <ul className={styles.track} aria-hidden="true">
      {Array.from({ length: amount }).map((_, index) => (
        <li
          key={index}
          className={styles.slide}
          style={{ flexBasis: `${100 / amount}%` }}
        >
          <div className={styles.skeleton} />
        </li>
      ))}
    </ul>
  );
}