import React, { useState } from 'react';
import { ASSETS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (studentName: string) => void;
  onGoToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onGoToRegister,
}) => {
  const [identifier, setIdentifier] = useState('raditya@smp.sch.id');
  const [password, setPassword] = useState('cosmos2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    sound.playTap();

    setTimeout(() => {
      sound.playCorrect();
      setIsLoading(false);
      onLoginSuccess('Raditya Pratama');
    }, 700);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between px-5 py-4 pb-8 select-none bg-[#0d1324] cosmic-bg">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-2 w-full">
        <button
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          aria-label="Back to opening"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-[#191f30] text-[#dce2fa] hover:bg-[#24293b] active:scale-95 transition-all shadow-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">arrow_back</span>
        </button>

        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#191f30]/90 backdrop-blur-md border border-[#2e3447] shadow-sm">
          <span className="material-symbols-outlined text-[#7bd0ff] text-[18px] fill-1">rocket_launch</span>
          <span className="font-headline font-bold text-[15px] text-[#dce2fa] tracking-wide">
            SpaceVocab
          </span>
        </div>

        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#191f30]/40 text-[#f9bd22]">
          <span className="material-symbols-outlined text-[20px] fill-1">stars</span>
        </div>
      </header>

      {/* Hero Welcome Motif */}
      <div className="relative w-full flex flex-col items-center mt-3 mb-4 text-center">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#24293b] shadow-xl mb-3 border border-[#33394b]">
          <div className="absolute inset-0 rounded-full bg-[#a078ff]/15 blur-xl"></div>
          <img
            src={ASSETS.welcomeAstronaut}
            alt="Space Cadet Mascot"
            className="w-20 h-20 rounded-full object-cover relative z-10"
          />
          <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-[#00a6e0] text-[#00354a] shadow-md">
            <span className="material-symbols-outlined text-[16px] fill-1">auto_awesome</span>
          </span>
        </div>

        <h1 className="font-headline font-bold text-[26px] sm:text-[28px] text-[#dce2fa] tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-[14px] text-[#cbc3d7] mt-1 max-w-[280px]">
          Login to continue your space adventure
        </p>
      </div>

      {/* Login Form Box */}
      <div className="w-full max-w-sm mx-auto flex flex-col gap-4 bg-[#191f30]/80 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-[#2e3447]/70">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Identifier Input */}
          <div className="flex flex-col gap-1.5 w-full text-left">
            <label className="text-[13px] font-semibold text-[#cbc3d7] flex items-center gap-1.5" htmlFor="login-email">
              <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">alternate_email</span>
              Username / Email
            </label>
            <div className="relative flex items-center w-full rounded-xl bg-[#070e1e] border border-[#2e3447] focus-within:border-[#7bd0ff] transition-all">
              <div className="flex items-center justify-center pl-3.5 pr-1 text-[#958ea0]">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <input
                id="login-email"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full bg-transparent py-3 pr-4 text-[#dce2fa] text-[14px] placeholder:text-[#958ea0]/70 focus:outline-none"
                placeholder="student@smp.sch.id"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5 w-full text-left">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[#cbc3d7] flex items-center gap-1.5" htmlFor="login-pass">
                <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">lock</span>
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset link has been dispatched to your cadet email!")}
                className="text-[12px] font-semibold text-[#7bd0ff] hover:text-[#c4e7ff] transition-colors"
              >
                Lupa?
              </button>
            </div>
            <div className="relative flex items-center w-full rounded-xl bg-[#070e1e] border border-[#2e3447] focus-within:border-[#7bd0ff] transition-all">
              <div className="flex items-center justify-center pl-3.5 pr-1 text-[#958ea0]">
                <span className="material-symbols-outlined text-[18px]">key</span>
              </div>
              <input
                id="login-pass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent py-3 pr-11 text-[#dce2fa] text-[14px] placeholder:text-[#958ea0]/70 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center justify-center w-8 h-8 rounded-lg text-[#958ea0] hover:text-[#dce2fa] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Sector Status Indicator */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#24293b]/70 border border-[#33394b]/50">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f9bd22] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f9bd22]"></span>
              </span>
              <span className="text-[12px] font-medium text-[#cbc3d7]">Vocab Sector 7 Active</span>
            </div>
            <span className="text-[12px] font-bold text-[#7bd0ff] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px] fill-1">bolt</span> 2x XP Ready
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 mt-1 rounded-2xl bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(109,59,215,0.4)] active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                <span>Warping to Home...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <span className="material-symbols-outlined text-[20px] fill-1">rocket</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col items-center gap-2 text-center">
        <p className="text-[14px] text-[#cbc3d7]">
          Belum punya akun?{' '}
          <button
            onClick={() => {
              sound.playTap();
              onGoToRegister();
            }}
            className="font-bold text-[#7bd0ff] hover:text-[#c4e7ff] ml-1 inline-flex items-center gap-0.5"
          >
            Register
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </p>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151b2c] text-[#958ea0] border border-[#2e3447]/60">
          <span className="material-symbols-outlined text-[14px]">school</span>
          <span className="text-[11px] font-medium">SMP Cosmic English Quest</span>
        </div>
      </div>
    </div>
  );
};
