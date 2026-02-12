# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medical clinic website for Dra. Maria Alice (Brazilian Portuguese). Dual CMS: inline content editing for authenticated users + a block-based page editor. Content persisted via PostgreSQL.

## Commands

```bash
pnpm dev              # Start dev server with Turbopack (http://localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm prisma generate  # Generate Prisma client (outputs to lib/generated/prisma)
pnpm prisma db push   # Push schema changes to database
pnpm prisma migrate dev  # Run migrations
```

**Package manager is pnpm** (`"packageManager": "pnpm@10.29.3"` in package.json). Do not use npm/npx.

## Architecture

### Tech Stack
- Next.js 15 (App Router, Turbopack)
- React 19
- Clerk for authentication
- Prisma with PostgreSQL
- Tailwind CSS 4
- shadcn/ui components (Radix UI primitives)

### Content Management — Dual CMS

#### 1. Inline Editing (primary, used on all pages)
- **EditablePage** (`components/EditablePage.tsx`) — Wrapper that loads/saves page content by slug
- **InlineEditor** (`components/InlineEditor.tsx`) — Text/textarea inline editing (visible when authenticated via Clerk)
- **ImageEditor** (`components/ImageEditor.tsx`) — Image field editing (images stored as base64 in JSON)

Pages use render props pattern:
```tsx
<EditablePage slug="home">
  {(content, handleSaveContent) => (
    <InlineEditor fieldId="titulo" initialValue={content.titulo} onSave={(v) => handleSaveContent("titulo", v)}>
      {content.titulo}
    </InlineEditor>
  )}
</EditablePage>
```

#### 2. Block Editor (structured content builder)
- **PageEditor** (`components/editor/pageEditor.tsx`) — Drag-and-drop block editor with block types: `titulo`, `subtitulo`, `paragrafo`, `imagem`, `botao`, `separador`, `container`
- **BlockRenderer** (`components/editor/blockRenderer.tsx`) — Renders blocks with alignment, spacing, and color props

### Field Naming Convention
- Simple fields: `titulo`, `descricao`, `texto`
- Image fields: `imagemEmagrecimento`, `imagemPrincipal`
- Array fields with underscore notation: `timeline_0_year`, `timeline_0_description`, `servicos_2_titulo`

### Treatment Page Template

All 16 treatment/exam pages (`app/{slug}/page.tsx`) follow an identical structure — only the slug and fieldId values change. To add a new page: copy an existing treatment page, change the slug and field IDs, and add the route to the navigation in `header-custom.tsx`.

### Configuration System
Header reads phone number and booking link from `/api/configuracoes` at runtime. Settings managed at `/configuracoes` (auth required). Fields: `telefone`, `link_agendamento`.

### API Routes
- `/api/paginas` — CRUD for page content (GET, POST, PUT)
- `/api/configuracoes` — Site configuration (phone, booking link)

### Protected Routes
- `/dashboard` — Protected via Clerk middleware (`middleware.ts`)
- `/configuracoes` — Site settings (requires auth)
- Inline editing only visible when `isSignedIn` from Clerk `useAuth()`

### Database Schema
Single `Pagina` model with slug-based lookup and JSON `conteudo` field for flexible key-value storage.

### Navigation Structure
Two dropdown menus in header (`components/header-custom.tsx`):
- **Tratamentos**: 6 treatment pages
- **Exames Especiais**: 10 specialized exam pages

Items are hardcoded in `header-custom.tsx`. Each route maps to `app/{slug}/page.tsx`.

## Environment Variables Required
```
DATABASE_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

## Key Patterns

- All page components use `"use client"` directive
- UI components in `components/ui/` are shadcn/ui (do not modify directly)
- Prisma client singleton in `lib/prisma.ts` with global caching for dev
- Portuguese language throughout UI, code comments, and variable names
- Auth-gated editing: Clerk `useAuth().isSignedIn` controls edit UI visibility
- Color palette: blue (`#3366FF`, `#86D6FB`), dark (`#222B45`), gray (`#8F9BB3`), light blue bg (`#eaf6fd`)
