import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, User, Stethoscope, ArrowRight, Clock } from 'lucide-react'
import axios from 'axios'

const QuickAppointmentWidget = () => {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/departments/')
      setDepartments(res.data)
    } catch {
      setDepartments([
        { id: 1, name: 'Cardiology' },
        { id: 2, name: 'Neurology' },
        { id: 3, name: 'Orthopedics' },
        { id: 4, name: 'Pediatrics' },
        { id: 5, name: 'Dermatology' },
        { id: 6, name: 'Oncology' },
      ])
    }
  }

  useEffect(() => {
    if (selectedDept) {
      fetchDoctors(selectedDept)
    } else {
      setDoctors([])
      setSelectedDoctor('')
    }
  }, [selectedDept])

  const fetchDoctors = async (deptId) => {
    try {
      const res = await axios.get(`/api/doctors/by_department/?department_id=${deptId}`)
      setDoctors(res.data)
    } catch {
      const mockDoctors = [
        { id: 1, name: 'Dr. Sarah Johnson', department_id: 1 },
        { id: 2, name: 'Dr. Michael Chen', department_id: 2 },
        { id: 3, name: 'Dr. Emily Rodriguez', department_id: 3 },
        { id: 4, name: 'Dr. James Wilson', department_id: 4 },
        { id: 5, name: 'Dr. Lisa Anderson', department_id: 5 },
        { id: 6, name: 'Dr. Robert Taylor', department_id: 6 },
      ]
      setDoctors(mockDoctors.filter((d) => d.department_id === parseInt(deptId)))
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const query = new URLSearchParams()
    if (selectedDept) query.set('department', selectedDept)
    if (selectedDoctor) query.set('doctor', selectedDoctor)
    if (selectedDate) query.set('date', selectedDate)

    navigate(`/book-appointment?${query.toString()}`)
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-7 max-w-5xl mx-auto -mt-10 sm:-mt-12 relative z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-5 gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="p-1.5 bg-sky-50 text-sky-600 rounded-lg">
              <Calendar className="h-4 w-4" />
            </span>
            Quick Appointment Booking
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Select department and physician to see instant openings.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full self-start sm:self-auto border border-emerald-100">
          <Clock className="h-3 w-3" /> Real-time Slot Sync
        </span>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
        {/* Department */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            1. Department
          </label>
          <div className="relative">
            <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="input-field pl-9 text-xs sm:text-sm"
            >
              <option value="">Select Specialty</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            2. Specialist
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              disabled={!selectedDept}
              className="input-field pl-9 text-xs sm:text-sm disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">{selectedDept ? 'Any Available Doctor' : 'First Pick Department'}</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            3. Preferred Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="date"
              min={minDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field pl-9 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            className="w-full btn-primary py-2.5 sm:py-3 flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold shadow-xs hover:shadow"
          >
            <span>Find & Book Slot</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuickAppointmentWidget
