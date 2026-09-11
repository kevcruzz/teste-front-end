export interface Category {
  id: string;
  label: string;
}

/**
 * Abas do layout. A API expõe apenas produtos de celular, então as demais
 * categorias ficam declaradas aqui para fidelidade ao layout.
 */
export const CATEGORIES: Category[] = [
  { id: 'celular', label: 'Celular' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'notebooks', label: 'Notebooks' },
  { id: 'tvs', label: 'TVs' },
  { id: 'todos', label: 'Ver todos' },
];
