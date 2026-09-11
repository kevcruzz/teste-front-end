import { CATEGORIES } from '../../types/category';
import styles from './CategoryTabs.module.scss';

interface CategoryTabsProps {
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

export function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="Categorias de produtos">
      <ul className={styles.list} role="tablist">
        {CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <li key={category.id} className={styles.item}>
              <button
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={isActive}
                aria-controls="painel-vitrine"
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                onClick={() => onChange(category.id)}
              >
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
