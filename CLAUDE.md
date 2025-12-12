# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medical clinic website for Dra. Maria Alice (Brazilian Portuguese). Features inline content editing for authenticated users with content persistence via PostgreSQL.

## Commands

```bash
npm run dev          # Start dev server with Turbopack (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npx prisma generate  # Generate Prisma client (outputs to lib/generated/prisma)
npx prisma db push   # Push schema changes to database
npx prisma migrate dev  # Run migrations
```

## Architecture

### Tech Stack
- Next.js 15 (App Router, Turbopack)
- React 19
- Clerk for authentication
- Prisma with PostgreSQL
- Tailwind CSS 4
- shadcn/ui components (Radix UI primitives)

### Content Management System

The site implements inline editing allowing authenticated users to edit content directly on pages:

1. **EditablePage** (`components/EditablePage.tsx`) - Wrapper that loads/saves page content by slug
2. **InlineEditor** (`components/InlineEditor.tsx`) - Text/textarea inline editing (shows edit button when authenticated via Clerk)
3. **ImageEditor** (`components/ImageEditor.tsx`) - Image field editing

Content is stored in the `Pagina` model with JSON content field. Pages use render props pattern:
```tsx
<EditablePage slug="home">
  {(content, handleSaveContent) => (
    <InlineEditor fieldId="titulo" initialValue={content.titulo} onSave={(v) => handleSaveContent("titulo", v)}>
      {content.titulo}
    </InlineEditor>
  )}
</EditablePage>
```

### API Routes
- `/api/paginas` - CRUD for page content (GET, POST, PUT)
- `/api/configuracoes` - Site configuration (phone, booking link)

### Protected Routes
- `/dashboard` - Protected via Clerk middleware (`middleware.ts`)
- `/configuracoes` - Site settings (requires auth)
- Inline editing only visible when `isSignedIn` from Clerk

### Database Schema
Single `Pagina` model with slug-based lookup and JSON content field for flexible key-value storage. Supports nested array fields via underscore notation (e.g., `timeline_0_year`).

### Navigation Structure
Two main dropdown menus in header (`components/header-custom.tsx`):
- **Tratamentos**: 6 treatment pages
- **Exames Especiais**: 10 specialized exam pages

Each page route maps to `app/{slug}/page.tsx`.

## Environment Variables Required
```
DATABASE_URL                                    # PostgreSQL connection
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY              # Clerk auth
CLERK_SECRET_KEY                                # Clerk auth
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard
```

## Key Patterns

- All page components use `"use client"` directive
- UI components in `components/ui/` are shadcn/ui (do not modify directly)
- Prisma client singleton in `lib/prisma.ts` with global caching for dev
- Portuguese language throughout UI and content
