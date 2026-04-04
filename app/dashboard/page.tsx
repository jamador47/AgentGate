'use client';

import { ChatWindow } from '@/components/ChatWindow';
import { PermissionsDashboard } from '@/components/PermissionsDashboard';
import { AuditProvider } from '@/context/AuditContext';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <AuditProvider>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              AgentGate
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              AI Agent Permissions Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/api/auth/logout"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign Out
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Section - 60% */}
          <div className="flex-[3] flex flex-col bg-white dark:bg-gray-800">
            <div className="border-b dark:border-gray-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agent Chat
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ask me to access your Calendar, Gmail, or GitHub
              </p>
            </div>
            <ChatWindow />
          </div>

          {/* Permissions Dashboard - 40% */}
          <div className="flex-[2] flex flex-col">
            <PermissionsDashboard />
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
          Built for Auth0 &quot;Authorized to Act&quot; Hackathon | Powered by Token Vault
        </footer>
      </div>
    </AuditProvider>
  );
}
