/**
 * Função serverless que atua como proxy para a API de produtos da Econverse.
 *
 * A API de origem não envia cabeçalhos CORS, o que impede o navegador de
 * consumi-la diretamente. Esta função roda no servidor (onde CORS não se
 * aplica), busca os dados e os devolve ao front-end como JSON.
 */
export const config = { runtime: 'edge' };

const ORIGIN_URL =
  'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

export default async function handler(): Promise<Response> {
  try {
    const upstream = await fetch(ORIGIN_URL);

    if (!upstream.ok) {
      return Response.json(
        { success: false, message: 'Origem indisponível.' },
        { status: 502 },
      );
    }

    const data = await upstream.text();

    return new Response(data, {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300, s-maxage=300',
      },
    });
  } catch {
    return Response.json(
      { success: false, message: 'Falha ao consultar a origem.' },
      { status: 502 },
    );
  }
}