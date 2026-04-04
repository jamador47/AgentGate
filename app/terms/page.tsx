export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-600 mb-8">Last Updated: April 4, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using AgentGate ("the Service"), you accept and agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
        <p className="mb-4">
          AgentGate is an AI Agent Governance Platform that provides:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Real-time permission management for AI agents</li>
          <li>Audit logging of AI agent actions</li>
          <li>Transparency into what AI agents are doing with your data</li>
          <li>OAuth-based secure access to Google services (Gmail, Calendar)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hackathon Project Notice</h2>
        <p className="mb-4">
          <strong>IMPORTANT:</strong> AgentGate is a demonstration project built for the Auth0 "Authorized to Act" hackathon.
          The Service is provided "AS IS" for demonstration and educational purposes.
        </p>
        <p className="mb-4">
          While we follow security best practices, this is not a production-grade service. We recommend:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Do not use this Service for business-critical operations</li>
          <li>Do not rely on audit logs for compliance purposes (they are stored in-memory only)</li>
          <li>Be aware that the Service may experience downtime or data loss</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
        <p className="mb-4">You agree to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide accurate information when creating an account</li>
          <li>Keep your authentication credentials secure</li>
          <li>Use the Service in compliance with all applicable laws</li>
          <li>Not attempt to reverse engineer, hack, or abuse the Service</li>
          <li>Not use the Service to access data you do not have permission to access</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Authentication and Access</h2>
        <p className="mb-4">
          AgentGate uses Auth0 and Google OAuth for authentication. By signing in, you authorize AgentGate to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your Google profile information (name, email)</li>
          <li>Read your Gmail messages (read-only access)</li>
          <li>Read your Google Calendar events (read-only access)</li>
        </ul>
        <p className="mb-4">
          You can revoke these permissions at any time through your Google Account Settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data and Privacy</h2>
        <p className="mb-4">
          Your use of the Service is also governed by our Privacy Policy. Key points:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Zero database token storage:</strong> We do not store your Google OAuth tokens</li>
          <li><strong>Temporary audit logs:</strong> Stored in-memory only, not persisted to disk</li>
          <li><strong>No data sales:</strong> We never sell or share your personal data with third parties</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="mb-4">
          AgentGate is open-source software. The source code is available at:
          <br />
          <a href="https://github.com/jamador47/AgentGate" className="text-blue-600 hover:underline">
            https://github.com/jamador47/AgentGate
          </a>
        </p>
        <p className="mb-4">
          The AgentGate name, logo, and branding are property of the project creators.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
        <p className="mb-4">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>
        <p className="mb-4">
          We do not guarantee that:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>The Service will be uninterrupted or error-free</li>
          <li>Data will be stored permanently (audit logs are in-memory only)</li>
          <li>The Service will meet your specific requirements</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="mb-4">
          You may terminate your use of the Service at any time by:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Signing out of your account</li>
          <li>Revoking Google OAuth permissions via Google Account Settings</li>
        </ul>
        <p className="mb-4">
          We reserve the right to suspend or terminate access to the Service at any time, for any reason, including
          but not limited to violation of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p className="mb-4">
          We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance
          of the modified Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="mb-4">
          For questions about these Terms, please contact:
          <br />
          <strong>Email:</strong> [Your email for the hackathon]
          <br />
          <strong>GitHub:</strong> <a href="https://github.com/jamador47/AgentGate" className="text-blue-600 hover:underline">https://github.com/jamador47/AgentGate</a>
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
