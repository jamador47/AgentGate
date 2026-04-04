# AgentGate - AI Agent Permissions Dashboard

## Tagline
Take control of your AI agents with real-time permissions monitoring, audit logging, and step-up authentication powered by Auth0 Token Vault.

---

## Inspiration

AI agents are becoming more powerful, accessing our calendars, emails, repositories, and more. But here's the problem: **we have no idea what they're doing**. Most AI chatbots are black boxes — you don't know what permissions they have, what data they're accessing, or when sensitive actions occur.

AgentGate was born from a simple question: **What if users could see and control everything their AI agent does?**

Instead of building yet another chatbot, I focused on the **transparency and control layer** — a real-time dashboard that puts users back in charge of their AI agents.

---

## What it does

AgentGate is an **AI Agent Permissions Dashboard & Orchestrator** that connects to Google Calendar, Gmail, and GitHub via Auth0 Token Vault. Users can:

### 1. Chat with an AI Assistant
- Ask the agent to check your calendar, search emails, or list GitHub repos
- Natural language interface powered by Anthropic Claude 3.5 Sonnet
- Multi-step reasoning with tool calling

### 2. Monitor Permissions in Real-Time
- **Connections panel** shows all linked accounts (Google, GitHub)
- **Scope visualization** displays exactly what permissions the agent has
- **Status indicators**: Green = active, Yellow = pending, Red = denied
- **Principle of Least Privilege** monitoring ensures the agent only has necessary access

### 3. Review Audit Logs
- **Every API call is logged** with timestamp, tool name, scopes used, and result status
- Expandable details show request parameters and responses
- Color-coded status: success (green), error (red), pending (yellow)
- Full transparency into what the agent is doing

### 4. Approve Sensitive Actions
- **Step-up authentication** via Token Vault interrupts
- When the agent tries to create a calendar event or access new data, the user must approve
- Clear consent UI shows WHAT the agent wants to do and WHY
- No surprises, no hidden actions

---

## How we built it

### Tech Stack
- **Next.js 14** (App Router) for the web framework
- **Auth0 Token Vault** (`@auth0/ai-vercel` v5+) for secure token management
- **Vercel AI SDK** (`ai` v6, `@ai-sdk/anthropic`) for AI agent orchestration
- **Anthropic Claude 3.5 Sonnet** as the LLM
- **Google APIs** (Calendar, Gmail) via `googleapis`
- **GitHub REST API** for repository access
- **Tailwind CSS** for UI styling

### Architecture Highlights

#### 1. Token Vault Integration
Each tool is wrapped with `withTokenVault()` to handle scoped token exchange:

```typescript
export const getCalendarEventsTool = withGoogleCalendarConnection(
  tool({
    description: 'Get calendar events for a given date range',
    parameters: z.object({ startDate: z.string(), endDate: z.string() }),
    execute: async ({ startDate, endDate }) => {
      const accessToken = await getAccessToken();
      // Use googleapis with access token
    },
  })
);
```

#### 2. Interrupt Handling
The chat API route uses `withInterruptions()` to catch Token Vault authorization prompts:

```typescript
const stream = createUIMessageStream({
  originalMessages: messages,
  execute: withInterruptions(
    async ({ writer }) => {
      const result = streamText({ model, messages, tools });
      writer.merge(result.toUIMessageStream());
    },
    { messages, tools }
  ),
});
```

#### 3. Audit Logging
React Context tracks every tool invocation and displays it in the dashboard:

```typescript
useEffect(() => {
  messages.forEach((message) => {
    if (message.toolInvocations) {
      message.toolInvocations.forEach((invocation) => {
        addLog({ tool: invocation.toolName, status: 'success', ... });
      });
    }
  });
}, [messages]);
```

#### 4. Split-Panel Dashboard
The UI is divided 60/40: chat on the left, permissions dashboard on the right. This design emphasizes that **transparency is the product**, not just the chatbot.

---

## Challenges we ran into

### 1. Scope Discovery
The Token Vault SDK doesn't provide a way to introspect which scopes a user has granted. I had to hardcode scope-to-tool mappings. A `getUserScopes()` API would be incredibly valuable for building permission dashboards.

### 2. Token Vault UI Components
The docs mention `npx @auth0/ai-components add TokenVault` to generate consent UI, but I encountered errors and ended up building a custom flow. Better error messages and examples would help here.

### 3. Refresh Token Access
It took some digging to figure out how to access the refresh token from the Auth0 session (`session?.tokenSet?.refreshToken`). Clearer documentation on the `tokenSet` structure would save time.

### 4. Real-Time Audit Updates
Propagating tool invocations from the chat API to the audit log component required careful state management. I used React Context, but this could be brittle at scale. A server-side event log would be more robust.

---

## Accomplishments that we're proud of

1. **The dashboard actually works!** Seeing permissions update in real-time as the agent makes API calls is incredibly satisfying.

2. **Clean Token Vault integration**: The `withTokenVault()` wrapper pattern is elegant and easy to extend to new tools.

3. **Audit logging from day one**: Most AI demos skip this, but it's critical for user trust. Every tool call is visible.

4. **User-centric design**: The split-panel layout makes it clear that users are in control, not the agent.

5. **Educational value**: This project demonstrates patterns for scope management, step-up auth, and audit trails that other developers can learn from.

---

## What we learned

### Technical Insights
- **Token Vault's interrupt system is powerful** — it turns authorization into a first-class part of the agent workflow, not an afterthought.
- **Audit logging should be a native feature** — Every agent platform should provide audit trails by default. I had to build this from scratch.
- **Scope management UX is hard** — Showing permissions in a way that's understandable to non-technical users requires careful design.

### Product Insights
- **Transparency builds trust** — Users feel more comfortable with AI agents when they can see exactly what's happening.
- **The dashboard is the product** — The chat interface is secondary; the real value is the control panel.
- **Step-up auth needs clear communication** — Users want to know WHY the agent needs additional permissions, not just WHAT it's requesting.

### Feedback for Auth0
1. **Add a `getGrantedScopes()` method** to the SDK for introspecting user permissions
2. **Provide native audit logging** — Store token exchanges in Auth0 so developers don't have to build this
3. **Document the `tokenSet` structure** more clearly in the Auth0 session docs
4. **Improve CLI tool error messages** for component generation
5. **Consider embeddable React components** for permission management UIs (like a drop-in `<ScopeManager />` widget)

---

## What's next for AgentGate

### Short-Term (Post-Hackathon)
- **Add more tools**: Slack, Notion, Google Drive, Dropbox
- **Implement step-up auth UI**: Build the consent dialog for sensitive actions
- **Persist audit logs**: Store logs in a database (Supabase, Postgres) instead of just client state
- **Scope narrowing**: Let users granularly control what the agent can do (e.g., "read calendar but don't create events")

### Medium-Term
- **Multi-agent support**: Let users manage permissions for multiple AI assistants
- **Team dashboards**: Enterprise view showing all agents and their permissions across an organization
- **Alerts**: Notify users when an agent attempts suspicious actions
- **Policy engine**: Define rules like "never access Gmail after 5pm" or "always require approval for calendar writes"

### Long-Term Vision
AgentGate becomes a **universal permission layer for AI agents**. Imagine:
- A browser extension that intercepts all agent API calls and shows them in a dashboard
- An open protocol for AI agents to declare their capabilities and request permissions
- A marketplace of "trusted tools" with verified security properties
- Integration with enterprise IAM systems (Okta, Azure AD) for centralized agent governance

**The future of AI agents isn't just about what they can do — it's about giving users control over what they're allowed to do.**

---

## Bonus Blog Post: Building AgentGate

### The Problem
AI agents are powerful, but opaque. Users have no idea what permissions their agents have, what data they're accessing, or when sensitive actions occur. This is a **trust problem**.

### The Solution
AgentGate treats the *dashboard* as the product, not just the chatbot. By surfacing permissions, audit logs, and step-up authentication in real-time, users feel in control.

### Technical Highlights
- **Token Vault Integration**: The `withTokenVault()` wrapper pattern is elegant. Each tool is scoped independently, and the SDK handles token exchange automatically.
- **Interrupt Handling**: Using `withInterruptions()` in the chat route to catch `TokenVaultError` and trigger consent UI was straightforward.
- **Audit Logging**: React Context made it simple to propagate tool calls from the chat to the audit log component.

### Challenges Encountered
1. **Scope Discovery**: It's not immediately clear from the SDK how to introspect which scopes a user has granted. I had to hardcode scope-to-tool mappings. A `getUserScopes()` API would be valuable.
2. **Token Vault UI Generation**: The `npx @auth0/ai-components add TokenVault` command didn't work as expected. Better CLI error messages would help.
3. **Refresh Token Access**: Getting the refresh token from the Auth0 session required reading the source code. Clearer documentation would be helpful.

### What I Learned
- **Audit logging should be a first-class feature** in Token Vault. Imagine if Auth0 provided a `/api/token-vault/audit` endpoint.
- **Scope management UX is critical** for user trust. Auth0 could provide embeddable React components for this.
- **Step-up auth is powerful** but needs clear UI patterns. Users should always see WHAT and WHY.

### Future Vision
AgentGate proves that transparency is possible. With native support for audit logs, scope introspection APIs, and embeddable permission widgets, Token Vault could become the standard for AI agent orchestration.

---

## Demo Video

[Link to YouTube video — approximately 3 minutes]

**Timestamps**:
- 0:00 - Introduction & problem statement
- 0:20 - Login flow with Auth0
- 0:40 - Calendar access with Token Vault consent
- 1:10 - Permissions dashboard in action
- 1:30 - Gmail search with step-up auth
- 2:00 - GitHub repositories tool
- 2:20 - Audit log walkthrough
- 2:40 - Code walkthrough of Token Vault integration

---

## Try It Yourself

**GitHub**: [Your repository URL]
**Live Demo**: [Deployed URL if available]

### Setup Instructions
1. Clone the repository
2. Set up Auth0 with Token Vault enabled
3. Configure Google OAuth with Calendar & Gmail scopes
4. Configure GitHub OAuth
5. Add environment variables
6. Run `npm install && npm run dev`

Full setup guide: [Link to SETUP.md in repo]

---

## Built With
- Next.js
- Auth0 Token Vault
- Vercel AI SDK
- Anthropic Claude
- Google Calendar API
- Gmail API
- GitHub API
- Tailwind CSS
- TypeScript

---

## Team
[Your Name] - Solo Developer

---

## Feedback Form Completed
✅ Submitted feedback at https://airtable.com/appDAldRN7ujOokwn/shrBNlj8Rup2CBkea

**Key suggestions**:
1. Add `getGrantedScopes()` API to SDK
2. Provide native audit logging in Token Vault
3. Document `tokenSet` structure better
4. Improve CLI tool error messages
5. Consider embeddable permission management widgets

---

**Thanks to the Auth0 team for Token Vault — it's a game-changer for AI agent security!**
