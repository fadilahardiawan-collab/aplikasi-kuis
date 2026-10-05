import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface RegisterScreenProps {
  onBack: () => void;
  onRegisterSuccess: (studentName: string) => void;
  onGoToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onRegisterSuccess,
  onGoToLogin,
}) => {
  const [name, setName] = useState('Raditya Pratama');
  const [email, setEmail] = useState('raditya@smp.sch.id');
  const [password, setPassword] = useState('starvoyager1');
  const [confirmPassword, setConfirmPassword] = useState('starvoyager1');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match! Please check again, Space Cadet.');
      sound.vibrate(50);
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    sound.playTap();

    setTimeout(() => {
      sound.playCorrect();
      setIsLoading(false);
      onRegisterSuccess(name);
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between px-5 py-4 pb-8 select-none bg-[#0d1324] cosmic-bg">
      {/* Top Navigation */}
      <header className="flex items-center justify-between py-2">
        <button
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          aria-label="Go back to Opening"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#24293b] text-[#dce2fa] hover:bg-[#2e3447] active:scale-95 transition-colors shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <div className="flex items-center gap-1.5 bg-[#191f30] px-3.5 py-1.5 rounded-full border border-[#2e3447]">
          <span className="material-symbols-outlined text-[#f9bd22] text-[16px] fill-1">rocket_launch</span>
          <span className="text-[12px] font-bold text-[#7bd0ff] tracking-wider uppercase">
            Cadet Onboarding
          </span>
        </div>

        <div className="w-10"></div>
      </header>

      {/* Cosmic Hero Badge */}
      <div className="flex flex-col items-center text-center mt-2 mb-4">
        <div className="relative w-16 h-16 rounded-2xl bg-[#24293b] flex items-center justify-center mb-2 shadow-lg shadow-[#a078ff]/10 border border-[#33394b]">
          <span className="material-symbols-outlined text-[#d0bcff] text-[32px]">person_add</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7bd0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#7bd0ff]"></span>
          </span>
        </div>
        <h1 className="font-headline font-bold text-[24px] sm:text-[26px] text-[#dce2fa]">
          Create Account
        </h1>
        <p className="text-[14px] text-[#cbc3d7] mt-1 max-w-xs">
          Join SpaceVocab and master English vocabulary
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-sm mx-auto">
        {errorMessage && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-[#93000a]/40 border border-[#ffb4ab]/40 text-[#ffb4ab] text-[13px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-[#dce2fa] flex items-center gap-1.5" htmlFor="fullName">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">badge</span>
              Name
            </label>
            <div className="relative flex items-center">
              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Raditya Pratama"
                className="w-full h-12 py-2 px-3.5 rounded-xl bg-[#070e1e] text-[#dce2fa] placeholder:text-[#958ea0] text-[14px] border border-[#2e3447] focus:border-[#7bd0ff] focus:outline-none transition-all shadow-inner"
              />
              <div className="absolute right-3.5 text-[#958ea0] pointer-events-none flex items-center">
                <span className="material-symbols-outlined text-[16px]">edit</span>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-[#dce2fa] flex items-center gap-1.5" htmlFor="userEmail">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">alternate_email</span>
              Username / Email
            </label>
            <div className="relative flex items-center">
              <input
                id="userEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="raditya@smp.sch.id"
                className="w-full h-12 py-2 px-3.5 rounded-xl bg-[#070e1e] text-[#dce2fa] placeholder:text-[#958ea0] text-[14px] border border-[#2e3447] focus:border-[#7bd0ff] focus:outline-none transition-all shadow-inner"
              />
              <div className="absolute right-3.5 text-[#958ea0] pointer-events-none flex items-center">
                <span className="material-symbols-outlined text-[16px]">mail</span>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-[#dce2fa] flex items-center gap-1.5" htmlFor="userPassword">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">lock</span>
              Password
            </label>
            <div className="relative flex items-center">
              <input
                id="userPassword"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-12 py-2 pl-3.5 pr-11 rounded-xl bg-[#070e1e] text-[#dce2fa] placeholder:text-[#958ea0] text-[14px] border border-[#2e3447] focus:border-[#7bd0ff] focus:outline-none transition-all shadow-inner tracking-wider"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-[#958ea0] hover:text-[#dce2fa] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-semibold text-[#dce2fa] flex items-center gap-1.5" htmlFor="confirmPassword">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">lock_reset</span>
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-12 py-2 pl-3.5 pr-11 rounded-xl bg-[#070e1e] text-[#dce2fa] placeholder:text-[#958ea0] text-[14px] border border-[#2e3447] focus:border-[#7bd0ff] focus:outline-none transition-all shadow-inner tracking-wider"
              />
              <button
                type="button"
                aria-label="Toggle confirm password visibility"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 p-1 text-[#958ea0] hover:text-[#dce2fa] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showConfirm ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Gamified Password Helper */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#151b2c] border border-[#2e3447]/60">
            <span className="material-symbols-outlined text-[#f9bd22] text-[16px] fill-1">stars</span>
            <p className="text-[12px] text-[#cbc3d7]">
              Min. 8 characters with a number for +50 Cosmic XP!
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 mt-1 rounded-2xl bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-lg shadow-[#a078ff]/25 active:translate-y-0.5 transition-all disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                <span>Preparing Shuttle...</span>
              </>
            ) : (
              <>
                <span>Register</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col items-center justify-center gap-1.5 text-center">
        <p className="text-[14px] text-[#cbc3d7]">
          Sudah punya akun?{' '}
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onGoToLogin();
            }}
            className="font-bold text-[#7bd0ff] hover:text-[#c4e7ff] transition-colors underline decoration-[#7bd0ff]/40 decoration-2 underline-offset-4"
          >
            Login
          </button>
        </p>
        <div className="flex items-center gap-1.5 text-[#958ea0] text-[12px] mt-1">
          <span className="material-symbols-outlined text-[14px]">school</span>
          <span>SMP English Galaxy Learning Explorer</span>
        </div>
      </div>
    </div>
  );
};
