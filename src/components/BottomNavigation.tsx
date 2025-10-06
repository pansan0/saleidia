import React from 'react';
import { Button } from './ui/button';
import { Home, Grid3x3, Plus, User, MessageCircle } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'categories', icon: Grid3x3, label: 'Categories' },
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'community', icon: MessageCircle, label: 'Community' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          const isCreate = item.id === 'create';
          
          if (isCreate) {
            return (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90 transition-opacity"
                size="icon"
              >
                <Icon className="w-6 h-6 text-white" />
              </Button>
            );
          }
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center p-2 h-auto ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}