import React, { useState } from 'react';

interface LoginViewProps {
  onLoginSuccess: (role: string) => void;
  showToast: (msg: string) => void;
}

type Role = 'student' | 'supervisor' | 'jury' | 'coordinator';

interface RoleConfig {
  id: Role;
  letter: string;
  title: string;
  subtext: string;
  idLabel: string;
  defaultId: string;
  defaultPass: string;
  demoTitle: string;
  btnLabel: string;
}

const ROLES: RoleConfig[] = [
  {
    id: 'student',
    letter: 'S',
    title: 'Student',
    subtext: 'FYP group...',
    idLabel: 'Student Registration No.',
    defaultId: 'KIET-CS-2021-042',
    defaultPass: 'Fyp360Demo1',
    demoTitle: 'DEMO STUDENT LOGIN',
    btnLabel: 'Sign in as Student',
  },
  {
    id: 'supervisor',
    letter: 'S',
    title: 'Supervisor',
    subtext: 'Project supervision',
    idLabel: 'Employee ID',
    defaultId: 'FAC-014',
    defaultPass: 'Fyp360Demo1',
    demoTitle: 'DEMO SUPERVISOR LOGIN',
    btnLabel: 'Sign in as Supervisor',
  },
  {
    id: 'jury',
    letter: 'J',
    title: 'Jury Member',
    subtext: 'Proposal evaluation',
    idLabel: 'Employee ID',
    defaultId: 'FAC-SE-2018-019',
    defaultPass: 'Fyp360Demo1',
    demoTitle: 'DEMO JURY MEMBER LOGIN',
    btnLabel: 'Sign in as Jury Member',
  },
  {
    id: 'coordinator',
    letter: 'C',
    title: 'FYP Coordinator',
    subtext: 'Program committee',
    idLabel: 'Employee ID',
    defaultId: 'FAC-COORD-001',
    defaultPass: 'Fyp360Demo1',
    demoTitle: 'DEMO COORDINATOR LOGIN',
    btnLabel: 'Sign in as Coordinator',
  },
];

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  showToast,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>('jury');
  const [employeeId, setEmployeeId] = useState('FAC-SE-2018-019');
  const [password, setPassword] = useState('Fyp360Demo1');
  const [showPassword, setShowPassword] = useState(false);

  const activeRoleConfig = ROLES.find((r) => r.id === selectedRole)!;

  const handleRoleSelect = (roleId: Role) => {
    setSelectedRole(roleId);
    const config = ROLES.find((r) => r.id === roleId)!;
    setEmployeeId(config.defaultId);
    setPassword(config.defaultPass);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      showToast('Please enter your credentials');
      return;
    }
    showToast(`Signed in successfully as ${activeRoleConfig.title}`);
    onLoginSuccess(selectedRole);
  };

  return (
    <div className="min-h-screen bg-page-canvas flex flex-col items-center justify-center p-4 sm:p-6 select-none font-body-md">
      {/* Centered Login Card */}
      <div className="w-full max-w-[540px] bg-card-surface rounded-[28px] p-8 sm:p-10 shadow-sm border border-card-border flex flex-col">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-kiet-orange flex items-center justify-center text-white font-headline-sm font-bold shadow-sm">
            K
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-[20px] font-semibold tracking-tight text-primary">
                KIET FYP360
              </span>
              <span className="w-2 h-2 rounded-full bg-kiet-cyan"></span>
            </div>
            <span className="text-[11px] text-muted-text font-medium tracking-wide">
              Academic Project Management Portal
            </span>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mt-8 mb-5">
          <span className="font-eyebrow text-[11px] font-bold text-kiet-orange uppercase tracking-wider block mb-1">
            WELCOME BACK
          </span>
          <h1 className="font-headline-lg text-[32px] sm:text-[34px] font-normal text-primary tracking-tight leading-tight">
            Sign in to FYP360
          </h1>
          <p className="font-body-md text-[14px] text-muted-text mt-1">
            Choose your role and enter your institutional credentials.
          </p>
        </div>

        {/* Role Selector Grid */}
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                className={`rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[96px] ${
                  isSelected
                    ? 'border-2 border-kiet-navy bg-white shadow-sm ring-2 ring-kiet-cyan/20'
                    : 'border border-card-border bg-white hover:bg-surface-container'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full text-[12px] font-semibold flex items-center justify-center mb-2 transition-colors ${
                    isSelected
                      ? 'bg-kiet-navy text-white shadow-xs'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {role.letter}
                </div>
                <span
                  className={`text-[13px] leading-tight block mb-0.5 ${
                    isSelected
                      ? 'font-semibold text-primary'
                      : 'font-medium text-on-surface'
                  }`}
                >
                  {role.title}
                </span>
                <span className="text-[10px] text-muted-text leading-tight truncate w-full block">
                  {role.subtext}
                </span>
              </button>
            );
          })}
        </div>

        {/* Prototype Authentication Notice */}
        <div className="bg-surface-container rounded-xl p-3.5 mb-5 border border-card-border">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-kiet-cyan"></span>
            <span className="font-eyebrow text-[10px] text-muted-text uppercase tracking-wider font-bold block">
              KIET DEFENSE SYSTEM · VERIFIED SESSION
            </span>
          </div>
          <p className="text-[13px] text-on-surface-variant">
            Choose any faculty or student profile above to load test data instantly.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          {/* Employee / Registration ID */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-id"
              className="text-[13px] font-medium text-on-surface"
            >
              {activeRoleConfig.idLabel}
            </label>
            <input
              id="login-id"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full h-[52px] px-4 bg-surface-container rounded-xl text-[14px] text-on-surface border border-card-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="text-[13px] font-medium text-on-surface"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] pl-4 pr-16 bg-surface-container rounded-xl text-[14px] text-on-surface border border-card-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-kiet-orange/40 focus:border-kiet-orange transition-all tracking-wide"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[13px] text-muted-text hover:text-primary font-medium absolute right-4 cursor-pointer select-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to registered email')}
                className="text-[12px] text-muted-text hover:text-primary font-medium mt-1 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Demo Credentials Box */}
          <div
            onClick={() => {
              setEmployeeId(activeRoleConfig.defaultId);
              setPassword(activeRoleConfig.defaultPass);
              showToast('Demo credentials applied');
            }}
            className="bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl p-3.5 border border-card-border cursor-pointer group"
            title="Click to auto-fill"
          >
            <div className="flex items-center justify-between">
              <span className="font-eyebrow text-[10px] text-muted-text uppercase tracking-wider font-bold block mb-0.5">
                {activeRoleConfig.demoTitle}
              </span>
              <span className="text-[11px] text-kiet-orange font-medium group-hover:underline">
                Click to apply
              </span>
            </div>
            <div className="text-[13px] text-on-surface flex items-center gap-2 mt-1">
              <span>ID: <strong className="font-semibold text-primary">{activeRoleConfig.defaultId}</strong></span>
              <span className="text-outline-variant">·</span>
              <span>Password: <strong className="font-semibold text-primary">{activeRoleConfig.defaultPass}</strong></span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-kiet-navy hover:bg-sidebar-navy-gradient text-white font-label-lg text-[14px] font-medium transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-[0.99] mt-1"
          >
            {activeRoleConfig.btnLabel}
          </button>
        </form>
      </div>

      {/* Staff Footer Notice */}
      <p className="text-[13px] text-muted-text mt-6 text-center">
        Faculty and staff accounts are provisioned by the KIET FYP Coordination Committee.
      </p>
    </div>
  );
};
