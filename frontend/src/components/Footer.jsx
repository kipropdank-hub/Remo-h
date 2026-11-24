import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const toast = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.')
      return
    }
    setSubscribed(true)
    toast.success('Thank you for subscribing to Remo Health updates!')
    setEmail('')
  }

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group inline-flex" aria-label="Remo Hospital Home">
              <div className="bg-sky-600 rounded-xl p-2.5 text-white">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">Remo</span>
                <span className="text-xl font-extrabold text-sky-400 ml-1">Hospital</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Providing exceptional, evidence-based healthcare with compassion and excellence. 24/7 emergency response, modern outpatient clinics, and certified specialists.
            </p>

            <div className="pt-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <ShieldCheck className="h-4 w-4" />
                Accredited Facility
              </div>
              <p className="text-xs text-slate-500">
                JCI Accredited • State Board of Health Certified • ISO 9001:2015 Standards
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  Our Specialists
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Medical Services
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-sky-400 font-semibold hover:text-sky-300 transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">Eldoret-Webuye Rd</span>
                <span className="leading-snug">Lusachi plaza. Next to Mwamba stage</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +254 790520965
                
                </a>
                                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                 
                  +254 722216257 
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:info@remohospital.com" className="hover:text-white transition-colors truncate">
                  remomedical@gmail.com
                </a>
              </li>
              <li className="pt-1">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                  <div className="flex items-center space-x-2 text-red-400 font-semibold text-xs">
                    <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
                    <span>Emergency Direct Hotline</span>
                  </div>
                  <a
                    href="tel:+15559110000"
                    className="text-sm font-bold text-white hover:text-red-300 transition-colors block mt-1"
                  >
                    +254 790520965
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Visiting Hours & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Visiting Hours
            </h3>
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Outpatient:</span>
                <span className="text-white font-medium">Mon–Sat 7:00 AM – 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Inpatient Visiting:</span>
                <span className="text-white font-medium">10:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-700/60">
                <span className="text-slate-400">Emergency:</span>
                <span className="text-red-400 font-bold">Open 24/7</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs text-slate-400">Monthly Health Newsletter</p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 pr-9"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Subscribed successfully
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Remo Hospital Healthcare Network. All rights reserved.</p>
          <div className="flex space-x-5">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Terms of Care
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
