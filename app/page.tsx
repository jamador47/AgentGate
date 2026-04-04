import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <main className="flex flex-col items-center justify-center py-32 px-8 max-w-4xl text-center">
        <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          AgentGate
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4">
          AI Agent Permissions Dashboard & Orchestrator
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
          Take control of your AI agent's access. Monitor permissions, review audit logs,
          and approve sensitive actions in real-time with Auth0 Token Vault.
        </p>

        {!session ? (
          <div className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Try Demo Dashboard
            </Link>
            <a
              href="/api/auth/login"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In with Auth0
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Demo mode works without authentication. Sign in to connect your actual accounts.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              Welcome, {session.user.name || session.user.email}!
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
            </Link>
            <a
              href="/api/auth/logout"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Sign Out
            </a>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Real-Time Permissions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              See exactly what your AI agent can access and control permissions on-the-fly
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Audit Logging
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track every API call with full transparency and accountability
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Step-Up Auth
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Approve sensitive actions before they execute with Token Vault interrupts
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
