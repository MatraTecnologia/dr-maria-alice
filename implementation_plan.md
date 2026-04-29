# Otimização SEO — Dra. Maria Alice (dramariaalice.com)

## Diagnóstico

O site possui vários problemas críticos que impedem uma boa indexação:

1. **`"use client"` em todas as pages** — O Next.js não consegue fazer Server-Side Rendering (SSR) de páginas com `"use client"`. O Google recebe uma página quase vazia e não consegue indexar o conteúdo.
2. **Metadata mínima** — O `layout.tsx` tem apenas título e descrição genéricos. Nenhuma página filha tem metadata própria.
3. **Sem `sitemap.xml`** — O Google não tem um mapa das URLs do site.
4. **Sem `robots.txt`** — O Google não tem diretrizes de rastreamento.
5. **Sem dados estruturados (Schema.org)** — Perda de rich snippets no Google (médico, clínica, localização).
6. **Sem Open Graph / Twitter Cards** — Compartilhamentos em redes sociais sem preview.
7. **Sem meta canônicas** — Risco de conteúdo duplicado.
8. **Imagens sem otimização** — Sem `alt` texts adequados, arquivos grandes (até 2.5MB).
9. **Favicon genérico** — Sem ícones para PWA/mobile.

## Problema Principal: SSR vs "use client"

> [!CAUTION]
> O maior problema de indexação é que **todas as páginas usam `"use client"`**, o que desativa o SSR. O Google recebe o HTML inicial praticamente vazio. Isso é o principal motivo do site não ser indexado.

**Solução**: Separar a lógica de edição (client) do conteúdo (server). As pages públicas precisam renderizar conteúdo no servidor. Usaremos o padrão **Server Component + Client Component** do Next.js App Router.

## Proposed Changes

---

### 1. Metadata e Layout Global

#### [MODIFY] [layout.tsx](file:///c:/Users/Matra%20Tecnologia/Desktop/dr-maria-alice/app/layout.tsx)
- Adicionar metadata completa: title template, description, Open Graph, Twitter Cards, canonical URL, robots
- Adicionar `metadataBase` apontando para `https://dramariaalice.com`
- Adicionar JSON-LD Schema.org para Physician + MedicalClinic + LocalBusiness

---

### 2. Sitemap e Robots

#### [NEW] `app/sitemap.ts`
- Gerar sitemap dinâmico com todas as URLs do site
- Incluir prioridades e frequências de atualização adequadas

#### [NEW] `app/robots.ts`
- Permitir rastreamento pelo Google e demais bots
- Apontar para o sitemap

---

### 3. Metadata por página

#### [MODIFY] `app/page.tsx` (Home)
- Remover `"use client"` — tornar Server Component
- Separar partes interativas (editor) em Client Component filho
- Adicionar `export const metadata` específico para a home

#### [MODIFY] `app/bio/page.tsx`
- Adicionar `export const metadata` para a página de bio da médica

#### [MODIFY] `app/emagrecimento/page.tsx` e demais páginas de tratamento
- Adicionar metadata específica para cada tratamento

---

### 4. Schema.org (JSON-LD)

#### [NEW] `components/SchemaOrg.tsx`
- Componente que injeta dados estruturados:
  - `Physician` com nome, CRM, especialidade
  - `MedicalClinic` com endereço, telefone, horários
  - `LocalBusiness` para SEO local (Google Maps, "perto de mim")

---

### 5. Otimização de imagens

- Verificar se o `next/image` está sendo usado corretamente (já está em ImageEditor)
- Garantir `alt` texts descritivos em todas as imagens

---

### 6. Web Vitals & Performance

#### [MODIFY] `next.config.ts`
- Adicionar configurações de otimização de imagens
- Habilitar compressão

---

## Verificação

- Testar com `curl` se o HTML retornado contém o conteúdo (SSR check)
- Validar Schema com [Google Rich Results Test](https://search.google.com/test/rich-results)
- Validar sitemap acessando `https://dramariaalice.com/sitemap.xml`
- Verificar metadata com [Open Graph debugger](https://developers.facebook.com/tools/debug/)

## Open Questions

> [!IMPORTANT]
> Para o Schema.org ficar 100% correto, preciso das seguintes informações:
> - **CRM da médica** (número e estado, ex: CRM/SP 12345)
> - **Endereço completo da clínica** (rua, número, bairro, CEP)
> - **Telefone de contato**
> - **Horário de funcionamento**
>
> Posso usar valores placeholder por enquanto e atualizar depois.
