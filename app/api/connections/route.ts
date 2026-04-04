import { auth0 } from '@/lib/auth0';
import { getAccessToken } from '@/lib/auth0-ai';

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userId = session.user.sub;

    // Get Management API token
    const managementToken = await getManagementApiToken();

    // Fetch user data from Auth0 Management API
    const userResponse = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      }
    );

    const userData = await userResponse.json();

    // Check which providers are actually connected
    const identities = userData.identities || [];
    const googleIdentity = identities.find((id: any) => id.provider === 'google-oauth2');
    const githubIdentity = identities.find((id: any) => id.provider === 'github');

    // Get the actual scopes from the Google identity
    const googleScopes = googleIdentity?.access_token
      ? await getGoogleScopes(googleIdentity.access_token)
      : [];

    const connections = [
      {
        name: 'Gmail',
        provider: 'google',
        icon: '📧',
        connected: !!googleIdentity?.access_token,
        scopes: googleIdentity?.access_token
          ? ['https://www.googleapis.com/auth/gmail.readonly']
          : [],
        displayScopes: googleIdentity?.access_token
          ? ['gmail.read', 'gmail.metadata']
          : [],
      },
      {
        name: 'Google Calendar',
        provider: 'google',
        icon: '📅',
        connected: !!googleIdentity?.access_token,
        scopes: googleIdentity?.access_token
          ? ['https://www.googleapis.com/auth/calendar.readonly']
          : [],
        displayScopes: googleIdentity?.access_token
          ? ['calendar.events.read']
          : [],
      },
      {
        name: 'GitHub',
        provider: 'github',
        icon: '💻',
        connected: !!githubIdentity,
        scopes: [],
        displayScopes: githubIdentity ? ['Not configured'] : [],
      },
    ];

    return new Response(JSON.stringify({ connections }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching connections:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to fetch connections' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

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

async function getGoogleScopes(accessToken: string): Promise<string[]> {
  try {
    // Get token info from Google
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const data = await response.json();
    return data.scope ? data.scope.split(' ') : [];
  } catch (error) {
    console.error('Error getting Google scopes:', error);
    return [];
  }
}
