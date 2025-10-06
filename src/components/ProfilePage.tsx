import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { signOut } from '../utils/supabase/client';
import { 
  Settings,
  TrendingUp,
  DollarSign,
  Heart,
  Eye,
  Edit,
  Share,
  MoreVertical,
  Star,
  Award,
  Users,
  Music,
  Book,
  Palette,
  Rocket,
  Film,
  LogOut,
  MessageCircle,
  UserPlus,
  Camera
} from 'lucide-react';
import type { User, Idea } from '../App';

interface ProfilePageProps {
  user: User | null;
  onIdeaSelect: (idea: Idea) => void;
  onLogout?: () => void;
  onFriendsClick?: () => void;
  onChatClick?: () => void;
  onEditProfilePicture?: () => void;
}

export function ProfilePage({ 
  user, 
  onIdeaSelect, 
  onLogout, 
  onFriendsClick, 
  onChatClick, 
  onEditProfilePicture 
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('ideas');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout?.();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const myIdeas: Idea[] = [
    {
      id: '1',
      title: 'Synthwave Nights',
      description: 'Retro synthwave track with neon vibes',
      category: 'music',
      price: 300,
      licenseType: 'shared',
      tags: ['Synthwave', 'Retro', '80s'],
      thumbnail: 'https://images.unsplash.com/photo-1727383196205-7205669078f7?w=300&h=200&fit=crop',
      creatorId: user.id,
      creator: { name: user.name, avatar: user.avatar, verified: true },
      likes: 89,
      views: 342,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Space Colony Chronicles',
      description: 'Epic sci-fi story about humanity\'s first colony on Mars',
      category: 'story',
      price: 800,
      licenseType: 'full',
      tags: ['Sci-Fi', 'Space', 'Colony'],
      thumbnail: 'https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?w=300&h=200&fit=crop',
      creatorId: user.id,
      creator: { name: user.name, avatar: user.avatar, verified: true },
      likes: 156,
      views: 654,
      createdAt: new Date()
    }
  ];

  const purchases: Idea[] = [
    {
      id: '3',
      title: 'Urban Beats Collection',
      description: 'Hip-hop beats pack for modern artists',
      category: 'music',
      price: 150,
      licenseType: 'non-commercial',
      tags: ['Hip-Hop', 'Urban', 'Beats'],
      thumbnail: 'https://images.unsplash.com/photo-1727383196205-7205669078f7?w=300&h=200&fit=crop',
      creatorId: 'other1',
      creator: { name: 'Beat Maker Pro', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100', verified: true },
      likes: 234,
      views: 890,
      createdAt: new Date()
    }
  ];

  const stats = [
    { 
      label: 'Total Earnings', 
      value: `$${user.totalEarnings?.toLocaleString() || '0'}`, 
      icon: DollarSign, 
      color: 'text-green-400',
      change: '+12%'
    },
    { 
      label: 'Ideas Sold', 
      value: user.ideasSold?.toString() || '0', 
      icon: TrendingUp, 
      color: 'text-blue-400',
      change: '+3'
    },
    { 
      label: 'Total Views', 
      value: '15.2K', 
      icon: Eye, 
      color: 'text-purple-400',
      change: '+8%'
    },
    { 
      label: 'Followers', 
      value: '2.8K', 
      icon: Users, 
      color: 'text-accent',
      change: '+15'
    },
  ];

  const achievements = [
    { name: 'Top Seller', icon: Award, color: 'text-yellow-400' },
    { name: 'Verified Creator', icon: Star, color: 'text-blue-400' },
    { name: 'Music Master', icon: Music, color: 'text-purple-400' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music': return Music;
      case 'story': return Book;
      case 'comic': return Palette;
      case 'startup': return Rocket;
      case 'script': return Film;
      default: return Star;
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full"
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background"
                onClick={onEditProfilePicture}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <Badge className="bg-primary text-primary-foreground text-xs">
                  ✓ Verified
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{user.bio}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>⭐ {user.rating}/5.0</span>
                <span>📍 San Francisco, CA</span>
                <span>🎯 {user.type === 'creator' ? 'Creator' : 'Buyer'}</span>
              </div>
            </div>
            
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Interests */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Interests</p>
            <div className="flex flex-wrap gap-2">
              {user.interests.slice(0, 6).map(interest => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {user.interests.length > 6 && (
                <Badge variant="outline" className="text-xs">
                  +{user.interests.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <Badge variant="outline" className="text-xs text-green-400">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onFriendsClick}
            variant="outline"
            className="h-16 flex-col space-y-2"
          >
            <UserPlus className="w-6 h-6" />
            <span className="text-sm">เพื่อน</span>
          </Button>
          <Button
            onClick={onChatClick}
            variant="outline"
            className="h-16 flex-col space-y-2"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">แชท</span>
          </Button>
        </div>

        {/* Achievements */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Achievements</h3>
          <div className="flex items-center space-x-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.name}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {[
            { id: 'ideas', label: 'My Ideas', count: myIdeas.length },
            { id: 'purchases', label: 'Purchases', count: purchases.length },
            { id: 'earnings', label: 'Earnings', count: null },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 ${
                activeTab === tab.id 
                  ? 'bg-background shadow-sm' 
                  : 'hover:bg-background/50'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'ideas' && (
          <div className="space-y-4">
            {myIdeas.map((idea) => {
              const CategoryIcon = getCategoryIcon(idea.category);
              return (
                <Card 
                  key={idea.id} 
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => onIdeaSelect(idea)}
                >
                  <div className="flex space-x-4 p-4">
                    <ImageWithFallback
                      src={idea.thumbnail}
                      alt={idea.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold truncate">{idea.title}</h3>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {idea.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {idea.category}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {idea.likes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {idea.views}
                          </span>
                        </div>
                        <Badge className="bg-accent text-accent-foreground">
                          ${idea.price}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="space-y-4">
            {purchases.map((purchase) => {
              const CategoryIcon = getCategoryIcon(purchase.category);
              return (
                <Card 
                  key={purchase.id} 
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => onIdeaSelect(purchase)}
                >
                  <div className="flex space-x-4 p-4">
                    <ImageWithFallback
                      src={purchase.thumbnail}
                      alt={purchase.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 truncate">{purchase.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {purchase.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            by {purchase.creator.name}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Purchased
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-2">${user.totalEarnings?.toLocaleString()}</h3>
                <p className="text-muted-foreground mb-4">Total Earnings This Month</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Available Balance</p>
                    <p className="font-semibold">$1,250.00</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-semibold">$340.00</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2]">
                  Withdraw Earnings
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Recent Transactions</h3>
              <div className="space-y-3">
                {[
                  { title: 'Synthwave Nights', amount: '+$300', date: '2 days ago' },
                  { title: 'Space Colony Chronicles', amount: '+$800', date: '1 week ago' },
                  { title: 'Platform Fee', amount: '-$45', date: '1 week ago' },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{transaction.title}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Logout Confirmation */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="p-6 w-full max-w-sm">
              <div className="text-center">
                <LogOut className="w-12 h-12 mx-auto mb-4 text-destructive" />
                <h3 className="font-semibold mb-2">ออกจากระบบ</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  คุณแน่ใจหรือไม่ที่ต้องการออกจากระบบ?
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1"
                  >
                    ยกเลิก
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="flex-1"
                  >
                    ออกจากระบบ
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Logout Button in Profile Card */}
        <Card className="p-4">
          <Button 
            variant="outline" 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full text-destructive border-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            ออกจากระบบ
          </Button>
        </Card>
      </div>
    </div>
  );
}