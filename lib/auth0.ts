import { Auth0Client } from '@auth0/nextjs-auth0/server';

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
  signInReturnToPath: '/dashboard',
  routes: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    callback: '/api/auth/callback',
  },
});

export const getRefreshToken = async (): Promise<string | undefined> => {
  const session = await auth0.getSession();
  return session?.refreshToken as string | undefined;
};

export { auth0 };
