import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-backgrounddark text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading font-bold text-2xl mb-4">
              Placement Prep
            </h3>
            <p className="font-paragraph text-sm text-gray-300 leading-relaxed">
              Your comprehensive platform for campus placement preparation. Master aptitude, coding, interviews, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/aptitude" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Aptitude Practice
                </Link>
              </li>
              <li>
                <Link to="/coding" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Coding Practice
                </Link>
              </li>
              <li>
                <Link to="/resume" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/interview" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/companies" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Company Preparation
                </Link>
              </li>
              <li>
                <Link to="/performance" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Performance Tracking
                </Link>
              </li>
              <li>
                <a href="#about" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="font-paragraph text-sm text-gray-300 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="font-paragraph text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Placement Prep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
