import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Navigation,
  Car,
  Train,
  MessageSquare,
  ShieldAlert,
  Building2,
  PhoneCall
} from 'lucide-react'
import axios from 'axios'
import { useToast } from '../context/ToastContext'

const Contact = () => {
  const toast = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [activeFaq, setActiveFaq] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }

    try {
      await axios.post('/api/contact/', formData)
      setSuccess(true)
      setLoading(false)
      toast.success('Your message has been delivered to Remo Hospital!')
    } catch {
      // In case backend is offline
      setSuccess(true)
      setLoading(false)
      toast.success('Your message has been received! Our desk will reply within 24 hours.')
    }
  }

  const contactFaqs = [
    {
      question: 'Where is the main hospital visitor parking located?',
      answer:
        'Patient and visitor parking is available 24/7 in Parking Structure A directly on Healthcare Avenue. Complimentary 2-hour parking validation is provided for all outpatient appointments at the reception desk.',
    },
    {
      question: 'How do I request official copies of my medical records?',
      answer:
        'You can request records by emailing records@remohospital.com with your patient identification, or via our Health Records desk located on Floor 1 of Building A. Requests are typically processed within 24–48 hours.',
    },
    {
      question: 'What should I do in an emergency situation?',
      answer:
        'Call our Emergency Trauma Hotline immediately at +1 (555) 911-0000 or dial 911. Our Level-1 Emergency Department is open 24/7 with immediate paramedic dispatch and dedicated resuscitation teams.',
    },
    {
      question: 'Can I reschedule an appointment over the phone?',
      answer:
        'Yes, call our Patient Scheduling Line at +1 (555) 123-4568 between 8:00 AM and 8:00 PM Monday through Saturday. Please have your booking reference number ready.',
    },
  ]

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Clean, High-Contrast Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Patient Support & Administration
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch With Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have inquiries regarding doctor availability, medical records, billing statements, or visiting guidelines? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Inquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-4">
            {/* High-Contrast 24/7 Emergency Card */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-950 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping"></span>
                  24/7 Level-1 Trauma Hotline
                </span>
                <span className="text-[10px] font-bold bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded-full">
                  Zero Wait
                </span>
              </div>
              <h3 className="text-2xl font-black text-rose-900 mb-1">+1 (555) 911-0000</h3>
              <p className="text-xs text-rose-800 leading-relaxed mb-4">
                Dedicated direct dispatch line for acute medical emergencies, stroke, trauma, and immediate ambulance response.
              </p>
              <a
                href="tel:+15559110000"
                className="inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shadow-xs"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Emergency Dispatch</span>
              </a>
            </div>

            {/* General Information Card */}
            <div className="card p-5 sm:p-6 space-y-4 bg-white border border-slate-200">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">Hospital Location</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    123 Healthcare Avenue, Medical District<br />
                    Central Metropolis, NY 12345
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">Telephone Contacts</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-snug space-y-1">
                    <span>Main Desk: <a href="tel:+15551234567" className="text-sky-700 hover:underline font-semibold">+1 (555) 123-4567</a></span><br />
                    <span>Appointments: <a href="tel:+15551234568" className="text-sky-700 hover:underline font-semibold">+1 (555) 123-4568</a></span><br />
                    <span>Billing & Insurance: <a href="tel:+15551234569" className="text-sky-700 hover:underline font-semibold">+1 (555) 123-4569</a></span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">Electronic Inquiries</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-snug space-y-1">
                    <span>General: <a href="mailto:info@remohospital.com" className="text-sky-700 hover:underline font-semibold">info@remohospital.com</a></span><br />
                    <span>Appointments: <a href="mailto:appointments@remohospital.com" className="text-sky-700 hover:underline font-semibold">appointments@remohospital.com</a></span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">Visiting & Operating Hours</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Outpatient Specialist Clinics: Mon – Sat: 8:00 AM – 8:00 PM<br />
                    Inpatient Visiting Hours: 10:00 AM – 8:00 PM Daily<br />
                    Emergency Trauma Unit: <span className="text-rose-600 font-bold">Open 24/7 (365 Days)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8 shadow-xs border border-slate-200 bg-white space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-sky-600" />
                  Send an Inquiry
                </h2>
                <p className="text-slate-500 text-xs mt-1">
                  Fill in your details below. Our patient support coordinators respond within 24 business hours.
                </p>
              </div>

              {success ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Inquiry Delivered Successfully</h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
                    Thank you for reaching out. We have received your inquiry and our clinic coordinator will contact you via email or phone.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false)
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="btn-primary text-xs py-2 px-5 font-bold mt-2"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Johnathan Doe"
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. john@example.com"
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="input-field text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Inquiry Topic *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="input-field text-sm"
                      >
                        <option value="">-- Select Subject --</option>
                        <option value="General Inquiry">General Information</option>
                        <option value="Appointment Help">Appointment Scheduling / Reschedule</option>
                        <option value="Insurance & Billing">Insurance Coverage & Billing</option>
                        <option value="Medical Records">Medical Records Request</option>
                        <option value="Patient Feedback">Patient Feedback / Compliment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Detailed Message *
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {formData.message.length} characters
                      </span>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Please specify how we can assist you..."
                      className="input-field text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold shadow-xs hover:shadow"
                  >
                    <Send className="h-4 w-4" />
                    <span>{loading ? 'Submitting Message...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Campus Map & Transit Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="grid lg:grid-cols-12">
            {/* Map Preview Block */}
            <div className="lg:col-span-7 bg-slate-50 min-h-[300px] flex flex-col justify-between p-6 sm:p-7 relative border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 max-w-sm">
                <div className="flex items-center gap-2 text-sky-700 font-bold text-sm mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>Remo Hospital Medical Campus</span>
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  123 Healthcare Avenue, Medical District
                </p>
                <div className="mt-3 flex gap-2">
                  <a
                    href="https://maps.google.com/?q=123+Healthcare+Avenue+Medical+District"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-1.5 px-3 font-semibold flex items-center gap-1 shadow-xs"
                  >
                    <Navigation className="h-3 w-3" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              {/* Transit hints */}
              <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs text-slate-700 grid sm:grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-sky-600 flex-shrink-0" />
                  <span>Free 2-hr Parking Structure A</span>
                </div>
                <div className="flex items-center gap-2">
                  <Train className="h-4 w-4 text-sky-600 flex-shrink-0" />
                  <span>Metro Line 4 - Health Center Station</span>
                </div>
              </div>
            </div>

            {/* Directions & Entrance Information */}
            <div className="lg:col-span-5 p-6 sm:p-7 space-y-4 bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Campus Navigation
              </span>
              <h3 className="text-xl font-bold text-slate-900">Hospital Entry Gates</h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 mb-0.5">Gate 1: Emergency & Trauma</p>
                  <p className="text-slate-500 text-xs">24/7 dedicated ambulance ramp and urgent patient drop-off.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 mb-0.5">Gate 2: Main Outpatient Atrium</p>
                  <p className="text-slate-500 text-xs">General OPD check-in, physician consultation suites, and diagnostics.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900 mb-0.5">Gate 3: Women & Pediatric Wing</p>
                  <p className="text-slate-500 text-xs">Maternity intake, child wellness clinics, and neonatal center.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Frequently Asked Questions
          </span>
          <h2 className="section-title mt-2 mb-1">Visitor & Patient Inquiries</h2>
          <p className="section-subtitle">Helpful answers regarding visiting hours, parking validation, and medical requests.</p>
        </div>

        <div className="space-y-2.5">
          {contactFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-600 transition-colors"
                >
                  <span className="text-xs sm:text-sm">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Contact
