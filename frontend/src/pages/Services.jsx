import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Shield,
  Microscope,
  Syringe,
  Baby,
  Brain,
  Calendar,
  CheckCircle,
  Search,
  X,
  Info,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react'
import axios from 'axios'
import ServiceModal from '../components/ServiceModal'

const Services = () => {
  const [services, setServices] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [activeModalService, setActiveModalService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const iconMap = {
    'fa-stethoscope': <Stethoscope className="h-6 w-6" />,
    'fa-microscope': <Microscope className="h-6 w-6" />,
    'fa-activity': <Activity className="h-6 w-6" />,
    'fa-syringe': <Syringe className="h-6 w-6" />,
    'fa-baby': <Baby className="h-6 w-6" />,
    'fa-brain': <Brain className="h-6 w-6" />,
    'fa-shield-virus': <Shield className="h-6 w-6" />,
  }

  const featuresMap = {
    'Health Checkups': ['Comprehensive Blood Count', 'Lipid & Cardiac Profile', 'Diabetes Screen (HbA1c)', 'ECG & Chest Radiography', 'Physician Consultation'],
    'Diagnostic Services': ['3T High-Field MRI & Low-Dose CT', '4D Ultrasound Imaging', 'Digital X-Ray Systems', 'Automated Clinical Pathology', 'Same-Day Digital Reports'],
    'Emergency Care': ['Level-1 Trauma Resuscitation', 'Rapid Cardiac Intervention', 'Acute Stroke Response Unit', 'Dedicated ICU Ambulance Fleet', '24/7 Board-Certified Triage'],
    'Surgery Services': ['Robotic & Laparoscopic Surgery', 'Minimally Invasive Joint Repair', 'Neurosurgical Interventions', 'General Gastrointestinal Surgery', 'Post-Op Recovery Monitoring'],
    'Vaccination Programs': ['CDC Childhood Immunization Schedule', 'Annual Influenza Vaccines', 'International Travel Vaccines', 'COVID-19 & Boosters', 'Immunization Passport Record'],
    'Rehabilitation Services': ['Post-Surgical Physical Therapy', 'Neurological Rehab & Speech Therapy', 'Cardiac Rehabilitation', 'Occupational Therapy', 'Pain Management Protocols'],
    'Maternity Services': ['Comprehensive Prenatal Monitoring', 'Advanced Labor & Delivery Suites', 'Neonatal Level-III Nursery', 'Lactation Consultation', 'Postpartum Wellness Classes'],
    'Mental Health Services': ['Clinical Psychiatric Diagnostics', 'Cognitive Behavioral Therapy', 'Stress & Anxiety Management', 'Adolescent Counseling', 'Confidential Patient Sessions'],
    'Dental Services': ['Preventative Scaling & Polish', 'Restorative Dental Fillings', 'Endodontic Root Canal Therapy', 'Orthodontic Aligners', 'Cosmetic Whitening Procedures'],
  }

  const categoryMap = {
    'Health Checkups': 'Preventive',
    'Diagnostic Services': 'Diagnostics',
    'Emergency Care': 'Emergency',
    'Surgery Services': 'Surgical',
    'Vaccination Programs': 'Preventive',
    'Rehabilitation Services': 'Wellness',
    'Maternity Services': 'Specialized',
    'Mental Health Services': 'Wellness',
    'Dental Services': 'Specialized',
  }

  const popularServices = ['Health Checkups', 'Emergency Care', 'Diagnostic Services', 'Maternity Services']

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/services/')
      const servicesWithUI = response.data.map((service) => ({
        ...service,
        icon: iconMap[service.icon] || <Stethoscope className="h-6 w-6" />,
        features: featuresMap[service.title] || ['Comprehensive Clinical Evaluation', 'Specialist Review', 'Follow-up Care'],
        category: categoryMap[service.title] || 'Specialized',
        popular: popularServices.includes(service.title),
      }))
      setServices(servicesWithUI)
      setLoading(false)
    } catch (error) {
      console.warn('Backend API unavailable, using fallback services:', error)
      const mockServices = [
        {
          id: 1,
          title: 'Health Checkups',
          description: 'Comprehensive preventive screening packages designed for early detection and baseline health monitoring.',
          icon: <Stethoscope className="h-6 w-6" />,
          price: 199,
          features: ['Comprehensive Blood Count', 'Lipid & Cardiac Profile', 'Diabetes Screen (HbA1c)', 'ECG & Chest Radiography', 'Physician Consultation'],
          category: 'Preventive',
          popular: true,
        },
        {
          id: 2,
          title: 'Diagnostic Services',
          description: 'Next-generation clinical imaging and high-throughput lab diagnostics with rapid electronic report delivery.',
          icon: <Microscope className="h-6 w-6" />,
          price: 299,
          features: ['3T High-Field MRI & Low-Dose CT', '4D Ultrasound Imaging', 'Digital X-Ray Systems', 'Automated Clinical Pathology', 'Same-Day Digital Reports'],
          category: 'Diagnostics',
          popular: true,
        },
        {
          id: 3,
          title: 'Emergency Care',
          description: 'Around-the-clock level-1 emergency response with dedicated resuscitation suites and immediate specialist triage.',
          icon: <HeartPulse className="h-6 w-6" />,
          price: null,
          features: ['Level-1 Trauma Resuscitation', 'Rapid Cardiac Intervention', 'Acute Stroke Response Unit', 'Dedicated ICU Ambulance Fleet', '24/7 Board-Certified Triage'],
          category: 'Emergency',
          popular: true,
        },
        {
          id: 4,
          title: 'Surgery Services',
          description: 'Advanced minimally invasive and robotic surgical procedures performed in sterile high-efficiency theaters.',
          icon: <Activity className="h-6 w-6" />,
          price: null,
          features: ['Robotic & Laparoscopic Surgery', 'Minimally Invasive Joint Repair', 'Neurosurgical Interventions', 'General Gastrointestinal Surgery', 'Post-Op Recovery Monitoring'],
          category: 'Surgical',
          popular: false,
        },
        {
          id: 5,
          title: 'Vaccination Programs',
          description: 'Approved immunizations for all ages, including international travel immunizations, boosters, and pediatric vaccines.',
          icon: <Syringe className="h-6 w-6" />,
          price: 49,
          features: ['CDC Childhood Immunization Schedule', 'Annual Influenza Vaccines', 'International Travel Vaccines', 'COVID-19 & Boosters', 'Immunization Passport Record'],
          category: 'Preventive',
          popular: false,
        },
        {
          id: 6,
          title: 'Rehabilitation Services',
          description: 'Personalized physical therapy and post-injury restorative rehabilitation by licensed therapists.',
          icon: <Activity className="h-6 w-6" />,
          price: 120,
          features: ['Post-Surgical Physical Therapy', 'Neurological Rehab & Speech Therapy', 'Cardiac Rehabilitation', 'Occupational Therapy', 'Pain Management Protocols'],
          category: 'Wellness',
          popular: false,
        },
        {
          id: 7,
          title: 'Maternity Services',
          description: 'Comprehensive mother and baby care from early prenatal ultrasounds through labor, delivery, and postnatal support.',
          icon: <Baby className="h-6 w-6" />,
          price: null,
          features: ['Comprehensive Prenatal Monitoring', 'Advanced Labor & Delivery Suites', 'Neonatal Level-III Nursery', 'Lactation Consultation', 'Postpartum Wellness Classes'],
          category: 'Specialized',
          popular: true,
        },
        {
          id: 8,
          title: 'Mental Health Services',
          description: 'Compassionate, confidential psychiatric diagnostics and therapy sessions in a supportive clinic environment.',
          icon: <Brain className="h-6 w-6" />,
          price: 150,
          features: ['Clinical Psychiatric Diagnostics', 'Cognitive Behavioral Therapy', 'Stress & Anxiety Management', 'Adolescent Counseling', 'Confidential Patient Sessions'],
          category: 'Wellness',
          popular: false,
        },
        {
          id: 9,
          title: 'Dental Services',
          description: 'Complete family dentistry ranging from regular cleanings and checkups to root canal and cosmetic dentistry.',
          icon: <Shield className="h-6 w-6" />,
          price: 80,
          features: ['Preventative Scaling & Polish', 'Restorative Dental Fillings', 'Endodontic Root Canal Therapy', 'Orthodontic Aligners', 'Cosmetic Whitening Procedures'],
          category: 'Specialized',
          popular: false,
        },
      ]
      setServices(mockServices)
      setLoading(false)
    }
  }

  const categories = ['All', 'Preventive', 'Diagnostics', 'Emergency', 'Surgical', 'Wellness', 'Specialized']

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory
      const q = searchTerm.toLowerCase().trim()
      const matchesSearch =
        !q ||
        srv.title.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q) ||
        srv.features?.some((f) => f.toLowerCase().includes(q))
      return matchesCategory && matchesSearch
    })
  }, [services, selectedCategory, searchTerm])

  const openServiceModal = (srv) => {
    setActiveModalService(srv)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Clean, High-Contrast Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Full-Spectrum Hospital Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Medical Services & Clinical Packages
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From routine wellness screenings and rapid lab diagnostics to emergency surgical care and ongoing restorative therapies.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services (e.g. Checkup, MRI, Dental, Surgery, Vaccine)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 pr-9"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex-shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredServices.length}</strong> available services
            </span>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Covered by Major Insurers
              </span>
              <span className="flex items-center gap-1.5 text-sky-700 font-medium">
                <Clock className="h-4 w-4 text-sky-600" /> Same-Day Scheduling Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-6 space-y-4">
                <div className="h-10 w-10 skeleton rounded-xl" />
                <div className="h-5 w-3/4 skeleton rounded" />
                <div className="h-16 w-full skeleton rounded" />
                <div className="h-10 w-full skeleton rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="card text-center py-14 px-4 max-w-md mx-auto space-y-3">
            <h3 className="text-base font-bold text-slate-900">No Services Found</h3>
            <p className="text-slate-600 text-xs">
              We couldn't find any medical service matching "{searchTerm}". Try another keyword or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="btn-primary text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="card flex flex-col justify-between hover:shadow-md transition-all duration-200 relative group p-6 bg-white border border-slate-200 hover:border-slate-300"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <span className="absolute -top-2.5 right-5 bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-sky-600" />
                    Popular Service
                  </span>
                )}

                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Included features list */}
                  <div className="space-y-2 mb-5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Included Procedures:
                    </h4>
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 4).map((item, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Cost</p>
                      {service.price ? (
                        <p className="text-xl font-extrabold text-slate-900">
                          ${service.price}
                          <span className="text-xs font-normal text-slate-500 ml-1">starting</span>
                        </p>
                      ) : (
                        <p className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                          Insurance / Clinical Quote
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Outpatient Clinic</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openServiceModal(service)}
                      className="btn-outline text-xs py-2 px-3 font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Info className="h-3.5 w-3.5 text-slate-500" />
                      <span>Details</span>
                    </button>
                    <Link
                      to={`/book-appointment?reason=${encodeURIComponent(service.title)}`}
                      className="btn-primary text-xs py-2 px-3 font-semibold flex items-center justify-center gap-1.5 text-center"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Helpful Clinical Notice Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-6 sm:p-8 bg-slate-900 text-white border-0 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/80 px-3 py-1 rounded-full">
              Need Assistance Selecting a Package?
            </span>
            <h3 className="text-xl font-bold text-white">Speak with our Clinical Patient Advisors</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Our nurses and care coordinators are available 24/7 to help you understand pre-op instructions, insurance coverage, or customized checkup plans.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:+15551234567"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 font-bold flex items-center justify-center gap-2"
            >
              <PhoneCall className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Contact Desk</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      <ServiceModal
        service={activeModalService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setActiveModalService(null)
        }}
      />
    </div>
  )
}

export default Services
