# BAP Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publicar a página de contato aprovada.
**Architecture:** HTML estático com CSS exclusivo, assets existentes e pequena interação de menu. Sem backend.
**Tech Stack:** HTML, CSS, JavaScript; GitHub e Vercel.
**Spec:** docs/superpowers/specs/2026-11-18-bap-contact-design.md

## Global Constraints
- Paleta, fotos, fontes e ícones aprovados.
- Instagram oficial: https://www.instagram.com/tiagoguimaraesfisio/
- Nenhuma alteração a outras páginas.

## Review Focus
- Títulos e links sem corte em320,390,768,1024,1440px.
- Menu aberto/fechado por clique e Escape, atributos ARIA corretos.
- Destinos oficiais e internos válidos.
- Foto com proporção reservada e legenda legível.
- Preview e produção correspondem ao código validado.

### Task1: Aplicar e validar a página
**Files:** contato.html, bap-contact.css; documentação acima.
**Interfaces:** navegação por links e botão #contact-menu controlando #contact-nav.
- [ ] Adaptar a prévia aprovada removendo barra e controles de simulação; usar assets do repositório.
- [ ] Converter estilos mobile em media queries e isolar o CSS da página.
- [ ] Implementar menu com aria-expanded, Escape e fechamento ao selecionar link.
- [ ] Inspecionar cinco larguras e funcionamento do menu, links e foto. Executar testes existentes e diff check.
- [ ] Revisão independente, corrigir achados importantes e publicar preview.
- [ ] Conferir preview, integrar main, confirmar Vercel e arquivos públicos.
