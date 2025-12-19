# Groupe Rishom Corporate Website

## Overview

This is a professional corporate website for Groupe Rishom, a multi-sector African holding company operating in Burkina Faso and West Africa. The group operates through four specialized entities:

- **RBF (Rishom BTP & Fournitures)**: Construction equipment and BTP materials
- **RIC (Rishom Invest & Conseil)**: Strategic consulting and investment services
- **REV'I**: Agricultural production and agro-business
- **RBA**: Professional training and education

The website is built as a full-stack TypeScript application with a React frontend and Express backend, following a corporate B2B design approach inspired by companies like Soletanche Bachy.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with custom design tokens for the corporate brand palette
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll animations
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **API Pattern**: RESTful endpoints served from `/server` directory

### Project Structure
```
├── client/src/          # React frontend application
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-based page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── server/              # Express backend
├── shared/              # Shared types and schema definitions
│   └── schema.ts        # Drizzle database schema
├── migrations/          # Database migrations
└── attached_assets/     # Design references and content specs
```

### Design System
- **Primary Color**: Bordeaux (#8B1538) - Corporate authority
- **Secondary Colors**: Entity-specific palettes (RBF: Red brick #C74634, RIC: Bordeaux, REV'I: Green #058B5E, RBA: Blue #2E5A9C)
- **Typography**: Inter font family for headings, system sans-serif for body
- **Spacing**: Consistent Tailwind spacing scale (4, 6, 8, 12, 16, 20, 24, 32)
- **Layout**: Full-width sections with max-w-7xl inner containers

### Build Configuration
- Development: `npm run dev` runs tsx with hot reload
- Production: `npm run build` creates optimized bundle in `dist/`
- Database: `npm run db:push` pushes schema changes via Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL**: Primary database accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: Session storage in PostgreSQL

### UI Libraries
- **Radix UI**: Full suite of accessible primitive components (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component implementations
- **Lucide React**: Icon library
- **Embla Carousel**: Image carousel functionality
- **cmdk**: Command palette component

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **TypeScript**: Strict mode enabled with bundler module resolution

### Styling
- **Tailwind CSS**: Utility-first CSS with custom configuration
- **PostCSS**: CSS processing with autoprefixer
- **CSS Variables**: Theme tokens defined in client/src/index.css

### Content & Media
- **Google Fonts**: Inter font loaded via CSS import
- **Unsplash**: Stock imagery for hero sections and backgrounds
- **YouTube**: Video embed integration planned for hero carousels