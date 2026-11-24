import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Users,
  Shield,
  Star,
  Baby,
  Bone,
  Brain,
  Search,
  ArrowRight,
  X
} from 'lucide-react'
import axios from 'axios'

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const iconMap = {
    'fa-heart-pulse': <HeartPulse className="h-6 w-6" />,
    'fa-brain': <Brain className="h-6 w-6" />,
    'fa-bone': <Bone className="h-6 w-6" />,
    'fa-baby': <Baby className="h-6 w-6" />,
    'fa-shield-virus': <Shield className="h-6 w-6" />,
    'fa-activity': <Activity className="h-6 w-6" />,
    'fa-stethoscope': <Stethoscope className="h-6 w-6" />,
  }

  const servicesMap = {
    Cardiology: ['ECG & Echocardiography', 'Cardiac Catheterization', 'Coronary Care', 'Cardiovascular Rehab'],
    Neurology: ['EEG & EMG Testing', 'Stroke Response Unit', 'Movement Disorders', 'Cognitive Memory Clinic'],
    Orthopedics: ['Total Joint Arthroplasty', 'Sports Medicine & Arthroscopy', 'Spine Surgery', 'Physical Therapy'],
    Pediatrics: ['Neonatal Intensive Care', 'Child Immunization Programs', 'Pediatric Surgery', 'Growth & Development'],
    Dermatology: ['Melanoma Screening', 'Clinical Phototherapy', 'Cosmetic Laser', 'Contact Allergy Diagnostics'],
    Oncology: ['Precision Chemotherapy', 'Linear Accelerator Radiation', 'Immuno-oncology', 'Palliative Support'],
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/departments/')
      const departmentsWithUI = response.data.map((dept) => ({
        ...dept,
        icon: iconMap[dept.icon] || <Stethoscope className="h-6 w-6" />,
        services: servicesMap[dept.name] || ['Specialized Consultations', 'Diagnostic Testing', 'Inpatient Recovery'],
      }))
      setDepartments(departmentsWithUI)
      setLoading(false)
    } catch {
      const mockDepartments = [
        {
          id: 1,
          name: 'Cardiology',
          description:
            'Comprehensive clinical and surgical heart care including non-invasive diagnostics, catheter interventions, and post-cardiac rehabilitation.',
          icon: <HeartPulse className="h-6 w-6" />,
          doctors_count: 25,
          services: ['ECG & Echocardiography', 'Cardiac Catheterization', 'Coronary Care', 'Cardiovascular Rehab'],
        },
        {
          id: 2,
          name: 'Neurology',
          description:
            'Advanced evaluation and therapeutic treatment for brain, spinal cord, stroke, seizure conditions, and neurodegenerative disorders.',
          icon: <Brain className="h-6 w-6" />,
          doctors_count: 18,
          services: ['EEG & EMG Testing', 'Stroke Response Unit', 'Movement Disorders', 'Cognitive Memory Clinic'],
        },
        {
          id: 3,
          name: 'Orthopedics',
          description:
            'State-of-the-art musculoskeletal care including total joint replacements, spinal surgeries, and athletic injury recovery programs.',
          icon: <Bone className="h-6 w-6" />,
          doctors_count: 22,
          services: ['Total Joint Arthroplasty', 'Sports Medicine & Arthroscopy', 'Spine Surgery', 'Physical Therapy'],
        },
        {
          id: 4,
          name: 'Pediatrics',
          description:
            'Holistic medical care for infants, children, and teenagers, featuring dedicated child-friendly examination rooms and pediatric specialists.',
          icon: <Baby className="h-6 w-6" />,
          doctors_count: 15,
          services: ['Neonatal Intensive Care', 'Child Immunization Programs', 'Pediatric Surgery', 'Growth & Development'],
        },
        {
          id: 5,
          name: 'Dermatology',
          description:
            'Comprehensive diagnostic and therapeutic solutions for acute skin diseases, cancer prevention, psoriasis, and restorative aesthetics.',
          icon: <Shield className="h-6 w-6" />,
          doctors_count: 12,
          services: ['Melanoma Screening', 'Clinical Phototherapy', 'Cosmetic Laser', 'Contact Allergy Diagnostics'],
        },
        {
          id: 6,
          name: 'Oncology',
          description:
            'Multidisciplinary cancer center offering precision oncology, immunotherapy, targeted medical therapy, and empathetic support services.',
          icon: <Activity className="h-6 w-6" />,
          doctors_count: 20,
          services: ['Precision Chemotherapy', 'Linear Accelerator Radiation', 'Immuno-oncology', 'Palliative Support'],
        },
      ]
      setDepartments(mockDepartments)
      setLoading(false)
    }
  }

  const filteredDepartments = useMemo(() => {
    if (!searchTerm.trim()) return departments
    const q = searchTerm.toLowerCase()
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.services?.some((s) => s.toLowerCase().includes(q))
    )
  }, [departments, searchTerm])

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Center of Clinical Excellence
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialized Medical Departments
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our specialized clinics unite leading physicians, modern imaging facilities, and patient-centered protocols across diverse clinical fields.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search departments by specialty, treatment, or condition (e.g. Heart, Joint, Pediatric)..."
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
        </div>
      </section>

      {/* Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-6 space-y-4">
                <div className="h-10 w-10 skeleton rounded-xl" />
                <div className="h-5 w-1/2 skeleton rounded" />
                <div className="h-16 w-full skeleton rounded" />
                <div className="h-9 w-full skeleton rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div className="card text-center py-14 px-4 max-w-md mx-auto space-y-3">
            <h3 className="text-base font-bold text-slate-900">No Departments Found</h3>
            <p className="text-slate-600 text-xs">
              No department matched "{searchTerm}". Try another term or clear your search.
            </p>
            <button onClick={() => setSearchTerm('')} className="btn-primary text-xs py-2 px-4">
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="card flex flex-col justify-between hover:border-slate-300 p-6 group bg-white"
              >
                <div>
                  {/* Icon & Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-sky-50 text-sky-600 rounded-xl border border-sky-100">
                      {dept.icon}
                    </div>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                      {dept.doctors_count || 15}+ Specialists
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">{dept.description}</p>

                  {/* Key Services */}
                  <div className="mb-5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Key Procedures
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.services.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-medium"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                  <Link
                    to={`/doctors?department=${dept.name}`}
                    className="btn-outline text-center text-xs py-2 px-2 font-bold"
                  >
                    View Doctors
                  </Link>
                  <Link
                    to={`/book-appointment?department=${dept.id}`}
                    className="btn-primary text-center text-xs py-2 px-2 font-bold"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Patient Care Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Standard of Care
            </span>
            <h2 className="section-title mt-3 mb-1">Your Care Journey at Remo Hospital</h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              From online booking through discharge and recovery, our patient-first process is streamlined.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center mx-auto mb-2 font-black text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">Select Specialty</h4>
              <p className="text-slate-600 text-[11px]">
                Choose department and review specialist qualifications and experience.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center mx-auto mb-2 font-black text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">Reserve Slot</h4>
              <p className="text-slate-600 text-[11px]">
                Pick an instant verified slot or utilize 24/7 rapid emergency walk-in.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center mx-auto mb-2 font-black text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">Clinical Diagnostics</h4>
              <p className="text-slate-600 text-[11px]">
                Receive precise on-site laboratory and imaging tests with fast turnaround.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center mx-auto mb-2 font-black text-sm">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">Care & Recovery</h4>
              <p className="text-slate-600 text-[11px]">
                Follow personalized rehabilitation regimens and seamless digital follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Departments
