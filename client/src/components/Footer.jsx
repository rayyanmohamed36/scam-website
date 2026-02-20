import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">🛡️ ScamGuard</h3>
            <p className="text-sm text-gray-400">
              Helping people stay safe from scams. Share your experience, search for businesses, and protect the community.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/stories" className="hover:text-white transition-colors">Scam Stories</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Search a Business</Link></li>
              <li><Link to="/red-flags" className="hover:text-white transition-colors">Red Flags</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources & Help</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Report Scams</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FTC Fraud Report</a></li>
              <li><a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">FBI IC3</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ScamGuard. All rights reserved. Stay vigilant.
        </div>
      </div>
    </footer>
  );
}
