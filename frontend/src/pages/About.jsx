import { Link } from 'react-router-dom'
import {
  HeartPulse,
  Award,
  Users,
  Target,
  Lightbulb,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Stethoscope,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: <HeartPulse className="h-6 w-6 text-sky-600" />,
      title: 'Compassionate Care',
      description: 'We treat every patient with warmth, dignity, and empathy, ensuring clinical transparency and personalized comfort.',
    },
    {
      icon: <Award className="h-6 w-6 text-sky-600" />,
      title: 'Clinical Excellence',
      description: 'Adhering to strict international medical protocols, rigorous hygiene standards, and continuous peer-reviewed research.',
    },
    {
      icon: <Users className="h-6 w-6 text-sky-600" />,
      title: 'Interdisciplinary Teamwork',
      description: 'Seamless cross-departmental collaboration between surgeons, radiologists, nurses, and physical therapists.',
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-sky-600" />,
      title: 'Medical Innovation',
      description: 'Investing in cutting-edge 3T MRI, robotic surgical suites, and artificial intelligence-assisted diagnostic workflows.',
    },
    {
      icon: <Target className="h-6 w-6 text-sky-600" />,
      title: 'Ethical Integrity',
      description: 'Upholding strict patient privacy (HIPAA compliant), honest billing practices, and informed consent at every step.',
    },
    {
      icon: <Globe className="h-6 w-6 text-sky-600" />,
      title: 'Community Accessibility',
      description: 'Ensuring that top-tier healthcare remains accessible to all community members through subsidized health drives.',
    },
  ]

  const milestones = [
    {
      year: '2010',
      title: 'Foundation of Remo Hospital',
      description: 'Inaugurated as an outpatient clinical center with 4 core departments and an urgent care room.',
    },
    {
      year: '2015',
      title: 'Inpatient Hospital Expansion',
      description: 'Opened the 200-bed inpatient tower, surgical theaters, and 24/7 Level-1 Trauma Emergency unit.',
    },
    {
      year: '2018',
      title: 'Advanced Diagnostic & Imaging Center',
      description: 'Integrated 3T MRI, molecular pathology laboratory, and cardiovascular catheterization suites.',
    },
    {
      year: '2021',
      title: 'JCI International Accreditation',
      description: 'Recognized for achieving gold standards in clinical safety and patient satisfaction benchmarks.',
    },
    {
      year: '2024',
      title: 'Regional Telehealth & 50+ Clinics',
      description: 'Surpassed 100,000 satisfied patient consults annually across 50 specialized medical disciplines.',
    },
  ]

  const leadership = [
    {
      name: 'Dr. Gregory Vance, MD, FACS',
      role: 'Chief Medical Officer & Cardiac Surgeon',
      qualification: 'Harvard Medical School • 24 yrs Experience',
      bio: 'Leading Remo Hospital clinical governance and surgical precision initiatives since 2012.',
    },
    {
      name: 'Dr. Patricia Alvarez, MD, PhD',
      role: 'Director of Clinical Research & Neurology',
      qualification: 'Johns Hopkins • 20 yrs Experience',
      bio: 'Oversees multidisciplinary research programs and neuro-rehabilitation therapy.',
    },
    {
      name: 'Marcus Sterling, MHA, RN',
      role: 'Head of Patient Safety & Nursing Operations',
      qualification: 'Columbia University • 18 yrs Experience',
      bio: 'Champion for compassionate bedside nursing, patient advocacy, and emergency triage response.',
    },
  ]

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Clean, High-Contrast Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            About Remo Hospital Healthcare
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Dedicated to Compassionate,
            <span className="text-sky-600 block sm:inline sm:ml-2">Excellence-Driven Healthcare</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            For over 15 years, Remo Hospital has combined world-class medical science with compassionate patient-centered care and clinical innovation.
          </p>
        </div>
      </section>

      {/* Story & Numbers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Our Clinical Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Built on Trust, Medical Science, and Genuine Empathy
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded in 2010, Remo Hospital began with a single mission: to provide the highest standard of specialized clinical care within an environment where every patient is treated with dignity, kindness, and respect.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Today, our campus houses state-of-the-art surgical suites, 24/7 Level-1 trauma care, and high-throughput diagnostic laboratories. Every physician, nurse, and technologist is committed to clinical precision and patient safety.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/doctors" className="btn-primary text-xs sm:text-sm font-bold flex items-center gap-1.5 py-2.5 px-5">
                <span>Meet Our Physicians</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-outline text-xs sm:text-sm font-bold py-2.5 px-5">
                Campus Location & Tour
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200">
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-white rounded-xl p-5 text-center border border-slate-200 shadow-xs">
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">15+</p>
                  <p className="text-slate-900 font-bold text-xs sm:text-sm mt-1">Years of Care</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Established in 2010</p>
                </div>

                <div className="bg-white rounded-xl p-5 text-center border border-slate-200 shadow-xs">
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">10+</p>
                  <p className="text-slate-900 font-bold text-xs sm:text-sm mt-1">Specialist Doctors</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Board certified faculty</p>
                </div>

                <div className="bg-white rounded-xl p-5 text-center border border-slate-200 shadow-xs">
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">100K+</p>
                  <p className="text-slate-900 font-bold text-xs sm:text-sm mt-1">Patients Treated</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">99.2% satisfaction</p>
                </div>

                <div className="bg-white rounded-xl p-5 text-center border border-slate-200 shadow-xs">
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">50+</p>
                  <p className="text-slate-900 font-bold text-xs sm:text-sm mt-1">Specialties</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Comprehensive care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Guiding Principles
          </span>
          <h2 className="section-title mt-2 mb-1">The Remo Healthcare Values</h2>
          <p className="section-subtitle">
            Every medical decision, triage protocol, and patient interaction is grounded in these foundational principles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="card p-6 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{v.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            History of Progress
          </span>
          <h2 className="section-title mt-2 mb-1">Our Healthcare Journey</h2>
          <p className="section-subtitle">Key institutional milestones in our pursuit of patient wellness and clinical quality.</p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-28 space-y-8 pl-6 sm:pl-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-sky-600 group-hover:scale-110 transition-transform" />

              {/* Year label */}
              <div className="md:absolute md:-left-24 md:top-1 text-sm font-black text-sky-700 mb-1 md:mb-0">
                {m.year}
              </div>

              {/* Milestone Card */}
              <div className="card p-5 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all">
                <h3 className="text-base font-bold text-slate-900 mb-1">{m.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Clinical Leadership
          </span>
          <h2 className="section-title mt-2 mb-1">Hospital Executive Board</h2>
          <p className="section-subtitle">
            Physician leadership prioritizing patient safety, medical research, and compassionate healthcare operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {leadership.map((lead, idx) => (
            <div key={idx} className="card p-5 sm:p-6 bg-white border border-slate-200 hover:border-slate-300 shadow-xs transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center font-bold">
                <Stethoscope className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{lead.name}</h3>
                <p className="text-xs font-bold text-sky-700">{lead.role}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{lead.qualification}</p>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-3">
                {lead.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center space-y-5 border border-slate-800">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
            <ShieldCheck className="h-4 w-4" />
            <span>Certified Standards of Care</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Accredited by Top Global Healthcare Bodies
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Remo Hospital complies with international benchmarks in patient safety, emergency preparedness, clinical research, and sterile hygiene protocols.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-300">
            <span className="px-3.5 py-2 bg-slate-800 rounded-xl border border-slate-700">Joint Commission International (JCI)</span>
            <span className="px-3.5 py-2 bg-slate-800 rounded-xl border border-slate-700">ISO 9001:2015 Quality Certified</span>
            <span className="px-3.5 py-2 bg-slate-800 rounded-xl border border-slate-700">HIPAA Compliant Data Security</span>
            <span className="px-3.5 py-2 bg-slate-800 rounded-xl border border-slate-700">American Heart Association Partner</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
