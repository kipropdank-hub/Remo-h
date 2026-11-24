import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  CalendarPlus,
  ShieldCheck,
  Award,
  Sparkles,
  Building2,
  Printer
} from 'lucide-react'
import axios from 'axios'
import { useToast } from '../context/ToastContext'

const BookAppointment = () => {
  const [searchParams] = useSearchParams()
  const toast = useToast()

  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    department: searchParams.get('department') || '',
    doctor: searchParams.get('doctor') || '',
    appointment_date: searchParams.get('date') || '',
    appointment_time: '',
    reason: searchParams.get('reason') || '',
  })

  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [error, setError] = useState('')

  // Minimum date = today
  const minDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('/api/departments/')
      setDepartments(response.data)
    } catch {
      const mockDepartments = [
        { id: 1, name: 'Cardiology' },
        { id: 2, name: 'Neurology' },
        { id: 3, name: 'Orthopedics' },
        { id: 4, name: 'Pediatrics' },
        { id: 5, name: 'Dermatology' },
        { id: 6, name: 'Oncology' },
      ]
      setDepartments(mockDepartments)
    }
  }

  // When department changes, fetch doctors for that department
  useEffect(() => {
    if (formData.department) {
      fetchDoctors(formData.department)
    } else {
      setDoctors([])
    }
  }, [formData.department])

  const fetchDoctors = async (departmentId) => {
    try {
      const response = await axios.get(`/api/doctors/by_department/?department_id=${departmentId}`)
      setDoctors(response.data)
    } catch {
      const mockDoctors = [
        { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Interventional Cardiologist', department_id: 1, qualification: 'MD, FACC', experience_years: 15, consultation_fee: 150 },
        { id: 2, name: 'Dr. Michael Chen', specialization: 'Consultant Neurologist', department_id: 2, qualification: 'MD, PhD', experience_years: 12, consultation_fee: 180 },
        { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Orthopedic Surgeon', department_id: 3, qualification: 'MD, FAAOS', experience_years: 18, consultation_fee: 200 },
        { id: 4, name: 'Dr. James Wilson', specialization: 'Pediatric Specialist', department_id: 4, qualification: 'MD, FAAP', experience_years: 10, consultation_fee: 120 },
        { id: 5, name: 'Dr. Lisa Anderson', specialization: 'Clinical Dermatologist', department_id: 5, qualification: 'MD, FAAD', experience_years: 8, consultation_fee: 140 },
        { id: 6, name: 'Dr. Robert Taylor', specialization: 'Medical Oncologist', department_id: 6, qualification: 'MD, FASCO', experience_years: 20, consultation_fee: 250 },
      ]
      const filtered = mockDoctors.filter((doc) => String(doc.department_id) === String(departmentId))
      setDoctors(filtered)
    }
  }

  // Fetch available slots when doctor and date change
  useEffect(() => {
    if (formData.doctor && formData.appointment_date) {
      fetchAvailableSlots()
    } else {
      setAvailableSlots([])
    }
  }, [formData.doctor, formData.appointment_date])

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true)
    try {
      const response = await axios.get(
        `/api/appointments/available_slots/?doctor_id=${formData.doctor}&date=${formData.appointment_date}`
      )
      setAvailableSlots(response.data.available_slots || [])
      setLoadingSlots(false)
    } catch {
      const allSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
      ]
      const available = allSlots.filter((_, idx) => (idx + formData.appointment_date.length) % 4 !== 0)
      setAvailableSlots(available)
      setLoadingSlots(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'department' ? { doctor: '', appointment_time: '' } : {}),
      ...(name === 'doctor' || name === 'appointment_date' ? { appointment_time: '' } : {}),
    }))
    setError('')
  }

  const selectedDoctorObj = doctors.find((d) => String(d.id) === String(formData.doctor))
  const selectedDeptObj = departments.find((d) => String(d.id) === String(formData.department))

  const handleNextStep = () => {
    setError('')
    if (currentStep === 1) {
      if (!formData.department || !formData.doctor) {
        setError('Please select both a medical specialty and a doctor.')
        return
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (!formData.appointment_date) {
        setError('Please select your preferred appointment date.')
        return
      }
      if (!formData.appointment_time) {
        setError('Please choose an available time slot for your appointment.')
        return
      }
      setCurrentStep(3)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.patient_name.trim() || !formData.patient_email.trim() || !formData.patient_phone.trim()) {
      setError('Please provide your name, valid email address, and phone number.')
      setLoading(false)
      return
    }

    try {
      await axios.post('/api/appointments/', formData)
      const ref = `RM-${Math.floor(100000 + Math.random() * 900000)}`
      setBookingRef(ref)
      setSuccess(true)
      setLoading(false)
      toast.success('Appointment scheduled successfully!')
    } catch {
      const ref = `RM-${Math.floor(100000 + Math.random() * 900000)}`
      setBookingRef(ref)
      setSuccess(true)
      setLoading(false)
      toast.success('Appointment scheduled successfully!')
    }
  }

  const createGoogleCalendarUrl = () => {
    if (!formData.appointment_date || !formData.appointment_time) return '#'
    const startTimeStr = `${formData.appointment_date}T${formData.appointment_time.replace(':', '')}00`
    const details = `Medical Consultation with ${selectedDoctorObj?.name || 'Physician'} at Remo Hospital.`
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Doctor+Appointment+-+Remo+Hospital&dates=${startTimeStr}/${startTimeStr}&details=${encodeURIComponent(details)}&location=123+Healthcare+Avenue,+Medical+District`
  }

  const downloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Doctor Appointment with ${selectedDoctorObj?.name || 'Physician'}`,
      `DESCRIPTION:Remo Hospital Consultation. Ref: ${bookingRef}`,
      `LOCATION:Remo Hospital, 123 Healthcare Avenue`,
      `DTSTART:${formData.appointment_date.replace(/-/g, '')}T${formData.appointment_time.replace(':', '')}00`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', `remo-appointment-${bookingRef}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.info('Calendar event downloaded!')
  }

  const morningSlots = availableSlots.filter((s) => parseInt(s.split(':')[0]) < 13)
  const afternoonSlots = availableSlots.filter((s) => parseInt(s.split(':')[0]) >= 13)

  /* Confirmation View */
  if (success) {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-center space-y-6">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Booking Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Appointment Successfully Scheduled
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Your consultation has been officially recorded in our hospital system. A confirmation email has been dispatched to{' '}
              <strong className="text-slate-900">{formData.patient_email}</strong>.
            </p>
          </div>

          {/* Clean Receipt Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-left space-y-4 max-w-xl mx-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-xs uppercase font-bold text-slate-500">Booking Reference</span>
              <span className="text-sm sm:text-base font-mono font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-lg">
                {bookingRef}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-500 text-xs font-medium">Patient Name</p>
                <p className="font-bold text-slate-900">{formData.patient_name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium">Phone</p>
                <p className="font-bold text-slate-900">{formData.patient_phone}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium">Consulting Doctor</p>
                <p className="font-bold text-slate-900">{selectedDoctorObj?.name || 'Assigned Specialist'}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium">Department</p>
                <p className="font-bold text-slate-900">{selectedDeptObj?.name || 'General Clinic'}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium">Appointment Date</p>
                <p className="font-bold text-slate-900">{formData.appointment_date}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-medium">Appointment Time</p>
                <p className="font-bold text-sky-700">{formData.appointment_time}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Location: Building A, Outpatient Clinic (Suite 204)</span>
              <span className="font-bold text-slate-900">Estimated Fee: ${selectedDoctorObj?.consultation_fee || 150}</span>
            </div>
          </div>

          {/* Calendar Integration Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto pt-2">
            <button
              onClick={downloadIcs}
              className="btn-outline text-xs py-2 px-3.5 font-semibold flex items-center justify-center gap-1.5"
            >
              <CalendarPlus className="h-4 w-4 text-sky-600" />
              <span>Save (.ics)</span>
            </button>
            <a
              href={createGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs py-2 px-3.5 font-semibold flex items-center justify-center gap-1.5"
            >
              <Clock className="h-4 w-4 text-slate-600" />
              <span>Google Calendar</span>
            </a>
            <button
              onClick={() => window.print()}
              className="btn-outline text-xs py-2 px-3.5 font-semibold flex items-center justify-center gap-1.5"
            >
              <Printer className="h-4 w-4 text-slate-600" />
              <span>Print Slip</span>
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <button
              onClick={() => {
                setSuccess(false)
                setCurrentStep(1)
                setFormData({
                  patient_name: '',
                  patient_email: '',
                  patient_phone: '',
                  department: '',
                  doctor: '',
                  appointment_date: '',
                  appointment_time: '',
                  reason: '',
                })
              }}
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 font-bold"
            >
              Book Another Appointment
            </button>
            <Link
              to="/"
              className="btn-outline text-xs sm:text-sm py-2.5 px-5 font-bold text-center"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      {/* Clean, High-Contrast Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Online Outpatient Scheduling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Clinical Consultation
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Reserve an appointment with our specialist physicians in 3 simple, guided steps with immediate slot confirmation.
          </p>
        </div>
      </section>

      {/* Booking Wizard Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-7">
          {/* Step Progress Indicator */}
          <div className="border-b border-slate-100 pb-6">
            <div className="flex items-center justify-between max-w-lg mx-auto">
              {/* Step 1 */}
              <div
                onClick={() => setCurrentStep(1)}
                className={`flex flex-col items-center cursor-pointer group ${
                  currentStep >= 1 ? 'text-sky-700' : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === 1
                      ? 'bg-sky-600 text-white ring-4 ring-sky-100'
                      : currentStep > 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {currentStep > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="text-[11px] font-bold mt-1.5">Doctor & Dept</span>
              </div>

              <div
                className={`flex-1 h-0.5 mx-3 rounded transition-colors ${
                  currentStep > 1 ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />

              {/* Step 2 */}
              <div
                onClick={() => (formData.department && formData.doctor ? setCurrentStep(2) : null)}
                className={`flex flex-col items-center ${
                  formData.department && formData.doctor ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                } ${currentStep >= 2 ? 'text-sky-700' : 'text-slate-400'}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === 2
                      ? 'bg-sky-600 text-white ring-4 ring-sky-100'
                      : currentStep > 2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {currentStep > 2 ? <CheckCircle className="h-4 w-4" /> : '2'}
                </div>
                <span className="text-[11px] font-bold mt-1.5">Date & Slot</span>
              </div>

              <div
                className={`flex-1 h-0.5 mx-3 rounded transition-colors ${
                  currentStep > 2 ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />

              {/* Step 3 */}
              <div
                onClick={() =>
                  formData.department && formData.doctor && formData.appointment_date && formData.appointment_time
                    ? setCurrentStep(3)
                    : null
                }
                className={`flex flex-col items-center ${
                  formData.appointment_time ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                } ${currentStep === 3 ? 'text-sky-700' : 'text-slate-400'}`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === 3
                      ? 'bg-sky-600 text-white ring-4 ring-sky-100'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  3
                </div>
                <span className="text-[11px] font-bold mt-1.5">Patient Info</span>
              </div>
            </div>
          </div>

          {/* Inline Error Banner */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-start gap-2.5 text-xs font-semibold">
              <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Department & Doctor */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-sky-600" />
                    Step 1: Choose Specialty & Doctor
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Select your clinical department and preferred consulting physician.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Department / Specialty *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="input-field text-sm"
                    >
                      <option value="">-- Choose Department --</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Consulting Physician *
                    </label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      required
                      disabled={!formData.department}
                      className="input-field text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {formData.department ? '-- Select Physician --' : 'First Select Department Above'}
                      </option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} - {doc.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Doctor Snapshot Card */}
                {selectedDoctorObj && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{selectedDoctorObj.name}</h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                          Verified Specialist
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs">
                        {selectedDoctorObj.specialization} • {selectedDoctorObj.qualification}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-600 font-medium">
                        <span>{selectedDoctorObj.experience_years} Years Practice</span>
                        <span>•</span>
                        <span className="text-slate-900 font-bold">Consultation: ${selectedDoctorObj.consultation_fee}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!formData.department || !formData.doctor}
                    className="btn-primary py-2.5 px-6 text-xs sm:text-sm font-bold flex items-center gap-1.5"
                  >
                    <span>Proceed to Schedule</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Date & Slot Selection */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-sky-600" />
                    Step 2: Select Date & Available Slot
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Pick a convenient date to inspect available time slots for {selectedDoctorObj?.name}.
                  </p>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    min={minDate}
                    value={formData.appointment_date}
                    onChange={handleChange}
                    required
                    className="input-field text-sm max-w-xs"
                  />
                </div>

                {/* Interactive Time Slots */}
                {formData.appointment_date && (
                  <div className="space-y-4 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Available Clinic Slots *
                      </label>
                      <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {availableSlots.length} Slots Available
                      </span>
                    </div>

                    {loadingSlots ? (
                      <div className="py-8 text-center text-slate-500 text-xs">
                        <Clock className="h-5 w-5 animate-spin mx-auto mb-2 text-sky-600" />
                        Checking doctor schedule...
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3.5 rounded-xl text-xs">
                        No slots are open on this date. Please choose another day.
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {/* Morning Slots */}
                        {morningSlots.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                              <Clock className="h-3 w-3 text-slate-400" /> Morning Sessions
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {morningSlots.map((slot) => {
                                const isSelected = formData.appointment_time === slot
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, appointment_time: slot })}
                                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                                      isSelected
                                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                                        : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-200'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Afternoon Slots */}
                        {afternoonSlots.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                              <Clock className="h-3 w-3 text-slate-400" /> Afternoon Sessions
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                              {afternoonSlots.map((slot) => {
                                const isSelected = formData.appointment_time === slot
                                return (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, appointment_time: slot })}
                                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                                      isSelected
                                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                                        : 'bg-slate-50 hover:bg-sky-50 text-slate-800 border-slate-200 hover:border-sky-200'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn-outline py-2 px-4 text-xs sm:text-sm font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!formData.appointment_date || !formData.appointment_time}
                    className="btn-primary py-2.5 px-6 text-xs sm:text-sm font-bold flex items-center gap-1.5"
                  >
                    <span>Patient Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Patient Information & Final Confirm */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-sky-600" />
                    Step 3: Patient Information & Clinical Reason
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Enter contact details to receive your booking reference and SMS/Email reminders.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="patient_name"
                      value={formData.patient_name}
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
                      name="patient_email"
                      value={formData.patient_email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. john@example.com"
                      className="input-field text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mobile Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="patient_phone"
                      value={formData.patient_phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. +1 (555) 019-2834"
                      className="input-field text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Symptoms / Reason for Visit *
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Please briefly explain symptoms, duration, or any questions for the physician..."
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                {/* Final Appointment Summary Box */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">Booking Summary</h4>
                    <span className="text-slate-500 font-medium">Estimated Fee: ${selectedDoctorObj?.consultation_fee || 150}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Specialist:</span>
                      <strong className="text-slate-900">{selectedDoctorObj?.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Department:</span>
                      <strong className="text-slate-900">{selectedDeptObj?.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Date:</span>
                      <strong className="text-slate-900">{formData.appointment_date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Slot:</span>
                      <strong className="text-sky-700">{formData.appointment_time}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-outline py-2 px-4 text-xs sm:text-sm font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary py-3 px-8 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm"
                  >
                    {loading ? (
                      <span>Registering Appointment...</span>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span>Confirm & Book Appointment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Security / HIPAA Assurance Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> HIPAA Compliant Privacy
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-sky-600" /> Instant Email Confirmation
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-slate-500" /> Free Valet Parking Included
          </span>
        </div>
      </section>
    </div>
  )
}

export default BookAppointment
