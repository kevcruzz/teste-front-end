import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ProductWithId } from '../../types/product';
import { formatInstallments, formatPrice } from '../../utils/formatPrice';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
  product: ProductWithId | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fecha com Esc e trava a rolagem do body enquanto o modal está aberto
  useEffect(() => {
    if (!product) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('is-modal-open');
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('is-modal-open');
    };
  }, [product, onClose]);

  if (!product) return null;

  const { productName, descriptionShort, photo, price } = product;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          ref={closeButtonRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src={photo} alt={productName} className={styles.image} />
          </div>

          <div className={styles.details}>
            <h2 id="modal-titulo" className={styles.title}>
              {productName}
            </h2>

            <p className={styles.description}>{descriptionShort}</p>

            <p className={styles.price}>{formatPrice(price)}</p>
            <p className={styles.installments}>{formatInstallments(price)}</p>
            <p className={styles.shipping}>Frete grátis</p>

            <button type="button" className={styles.buyButton}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
