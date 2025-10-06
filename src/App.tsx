import React, { useState, useEffect } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Onboarding } from './components/Onboarding';
import { HomePage } from './components/HomePage';
import { CategoriesPage } from './components/CategoriesPage';
import { CreateIdeaPage } from './components/CreateIdeaPage';
import { ProfilePage } from './components/ProfilePage';
import { IdeaDetailPage } from './components/IdeaDetailPage';
import { FriendsPage } from './components/FriendsPage';
import { ChatListPage } from './components/ChatListPage';
import { ChatPage } from './components/ChatPage';
import { ProfilePictureUpload } from './components/ProfilePictureUpload';
import { BottomNavigation } from './components/BottomNavigation';
import { getCurrentSession, getCurrentUser } from './utils/supabase/client';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'creator' | 'buyer';
  interests: string[];
  personality: string;
  avatar: string;
  bio?: string;
  totalEarnings?: number;
  ideasSold?: number;
  rating?: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'music' | 'story' | 'comic' | 'startup' | 'script';
  price: number;
  licenseType: 'full' | 'shared' | 'non-commercial';
  tags: string[];
  thumbnail: string;
  preview?: string;
  creatorId: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  likes: number;
  views: number;
  createdAt: Date;
}

type Screen = 'auth' | 'onboarding' | 'home' | 'categories' | 'create' | 'profile' | 'idea-detail' | 'friends' | 'chat-list' | 'chat' | 'profile-picture';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      const session = await getCurrentSession();
      if (session && session.user) {
        // Get user profile from server
        const response = await fetch(`https://ratjrxirisarvhbfmvwf.supabase.co/functions/v1/make-server-60f140bd/user/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
          setCurrentScreen('home');
        } else {
          // Fallback user data from auth metadata
          const fallbackUser: User = {
            id: session.user.id,
            name: session.user.user_metadata?.name || 'User',
            email: session.user.email || '',
            type: session.user.user_metadata?.type || 'creator',
            interests: session.user.user_metadata?.interests || [],
            personality: session.user.user_metadata?.personality || '',
            avatar: `https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=150&h=150&fit=crop&crop=face`,
            bio: '',
            totalEarnings: 0,
            ideasSold: 0,
            rating: 5.0
          };
          setUser(fallbackUser);
          setCurrentScreen('home');
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAuthenticated = (userData: User) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleUserCreated = (userData: User) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
  };

  const handleIdeaSelect = (idea: Idea) => {
    setSelectedIdea(idea);
    setCurrentScreen('idea-detail');
  };

  const handleStartChat = (friend: any) => {
    setSelectedChatId(friend.id);
    setCurrentScreen('chat');
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setCurrentScreen('chat');
  };

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    if (user) {
      setUser({ ...user, avatar: newAvatarUrl });
    }
    setCurrentScreen('profile');
  };

  const renderScreen = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1A2137] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">กำลังโหลด...</p>
          </div>
        </div>
      );
    }

    switch (currentScreen) {
      case 'auth':
        return <AuthScreen onUserAuthenticated={handleUserAuthenticated} />;
      case 'onboarding':
        return <Onboarding onUserCreated={handleUserCreated} />;
      case 'home':
        return <HomePage user={user} onIdeaSelect={handleIdeaSelect} />;
      case 'categories':
        return <CategoriesPage onIdeaSelect={handleIdeaSelect} />;
      case 'create':
        return <CreateIdeaPage user={user} onComplete={() => setCurrentScreen('home')} />;
      case 'profile':
        return (
          <ProfilePage 
            user={user} 
            onIdeaSelect={handleIdeaSelect} 
            onLogout={handleLogout}
            onFriendsClick={() => setCurrentScreen('friends')}
            onChatClick={() => setCurrentScreen('chat-list')}
            onEditProfilePicture={() => setCurrentScreen('profile-picture')}
          />
        );
      case 'idea-detail':
        return <IdeaDetailPage idea={selectedIdea} onBack={() => setCurrentScreen('home')} />;
      case 'friends':
        return (
          <FriendsPage 
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onStartChat={handleStartChat}
          />
        );
      case 'chat-list':
        return (
          <ChatListPage 
            onBack={() => setCurrentScreen('profile')}
            onChatSelect={handleChatSelect}
            currentUserId={user?.id || ''}
          />
        );
      case 'chat':
        return (
          <ChatPage 
            chatId={selectedChatId}
            currentUserId={user?.id || ''}
            participant={{
              name: 'นิชา สร้างสรรค์',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
              status: 'online'
            }}
            onBack={() => setCurrentScreen('chat-list')}
          />
        );
      case 'profile-picture':
        return (
          <ProfilePictureUpload 
            currentAvatar={user?.avatar || ''}
            userName={user?.name || ''}
            onSave={handleAvatarUpdate}
            onBack={() => setCurrentScreen('profile')}
          />
        );
      default:
        return <HomePage user={user} onIdeaSelect={handleIdeaSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1A2137] text-foreground">
      <div className="max-w-md mx-auto relative">
        {renderScreen()}
        {user && 
         currentScreen !== 'auth' && 
         currentScreen !== 'onboarding' && 
         currentScreen !== 'friends' && 
         currentScreen !== 'chat-list' && 
         currentScreen !== 'chat' && 
         currentScreen !== 'profile-picture' && (
          <BottomNavigation
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}
      </div>
    </div>
  );
}