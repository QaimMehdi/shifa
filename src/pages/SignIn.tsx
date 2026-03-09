import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend will be wired later
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — branding panel */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden items-end p-12"
        style={{
          background: `linear-gradient(160deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.85) 100%)`,
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-10">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="hsl(var(--background))" opacity="0.15" />
              <path d="M16 8v16M8 16h16" stroke="hsl(var(--background))" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-bold text-xl text-background">Shifa</span>
          </div>

          <h2 className="font-heading text-3xl font-bold text-background leading-tight tracking-tight mb-3">
            Welcome back.
          </h2>
          <p className="text-sm font-body text-background/50 max-w-xs leading-relaxed">
            Sign in to access your health dashboard, symptom history, and personalized AI insights.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-background/[0.03]" style={{ transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-20 right-16 w-32 h-32 rounded-full bg-background/[0.04]" />
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground font-body hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </button>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="hsl(var(--primary))" opacity="0.15" />
              <path d="M16 8v16M8 16h16" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="font-heading font-bold text-lg text-foreground">Shifa</span>
          </div>

          <h1 className="font-heading text-xl font-semibold text-foreground tracking-tight mb-1">
            Sign in to Shifa
          </h1>
          <p className="text-[13px] font-body text-muted-foreground mb-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-foreground font-medium hover:underline underline-offset-2">
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-body font-medium text-foreground uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full text-[13px] font-body bg-card border border-border/60 rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/20 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-body font-medium text-foreground uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-[11px] font-body text-muted-foreground hover:text-foreground transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-[13px] font-body bg-card border border-border/60 rounded-lg pl-10 pr-10 py-2.5 text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-foreground/20 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-foreground text-background text-[13px] font-body font-medium hover:bg-foreground/90 transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-[10px] text-muted-foreground/60 font-body uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          {/* Social */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-card border border-border/60 text-[13px] font-body text-foreground hover:bg-muted transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
