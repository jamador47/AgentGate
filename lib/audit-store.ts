// Simple in-memory audit log store
// In production, this would be stored in a database

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  tool: string;
  action: string;
  status: 'success' | 'error' | 'pending' | 'denied';
  scopes: string[];
  details?: string;
  result?: any;
  userId?: string;
}

// Global store that persists across hot reloads in development
const globalForAudit = globalThis as unknown as {
  auditLogs?: AuditLogEntry[];
};

class AuditStore {
  private maxLogs = 100; // Keep last 100 logs

  // Use global storage to persist across hot reloads
  private get logs(): AuditLogEntry[] {
    if (!globalForAudit.auditLogs) {
      globalForAudit.auditLogs = [];
    }
    return globalForAudit.auditLogs;
  }

  private set logs(value: AuditLogEntry[]) {
    globalForAudit.auditLogs = value;
  }

  addLog(log: Omit<AuditLogEntry, 'id' | 'timestamp'>) {
    const newLog: AuditLogEntry = {
      ...log,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };

    console.log('💾 AuditStore.addLog:', {
      id: newLog.id,
      userId: newLog.userId,
      tool: newLog.tool,
      totalLogsAfter: this.logs.length + 1,
    });

    this.logs.unshift(newLog); // Add to beginning

    // Keep only maxLogs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    return newLog;
  }

  getLogs(userId?: string, limit: number = 50): AuditLogEntry[] {
    console.log('🔍 AuditStore.getLogs called:', {
      totalLogs: this.logs.length,
      requestedUserId: userId,
      allUserIds: this.logs.map(l => l.userId),
    });

    let filtered = this.logs;

    if (userId) {
      filtered = this.logs.filter(log => log.userId === userId);
      console.log('🔍 After filtering:', {
        filteredCount: filtered.length,
        matches: filtered.map(l => ({ id: l.id, userId: l.userId })),
      });
    }

    return filtered.slice(0, limit);
  }

  clearLogs(userId?: string) {
    if (userId) {
      this.logs = this.logs.filter(log => log.userId !== userId);
    } else {
      this.logs = [];
    }
  }
}

export const auditStore = new AuditStore();
