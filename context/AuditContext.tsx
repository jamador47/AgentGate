'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  tool: string;
  action: string;
  status: 'success' | 'error' | 'pending' | 'denied';
  scopes: string[];
  details?: string;
  result?: any;
}

interface AuditContextType {
  logs: AuditLogEntry[];
  addLog: (log: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  updateLog: (id: string, updates: Partial<AuditLogEntry>) => void;
  clearLogs: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  const addLog = useCallback((log: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      ...log,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };
    setLogs(prev => [newLog, ...prev]);
    return newLog.id;
  }, []);

  const updateLog = useCallback((id: string, updates: Partial<AuditLogEntry>) => {
    setLogs(prev =>
      prev.map(log => (log.id === id ? { ...log, ...updates } : log))
    );
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <AuditContext.Provider value={{ logs, addLog, updateLog, clearLogs }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within AuditProvider');
  }
  return context;
}
