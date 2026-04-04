# Demo Credentials for Judges

⚠️ **For Auth0 Hackathon Judges Only**

## How to Test AgentGate

### Option 1: Watch the Demo Video (Recommended)
**Video URL:** [Insert your demo video URL here]

The demo video shows:
- ✅ Live Auth0 + Google OAuth authentication
- ✅ Real Gmail data retrieval with actual emails
- ✅ Live audit log updates in real-time
- ✅ Permissions panel with real OAuth scopes
- ✅ Complete end-to-end functionality

---

### Option 2: Test with Your Own Google Account

AgentGate works with **any Google account**. To test with your own account:

1. **Visit:** https://agentgate.up.railway.app
2. **Click:** "Sign In with Auth0"
3. **Authorize:** Google OAuth consent screen
4. **Test:** Ask the AI "Can you check my latest 2 emails?"
5. **Watch:** The audit log update in real-time

**What You'll See:**
- Your actual Gmail messages retrieved and displayed
- Live audit logging of the API call
- Real OAuth scopes from your Google account
- Complete transparency into what the AI is doing

**Privacy Note:** AgentGate uses **zero database token storage**. Your Google OAuth token is retrieved on-demand from Auth0's Management API and never stored in our database.

---

### Option 3: Demo Account (If You Don't Want to Use Your Google Account)

If you prefer not to use your own Google account, we've created a demo account:

**Demo Google Account:**
- Email: `agentgate.demo@gmail.com`
- Password: `[Create a password and add here]`

**What's in the demo inbox:**
- Sample emails demonstrating Gmail API retrieval
- Various email types (promotional, transactional, personal)
- Enough data to showcase the audit logging features

**How to Use:**
1. Visit https://agentgate.up.railway.app
2. Click "Sign In with Auth0"
3. Use the demo Google credentials above
4. Grant OAuth permissions when prompted
5. Ask: "Can you check my latest emails?"
6. Watch the live audit log update!

---

## Technical Details for Judges

### Auth0 Integration
- **Tenant:** dev-1vpksr0gtxaminyd.us.auth0.com
- **Social Connection:** Google OAuth 2.0
- **Token Management:** Auth0 Management API (zero database token storage)
- **Scopes Requested:** `https://www.googleapis.com/auth/gmail.readonly`

### Why This Approach?
Most hackathon projects would store your Google OAuth token in their database (security risk). AgentGate retrieves it on-demand from Auth0's Management API, demonstrating:
- ✅ Zero-trust architecture
- ✅ No credential storage liability
- ✅ Production-ready security patterns
- ✅ Auth0-first design

### Architecture Verification
To verify the zero-trust approach:
1. Sign in with any Google account
2. Check audit logs (every tool call is logged)
3. Click "View Details" on audit entries (see full JSON)
4. Open browser DevTools → Network tab
5. Watch Auth0 Management API calls retrieving tokens on-demand

---

## Questions for Judges?

If you encounter any issues or have questions:
- **GitHub Issues:** https://github.com/jamador47/AgentGate/issues
- **Email:** [Your email for hackathon]
- **Documentation:** See README.md and PROJECT_STORY.md in the repo

---

## Why AgentGate Stands Out

Unlike other submissions that just add Auth0 login to a chatbot, AgentGate demonstrates:

1. **Deep Auth0 Integration** - Uses Management API for zero-trust token retrieval
2. **Live Audit Logging** - Real-time transparency into AI agent actions
3. **Production-Ready Architecture** - TypeScript, proper error handling, clean separation of concerns
4. **Enterprise Security** - Zero database token storage, OAuth-first design
5. **Clear Business Model** - $29/month SMB tier → $500/user/month Enterprise tier → $10B TAM

**This isn't just a hackathon project. It's a foundation for enterprise AI agent governance.**

---

**Built with ❤️ for the Auth0 "Authorized to Act" Hackathon**

*Submission Date: April 4, 2026*
