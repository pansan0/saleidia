import React, { useState } from 'react';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { DreamMarkLogo } from './DreamMarkLogo';
import { User as UserIcon, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { User } from '../App';

interface AuthScreenProps {
  onUserAuthenticated: (user: User) => void;
}

type AuthView = 'welcome' | 'login' | 'register';

export function AuthScreen({ onUserAuthenticated }: AuthScreenProps) {
  const [currentView, setCurrentView] = useState<AuthView>('welcome');

  const handleUserSuccess = (user: User) => {
    onUserAuthenticated(user);
  };

  if (currentView === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={handleUserSuccess}
        onSwitchToRegister={() => setCurrentView('register')}
        onBack={() => setCurrentView('welcome')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterScreen
        onRegisterSuccess={handleUserSuccess}
        onSwitchToLogin={() => setCurrentView('login')}
        onBack={() => setCurrentView('welcome')}
      />
    );
  }

  // Welcome Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1A2137] px-6 py-8 flex flex-col justify-center">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-12">
          <DreamMarkLogo />
        </div>

        {/* Welcome Text */}
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
            ยินดีต้อนรับสู่
          </h1>
          <h2 className="text-3xl bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] bg-clip-text text-transparent">
            DreaMark
          </h2>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto">
            ตลาดซื้อขายไอเดียสร้างสรรค์ที่ใหญ่ที่สุด
          </p>
          <p className="text-muted-foreground">
            แปลงความฝันให้เป็นโอกาสทางธุรกิจ
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          {/* Login Button */}
          <Button
            onClick={() => setCurrentView('login')}
            className="w-full h-14 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] hover:from-[#7A26C1] hover:to-[#3F00BF] text-white border-0 text-lg"
          >
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5" />
              เข้าสู่ระบบ
              <ArrowRight className="w-5 h-5" />
            </div>
          </Button>

          {/* Register Button */}
          <Button
            onClick={() => setCurrentView('register')}
            variant="outline"
            className="w-full h-14 border-primary text-primary hover:bg-primary/10 text-lg"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              สมัครสมาชิกใหม่
              <ArrowRight className="w-5 h-5" />
            </div>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-2 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] rounded-full flex items-center justify-center mx-auto">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm">สำหรับผู้สร้าง</h3>
            <p className="text-xs text-muted-foreground">
              ขายไอเดียและสร้างรายได้
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A00E0] to-[#8E2DE2] rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm">สำหรับผู้ซื้อ</h3>
            <p className="text-xs text-muted-foreground">
              ค้นหาไอเดียที่ต้องการ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}