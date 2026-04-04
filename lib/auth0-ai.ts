import { auth0 } from "./auth0";

// Get Auth0 Management API access token
async function getManagementApiToken(): Promise<string> {
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials',
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// Get Google OAuth token from user's identity
export const getAccessToken = async () => {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      console.log('No session found');
      return undefined;
    }

    const userId = session.user.sub; // e.g., "google-oauth2|113531821091966907005"
    console.log('Getting Google token for user:', userId);

    // Get Management API token
    const managementToken = await getManagementApiToken();

    // Fetch user's identities to get Google access token
    const userResponse = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      }
    );

    const userData = await userResponse.json();
    console.log('User identities:', userData.identities?.length);

    // Find the Google identity
    const googleIdentity = userData.identities?.find(
      (identity: any) => identity.provider === 'google-oauth2'
    );

    if (googleIdentity && googleIdentity.access_token) {
      console.log('✅ Found Google access token!');
      return googleIdentity.access_token;
    }

    console.log('❌ No Google access token found in identity');
    return undefined;
  } catch (error) {
    console.error('Error getting Google access token:', error);
    return undefined;
  }
};

// Placeholder wrapper functions - these will be implemented with @auth0/ai-vercel
export function withGoogleCalendarConnection<T>(tool: T): T {
  return tool;
}

export function withGmailConnection<T>(tool: T): T {
  return tool;
}

export function withGitHubConnection<T>(tool: T): T {
  return tool;
}
