import type { ProductsResponse, ProductWithId } from '../types/product';

const PRODUCTS_ENDPOINT = '/api/produtos';

/**
 * Busca a lista de produtos e normaliza o retorno adicionando um id estável.
 * Lança erro em respostas HTTP inválidas ou payload fora do contrato esperado.
 */
export async function fetchProducts(signal?: AbortSignal): Promise<ProductWithId[]> {
  const response = await fetch(PRODUCTS_ENDPOINT, { signal });

  if (!response.ok) {
    throw new Error(`Falha ao buscar produtos: ${response.status}`);
  }

  const data: ProductsResponse = await response.json();

  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('Resposta da API em formato inesperado.');
  }

  return data.products.map((product, index) => ({
    ...product,
    id: `${slugify(product.productName)}-${index}`,
  }));
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
