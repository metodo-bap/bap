# Método BAP — padrão visual e fluxo de alterações

## Referência oficial
A página `index.html` da versão aprovada é a referência para todas as páginas internas. Não redesenhar a identidade a cada tarefa.

- Marca BAP oficial já incluída no projeto; não substituir por marca criada.
- Paleta: branco predominante, preto/grafite para títulos e texto, vermelho BAP (#d90032) para destaques e ações. Sem dark mode.
- Tipografia: Space Grotesk (títulos, peso 600–700) e Inter (texto, menu, botões). Usar `bap-typography.css` como fonte central; evitar fontes novas e sobrescritas isoladas.
- Layout: editorial, limpo, fotografia real do projeto (sem imagens genéricas), muito espaço em branco, títulos de leitura clara e sem cortes, bordas discretas, CTAs arredondados.
- Navegação: links internos consistentes; CTA para `index.html#avaliacao` nas páginas internas e `#avaliacao` na home.
- Mobile-first: 320/375/390/430px, tablet e desktop; manter imagem bem enquadrada e alvos de toque >=44px; respeitar `prefers-reduced-motion`.
- Assessment: educativo, não diagnóstico médico; preservar perfis músico, família e instituição, correções de respostas e orientações responsáveis.
- Fotografias e mídia: reutilizar assets reais existentes. Validar destino Hotmart, vídeos e galeria; não presumir URLs.

## Fluxo de entrega (sem rodadas de aprovação visual desnecessárias)
1. Receber alteração → identificar seção/arquivo exato.
2. Implementar diretamente em uma branch de homologação; evitar trabalhos paralelos e reescritas extensas.
3. Validar HTML/links, fluxos afetados, responsividade e status de deployment Vercel para projeto `bap`.
4. Publicar via merge controlado em `main` após a autorização do usuário para publicar; não usar `bap-aquarius` como destino.
5. Confirmar o deploy de produção, informar URL e commit; se houver bloqueio, informar claramente sem afirmar publicação.

## Padrão de comunicação
Respostas curtas: **feito**, **o que mudou**, **URL de validação**, **pendência real**. Não gerar mockups por padrão se o pedido for aplicar ao site.
