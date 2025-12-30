import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/aptitude', label: 'APTITUDE' },
    { path: '/coding', label: 'CODING' },
    { path: '/resume', label: 'RESUME' },
    { path: '/interview', label: 'INTERVIEW' },
    { path: '/companies', label: 'COMPANIES' },
    { path: '/performance', label: 'PERFORMANCE' },
  ];

  return (
    <header className="bg-background border-b border-gray-100">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading font-bold text-xl text-secondary">
            HireReady
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-secondary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-sm font-medium tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
