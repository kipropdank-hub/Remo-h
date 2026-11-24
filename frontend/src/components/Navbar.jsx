import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, HeartPulse, Phone, Clock, Calendar, MapPin, ChevronRight } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Notification Bar: Clean & High Contrast */}
      {showEmergencyBanner && (
        <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6 overflow-x-auto py-0.5 scrollbar-none">
              <a
                href="tel:+15551234567"
                className="flex items-center space-x-2 text-white font-medium hover:text-sky-300 flex-shrink-0 transition-colors"
                title="Emergency hotline"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <Phone className="h-3.5 w-3.5 text-red-400" />
                <span>24/7 Emergency: <strong className="font-bold">+254 790520965</strong></span>
              </a>
              <div className="hidden md:flex items-center space-x-2 text-slate-400 flex-shrink-0">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Clinic Hours: Mon–Sat 7:00 AM – 10:00 PM</span>
              </div>
              <div className="hidden lg:flex items-center space-x-2 text-slate-400 flex-shrink-0">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>123 Healthcare Ave, Medical District</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-2">
              <Link
                to="/book-appointment"
                className="hidden sm:inline-flex items-center text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                Book Online →
              </Link>
              <button
                onClick={() => setShowEmergencyBanner(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav className="border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group focus:outline-none" aria-label="Remo Hospital Home">
              <div className="bg-sky-600 text-white rounded-xl p-2.5 shadow-xs group-hover:bg-sky-700 transition-colors">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight">Remo</span>
                  <span className="text-xl font-extrabold text-sky-600 ml-1">Hospital</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider -mt-1 hidden sm:block">Healthcare & Research</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      active
                        ? 'text-sky-700 bg-sky-50 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="tel:+15551234567"
                className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 py-2.5 px-3.5 rounded-xl transition-colors"
                title="Direct Phone Line"
              >
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                <span>+254 790520965</span>
              </a>

              <Link
                to="/book-appointment"
                className="btn-primary text-xs sm:text-sm flex items-center space-x-2 py-2 px-4.5"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Menu & Call Action */}
            <div className="flex md:hidden items-center space-x-2">
              <a
                href="tel:+15551234567"
                className="bg-slate-100 text-slate-700 p-2 rounded-xl active:bg-slate-200 transition-colors"
                aria-label="Call emergency"
              >
                <Phone className="h-5 w-5 text-red-600" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="fixed inset-0 top-[auto] z-50 md:hidden flex flex-col">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsOpen(false)}
            />

            <div className="relative bg-white w-full shadow-2xl border-t border-slate-200 px-5 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.path)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        active
                          ? 'bg-sky-50 text-sky-700 border-l-4 border-sky-600 pl-3 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`h-4 w-4 ${active ? 'text-sky-600' : 'text-slate-400'}`} />
                    </Link>
                  )
                })}
              </div>

              <div className="pt-4 space-y-2.5 border-t border-slate-100">
                <Link
                  to="/book-appointment"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-primary text-center py-3 flex items-center justify-center space-x-2 text-sm font-bold"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book an Appointment</span>
                </Link>

                <a
                  href="tel:+15551234567"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl flex items-center justify-center space-x-2 font-bold text-xs transition-colors"
                >
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>Call Emergency: +254 790520965</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
