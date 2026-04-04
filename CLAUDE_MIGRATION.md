# Migration to Claude API

## Summary

AgentGate has been updated to use **Anthropic Claude 3.5 Sonnet** instead of OpenAI GPT-4o-mini as the LLM powering the AI agent.

## Changes Made

### 1. Dependencies
- **Added**: `@ai-sdk/anthropic@3.0.66`
- **Removed**: `@ai-sdk/openai`

### 2. Code Changes
**File**: `app/api/chat/route.ts`
- Changed import from `@ai-sdk/openai` to `@ai-sdk/anthropic`
- Updated model from `openai('gpt-4o-mini')` to `anthropic('claude-3-5-sonnet-20241022')`

### 3. Environment Variables
**File**: `.env.local.example`
- Changed `OPENAI_API_KEY` to `ANTHROPIC_API_KEY`
- Example value updated to `sk-ant-...`

### 4. Documentation Updates
Updated the following files to reflect Claude usage:
- **README.md**: Tech stack section and prerequisites
- **SETUP.md**: Prerequisites, environment variables section, and troubleshooting
- **DEVPOST.md**: "What it does" section, tech stack, and "Built With" section

## Why Claude?

Using Claude provides several advantages:
- **Superior reasoning**: Claude 3.5 Sonnet excels at complex multi-step reasoning tasks
- **Better tool use**: More reliable function/tool calling for API integrations
- **Extended context**: Larger context window for handling complex conversations
- **Cost-effective**: Competitive pricing for the level of performance

## Getting Your Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** in the dashboard
4. Click **Create Key** and copy your API key
5. Add it to your `.env.local` file as `ANTHROPIC_API_KEY`

## Model Information

**Current Model**: `claude-3-5-sonnet-20241022`

This is the latest Claude 3.5 Sonnet model, which offers:
- 200K token context window
- Excellent performance on coding and reasoning tasks
- Native tool use capabilities
- Fast response times

## No Breaking Changes

This migration is **backward compatible** with the rest of the codebase. The Vercel AI SDK abstracts the LLM provider, so:
- All tool integrations remain unchanged
- Auth0 Token Vault integration works the same way
- UI components require no modifications
- The chat interface behaves identically

## Testing

After setting your `ANTHROPIC_API_KEY` in `.env.local`, test the integration:

```bash
npm run dev
```

Then:
1. Sign in with Auth0
2. Ask the agent: "What can you help me with?"
3. Try a tool: "Show my calendar for next week"
4. Verify the agent responds correctly using Claude

## Reverting to OpenAI (if needed)

To revert back to OpenAI:

```bash
# Install OpenAI SDK
npm install @ai-sdk/openai

# In app/api/chat/route.ts, change:
import { anthropic } from '@ai-sdk/anthropic';
model: anthropic('claude-3-5-sonnet-20241022')

# Back to:
import { openai } from '@ai-sdk/openai';
model: openai('gpt-4o-mini')

# Update .env.local
ANTHROPIC_API_KEY → OPENAI_API_KEY
```

## Questions or Issues?

If you encounter any issues with the Claude integration, check:
1. Your `ANTHROPIC_API_KEY` is correctly set in `.env.local`
2. You have API credits available in your Anthropic account
3. The model name is spelled correctly: `claude-3-5-sonnet-20241022`

---

**Last Updated**: 2026-04-03
