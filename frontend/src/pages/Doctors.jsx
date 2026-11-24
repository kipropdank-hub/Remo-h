import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Award,
  Calendar,
  GraduationCap,
  X,
  Eye,
  ArrowUpDown,
  Stethoscope,
  ChevronRight
} from 'lucide-react'
import axios from 'axios'
import DoctorModal from '../components/DoctorModal'

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialDept = searchParams.get('department') || 'all'

  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState(initialDept)
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState('experience-desc')
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const deptFromUrl = searchParams.get('department')
    if (deptFromUrl) {
      setSelectedDepartment(deptFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [docRes, deptRes] = await Promise.all([
        axios.get('/api/doctors/'),
        axios.get('/api/departments/'),
      ])
      setDoctors(docRes.data)
      setDepartments(deptRes.data)
      setLoading(false)
    } catch {
      const mockDoctors = [
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialization: 'Interventional Cardiologist',
          department: 1,
          department_name: 'Cardiology',
          experience_years: 15,
          qualification: 'MD, FACC, Harvard Medical',
          available: true,
          consultation_fee: 150,
          bio: 'Specializing in minimally invasive cardiac catheterization, coronary stenting, and cardiovascular disease prevention.',
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialization: 'Neurologist & Neuro-Rehabilitation',
          department: 2,
          department_name: 'Neurology',
          experience_years: 12,
          qualification: 'MD, PhD, Johns Hopkins',
          available: true,
          consultation_fee: 180,
          bio: 'Authority in acute stroke response, post-concussion recovery, and complex neurodegenerative disorders.',
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          specialization: 'Orthopedic & Joint Surgeon',
          department: 3,
          department_name: 'Orthopedics',
          experience_years: 18,
          qualification: 'MD, FAAOS, Stanford Medicine',
          available: true,
          consultation_fee: 200,
          bio: 'Pioneer in robotic total knee and hip arthroplasty, sports injury reconstruction, and regenerative orthopedics.',
        },
        {
          id: 4,
          name: 'Dr. James Wilson',
          specialization: 'Pediatric Specialist',
          department: 4,
          department_name: 'Pediatrics',
          experience_years: 10,
          qualification: 'MD, FAAP, Columbia University',
          available: true,
          consultation_fee: 120,
          bio: 'Passionate advocate for pediatric wellness, neonatal preventative care, and adolescent development.',
        },
        {
          id: 5,
          name: 'Dr. Lisa Anderson',
          specialization: 'Dermatologist & Dermatopathologist',
          department: 5,
          department_name: 'Dermatology',
          experience_years: 8,
          qualification: 'MD, FAAD, Yale Medicine',
          available: false,
          consultation_fee: 140,
          bio: 'Specialist in early melanoma screening, advanced laser dermatological therapy, and autoimmune skin conditions.',
        },
        {
          id: 6,
          name: 'Dr. Robert Taylor',
          specialization: 'Medical Oncologist & Hematologist',
          department: 6,
          department_name: 'Oncology',
          experience_years: 20,
          qualification: 'MD, FASCO, Mayo Clinic Fellow',
          available: true,
          consultation_fee: 250,
          bio: 'Key clinical investigator in targeted immunotherapy, clinical oncology trials, and compassionate patient care.',
        },
      ]

      const mockDepartments = [
        { id: 1, name: 'Cardiology' },
        { id: 2, name: 'Neurology' },
        { id: 3, name: 'Orthopedics' },
        { id: 4, name: 'Pediatrics' },
        { id: 5, name: 'Dermatology' },
        { id: 6, name: 'Oncology' },
      ]

      setDoctors(mockDoctors)
      setDepartments(mockDepartments)
      setLoading(false)
    }
  }

  const filteredAndSortedDoctors = useMemo(() => {
    let result = [...doctors]

    if (selectedDepartment && selectedDepartment !== 'all') {
      result = result.filter(
        (doc) =>
          doc.department_name?.toLowerCase() === selectedDepartment.toLowerCase() ||
          String(doc.department) === selectedDepartment
      )
    }

    if (availableOnly) {
      result = result.filter((doc) => doc.available)
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q) ||
          doc.department_name?.toLowerCase().includes(q) ||
          doc.qualification?.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => {
      if (sortBy === 'experience-desc') return b.experience_years - a.experience_years
      if (sortBy === 'fee-asc') return parseFloat(a.consultation_fee) - parseFloat(b.consultation_fee)
      if (sortBy === 'fee-desc') return parseFloat(b.consultation_fee) - parseFloat(a.consultation_fee)
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      return 0
    })

    return result
  }, [doctors, selectedDepartment, availableOnly, searchTerm, sortBy])

  const handleDepartmentChange = (deptNameOrId) => {
    setSelectedDepartment(deptNameOrId)
    if (deptNameOrId === 'all') {
      searchParams.delete('department')
    } else {
      searchParams.set('department', deptNameOrId)
    }
    setSearchParams(searchParams)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedDepartment('all')
    setAvailableOnly(false)
    setSortBy('experience-desc')
    searchParams.delete('department')
    setSearchParams(searchParams)
  }

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const hasActiveFilters = searchTerm !== '' || selectedDepartment !== 'all' || availableOnly

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Clean Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Medical Faculty Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Specialist Physicians
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse verified profiles, review clinical qualifications, check schedule availability, and reserve consultation slots.
          </p>
        </div>
      </section>

      {/* Search, Filter & Toolbar Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, specialization, or qualification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-9 pr-8"
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

            {/* Department Dropdown */}
            <div className="md:col-span-3 relative">
              <Filter className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={selectedDepartment}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="input-field pl-9"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="md:col-span-3 relative">
              <ArrowUpDown className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field pl-9"
              >
                <option value="experience-desc">Sort: Experience (High to Low)</option>
                <option value="fee-asc">Fee: Lowest to Highest</option>
                <option value="fee-desc">Fee: Highest to Lowest</option>
                <option value="name-asc">Alphabetical: A to Z</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pill Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <button
              onClick={() => handleDepartmentChange('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0 transition-colors ${
                selectedDepartment === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Specialties
            </button>
            {departments.map((dept) => {
              const selected = selectedDepartment === dept.name
              return (
                <button
                  key={dept.id}
                  onClick={() => handleDepartmentChange(dept.name)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0 transition-colors ${
                    selected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dept.name}
                </button>
              )
            })}
          </div>

          {/* Bottom Bar: Availability toggle & counter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300"
                />
                <span>Available for Booking Only</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <p className="text-slate-500">
              Showing <strong className="text-slate-900">{filteredAndSortedDoctors.length}</strong> of{' '}
              <strong className="text-slate-900">{doctors.length}</strong> Specialists
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-5 space-y-4">
                <div className="w-full h-32 rounded-xl skeleton" />
                <div className="h-5 w-3/4 skeleton rounded" />
                <div className="h-4 w-1/2 skeleton rounded" />
                <div className="h-10 w-full skeleton rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredAndSortedDoctors.length === 0 ? (
          <div className="card text-center py-14 px-4 max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Stethoscope className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Specialists Found</h3>
            <p className="text-slate-600 text-xs">
              No doctor matched your search or department filter. Try clearing filters.
            </p>
            <button onClick={resetFilters} className="btn-primary text-xs py-2 px-4">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAndSortedDoctors.map((doc) => (
              <div
                key={doc.id}
                className="card flex flex-col justify-between hover:border-slate-300 p-5 group"
              >
                <div>
                  {/* Doctor Card Top Banner */}
                  <div className="relative mb-4 rounded-xl bg-slate-50 p-5 flex items-center justify-center border border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-white shadow-xs flex items-center justify-center text-sky-600">
                      <GraduationCap className="h-8 w-8" />
                    </div>

                    <span
                      className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        doc.available
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {doc.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="space-y-1 mb-2.5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sky-600 font-semibold text-xs sm:text-sm">{doc.specialization}</p>
                    <span className="inline-block text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {doc.department_name}
                    </span>
                  </div>

                  {/* Experience & Qualification */}
                  <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <Calendar className="h-3.5 w-3.5 text-sky-600 flex-shrink-0" />
                      <span className="font-semibold">{doc.experience_years} yrs exp</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 truncate">
                      <Award className="h-3.5 w-3.5 text-sky-600 flex-shrink-0" />
                      <span className="font-semibold truncate" title={doc.qualification}>
                        {doc.qualification}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-3">
                    {doc.bio || `Specialist in ${doc.specialization} with ${doc.experience_years} years of dedicated patient care.`}
                  </p>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 pt-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">Consultation</p>
                      <p className="text-base font-extrabold text-slate-900">${doc.consultation_fee}</p>
                    </div>

                    <button
                      onClick={() => openDoctorModal(doc)}
                      className="text-xs font-semibold text-slate-600 hover:text-sky-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                  <Link
                    to={`/book-appointment?doctor=${doc.id}&department=${doc.department || ''}`}
                    className={`w-full py-2.5 px-3 text-center rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 ${
                      doc.available
                        ? 'btn-primary'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <span>{doc.available ? 'Book Appointment' : 'Not Available'}</span>
                    {doc.available && <ChevronRight className="h-3.5 w-3.5" />}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Doctor Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Doctors
