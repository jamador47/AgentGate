export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">Last Updated: April 4, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          AgentGate ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
          explains how we handle your data when you use our AI Agent Governance Platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data We Access</h2>
        <p className="mb-4">
          When you authenticate with AgentGate using Auth0 and Google OAuth, we request access to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Gmail (Read-Only):</strong> To demonstrate AI agent transparency and audit logging</li>
          <li><strong>Google Calendar (Read-Only):</strong> To show permission management for calendar access</li>
          <li><strong>Profile Information:</strong> Your name and email address from your Google account</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Handle Your Data</h2>
        <p className="mb-4">
          <strong>Zero Database Token Storage:</strong> We do NOT store your Google OAuth tokens in our database.
          Instead, we retrieve them on-demand from Auth0's Management API when needed.
        </p>
        <p className="mb-4">
          <strong>Audit Logs:</strong> We temporarily store audit logs of AI agent actions (tool calls, timestamps,
          scopes used) in memory for demonstration purposes. These logs are not persisted to disk and are cleared
          when the server restarts.
        </p>
        <p className="mb-4">
          <strong>Session Data:</strong> We use Auth0 to manage your authentication session. Your session is secured
          with industry-standard encryption and expires after a period of inactivity.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="mb-4">We use the following third-party services:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Auth0:</strong> For authentication and identity management</li>
          <li><strong>Google APIs:</strong> For accessing Gmail and Calendar data with your consent</li>
          <li><strong>Anthropic Claude:</strong> For AI agent processing (no personal data sent to Anthropic)</li>
          <li><strong>Railway:</strong> For application hosting</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Revoke access to your Google account at any time via Google Account Settings</li>
          <li>Request deletion of any data we have stored about you</li>
          <li>Access information about what data we have collected</li>
          <li>Sign out and delete your session at any time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <p className="mb-4">
          <strong>Audit Logs:</strong> Stored in-memory only, cleared on server restart (typically within 24 hours)
        </p>
        <p className="mb-4">
          <strong>OAuth Tokens:</strong> Never stored by us; managed entirely by Auth0
        </p>
        <p className="mb-4">
          <strong>Session Data:</strong> Expires after 7 days of inactivity or when you sign out
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Security</h2>
        <p className="mb-4">
          We implement industry-standard security measures including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>HTTPS encryption for all data in transit</li>
          <li>OAuth 2.0 for secure authentication</li>
          <li>Zero database token storage to minimize security liability</li>
          <li>Principle of least privilege for API scopes</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hackathon Project Notice</h2>
        <p className="mb-4">
          AgentGate is a submission for the Auth0 "Authorized to Act" hackathon. This is a demonstration project
          showcasing AI agent governance and transparency. While we follow security best practices, this application
          is not yet certified for production use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="mb-4">
          For questions about this Privacy Policy or your data, please contact us at:
          <br />
          <strong>Email:</strong> [Your email for the hackathon]
          <br />
          <strong>GitHub:</strong> <a href="https://github.com/jamador47/AgentGate" className="text-blue-600 hover:underline">https://github.com/jamador47/AgentGate</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify users of any material changes
          by updating the "Last Updated" date at the top of this policy.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-300">
        <p className="text-sm text-gray-600 text-center">
          Built with ❤️ for the Auth0 "Authorized to Act" Hackathon
        </p>
      </div>
    </div>
  );
}
