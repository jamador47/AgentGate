# AgentGate 🚀

<div align="center">

**AI Agent Permission Management System**

*Built for the [Auth0 "Authorized to Act" Hackathon](https://authorizedtoact.devpost.com)*

[![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Auth0](https://img.shields.io/badge/Auth0-Ready-orange)](https://auth0.com/)
[![Claude AI](https://img.shields.io/badge/Claude-4.5%20Haiku-purple)](https://www.anthropic.com/)

[Demo Video](#) • [Project Story](./PROJECT_STORY.md) • [Built With](./BUILT_WITH.md)

</div>

---

## 🎯 What is AgentGate?

**The Problem**: AI agents are powerful, but users have no visibility into what permissions they have or what data they're accessing. This creates a dangerous trust gap.

**The Solution**: AgentGate is a **fully functional** AI agent permission management system that provides complete transparency and control. Users can see exactly what their AI agents are doing in real-time.

### ✨ What Makes AgentGate Different

Unlike typical AI chatbots that hide their permissions, AgentGate puts the **dashboard first**:

- 🔍 **Real-time visibility** into what the AI can access
- 📊 **Live audit logging** of every tool call
- 🎛️ **Granular control** over permissions
- 🔒 **Security-first** OAuth architecture

---

## 🚀 Live Demo

**Status**: ✅ **Fully Functional with Real Gmail Data**

AgentGate is not a mockup - it's a working application that:
- ✅ Authenticates with Auth0 + Google OAuth 2.0
- ✅ Retrieves **real Gmail data** using Auth0 Management API
- ✅ Displays live connection status from Auth0 identities
- ✅ Logs all tool calls with real-time audit updates
- ✅ Provides transparent permission management UI

### Quick Demo Flow

1. **Sign in** with Auth0 → Connect Google account
2. **Ask the AI**: "Can you check my latest emails?"
3. **Watch it work**: AI retrieves and displays your actual Gmail messages
4. **Check permissions**: See live OAuth connection status
5. **View audit log**: Real-time logging of the Gmail API call

---

## 🌟 Key Features

### 🤖 **Real AI Agent with Tool Calling**
- **Powered by**: Anthropic Claude 4.5 Haiku
- **Multi-step execution**: Uses Vercel AI SDK v6 with `stopWhen` pattern
- **Actually works**: Retrieves real Gmail data and displays it
- **Streaming responses**: Natural conversation flow

### 🔒 **Secure OAuth Authentication**
- **Auth0 Integration**: Google OAuth 2.0 authentication
- **Management API**: Retrieves social provider tokens securely
- **No hardcoded tokens**: Everything flows through OAuth
- **Session-based security**: Proper token management

### 📊 **Real-Time Permission Dashboard**
- **Live connection status**: Fetched directly from Auth0 identities
- **OAuth scopes**: Shows actual granted permissions
- **Interactive modals**: "View Details" with technical information
- **Connection management**: See what the AI can access

### 🔍 **Live Audit Logging**
- **Captures every tool call**: searchGmail, getCalendarEvents, etc.
- **Real-time updates**: Auto-refreshes every 3 seconds
- **Detailed information**:
  - Timestamp
  - Tool name and action
  - API scopes used
  - Success/error status
  - Expandable JSON details

### 💬 **Transparent AI Interactions**
- AI explains what it's doing
- Formats real data beautifully
- Clear error messages
- Educational responses

---

## 🏗️ Architecture

### Tech Stack

**Frontend**:
- Next.js 16.2.2 (App Router)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4

**AI & Tools**:
- Anthropic Claude 4.5 Haiku
- Vercel AI SDK v6.0.146
- Multi-step tool calling with `stopWhen: stepCountIs(5)`

**Authentication**:
- Auth0 (@auth0/nextjs-auth0 v4.16.1)
- Auth0 Management API v2
- Google OAuth 2.0
- OAuth token retrieval from user identities

**APIs**:
- Google Gmail API v1
- Google Calendar API v3
- googleapis v171.4.0

### How It Works

```
┌──────────────────────────────────────────────────┐
│  1. User logs in with Auth0 (Google OAuth)      │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  2. Auth0 stores Google access token in          │
│     user.identities[0].access_token              │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  3. AI agent calls tool (e.g., searchGmail)      │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  4. Backend uses Management API to retrieve      │
│     Google OAuth token from user identity        │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  5. Gmail API called with real Google token      │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  6. Audit log captures tool call (server-side)   │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│  7. AI displays results to user                  │
└──────────────────────────────────────────────────┘
```

### Security Model

- ✅ **No direct token storage** - Tokens retrieved on-demand via Management API
- ✅ **OAuth 2.0 flow** - Proper authorization with Google
- ✅ **Session-based auth** - Secure session management via Auth0
- ✅ **Least privilege** - Tools request only necessary scopes
- ✅ **Full transparency** - Every API call logged
- ✅ **User control** - Can view details and understand permissions

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **Auth0 account** with Google social connection configured
- **Auth0 Management API credentials**
- **Anthropic API key** (Claude AI)
- **Google Cloud project** (for OAuth consent screen)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/agentgate.git
cd agentgate

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables

Create `.env.local` with the following (no quotes needed):

```env
# App Configuration
APP_BASE_URL=http://localhost:3000

# Auth0 Configuration
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=your-random-secret

# Auth0 Management API (required for token retrieval)
AUTH0_MANAGEMENT_CLIENT_ID=your-management-client-id
AUTH0_MANAGEMENT_CLIENT_SECRET=your-management-client-secret

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-api03-...
```

### Auth0 Setup

1. **Create Auth0 Application**:
   - Go to Auth0 Dashboard → Applications → Create Application
   - Choose "Regular Web Application"
   - Set Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
   - Set Allowed Logout URLs: `http://localhost:3000`

2. **Enable Google Social Connection**:
   - Go to Authentication → Social
   - Enable Google OAuth 2.0
   - Add scopes: `email`, `profile`, `https://www.googleapis.com/auth/gmail.readonly`, `https://www.googleapis.com/auth/calendar.readonly`

3. **Create Management API Application**:
   - Go to Applications → Machine to Machine Applications
   - Authorize for "Auth0 Management API"
   - Grant `read:users` permission
   - Copy Client ID and Secret to `.env.local`

4. **Configure Google OAuth Consent Screen**:
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add to Auth0 social connection

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

### Dashboard
Split-panel interface with chat on the left and permissions on the right:
- Real-time AI conversation
- Live connection status
- Audit log tab

### Permissions Panel
Shows:
- Connected accounts (Gmail, Calendar, GitHub)
- OAuth scopes granted
- "View Details" modal with technical info

### Audit Log
Real-time logging of:
- Tool calls (searchGmail, getCalendarEvents)
- Timestamps
- Success/error status
- Expandable JSON details

---

## 🎬 Demo Video Script

**Total Time**: 3 minutes

1. **Introduction** (0:00 - 0:20)
   - Show landing page
   - Explain the transparency problem
   - Introduce AgentGate

2. **Authentication** (0:20 - 0:35)
   - Sign in with Auth0
   - Google OAuth consent
   - Dashboard overview

3. **Live Gmail Retrieval** (0:35 - 1:30)
   - Ask: "Can you check my latest 2 emails?"
   - **Show real emails being retrieved**
   - AI formats and displays actual Gmail data

4. **Permissions Dashboard** (1:30 - 2:00)
   - Click "View Details" on Gmail
   - Show actual OAuth scopes
   - Explain Management API integration

5. **Audit Logging** (2:00 - 2:30)
   - Switch to Audit Log tab
   - Show searchGmail entry
   - Expand details with JSON

6. **Conclusion** (2:30 - 3:00)
   - Recap features
   - Show technical achievements
   - Call to action

---

## 🏆 Hackathon Submission

### What Makes This Submission Stand Out

1. **Fully Functional** - Not a mockup! Real Gmail data retrieval
2. **Auth0 Management API** - Proper OAuth token management
3. **Multi-step AI** - Solved the tricky `stopWhen` pattern
4. **Real-time Transparency** - Live permissions and audit logs
5. **Production-Ready Code** - Clean architecture, type-safe
6. **Enterprise Scalability** - Path from MVP to $10M ARR platform

### 🚀 Enterprise Scalability Vision

**AgentGate isn't just a hackathon project - it's the foundation for AI agent governance at scale.**

#### SMB Tier ($29/month)
- Individual developer dashboards
- Personal audit logs (30-day retention)
- Up to 5 connected tools
- Community support

#### Business Tier ($99/user/month)
- Team dashboards with role-based access
- 90-day audit log retention
- Unlimited tools
- Priority support
- Custom tool development

#### Enterprise Tier ($500/user/month)
- Organization-wide governance
- Unlimited audit log retention
- SOC 2 compliance reporting
- Policy-as-code for agent behavior
- Anomaly detection & alerts
- Dedicated success manager
- White-label option

#### Platform Vision (12-18 months)
- **AgentGate Marketplace**: Third-party tool ecosystem
- **Agent Certification**: Verified safe agents
- **API-First Architecture**: Headless governance platform
- **Multi-Tenant SaaS**: Each org gets isolated instance

**Total Addressable Market**:
- 100M+ developers worldwide
- Every company deploying AI agents needs governance
- Estimated TAM: $10B+ by 2028

**Why This Scales**:
- Built on Auth0 (enterprise-grade from day 1)
- Tool-agnostic architecture (add tools in ~1 hour)
- PostgreSQL backend ready (see DEPLOYMENT.md)
- Clean separation of concerns (API → Frontend)
- OAuth-first design (no token storage headaches)

### Technical Achievements

✅ **Auth0 Integration**
- Google OAuth 2.0 authentication
- Management API for token retrieval
- Session-based security

✅ **AI Tool Calling**
- Vercel AI SDK v6 with multi-step execution
- Anthropic Claude 4.5 Haiku
- Real Gmail API integration

✅ **Permission Management**
- Live connection status from Auth0 identities
- OAuth scope display
- Interactive modals

✅ **Audit Logging**
- Server-side audit store
- Real-time updates (3-second polling)
- Persistent across hot reloads (globalThis pattern)

### Innovation

**The Dashboard IS the Product** - While most AI agents hide permissions, AgentGate makes transparency the core feature.

---

## 📝 Project Structure

```
agentgate/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts        # Auth0 login
│   │   │   ├── logout/route.ts       # Auth0 logout
│   │   │   └── callback/route.ts     # OAuth callback
│   │   ├── chat/route.ts             # AI chat with tool calling
│   │   ├── connections/route.ts      # Live connection status
│   │   └── audit/route.ts            # Audit log API
│   ├── dashboard/page.tsx            # Main dashboard
│   └── page.tsx                      # Landing page
├── components/
│   ├── ChatWindow.tsx                # AI chat interface
│   ├── PermissionsDashboard.tsx      # Permissions panel
│   └── AuditLog.tsx                  # Audit log display
├── context/
│   └── AuditContext.tsx              # Audit state (not used)
├── lib/
│   ├── auth0.ts                      # Auth0 client setup
│   ├── auth0-ai.ts                   # Token retrieval logic
│   └── audit-store.ts                # Server-side audit storage
├── .env.local                        # Environment variables
├── PROJECT_STORY.md                  # Detailed hackathon story
├── BUILT_WITH.md                     # Tech stack details
└── DEMO_SCRIPT.md                    # Demo video script
```

---

## 🛠️ Development

### Adding New Tools

1. **Define the tool** in `app/api/chat/route.ts`:
```typescript
const myNewTool = {
  description: 'Description of what the tool does',
  inputSchema: jsonSchema({
    type: 'object',
    properties: {
      param1: { type: 'string', description: 'Parameter description' },
    },
    required: ['param1'],
  }),
  execute: async ({ param1 }) => {
    // Tool implementation
    return { success: true, data: 'result' };
  },
};
```

2. **Add to tools object**:
```typescript
const tools = {
  searchGmail: searchGmailTool,
  getCalendarEvents: getCalendarEventsTool,
  myNewTool: myNewTool, // Add here
};
```

3. **Add audit logging** in `onStepFinish` callback

4. **Test with the AI** - Just ask it to use the new tool!

### Deployment

**Vercel** (recommended):
```bash
vercel deploy
```

**Don't forget**:
- Update Auth0 callback URLs to production domain
- Set all environment variables in Vercel dashboard
- Ensure Management API credentials are in production env

---

## 📚 Documentation

- **[PROJECT_STORY.md](./PROJECT_STORY.md)** - Complete hackathon submission story
- **[BUILT_WITH.md](./BUILT_WITH.md)** - Full tech stack breakdown
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** - Video demo script

### External Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Google APIs](https://developers.google.com/apis-explorer)

---

## 🤝 Contributing

This is a hackathon submission, but contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Use as a template for your own projects

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

---

## 🙏 Acknowledgments

Built for the **Auth0 "Authorized to Act" Hackathon**.

Special thanks to:
- **Auth0** for the amazing authentication platform
- **Anthropic** for Claude AI
- **Vercel** for the AI SDK
- **The Next.js team** for the excellent framework

---

## 📧 Contact

**Hackathon Submission** - Jossue Amador
- GitHub: [@jamador47](https://github.com/jamador47)
- Email: jfaa27@gmail.com

---

<div align="center">

**Built with ❤️ for the Auth0 "Authorized to Act" Hackathon**

*Submission Date: April 4, 2026*

[⬆ Back to Top](#agentgate-)

</div>
