import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DreamMarkLogo } from './DreamMarkLogo';
import { signUp } from '../utils/supabase/client';
import { User } from '../App';

interface RegisterScreenProps {
  onRegisterSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

export function RegisterScreen({ onRegisterSuccess, onSwitchToLogin, onBack }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'creator' as 'creator' | 'buyer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('โปรดกรอกชื่อ');
      return false;
    }
    if (!formData.email.trim()) {
      setError('โปรดกรอกอีเมล');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('รูปแบบอีเมลไม่ถูกต้อง');
      return false;
    }
    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const userData = {
        name: formData.name,
        type: formData.userType,
        interests: [],
        personality: ''
      };

      const result = await signUp(formData.email, formData.password, userData);
      
      if (result.success && result.user) {
        onRegisterSuccess(result.user);
      } else {
        setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1A2137] px-6 py-8">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 mt-4">
          <DreamMarkLogo />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl mb-2 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
            สร้างบัญชีใหม่
          </h1>
          <p className="text-muted-foreground">
            เริ่มต้นเส้นทางสู่ตลาดไอเดีย
          </p>
        </div>

        {/* Register Form */}
        <div className="w-full max-w-sm space-y-4">
          {/* User Type Selection */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">ประเภทผู้ใช้</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleInputChange('userType', 'creator')}
                className={`p-3 rounded-lg border transition-all ${
                  formData.userType === 'creator'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-input-background text-muted-foreground'
                }`}
              >
                ผู้สร้าง
              </button>
              <button
                onClick={() => handleInputChange('userType', 'buyer')}
                className={`p-3 rounded-lg border transition-all ${
                  formData.userType === 'buyer'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-input-background text-muted-foreground'
                }`}
              >
                ผู้ซื้อ
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="pl-10 h-12 bg-input-background border-border"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              placeholder="อีเมล"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10 h-12 bg-input-background border-border"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
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

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="ยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="pl-10 pr-10 h-12 bg-input-background border-border"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-destructive text-sm text-center bg-destructive/10 rounded-md p-3">
              {error}
            </div>
          )}

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:from-[#7A26C1] hover:to-[#3F00BF] text-white border-0"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                กำลังสมัครสมาชิก...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                สมัครสมาชิก
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>

          {/* Switch to Login */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              มีบัญชีอยู่แล้ว?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                เข้าสู่ระบบ
              </button>
            </p>
          </div>

          {/* Back Button */}
          <div className="text-center pt-2">
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