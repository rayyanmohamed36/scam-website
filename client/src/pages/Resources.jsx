export default function Resources() {
  const agencies = [
    {
      name: 'Federal Trade Commission (FTC)',
      description: 'File a complaint and report fraud, scams, and bad business practices.',
      url: 'https://reportfraud.ftc.gov',
      badge: 'US Federal',
    },
    {
      name: 'FBI Internet Crime Complaint Center (IC3)',
      description: 'Report internet-related criminal activity to the FBI.',
      url: 'https://www.ic3.gov',
      badge: 'US Federal',
    },
    {
      name: 'Consumer Financial Protection Bureau (CFPB)',
      description: 'Submit complaints about financial products and services.',
      url: 'https://www.consumerfinance.gov/complaint/',
      badge: 'US Federal',
    },
    {
      name: 'Better Business Bureau (BBB)',
      description: 'Research businesses and file complaints. Check Scam Tracker.',
      url: 'https://www.bbb.org/scamtracker',
      badge: 'Non-Profit',
    },
    {
      name: 'Identity Theft Resource Center (ITRC)',
      description: 'Get help if your identity has been stolen.',
      url: 'https://www.idtheftcenter.org',
      badge: 'Non-Profit',
    },
    {
      name: 'Action Fraud (UK)',
      description: 'The UK's national reporting centre for fraud and cybercrime.',
      url: 'https://www.actionfraud.police.uk',
      badge: 'UK',
    },
    {
      name: 'Scamwatch (Australia)',
      description: 'Report scams and learn how to protect yourself (ACCC).',
      url: 'https://www.scamwatch.gov.au',
      badge: 'Australia',
    },
    {
      name: 'Canadian Anti-Fraud Centre',
      description: 'Report fraud and identity theft in Canada.',
      url: 'https://www.antifraudcentre-centreantifraude.ca',
      badge: 'Canada',
    },
  ];

  const steps = [
    { step: '1', title: 'Stop All Communication', desc: 'Cease contact with the scammer immediately. Block their number and email.' },
    { step: '2', title: 'Document Everything', desc: 'Save emails, messages, receipts, and URLs. Take screenshots.' },
    { step: '3', title: 'Report It', desc: 'File official reports with the agencies listed above and your local police.' },
    { step: '4', title: 'Protect Your Accounts', desc: 'Change passwords, enable 2FA, and consider a credit freeze.' },
    { step: '5', title: 'Share Your Story', desc: 'Post your experience on ScamGuard to warn others and help the community.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Resources & Help</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          If you've been scammed or suspect fraud, these are the official agencies and steps you should take immediately.
        </p>
      </div>

      {/* What To Do If Scammed */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-bold text-red-800 mb-6 text-center">🚨 What to Do If You've Been Scammed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-2">
                {s.step}
              </div>
              <h3 className="font-semibold text-red-800 text-sm mb-1">{s.title}</h3>
              <p className="text-xs text-red-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agency Cards */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Official Reporting Agencies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agencies.map((agency) => (
          <a
            key={agency.name}
            href={agency.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                {agency.name}
              </h3>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {agency.badge}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{agency.description}</p>
            <span className="text-primary-600 text-sm font-medium group-hover:underline">
              Visit Website →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
