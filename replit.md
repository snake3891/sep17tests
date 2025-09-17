# Tax Calculator Application

## Overview

This is a full-stack web application built for calculating federal income tax based on the 2024 tax brackets. The application provides a clean, user-friendly interface for entering gross income and receiving detailed tax calculations including federal tax owed, effective tax rate, after-tax income, and applicable tax bracket information. Built with React frontend, Express backend, and PostgreSQL database using modern development tools and practices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component system for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the entire application
- **API Design**: RESTful API with a single POST endpoint for tax calculations
- **Validation**: Zod schemas for runtime type validation and input sanitization
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Data Layer
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle with TypeScript schema definitions for type-safe database operations
- **Migration**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL connection

### Development Infrastructure
- **Type System**: Shared TypeScript types between frontend and backend via shared schema
- **Code Organization**: Monorepo structure with client/, server/, and shared/ directories
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)
- **Development Server**: Hot module replacement with Vite middleware integration

### Tax Calculation Logic
- **Tax Brackets**: Hard-coded 2024 federal tax brackets with progressive calculation
- **Standard Deduction**: 2024 standard deduction amounts for different filing statuses
- **Calculation Engine**: Server-side tax computation with detailed breakdown of effective rates and applicable brackets

### Security & Validation
- **Input Validation**: Zod schemas enforce minimum/maximum income limits and data types
- **Error Boundaries**: Proper error handling for invalid inputs and server failures
- **CORS**: Configured for development and production environments

## External Dependencies

### Core Frameworks
- **@vitejs/plugin-react**: React plugin for Vite build system
- **express**: Web application framework for Node.js
- **react**: UI library for building user interfaces
- **typescript**: Type system for JavaScript

### Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database schema migration and management tools

### UI & Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### State Management & HTTP
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library

### Validation & Forms
- **zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Form validation resolvers
- **react-hook-form**: Form state management

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **esbuild**: Fast JavaScript bundler for server builds
- **tsx**: TypeScript execution engine for development

### Utilities
- **date-fns**: Date manipulation library
- **lucide-react**: Icon library
- **nanoid**: Unique ID generation