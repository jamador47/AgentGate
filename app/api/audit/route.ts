import { auth0 } from '@/lib/auth0';
import { auditStore } from '@/lib/audit-store';

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
    const logs = auditStore.getLogs(userId);

    console.log(`📊 Fetching audit logs for user ${userId}:`, logs.length, 'logs found');
    if (logs.length > 0) {
      console.log('First log:', logs[0]);
    }

    return new Response(JSON.stringify({ logs }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching audit logs:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to fetch audit logs' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userId = session.user.sub;
    auditStore.clearLogs(userId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error clearing audit logs:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to clear audit logs' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
