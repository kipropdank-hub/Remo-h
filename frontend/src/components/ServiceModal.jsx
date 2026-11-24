import { X, CheckCircle, Clock, AlertTriangle, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ServiceModal = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200 p-6 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl transition-colors"
          aria-label="Close service details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl border border-sky-100">
            {service.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{service.title}</h2>
            {service.price ? (
              <p className="text-slate-900 font-bold text-base">Starting from ${service.price}</p>
            ) : (
              <p className="text-sky-700 font-semibold text-xs">Covered by Major Insurance / Custom Quote</p>
            )}
          </div>
        </div>

        {/* Overview */}
        <div className="my-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Service Overview</h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Included Procedures */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2.5">Included Procedures</h3>
          <ul className="space-y-2">
            {service.features && service.features.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guidelines */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-800 font-bold mb-1">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <span>Preparation Guidelines</span>
          </div>
          <p className="leading-relaxed">
            Please bring your prior medical reports, identification card, and active insurance details. If fasting is required, you will receive an SMS reminder 24 hours prior.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-100">
          <Link
            to={`/book-appointment?reason=${encodeURIComponent(`Inquiry for ${service.title}`)}`}
            onClick={onClose}
            className="flex-1 btn-primary text-center py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Book This Service</span>
            <ArrowRight className="h-4 w-4" />
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

export default ServiceModal
