import { memo } from 'react';
import type { ProductWithId } from '../../types/product';
import { formatInstallments, formatPrice } from '../../utils/formatPrice';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductWithId;
  onSelect: (product: ProductWithId) => void;
}

function ProductCardComponent({ product, onSelect }: ProductCardProps) {
  const { productName, descriptionShort, photo, price } = product;

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${productName}`}
      >
        <div className={styles.imageWrapper}>
          <img
            src={photo}
            alt={productName}
            className={styles.image}
            loading="lazy"
            width={205}
            height={264}
          />
        </div>

        <h3 className={styles.description}>{descriptionShort}</h3>

        {/*
          A API não retorna preço "de". O espaço é reservado para manter o
          alinhamento vertical dos cards igual ao layout.
        */}
        <p className={styles.oldPrice} aria-hidden="true" />

        <p className={styles.price}>
          <span className="sr-only">Preço: </span>
          {formatPrice(price)}
        </p>

        <p className={styles.installments}>{formatInstallments(price)}</p>

        <p className={styles.shipping}>Frete grátis</p>
      </button>

      <button
        type="button"
        className={styles.buyButton}
        onClick={() => onSelect(product)}
      >
        Comprar
        <span className="sr-only"> {productName}</span>
      </button>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
