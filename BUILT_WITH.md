# Built With

## Languages
- **TypeScript 5** - Primary language for type-safe development
- **JavaScript (ES2022)** - Runtime execution in Node.js and browser
- **TSX/JSX** - React component markup
- **SQL** - (Planned for PostgreSQL integration)

## Frontend Framework & Libraries
- **React 19.2.4** - UI component library with latest features
- **Next.js 16.2.2** - Full-stack React framework with App Router
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **@tailwindcss/postcss** - PostCSS integration for Tailwind

## AI & Machine Learning
- **Anthropic Claude 4.5 Haiku** - Large language model for conversational AI
- **Vercel AI SDK v6.0.146** - Unified interface for AI model interactions
- **@ai-sdk/anthropic v3.0.66** - Claude-specific integration
- **@ai-sdk/react v3.0.148** - React hooks for AI streaming (attempted)

## Authentication & Authorization
- **Auth0** - Identity and access management platform
  - **@auth0/nextjs-auth0 v4.16.1** - Next.js SDK for Auth0
  - **Auth0 Management API v2** - Programmatic access to user data
  - **OAuth 2.0** - Authorization framework for Google integration
  - **OpenID Connect (OIDC)** - Identity layer on top of OAuth 2.0

## Cloud Services & APIs
- **Google Cloud Platform**
  - **Gmail API v1** - Email retrieval and search
  - **Google Calendar API v3** - Calendar event management
  - **Google OAuth 2.0** - Social login provider
  - **googleapis v171.4.0** - Official Google APIs Node.js client

- **Anthropic API** - Claude AI model access

- **Auth0 Cloud** - Authentication and user management

## Development Tools
- **Node.js 20+** - JavaScript runtime environment
- **npm** - Package manager
- **ESLint v9** - Code linting and quality
- **eslint-config-next v16.2.2** - Next.js-specific ESLint rules

## Type Safety & Validation
- **Zod v4.3.6** - TypeScript-first schema validation
- **TypeScript Compiler** - Static type checking

## Package Management
- **package.json** - Dependency management
- **npm workspaces** - Monorepo support (if applicable)

## Runtime Environment
- **Vercel** - Deployment platform (recommended)
- **Node.js Server** - Development server
- **Edge Runtime** - Serverless function execution

## State Management
- **React Context API** - Global state management
- **React Hooks (useState, useEffect, useCallback)** - Component state
- **Server-side in-memory store** - Audit log storage (temporary)

## API Architecture
- **REST API** - HTTP-based API endpoints
- **Server Actions** - Next.js server-side functions
- **Streaming Responses** - Real-time AI response delivery
- **JSON** - Data interchange format

## Security
- **OAuth 2.0 Protocol** - Secure authorization
- **JWT (JSON Web Tokens)** - Secure session management
- **HTTPS/TLS** - Encrypted communication
- **PKCE (Proof Key for Code Exchange)** - Enhanced OAuth security
- **Session Cookies** - Secure session storage

## Development Methodology
- **TypeScript Strict Mode** - Enhanced type safety
- **React Server Components** - Next.js 13+ App Router pattern
- **Streaming SSR** - Server-side rendering with streaming
- **API Routes** - Next.js serverless API endpoints

## Data Storage (Current)
- **In-Memory Store** - Temporary audit log storage
- **Browser LocalStorage** - (Not used, session-based)

## Data Storage (Planned)
- **PostgreSQL** - Relational database for audit logs
- **Redis** - Caching and session store
- **Auth0 User Store** - User identity and profile data

## Version Control & Collaboration
- **Git** - Version control system
- **GitHub** - Code hosting and collaboration

## Build Tools
- **Next.js Build System** - Webpack-based bundler
- **PostCSS** - CSS transformation
- **Turbopack** - (Optional) Next.js fast bundler

## Testing (Planned)
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

## Monitoring & Logging (Planned)
- **Vercel Analytics** - Performance monitoring
- **Sentry** - Error tracking
- **LogTail/Datadog** - Application logging

## AI Tool Calling Architecture
- **Vercel AI SDK Tool Calling** - Structured function execution
- **JSON Schema Validation** - Tool parameter validation
- **Multi-step Execution** - `stopWhen` pattern for tool loops
- **Streaming Tool Results** - Real-time tool execution feedback

## Notable Technical Patterns
- **Server Components + Client Components** - Hybrid rendering
- **Progressive Enhancement** - Works without JavaScript
- **Type-safe API Routes** - End-to-end TypeScript
- **Real-time Streaming** - SSE (Server-Sent Events) for AI responses
- **Audit Trail Architecture** - Immutable log storage

## Package Dependencies Summary

### Production Dependencies
```json
{
  "@ai-sdk/anthropic": "^3.0.66",
  "@ai-sdk/react": "^3.0.148",
  "@auth0/ai": "^6.0.0",
  "@auth0/ai-vercel": "^5.1.0",
  "@auth0/nextjs-auth0": "^4.16.1",
  "ai": "^6.0.146",
  "googleapis": "^171.4.0",
  "next": "16.2.2",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "zod": "^4.3.6"
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.2.2",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

## Infrastructure
- **Deployment:** Vercel (recommended) or any Node.js hosting
- **DNS:** Vercel DNS or custom domain
- **CDN:** Vercel Edge Network
- **SSL/TLS:** Automatic via Vercel/Let's Encrypt

## Development Environment
- **OS:** Windows, macOS, or Linux
- **IDE:** VS Code (recommended) with TypeScript support
- **Browser:** Chrome, Firefox, Safari, Edge (modern browsers)
- **Node Version:** v20+ (LTS recommended)

## Key Technical Decisions

### Why Next.js?
- Server-side rendering for better SEO
- API routes for backend logic
- Built-in TypeScript support
- Excellent Auth0 integration
- Streaming support for AI responses

### Why Claude over OpenAI?
- Superior reasoning capabilities
- Better tool calling implementation
- More reliable multi-step execution
- Transparent thinking process

### Why Auth0?
- Enterprise-grade security
- Easy social provider integration
- Management API for advanced use cases
- Token Vault for secure token storage (planned)
- Excellent documentation

### Why Vercel AI SDK?
- Provider-agnostic (works with any AI model)
- Built-in streaming support
- Type-safe tool definitions
- Multi-step execution patterns
- Active development and community

### Why In-Memory Storage Initially?
- Fast prototyping for hackathon
- No database setup required
- Easy to migrate to persistent storage
- Sufficient for demo purposes

---

**Tech Stack Summary:** TypeScript + React + Next.js + Auth0 + Anthropic Claude + Google APIs + Vercel AI SDK
