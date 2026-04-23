import { 
  GraduationCap, 
  UserCheck, 
  Radio, 
  TrendingUp,
  UserPlus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Using generic div instead of creating a full Card component set for now 
// to keep the layout simple and matched to the design.

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      
      {/* Header section */}
      <div className="flex flex-col gap-2 pt-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Platform Overview</h1>
        <p className="text-lg text-slate-600 font-medium">
          Real-time telemetry and activity metrics across the KonekDin ecosystem.
        </p>
      </div>

      {/* Top 4 Metrics Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="bg-slate-50 p-2.5 rounded-lg">
               <GraduationCap className="h-6 w-6 text-[#0a0f44]" />
            </div>
            <div className="h-16 w-16 bg-slate-100/50 rounded-full -mt-2 -mr-2"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Learners</p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">14,208</h3>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="bg-teal-50 p-2.5 rounded-lg">
               <UserCheck className="h-6 w-6 text-teal-600" />
            </div>
            <div className="h-16 w-16 bg-teal-50/50 rounded-full -mt-2 -mr-2"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Tutors</p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">1,842</h3>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="bg-orange-50 p-2.5 rounded-lg">
               <Radio className="h-6 w-6 text-orange-800" />
            </div>
            <div className="h-20 w-20 bg-orange-50/50 rounded-full absolute -top-4 -right-4"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1 relative z-10">Live Sessions</p>
            <div className="flex items-center gap-3 relative z-10">
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight">340</h3>
              <div className="h-3.5 w-3.5 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.6)]"></div>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="bg-blue-50 p-2.5 rounded-lg">
               <TrendingUp className="h-6 w-6 text-blue-700" />
            </div>
            <div className="h-20 w-20 bg-blue-50/50 rounded-full absolute -top-4 -right-4"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1 relative z-10">Monthly Revenue</p>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight shrink-0">IDR 84M</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Left side (Network Activity) & Right side (Health + Action) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Network Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between xl:mr-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Recent Network Activity</h2>
            <a href="#" className="text-sm font-bold text-teal-600 hover:text-teal-700">View All</a>
          </div>

          <div className="flex flex-col space-y-8">
            {/* Activity 1 */}
            <div className="flex gap-5 items-start">
              <div className="h-12 w-12 rounded-full bg-[#99F6E4] flex items-center justify-center flex-shrink-0 mt-1">
                <UserPlus className="h-5 w-5 text-teal-900" />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-semibold text-slate-900 mb-1">New Tutor Onboarded</h4>
                <p className="text-slate-600 text-[15px]">Dr. Eleanor Vance registered for Advanced Calculus mentoring.</p>
              </div>
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap mt-1">10m ago</span>
            </div>

            <div className="h-px bg-slate-100 w-full ml-16" />

            {/* Activity 2 */}
            <div className="flex gap-5 items-start">
              <div className="h-12 w-12 rounded-full bg-[#E0E7FF] flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-indigo-700" />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-semibold text-slate-900 mb-1">Session Completed</h4>
                <p className="text-slate-600 text-[15px]">Introduction to Machine Learning cohort finished.</p>
              </div>
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap mt-1">45m ago</span>
            </div>

            <div className="h-px bg-slate-100 w-full ml-16" />

            {/* Activity 3 */}
            <div className="flex gap-5 items-start">
              <div className="h-12 w-12 rounded-full bg-[#FFEDD5] flex items-center justify-center flex-shrink-0 mt-1">
                <AlertCircle className="h-5 w-5 text-orange-950" />
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-semibold text-slate-900 mb-1">System Alert</h4>
                <p className="text-slate-600 text-[15px]">Database replication delay detected in Region B.</p>
              </div>
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap mt-1">2h ago</span>
            </div>
          </div>
        </div>

        {/* Right Column: Platform Health & Action Required */}
        <div className="flex flex-col gap-6">
          
          {/* Platform Health Widget */}
          <div className="bg-[#12165c] rounded-3xl p-8 shadow-md">
            <div className="flex items-center justify-between border-b border-indigo-900/50 pb-6 mb-6">
              <h2 className="text-xl font-bold text-white tracking-wide">Platform Health</h2>
              <div className="bg-[#99F6E4] p-1.5 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-teal-900" />
              </div>
            </div>

            <div className="space-y-6">
              {/* API Latency */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[15px] font-medium text-indigo-100">API Latency</span>
                  <span className="text-[15px] font-bold text-[#99F6E4]">42ms</span>
                </div>
                <div className="w-full bg-[#070b3b] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#99F6E4] h-full rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              {/* Server Load */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[15px] font-medium text-indigo-100">Server Load</span>
                  <span className="text-[15px] font-bold text-white">68%</span>
                </div>
                <div className="w-full bg-[#070b3b] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-slate-300 h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Required Widget */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Action Required</h2>
            
            <div className="space-y-6">
              {/* Action 1 */}
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-slate-800 flex-shrink-0"></div>
                <span className="text-[15px] font-medium text-slate-800 flex-1 leading-snug">Pending Badge Verifications</span>
                <div className="bg-orange-100 text-orange-800 text-sm font-bold px-3 py-0.5 rounded-full">24</div>
              </div>

              {/* Action 2 */}
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-indigo-900 flex-shrink-0"></div>
                <span className="text-[15px] font-medium text-slate-800 flex-1 leading-snug">Disputed Transactions</span>
                <div className="bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-0.5 rounded-full">3</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  )
}
