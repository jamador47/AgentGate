'use client';

import { useState, useEffect } from 'react';
import { AuditLog } from './AuditLog';

interface Connection {
  name: string;
  provider: 'google' | 'github';
  icon: string;
  connected: boolean;
  scopes: string[];
  displayScopes: string[];
}

export function PermissionsDashboard() {
  const [activeTab, setActiveTab] = useState<'connections' | 'audit'>('connections');
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConnections() {
      try {
        const response = await fetch('/api/connections');
        if (response.ok) {
          const data = await response.json();
          setConnections(data.connections);
        } else {
          console.error('Failed to fetch connections');
        }
      } catch (error) {
        console.error('Error fetching connections:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l dark:border-gray-700">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Permissions Control
        </h2>
      </div>

      <div className="flex border-b dark:border-gray-700">
        <button
          onClick={() => setActiveTab('connections')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'connections'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'audit'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Audit Log
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'connections' ? (
          <ConnectionsPanel connections={connections} loading={loading} />
        ) : (
          <AuditLog />
        )}
      </div>
    </div>
  );
}

function ConnectionsPanel({ connections, loading }: { connections: Connection[]; loading: boolean }) {
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center h-full">
        <div className="text-gray-500 dark:text-gray-400">Loading connections...</div>
      </div>
    );
  }

  const handleViewDetails = (connection: Connection) => {
    setSelectedConnection(connection);
  };

  const handleConnect = (connection: Connection) => {
    if (connection.provider === 'github') {
      alert('GitHub integration coming soon! For this demo, we are focusing on Google services (Gmail & Calendar).');
    } else {
      alert('This account is already connected via Auth0 login. Additional OAuth scopes can be configured in Auth0 dashboard.');
    }
  };

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Connected Accounts
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Real-time connection status from Auth0
        </p>
      </div>

      {connections.map((connection) => (
        <div
          key={connection.name}
          className="p-4 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                connection.provider === 'google'
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {connection.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {connection.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {connection.provider === 'google' ? 'Google' : 'GitHub'}
                </p>
              </div>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                connection.connected
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
              }`}
            >
              {connection.connected ? '✓ Connected' : '⚠ Not Connected'}
            </span>
          </div>

          {connection.connected && (
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Available Scopes:
              </h5>
              <div className="flex flex-wrap gap-2">
                {connection.displayScopes.map((scope) => (
                  <span
                    key={scope}
                    className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!connection.connected && (
            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-2">
              Connect your {connection.provider === 'google' ? 'Google' : 'GitHub'} account to enable this service
            </p>
          )}

          <div className="mt-4 pt-4 border-t dark:border-gray-700 flex gap-2">
            {connection.connected ? (
              <button
                onClick={() => handleViewDetails(connection)}
                className="text-xs px-3 py-1.5 text-gray-700 dark:text-gray-300 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View Details
              </button>
            ) : (
              <button
                onClick={() => handleConnect(connection)}
                className="text-xs px-3 py-1.5 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Connect Account
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Details Modal */}
      {selectedConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedConnection(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {selectedConnection.icon} {selectedConnection.name}
              </h3>
              <button
                onClick={() => setSelectedConnection(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Connection Status
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedConnection.connected ? (
                    <span className="text-green-600 dark:text-green-400">✓ Connected via Auth0 Google OAuth</span>
                  ) : (
                    <span className="text-yellow-600 dark:text-yellow-400">⚠ Not Connected</span>
                  )}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Available API Scopes
                </h4>
                <div className="space-y-1">
                  {selectedConnection.scopes.map((scope) => (
                    <div key={scope} className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                      <code className="text-gray-800 dark:text-gray-200">{scope}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  How It Works
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  When you logged in with Auth0, you granted Google OAuth permissions.
                  The AI agent uses Auth0 Management API to retrieve your Google access token
                  and make authorized API calls to {selectedConnection.name} on your behalf.
                </p>
              </div>

              <div className="pt-4 border-t dark:border-gray-700">
                <button
                  onClick={() => setSelectedConnection(null)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          🔒 Principle of Least Privilege
        </h4>
        <p className="text-xs text-blue-800 dark:text-blue-400">
          The agent only has access to the permissions you explicitly grant. You can
          revoke access at any time, and sensitive actions require your approval.
        </p>
      </div>
    </div>
  );
}
