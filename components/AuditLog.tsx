'use client';

import { useState, useEffect } from 'react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  tool: string;
  action: string;
  status: 'success' | 'error' | 'pending' | 'denied';
  scopes: string[];
  details?: string;
  result?: any;
}

export function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/audit');
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = async () => {
    try {
      const response = await fetch('/api/audit', { method: 'DELETE' });
      if (response.ok) {
        setLogs([]);
      }
    } catch (error) {
      console.error('Error clearing audit logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Poll for new logs every 3 seconds
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Audit Log
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Loading audit logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Audit Log
        </h2>
        {logs.length > 0 && (
          <button
            onClick={clearLogs}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {logs.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            <p>No actions logged yet.</p>
            <p className="text-sm mt-2">Tool calls will appear here automatically.</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-lg border-l-4 ${getStatusColor(log.status)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {log.tool}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(log.status)}`}>
                    {log.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                {log.action}
              </p>

              {log.scopes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {log.scopes.map((scope) => (
                    <span
                      key={scope}
                      className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              )}

              {log.details && (
                <details className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  <summary className="cursor-pointer hover:text-gray-900 dark:hover:text-white">
                    View details
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded overflow-x-auto">
                    {log.details}
                  </pre>
                </details>
              )}

              {log.result && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {log.result.message && (
                    <p className="font-medium">{log.result.message}</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'success':
      return 'border-green-500 bg-green-50 dark:bg-green-900/10';
    case 'error':
      return 'border-red-500 bg-red-50 dark:bg-red-900/10';
    case 'pending':
      return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
    case 'denied':
      return 'border-orange-500 bg-orange-50 dark:bg-orange-900/10';
    default:
      return 'border-gray-500 bg-gray-50 dark:bg-gray-900/10';
  }
}

function getStatusBadge(status: string): string {
  switch (status) {
    case 'success':
      return 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-300';
    case 'error':
      return 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-300';
    case 'pending':
      return 'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
    case 'denied':
      return 'bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-300';
    default:
      return 'bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-300';
  }
}
