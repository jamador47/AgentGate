# Testing Instructions for Judges

## 🚀 Quick Start (Recommended)

**Live Demo:** https://agentgate.up.railway.app

### Option 1: Test with Your Own Google Account (Best Experience)

1. Visit https://agentgate.up.railway.app
2. Click **"Sign in with Auth0"**
3. Choose **"Sign in with Google"**
4. **Grant Gmail permissions** when prompted by Google
5. You may see "Google hasn't verified this app" - click **"Continue to AgentGate (unsafe)"** (this is normal for hackathon projects)
6. Once logged in, ask the AI: **"Can you check my latest 2 emails?"**
7. Watch the **Audit Log** tab update in real-time! ⭐

**What You'll See:**
- Your actual Gmail messages retrieved and displayed
- Real-time audit logging of the API call
- OAuth scopes and tool execution details
- Complete transparency into AI agent actions

**Privacy Note:** AgentGate uses **zero database token storage**. Your Google OAuth token is retrieved on-demand from Auth0's Management API and never stored in our database.

---

### Option 2: Demo Account (If You Prefer Not to Use Your Google Account)

If you don't want to use your personal Google account, we've provided a demo account:

**Demo Google Account:**
```
Email: agentgate.demo2026@gmail.com
Password: Auth0Hackathon2026!
```

**How to Use:**
1. Visit https://agentgate.up.railway.app
2. Click "Sign in with Auth0"
3. Choose "Sign in with Google"
4. Use the demo credentials above
5. Grant OAuth permissions when prompted
6. Ask: "Can you check my latest emails?"

**What's in the Demo Inbox:**
- Sample emails demonstrating Gmail API retrieval
- Enough data to showcase audit logging features

---

## 🎯 Key Features to Test

### 1. Real Gmail Retrieval
**Test:** Ask "Can you check my latest email?"

**What to Look For:**
- ✅ AI retrieves actual email content
- ✅ Shows sender, subject, date, and snippet
- ✅ No mocked data - this is real Gmail API calls

### 2. Live Audit Logging (The "Money Shot")
**Test:** Click the **"Audit Log"** tab after asking for emails

**What to Look For:**
- ✅ Real-time capture of tool calls
- ✅ Timestamp, tool name, OAuth scopes
- ✅ Click "View Details" to see full JSON with query parameters
- ✅ Success/error status for each API call

**This is the differentiator** - most AI chatbots are black boxes. AgentGate shows everything.

### 3. Live Permission Dashboard
**Test:** Click the **"Connections"** tab

**What to Look For:**
- ✅ Real connection status (fetched from Auth0 Management API)
- ✅ OAuth scopes granted during login
- ✅ Click "View Details" on Gmail to see OAuth flow explanation
- ✅ Not hardcoded - this is live data from Auth0

### 4. Zero-Trust Architecture Verification
**Test:** Open browser DevTools → Network tab while using the app

**What to Look For:**
- ✅ No database token storage (check API calls)
- ✅ Auth0 Management API calls retrieving tokens on-demand
- ✅ OAuth-first design - no hardcoded credentials

---

## 📋 Technical Details for Judges

### Auth0 Integration
- **Tenant:** dev-1vpksr0gtxaminyd.us.auth0.com
- **Social Connection:** Google OAuth 2.0
- **Token Retrieval:** Auth0 Management API (NOT Token Vault - see below)
- **Scopes:** `https://www.googleapis.com/auth/gmail.readonly`

### Why Not Token Vault?
We explored Auth0's Token Vault feature (`@auth0/ai-vercel` package) but encountered tenant-level configuration requirements. Instead, we implemented a **zero-trust pattern** using the Management API:

1. User logs in with Google via Auth0
2. Auth0 stores Google OAuth token in `user.identities[0].access_token`
3. AgentGate retrieves it on-demand via Management API
4. **Zero database token storage** - tokens never touch our database

**Why This Matters:**
- ✅ More secure than storing tokens in a database
- ✅ Demonstrates deep Auth0 platform understanding
- ✅ Production-ready pattern
- ✅ Clear migration path to Token Vault for enterprise

See **PROJECT_STORY.md** "Bonus Blog Post" section for the full technical journey.

---

## 🔍 Troubleshooting

### "Google hasn't verified this app" Warning
**This is expected!** Click **"Continue to AgentGate (unsafe)"**

Google app verification takes 4-6 weeks. AgentGate is a hackathon demo project and hasn't completed this process yet. You can verify the source code at https://github.com/jamador47/AgentGate

### "No emails found"
**Possible causes:**
1. Your inbox is empty (try the demo account)
2. Gmail API permissions weren't granted (sign out and sign in again)
3. Try asking: "Can you search for emails from Google?"

### Auth0 Login Redirects to Localhost
**This means environment variables aren't set on Railway**

Should not happen on the live demo, but if it does, please note it in feedback.

### Audit Log Shows Empty
**Refresh the page** - Audit logs are stored in-memory and poll every 3 seconds.

---

## 📚 Additional Resources

- **GitHub Repository:** https://github.com/jamador47/AgentGate
- **Privacy Policy:** https://agentgate.up.railway.app/privacy
- **Terms of Service:** https://agentgate.up.railway.app/terms
- **Project Story:** See PROJECT_STORY.md in the repo for the complete technical journey
- **Demo Video:** [Link to your demo video]

---

## 💬 Questions or Issues?

If you encounter any issues or have questions:

**GitHub Issues:** https://github.com/jamador47/AgentGate/issues

---

## 🏆 Why AgentGate Stands Out

Unlike other submissions that just add Auth0 login to a chatbot, AgentGate demonstrates:

1. **Deep Auth0 Integration** - Management API for zero-trust token retrieval
2. **Live Audit Logging** - Real-time transparency (the "money shot")
3. **Production-Ready Architecture** - TypeScript, error handling, clean code
4. **Enterprise Security** - Zero database token storage, OAuth-first
5. **Clear Business Model** - $29/month → $500/user/month → $10B TAM

**This isn't just a hackathon project. It's a foundation for enterprise AI agent governance.**

---

**Built with ❤️ for the Auth0 "Authorized to Act" Hackathon**

*Submission Date: April 4, 2026*
