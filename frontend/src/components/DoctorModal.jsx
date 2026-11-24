import { X, Award, Calendar, DollarSign, Stethoscope, Mail, Phone, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const DoctorModal = ({ doctor, isOpen, onClose }) => {
  if (!isOpen || !doctor) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition-colors"
          aria-label="Close doctor details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Doctor Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-100 pb-5">
          <div className="w-18 h-18 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shadow-xs flex-shrink-0">
            <Stethoscope className="h-9 w-9" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{doctor.name}</h2>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  doctor.available
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {doctor.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="text-sky-600 font-semibold text-sm sm:text-base">{doctor.specialization}</p>
            <p className="text-slate-500 text-xs sm:text-sm">{doctor.department_name} Department</p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5 text-xs sm:text-sm">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[11px] text-slate-500 uppercase font-semibold flex items-center gap-1.5 mb-1">
              <Calendar className="h-3.5 w-3.5 text-sky-600" /> Clinical Experience
            </span>
            <p className="font-bold text-slate-900">{doctor.experience_years} Years</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-[11px] text-slate-500 uppercase font-semibold flex items-center gap-1.5 mb-1">
              <Award className="h-3.5 w-3.5 text-sky-600" /> Education
            </span>
            <p className="font-bold text-slate-900 truncate" title={doctor.qualification}>
              {doctor.qualification}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-500 uppercase font-semibold flex items-center gap-1.5 mb-1">
              <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> Consultation Fee
            </span>
            <p className="font-bold text-slate-900">${doctor.consultation_fee}</p>
          </div>
        </div>

        {/* Doctor Bio */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">Physician Overview</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {doctor.bio || `${doctor.name} is a dedicated medical specialist with over ${doctor.experience_years} years of clinical excellence in ${doctor.specialization}. Focused on delivering compassionate, evidence-based care.`}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Practice Highlights</h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                Comprehensive diagnostic evaluation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                Evidence-based treatment protocols
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                Pre- and post-procedure counseling
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                Direct follow-up coordination
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-0.5">
              <Clock className="h-3.5 w-3.5 text-sky-600" />
              <span>Consulting Hours</span>
            </div>
            <p>Mon–Fri: 9:00 AM – 5:00 PM • Sat: 9:00 AM – 1:00 PM • Clinic Suite 304</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-3 border-t border-slate-100">
          <Link
            to={`/book-appointment?doctor=${doctor.id}&department=${doctor.department || ''}`}
            onClick={onClose}
            className={`flex-1 text-center py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
              doctor.available
                ? 'btn-primary'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none'
            }`}
          >
            {doctor.available ? 'Book Appointment with this Doctor' : 'Currently Unavailable'}
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorModal
