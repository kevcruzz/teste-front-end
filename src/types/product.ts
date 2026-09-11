/**
 * Contrato de dados retornado pela API de produtos da Econverse.
 * https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json
 */
export interface Product {
  productName: string;
  descriptionShort: string;
  photo: string;
  price: number;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
}

/** Produto com um id estável, gerado no client (a API não envia id). */
export interface ProductWithId extends Product {
  id: string;
}
