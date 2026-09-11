# Teste Front-End Econverse — Vitrine de Produtos

Vitrine de produtos desenvolvida em **React + TypeScript + Sass**, consumindo a API de produtos da Econverse e com modal de detalhes ao clicar em um produto.

🔗 **Demo:** _(publique na Vercel e cole o link aqui)_

---

## Stack

| Ferramenta | Uso |
| --- | --- |
| React 18 | Biblioteca de interface |
| TypeScript | Tipagem estática |
| Vite | Build e servidor de desenvolvimento |
| Sass (SCSS Modules) | Pré-processador e escopo de estilos por componente |

Nenhuma biblioteca de UI (Bootstrap, Material, etc.) foi utilizada — todo o CSS é próprio.

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### Instalação

```bash
git clone https://github.com/<seu-usuario>/teste-front-end.git
cd teste-front-end
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

Os arquivos finais são gerados na pasta `dist/`.

### Visualizar o build

```bash
npm run preview
```

### Verificação de tipos

```bash
npm run lint
```

Roda o compilador do TypeScript em modo `--noEmit`, validando todos os tipos do projeto sem gerar arquivos.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── CategoryTabs/      # Abas de categoria (Celular, Acessórios, ...)
│   ├── ProductCard/       # Card individual da vitrine
│   ├── ProductModal/      # Modal de detalhes do produto
│   └── ProductShowcase/   # Seção da vitrine: título, abas e carrossel
├── hooks/
│   ├── useProducts.ts     # Ciclo de vida da requisição (loading/erro/dados)
│   └── useVisibleSlides.ts# Quantidade de cards visíveis por breakpoint
├── services/
│   └── productsService.ts # Camada de acesso à API
├── styles/
│   ├── _tokens.scss       # Design tokens (cores, fontes, espaçamentos, mixins)
│   └── global.scss        # Reset e estilos globais
├── types/                 # Contratos de dados (Product, Category)
├── utils/
│   └── formatPrice.ts     # Formatação de moeda e parcelamento (pt-BR)
├── App.tsx
└── main.tsx
```

### Organização adotada

- **Um componente por pasta**, com o `.tsx` e o `.module.scss` lado a lado. Facilita mover, remover ou reaproveitar o componente inteiro.
- **CSS Modules** garantem escopo local das classes, eliminando conflitos de nomes sem precisar de convenções como BEM.
- **Design tokens centralizados** em `_tokens.scss` e injetados automaticamente em todos os arquivos Sass pelo Vite. Cores e espaçamentos do layout ficam em um único lugar.
- **Separação de responsabilidades**: componentes cuidam da apresentação, hooks cuidam de estado e efeitos, o service cuida da comunicação com a API.

---

## Funcionalidades

- Vitrine consumindo os produtos da [API da Econverse](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json)
- Carrossel com navegação por setas e rotação circular
- Modal com as informações do produto clicado, fechável por botão, clique no overlay ou tecla `Esc`
- Abas de categoria conforme o layout
- Estados de carregamento (skeleton) e de erro com opção de nova tentativa
- Layout responsivo: 4 cards no desktop, 3 em tablet, 2 em tablet pequeno e 1 no mobile

---

## SEO e acessibilidade

- HTML semântico: `main`, `section`, `article`, `nav`, `header`, hierarquia correta de `h1` → `h3`
- `lang="pt-BR"`, `title` e `meta description` descritivos
- Open Graph e Twitter Card para compartilhamento
- Dados estruturados em JSON-LD (Schema.org)
- `link rel="canonical"` e `preconnect` para fontes e para a API
- `alt` descritivo em todas as imagens e `loading="lazy"` nas imagens da vitrine
- Modal com `role="dialog"`, `aria-modal`, foco movido ao abrir e rolagem do fundo travada
- Abas com `role="tab"` / `aria-selected`, rótulos em `aria-label` nas setas do carrossel
- Foco visível para navegação por teclado e suporte a `prefers-reduced-motion`

---

## Decisões técnicas

**Preço "de" riscado.** O layout exibe um preço anterior riscado, mas a API retorna apenas o campo `price`. Optei por não inventar um valor: o espaço permanece reservado no card para preservar o alinhamento vertical do layout, e o elemento é renderizado vazio e marcado com `aria-hidden`. Assim que a API passar a expor um preço anterior, basta preencher esse campo.

**Parcelamento.** O texto "ou 2x de … sem juros" é derivado do preço real de cada produto via `Intl.NumberFormat`, em vez de ser texto fixo.

**Categorias.** A API expõe apenas produtos de celular. As abas são renderizadas conforme o layout e a aba ativa é controlada por estado, pronta para filtrar assim que houver produtos das demais categorias.

**Id dos produtos.** A API não envia identificador. O service gera um id estável a partir do nome e do índice, usado como `key` do React e para identificar o produto selecionado.

**Carrossel próprio.** Implementado com `transform: translateX` e estado de página, sem biblioteca externa, respeitando a restrição do teste quanto a bibliotecas de UI.

---

## Autor

Kevin Cruz
[github.com/kevcruzz](https://github.com/kevcruzz) · kevincruz19sant@gmail.com
