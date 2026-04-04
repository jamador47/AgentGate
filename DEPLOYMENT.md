# Deployment Guide - Railway

## ✅ Deployment Ready Status

**Build Status**: ✅ **PASSING**
- TypeScript compilation: ✅ Success
- Next.js build: ✅ Success
- Production bundle: ✅ Generated

Your AgentGate project is **ready to deploy to Railway**!

---

## 🚂 Deploy to Railway

### Prerequisites

1. **Railway account** - Sign up at [railway.app](https://railway.app)
2. **GitHub repository** - Push your code to GitHub
3. **Auth0 production tenant** - Separate from development
4. **Anthropic API key** - For production use

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `agentgate` repository
5. Railway will auto-detect Next.js and configure build settings

### Step 2: Configure Environment Variables

In Railway dashboard, go to your project → Variables tab → Add the following:

```env
# App Configuration
APP_BASE_URL=https://your-app-name.up.railway.app
NODE_ENV=production

# Auth0 Configuration
AUTH0_DOMAIN=your-prod-tenant.us.auth0.com
AUTH0_CLIENT_ID=your-production-client-id
AUTH0_CLIENT_SECRET=your-production-client-secret
AUTH0_SECRET=generate-a-new-random-secret-here

# Auth0 Management API
AUTH0_MANAGEMENT_CLIENT_ID=your-prod-management-client-id
AUTH0_MANAGEMENT_CLIENT_SECRET=your-prod-management-client-secret

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-api03-your-production-key
```

**Important Security Notes:**
- ⚠️ Generate a NEW `AUTH0_SECRET` for production (use `openssl rand -base64 32`)
- ⚠️ Use PRODUCTION Auth0 credentials (separate tenant recommended)
- ⚠️ Never commit these values to Git

### Step 3: Update Auth0 Production Settings

1. **Go to Auth0 Dashboard** → Applications → Your Production App

2. **Update Allowed Callback URLs**:
   ```
   https://your-app-name.up.railway.app/api/auth/callback
   ```

3. **Update Allowed Logout URLs**:
   ```
   https://your-app-name.up.railway.app
   ```

4. **Update Allowed Web Origins**:
   ```
   https://your-app-name.up.railway.app
   ```

5. **Save Changes**

### Step 4: Configure Google OAuth

Update your Google Cloud Console OAuth consent screen:

1. Go to **Google Cloud Console** → APIs & Services → Credentials
2. Find your OAuth 2.0 Client
3. Add **Authorized redirect URIs**:
   ```
   https://your-auth0-domain/login/callback
   ```
4. Save

### Step 5: Deploy

Railway will automatically deploy when you push to your main branch!

**Manual Deploy:**
```bash
# Push to GitHub
git add .
git commit -m "Prepare for Railway deployment"
git push origin main

# Railway will auto-deploy
```

**Monitor deployment:**
- Go to Railway dashboard
- Click on your deployment
- Watch build logs
- Once deployed, click "View Logs" to see runtime logs

---

## 🔧 Railway Configuration (Optional)

Railway auto-detects Next.js, but you can customize with `railway.toml`:

Create `railway.toml` in your project root:

```toml
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

---

## 📊 Post-Deployment Checklist

### ✅ Verify Deployment

1. **Open your Railway URL**: `https://your-app-name.up.railway.app`
2. **Test Auth0 login**: Click "Sign in with Auth0"
3. **Test Google OAuth**: Complete Google authentication
4. **Test Gmail retrieval**: Ask "Can you check my latest emails?"
5. **Test Permissions Panel**: Click "View Details" on Gmail
6. **Test Audit Log**: Switch to Audit Log tab

### ✅ Check Logs

In Railway dashboard → Deployments → View Logs:

Look for:
```
✅ Found Google access token!
✅ Successfully retrieved X emails!
💾 AuditStore.addLog: ...
```

### ✅ Test All Features

- [ ] Landing page loads
- [ ] Auth0 login works
- [ ] Google OAuth consent works
- [ ] Dashboard displays
- [ ] Chat sends messages
- [ ] Gmail tool retrieves real emails
- [ ] Permissions panel shows connections
- [ ] Audit log displays tool calls
- [ ] "View Details" modal works

---

## 🐛 Troubleshooting

### Issue: "Invalid callback URL"

**Solution**: Update Auth0 Allowed Callback URLs to include Railway domain

### Issue: "Gmail API 401 Unauthorized"

**Solution**:
1. Check Auth0 Management API credentials are correct
2. Verify Google scopes in Auth0 social connection
3. Check logs for token retrieval errors

### Issue: "Build failed"

**Solution**:
1. Check Railway build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility (20+)

### Issue: "Audit logs empty"

**Solution**:
- Audit logs use in-memory storage (will reset on redeploy)
- For production, implement database storage (see BUILT_WITH.md)

### Issue: "Environment variables not loading"

**Solution**:
1. Check Railway Variables tab
2. Ensure no quotes around values
3. Redeploy after adding variables

---

## 🚀 Performance Optimization

### Enable Railway Pro Features (Optional)

- **Custom domain**: Add your own domain
- **Autoscaling**: Handle more traffic
- **Private networking**: Better security
- **Monitoring**: Advanced metrics

### Next.js Optimization

Railway automatically optimizes your Next.js app:
- ✅ Server-side rendering
- ✅ Static page generation
- ✅ Image optimization
- ✅ Code splitting
- ✅ Compression

---

## 🔐 Security Checklist

Before going live:

- [ ] Use production Auth0 tenant (not dev)
- [ ] Generate new AUTH0_SECRET for production
- [ ] Enable Auth0 MFA for admin accounts
- [ ] Review Auth0 logs regularly
- [ ] Set up error tracking (Sentry)
- [ ] Configure rate limiting
- [ ] Enable HTTPS only (Railway does this by default)
- [ ] Review Google OAuth consent screen
- [ ] Limit API scopes to minimum required

---

## 📈 Monitoring

### Railway Built-in Monitoring

Railway provides:
- **Deployment logs**: See build and deploy process
- **Application logs**: Runtime logs (console.log)
- **Metrics**: CPU, memory, network usage
- **Health checks**: Automatic service monitoring

### Add External Monitoring (Recommended)

**Sentry** for error tracking:
```bash
npm install @sentry/nextjs
```

**Vercel Analytics** (if deploying to Vercel instead):
```bash
npm install @vercel/analytics
```

---

## 🔄 CI/CD with Railway

Railway automatically deploys when you push to GitHub!

**Workflow:**
```
1. Make changes locally
2. Commit and push to GitHub
   git add .
   git commit -m "Feature: Add XYZ"
   git push origin main

3. Railway detects push
4. Builds project
5. Runs tests (if configured)
6. Deploys to production
7. Health check passes
8. Live! 🎉
```

---

## 💾 Database Integration (Future)

For persistent audit logs, add PostgreSQL:

1. **In Railway dashboard**: Click "New" → "Database" → "PostgreSQL"
2. **Get connection string**: Railway → PostgreSQL → Connect
3. **Add to environment variables**:
   ```env
   DATABASE_URL=postgresql://...
   ```

4. **Update code** to use PostgreSQL instead of in-memory store

---

## 🌐 Custom Domain (Optional)

1. Go to Railway project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `agentgate.yourdomain.com`)
4. Add DNS record to your domain provider:
   ```
   CNAME agentgate.yourdomain.com -> your-app.up.railway.app
   ```
5. Wait for DNS propagation (up to 48 hours)
6. Update Auth0 callback URLs to use custom domain

---

## 📞 Support

**Railway Support:**
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- GitHub: https://github.com/railwayapp/railway

**Auth0 Support:**
- Docs: https://auth0.com/docs
- Community: https://community.auth0.com

---

## ✅ Deployment Complete!

Your AgentGate is now live! 🎉

**Next Steps:**
1. Share the live URL with hackathon judges
2. Record your demo video
3. Monitor logs for any issues
4. Collect user feedback

**Live URL Format:**
```
https://agentgate-production-XXXX.up.railway.app
```

Update your hackathon submission with this URL!

---

**Happy Deploying! 🚂**
