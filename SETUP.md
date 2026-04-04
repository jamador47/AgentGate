# AgentGate Setup Guide

## Prerequisites

- Node.js 18+ installed
- An Auth0 account (free tier works)
- Google Cloud Console project with Calendar & Gmail APIs enabled
- GitHub OAuth App
- Anthropic API key

## Step 1: Auth0 Configuration

### 1.1 Create Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** → **Create Application**
3. Name: `AgentGate`
4. Type: **Regular Web Application**
5. Click **Create**

### 1.2 Configure Application Settings

In your Auth0 application settings:

- **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

Save changes.

### 1.3 Enable Token Vault

**CRITICAL**: Token Vault must be enabled for this project to work.

1. In Auth0 Dashboard, go to **Applications** → **APIs** → **Auth0 Management API**
2. Navigate to **Settings** → **Token Vault**
3. Toggle **Enable Token Vault** to ON
4. Save changes

### 1.4 Set Up Social Connections

#### Google (Calendar + Gmail)

1. Go to **Authentication** → **Social** → **Google**
2. Click **Connect Google Account**
3. Enter your Google OAuth credentials
4. **IMPORTANT**: Add these scopes in the **Additional Scopes** field:
   ```
   https://www.googleapis.com/auth/calendar.events
   https://www.googleapis.com/auth/gmail.readonly
   ```
5. Enable the connection for your AgentGate application
6. Save

#### GitHub

1. Go to **Authentication** → **Social** → **GitHub**
2. Create a GitHub OAuth App at: https://github.com/settings/developers
   - Application name: `AgentGate`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `https://YOUR_AUTH0_DOMAIN/login/callback`
3. Copy Client ID and Client Secret to Auth0
4. Add scopes: `public_repo`, `read:user`
5. Enable the connection for your AgentGate application
6. Save

## Step 2: Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in the values:

```env
APP_BASE_URL='http://localhost:3000'
AUTH0_SECRET='<run: openssl rand -hex 32>'
AUTH0_DOMAIN='your-tenant.us.auth0.com'
AUTH0_CLIENT_ID='<from Auth0 app settings>'
AUTH0_CLIENT_SECRET='<from Auth0 app settings>'
ANTHROPIC_API_KEY='sk-ant-...'
```

**To generate AUTH0_SECRET**:
```bash
openssl rand -hex 32
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 5: Test the Flow

1. Click **Sign In with Auth0**
2. Choose Google or GitHub to connect
3. Grant the requested permissions
4. You'll be redirected to the dashboard
5. Ask the agent: "Show my calendar for this week"
6. When Token Vault requests authorization, approve it
7. Watch the permissions dashboard update in real-time!

## Troubleshooting

### "Token Vault not enabled" error
- Make sure Token Vault is enabled in Auth0 Management API settings
- Restart the dev server after enabling

### "Insufficient scopes" error
- Check that you added the correct scopes to your Google connection in Auth0
- Required Google scopes:
  - `https://www.googleapis.com/auth/calendar.events`
  - `https://www.googleapis.com/auth/gmail.readonly`

### Calendar/Gmail 401 errors
- Make sure you've granted the app access during the OAuth flow
- Try disconnecting and reconnecting your Google account in Auth0

### No messages appearing in chat
- Check browser console for errors
- Verify ANTHROPIC_API_KEY is correct
- Check that `/api/chat` route is responding

## Project Structure

```
agentgate/
├── app/
│   ├── api/
│   │   ├── auth/[auth0]/route.ts  # Auth0 handler
│   │   └── chat/route.ts           # AI chat endpoint
│   ├── dashboard/page.tsx          # Main app
│   └── page.tsx                    # Landing page
├── components/
│   ├── ChatWindow.tsx              # Chat interface
│   ├── PermissionsDashboard.tsx    # Permissions control panel
│   └── AuditLog.tsx                # Audit logging
├── context/
│   └── AuditContext.tsx            # Audit state management
├── lib/
│   ├── auth0.ts                    # Auth0 client config
│   ├── auth0-ai.ts                 # Token Vault wrappers
│   └── tools/                      # AI agent tools
│       ├── google-calendar.ts
│       ├── gmail.ts
│       └── github.ts
└── .env.local                      # Environment variables
```

## Next Steps

- Customize the agent's system prompt in `app/api/chat/route.ts`
- Add more tools to extend functionality
- Deploy to Vercel (update AUTH0 callback URLs)
- Enable step-up authentication for sensitive actions

## Resources

- [Auth0 Token Vault Docs](https://auth0.com/docs/secure/tokens/token-vault)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Auth0 AI SDK for Vercel](https://www.npmjs.com/package/@auth0/ai-vercel)
