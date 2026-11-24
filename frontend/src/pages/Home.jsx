import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HeartPulse,
  Users,
  Award,
  Clock,
  Star,
  ArrowRight,
  Stethoscope,
  Shield,
  Activity,
  CheckCircle2,
  PhoneCall,
  ChevronDown,
  Quote,
  Building2,
  Calendar
} from 'lucide-react'
import QuickAppointmentWidget from '../components/QuickAppointmentWidget'

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  const features = [
    {
      icon: <HeartPulse className="h-6 w-6 text-sky-600" />,
      title: 'Expert Medical Faculty',
      description: 'Board-certified specialists with decades of clinical experience across all major subspecialties.',
    },
    {
      icon: <Shield className="h-6 w-6 text-sky-600" />,
      title: 'Modern Diagnostic Suites',
      description: 'Equipped with 3T MRI, low-dose CT scanners, and automated pathology laboratories for rapid results.',
    },
    {
      icon: <Clock className="h-6 w-6 text-sky-600" />,
      title: '24/7 Rapid Emergency',
      description: 'Round-the-clock level-1 trauma care, dedicated resuscitation units, and immediate ambulance triage.',
    },
    {
      icon: <Award className="h-6 w-6 text-sky-600" />,
      title: 'Accredited Quality Care',
      description: 'JCI-accredited facility following rigorous patient safety benchmarks, hygiene, and ethical standards.',
    },
  ]

  const stats = [
    { value: '10+', label: 'Specialist Doctors', sub: 'Across 50+ medical domains' },
    { value: '50+', label: 'Clinical Departments', sub: 'Fully equipped specialty units' },
    { value: '100K+', label: 'Patients Treated', sub: '99.2% patient satisfaction' },
    { value: '24/7', label: 'Emergency Ready', sub: 'Zero-wait triage response' },
  ]

  const departments = [
    { name: 'Cardiology', icon: <HeartPulse className="h-5 w-5" />, doctors: 25, desc: 'Non-invasive diagnostics, catheter interventions, and cardiac rehab.' },
    { name: 'Neurology', icon: <Activity className="h-5 w-5" />, doctors: 18, desc: 'Stroke emergency unit, epilepsy diagnostics, and cognitive clinic.' },
    { name: 'Orthopedics', icon: <Stethoscope className="h-5 w-5" />, doctors: 22, desc: 'Robotic joint replacement, sports medicine, and spine therapy.' },
    { name: 'Pediatrics', icon: <Users className="h-5 w-5" />, doctors: 15, desc: 'Neonatal intensive care, wellness exams, and child immunizations.' },
    { name: 'Dermatology', icon: <Shield className="h-5 w-5" />, doctors: 12, desc: 'Skin cancer screening, clinical phototherapy, and allergy diagnosis.' },
    { name: 'Oncology', icon: <Star className="h-5 w-5" />, doctors: 20, desc: 'Targeted immunotherapy, precision chemotherapy, and palliative care.' },
  ]

  const testimonials = [
    {
      name: 'Eleanor Vance',
      department: 'Cardiology Patient',
      rating: 5,
      comment:
        'The care and attention I received from Dr. Sarah Johnson and the cardiology team was phenomenal. The online booking made scheduling appointments effortless!',
    },
    {
      name: 'David Miller',
      department: 'Orthopedics Patient',
      rating: 5,
      comment:
        'From physical therapy to orthopedic consultation, Remo Hospital provided seamless, supportive care throughout my entire knee rehabilitation.',
    },
    {
      name: 'Amina Al-Mansoor',
      department: 'Pediatrics Parent',
      rating: 5,
      comment:
        'The pediatric wing is warm, child-friendly, and professional. The doctors took their time explaining everything and put our family at ease.',
    },
  ]

  const faqs = [
    {
      question: 'How do I schedule an appointment online?',
      answer:
        'Select your preferred department and doctor directly on our website or use the Quick Appointment widget above. Choose your date and time slot, enter your details, and receive instant confirmation.',
    },
    {
      question: 'Do you offer emergency walk-in care?',
      answer:
        'Yes. Our 24/7 Emergency Department accepts walk-in patients and emergency ambulance transfers around the clock without any prior appointment required.',
    },
    {
      question: 'What insurance plans are accepted at Remo Hospital?',
      answer:
        'We accept all major regional and international insurance policies including Medicare, Medicaid, BlueCross BlueShield, Aetna, Cigna, and UnitedHealthcare.',
    },
    {
      question: 'Can I view or change my appointment time?',
      answer:
        'Yes. You will receive an appointment confirmation with a reference number. You can reach out to our desk via email or phone (+1 555-123-4567) anytime to adjust your slot.',
    },
  ]

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Clean, Modern Hero Section */}
      <section className="bg-white border-b border-slate-200/80 pt-12 sm:pt-16 pb-20 sm:pb-24 relative overflow-hidden bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200/80 px-3 py-1 rounded-full text-xs font-semibold text-sky-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>JCI Accredited Healthcare • Patient-Centered Excellence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                World-Class Medical Care,
                <span className="block text-sky-600 mt-1">Tailored To Your Needs</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience exceptional healthcare with board-certified physicians, state-of-the-art diagnostics, and real-time appointment booking for you and your family.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link
                  to="/book-appointment"
                  className="btn-primary text-center text-sm font-bold flex items-center justify-center gap-2 py-3 px-7"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
                <Link
                  to="/doctors"
                  className="btn-outline text-center text-sm font-bold py-3 px-6"
                >
                  Find a Doctor
                </Link>
                <a
                  href="tel:+15551234567"
                  className="sm:hidden flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-5 rounded-xl text-xs"
                >
                  <PhoneCall className="h-4 w-4 text-red-400" />
                  <span>Emergency: +254 790520965</span>
                </a>
              </div>

              {/* Trust Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>No Waiting Queues</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Direct Specialist Access</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Instant Slot Confirmation</span>
                </div>
              </div>
            </div>

            {/* Right Card / Clinical Snapshot */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-sky-600" />
                    <span className="font-bold text-slate-900 text-sm">Remo Hospital Campus</span>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100">
                    Open 24/7
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <HeartPulse className="h-5 w-5 text-sky-600 mb-1" />
                    <h4 className="font-bold text-xs text-slate-900">Cardiology</h4>
                    <p className="text-[11px] text-slate-500">25 Specialists</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Activity className="h-5 w-5 text-sky-600 mb-1" />
                    <h4 className="font-bold text-xs text-slate-900">Neurology</h4>
                    <p className="text-[11px] text-slate-500">18 Specialists</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Stethoscope className="h-5 w-5 text-sky-600 mb-1" />
                    <h4 className="font-bold text-xs text-slate-900">Orthopedics</h4>
                    <p className="text-[11px] text-slate-500">22 Specialists</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Users className="h-5 w-5 text-sky-600 mb-1" />
                    <h4 className="font-bold text-xs text-slate-900">Pediatrics</h4>
                    <p className="text-[11px] text-slate-500">15 Specialists</p>
                  </div>
                </div>

                <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-100 text-xs text-sky-900 flex items-center justify-between">
                  <div>
                    <p className="font-bold">Need emergency triage?</p>
                    <p className="text-slate-600 text-[11px]">Direct ambulance line: +254 790520965</p>
                  </div>
                  <a
                    href="tel:+15559110000"
                    className="btn-secondary text-[11px] py-1.5 px-3 font-semibold"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Appointment Booking Widget */}
      <section className="px-4 sm:px-6 lg:px-8">
        <QuickAppointmentWidget />
      </section>

      {/* Clean Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left sm:border-r border-slate-100 last:border-none p-2">
                <p className="text-3xl sm:text-4xl font-black text-slate-900">
                  {stat.value}
                </p>
                <p className="text-slate-900 font-bold mt-1 text-sm">{stat.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Why Choose Remo
          </span>
          <h2 className="section-title mt-3">Excellence in Every Consultation</h2>
          <p className="section-subtitle">
            Coordinated healthcare backed by board-certified physicians, empathetic clinical staff, and modern infrastructure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Departments Section */}
      <section className="bg-white py-14 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Specialized Clinics
              </span>
              <h2 className="section-title mt-3 mb-1">Our Core Medical Departments</h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
                Comprehensive specialized care units equipped with modern diagnostic systems and dedicated clinical teams.
              </p>
            </div>
            <Link
              to="/departments"
              className="inline-flex items-center text-sky-600 hover:text-sky-700 font-bold text-xs sm:text-sm"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, index) => (
              <Link
                key={index}
                to={`/doctors?department=${dept.name}`}
                className="card group hover:border-sky-300 p-5 block"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                    {dept.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {dept.doctors} Doctors
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">
                  {dept.name}
                </h3>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                  {dept.desc}
                </p>
                <div className="flex items-center text-sky-600 font-semibold text-xs gap-1">
                  <span>View Doctors</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Patient Feedback
          </span>
          <h2 className="section-title mt-3">What Our Patients Say</h2>
          <p className="section-subtitle">
            Authentic experiences from patients and families who trust Remo Hospital.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div key={idx} className="card p-6 flex flex-col justify-between relative">
              <Quote className="h-6 w-6 text-slate-200 absolute top-5 right-5 pointer-events-none" />
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 italic">"{t.comment}"</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</h4>
                  <p className="text-xs text-sky-600">{t.department}</p>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500" title="Verified Patient" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Common Questions
          </span>
          <h2 className="section-title mt-3">Frequently Asked Questions</h2>
          <p className="section-subtitle">Got questions about scheduling, insurance, or emergency intake?</p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index
            return (
              <div
                key={index}
                className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left px-5 py-3.5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-600 transition-colors text-sm"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Clean Call To Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white text-center shadow-md">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Prioritize Your Health?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Book a personalized appointment with one of our 10+ board-certified medical specialists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                to="/book-appointment"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-xs"
              >
                Book Appointment Online
              </Link>
              <Link
                to="/contact"
                className="border border-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
              >
                Contact Clinic Desk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
