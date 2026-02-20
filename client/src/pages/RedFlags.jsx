export default function RedFlags() {
  const flags = [
    {
      icon: '🎣',
      title: 'Phishing Emails & Texts',
      description: 'Messages that mimic legitimate companies, urging you to click a link or verify your info. Look for misspelled domains, generic greetings, and a false sense of urgency.',
      tips: ['Check the sender\'s actual email address', 'Hover over links before clicking', 'Never share passwords via email'],
    },
    {
      icon: '💰',
      title: 'Too-Good-To-Be-True Returns',
      description: 'Promises of guaranteed high returns with zero risk. No legitimate investment can guarantee profits.',
      tips: ['Research the company on SEC.gov', 'Be wary of "limited time" pressure', 'If it sounds too good to be true, it probably is'],
    },
    {
      icon: '🔒',
      title: 'Requests for Upfront Payment',
      description: 'Scammers may ask for payment in gift cards, crypto, or wire transfers. Legitimate businesses don\'t demand these payment methods.',
      tips: ['Never pay with gift cards', 'Be cautious of crypto-only payment', 'Use credit cards for buyer protection'],
    },
    {
      icon: '👤',
      title: 'Impersonation of Authority',
      description: 'Scammers pretend to be from the IRS, police, or tech support. Real agencies will never call demanding immediate payment.',
      tips: ['Government agencies communicate by mail first', 'Hang up and call the agency directly', 'Never give remote access to your computer'],
    },
    {
      icon: '❤️',
      title: 'Romance Scams',
      description: 'Someone you met online professes love quickly, then asks for money. They may claim emergencies or travel costs.',
      tips: ['Never send money to someone you haven\'t met in person', 'Reverse image search their photos', 'Be cautious of people who avoid video calls'],
    },
    {
      icon: '🏪',
      title: 'Fake Online Stores',
      description: 'Professional-looking websites selling products at deep discounts. They take your money and never deliver.',
      tips: ['Check for HTTPS and a physical address', 'Read reviews on independent sites', 'Search "[store name] scam" before buying'],
    },
    {
      icon: '📱',
      title: 'Fake Job Offers',
      description: 'Jobs that require you to pay for training or equipment upfront, or ask for your SSN before an interview.',
      tips: ['Real employers don\'t charge you to work', 'Verify the company on LinkedIn / Glassdoor', 'Never share financial info during "hiring"'],
    },
    {
      icon: '🎁',
      title: 'Prize & Lottery Scams',
      description: 'You "won" something you never entered. To claim, you need to pay fees or share personal information.',
      tips: ['You can\'t win a contest you didn\'t enter', 'Never pay to receive a prize', 'Delete unsolicited "winner" notices'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">🚩 Common Scam Red Flags</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Learn to spot the warning signs before it's too late. Scammers are getting more sophisticated — stay one step ahead.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flags.map((flag, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{flag.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{flag.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{flag.description}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-blue-700 mb-1">How to protect yourself:</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    {flag.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-primary-800 mb-2">Remember</h2>
        <p className="text-primary-700 max-w-xl mx-auto">
          If something feels off, trust your instincts. Take a step back, research, and never rush into a decision involving your money or personal information.
        </p>
      </div>
    </div>
  );
}
