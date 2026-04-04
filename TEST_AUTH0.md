# Testing Auth0 Integration

## ✅ Auth0 Routes Created!

I've just created individual route handlers for Auth0:
- `/api/auth/login` - Login route
- `/api/auth/logout` - Logout route
- `/api/auth/callback` - OAuth callback
- `/api/auth/me` - Get current user

## 🧪 Test Now

### Step 1: Check if routes exist

Try visiting: **http://localhost:3000/api/auth/login**

You should see ONE of these:
1. ✅ **Redirects to Auth0 login page** - AUTH0 IS CONFIGURED! 🎉
2. ❌ **Error about missing AUTH0_DOMAIN** - Need to configure .env.local
3. ❌ **500 error** - Auth0 config issue

### Step 2: If you see an error

Check your `.env.local` file has ALL of these:
```env
APP_BASE_URL='http://localhost:3000'
AUTH0_SECRET='<32-character-hex-string>'
AUTH0_DOMAIN='your-tenant.us.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'
ANTHROPIC_API_KEY='sk-ant-...'
```

**Missing any of these?** You need to:
1. Create an Auth0 account at https://auth0.com
2. Create a "Regular Web Application"
3. Get the credentials from the Settings tab
4. Generate AUTH0_SECRET: `openssl rand -hex 32`

## 🔧 Full Auth0 Setup (If Not Done Yet)

### Quick Version:

1. **Go to Auth0.com** → Sign up (free)

2. **Create Application**:
   - Applications → Create Application
   - Name: "AgentGate"
   - Type: Regular Web Application

3. **Configure URLs** (in Application Settings):
   ```
   Allowed Callback URLs: http://localhost:3000/api/auth/callback
   Allowed Logout URLs: http://localhost:3000
   Allowed Web Origins: http://localhost:3000
   ```
   Save changes.

4. **Copy Credentials** to `.env.local`:
   - Domain: `your-tenant.us.auth0.com`
   - Client ID: (from Settings tab)
   - Client Secret: (from Settings tab - click "Show")

5. **Generate SECRET**:
   ```bash
   openssl rand -hex 32
   ```
   Add to `.env.local` as `AUTH0_SECRET`

6. **Restart your server**:
   - Press Ctrl+C in your terminal
   - Run `npm run dev` again

## 🎯 Expected Flow

Once Auth0 is configured:

1. Visit http://localhost:3000
2. Click "Sign In with Auth0"
3. → Redirects to Auth0 login page
4. → Sign in with Google or GitHub
5. → Redirects back to http://localhost:3000/dashboard
6. → You're logged in! ✨

## 📝 Current Status

**Auth0 routes**: ✅ Created
**Server running**: ✅ Yes (on port 3000)
**Auth0 configured**: ❓ Check your .env.local

## Next: Set Up Social Connections

After basic Auth0 login works, you'll need to:

1. **Google (for Calendar & Gmail)**:
   - Auth0 Dashboard → Authentication → Social → Google
   - Add scopes: `https://www.googleapis.com/auth/calendar.events`, `https://www.googleapis.com/auth/gmail.readonly`

2. **GitHub (for Repositories)**:
   - Auth0 Dashboard → Authentication → Social → GitHub
   - Add scopes: `public_repo,read:user`

3. **Enable Token Vault** (IMPORTANT!):
   - Auth0 Dashboard → APIs → Auth0 Management API → Token Vault
   - Toggle ON

## 🚨 Troubleshooting

### "Cannot read properties of undefined (reading 'authClient')"
→ Missing environment variables. Check `.env.local`

### "404 Not Found"
→ Server needs restart after adding routes. Press Ctrl+C, then `npm run dev`

### "Redirect URI mismatch"
→ Callback URL in Auth0 must be exactly: `http://localhost:3000/api/auth/callback`

##Ready to Test!

**Try it now**: http://localhost:3000/api/auth/login

Let me know what happens!
