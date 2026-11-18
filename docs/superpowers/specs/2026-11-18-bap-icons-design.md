# Família editorial de ícones BAP

Direção visual aprovada pelo usuário em 18/11/2026, após apresentação do catálogo com 12 ícones de conteúdo e seis de navegação.

## Intenção e restrições

- Substituir a mistura de caracteres e desenhos simples por uma família monocromática consistente.
- Usar a geometria aprovada de 48 unidades para conteúdo; versões mais limpas para navegação pequena.
- Manter cores, fontes, imagens, links e comportamento do diagnóstico.
- Preservar os desenhos oficiais de redes sociais e as artes rasterizadas da página Livro.
- Aplicar os três ícones novos à composição apresentada para BAP Primeiros Ritmos.

## Abordagens

1. Caracteres tipográficos: descartados pela inconsistência e falta de detalhes apontadas pelo usuário.
2. Biblioteca genérica de contornos: consistente, mas pouco específica para música e corpo.
3. Família editorial própria: escolhida e aprovada visualmente; bateria, anatomia, aprendizagem, famílias, escola, curso, vídeos, livro e orientação.

## Implementação

SVG compartilhado com símbolos e referências estáticas em HTML, sem dependências novas. CSS separado de integração para neutralizar pseudoícones legados. Menu dinâmico deve preservar os SVGs ao abrir e fechar. Aplicar a composição aprovada da dobra Primeiros Ritmos, com título compacto, foto preenchida, benefícios e CTA para o diagnóstico de famílias.

## Validação

Auditar referências SVG e acessibilidade; verificar desktop/mobile, abertura e fechamento dos menus, painel corporal e reinício do diagnóstico. Validar preview Vercel e comparar os arquivos publicados com os testados antes da confirmação de produção.
