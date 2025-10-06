import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DreamMarkLogo } from './DreamMarkLogo';
import { signIn } from '../utils/supabase/client';
import { User } from '../App';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
  onSwitchToRegister: () => void;
  onBack: () => void;
}

export function LoginScreen({ onLoginSuccess, onSwitchToRegister, onBack }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('โปรดกรอกอีเมลและรหัสผ่าน');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const authData = await signIn(email, password);
      
      if (authData.session && authData.user) {
        // Get user profile from server
        const response = await fetch(`https://ratjrxirisarvhbfmvwf.supabase.co/functions/v1/make-server-60f140bd/user/${authData.user.id}`, {
          headers: {
            'Authorization': `Bearer ${authData.session.access_token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          onLoginSuccess(userData.user);
        } else {
          // Fallback user data from auth metadata
          const fallbackUser: User = {
            id: authData.user.id,
            name: authData.user.user_metadata?.name || 'User',
            email: authData.user.email || email,
            type: authData.user.user_metadata?.type || 'creator',
            interests: authData.user.user_metadata?.interests || [],
            personality: authData.user.user_metadata?.personality || '',
            avatar: `https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=150&h=150&fit=crop&crop=face`,
            bio: '',
            totalEarnings: 0,
            ideasSold: 0,
            rating: 5.0
          };
          onLoginSuccess(fallbackUser);
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1A2137] px-6 py-8">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12 mt-8">
          <DreamMarkLogo />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
            ยินดีต้อนรับกลับ
          </h1>
          <p className="text-muted-foreground">
            เข้าสู่ระบบเพื่อค้นหาไอเดียใหม่ๆ
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm space-y-6">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-input-background border-border"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12 bg-input-background border-border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-destructive text-sm text-center bg-destructive/10 rounded-md p-3">
              {error}
            </div>
          )}

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:from-[#7A26C1] hover:to-[#3F00BF] text-white border-0"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                กำลังเข้าสู่ระบบ...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                เข้าสู่ระบบ
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>

          {/* Switch to Register */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              ยังไม่มีบัญชี?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                สมัครสมาชิก
              </button>
            </p>
          </div>

          {/* Back Button */}
          <div className="text-center pt-4">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              ← กลับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}