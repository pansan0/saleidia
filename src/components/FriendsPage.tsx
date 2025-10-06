import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  UserPlus,
  Search,
  Check,
  X,
  MessageCircle,
  Users,
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import type { User } from '../App';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
  mutualFriends?: number;
}

interface FriendRequest {
  id: string;
  fromUser: Friend;
  toUser: Friend;
  createdAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

interface FriendsPageProps {
  user: User | null;
  onBack: () => void;
  onStartChat: (friend: Friend) => void;
}

export function FriendsPage({ user, onBack, onStartChat }: FriendsPageProps) {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'นิชา สร้างสรรค์',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Music Producer & Songwriter',
      status: 'online',
      mutualFriends: 5
    },
    {
      id: '2', 
      name: 'อาร์ต ดีไซน์',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Comic Artist & Illustrator',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      mutualFriends: 12
    },
    {
      id: '3',
      name: 'มิ้นต์ ไอเดีย',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'Startup Entrepreneur',
      status: 'online',
      mutualFriends: 8
    }
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      fromUser: {
        id: '4',
        name: 'เจ้ เรื่องสั้น',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Story Writer',
        status: 'online',
        mutualFriends: 3
      },
      toUser: { id: user?.id || '', name: user?.name || '', avatar: user?.avatar || '', status: 'online' },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '2',
      fromUser: {
        id: '5',
        name: 'โปรดักชั่น พรี',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        bio: 'Film Producer',
        status: 'offline',
        mutualFriends: 7
      },
      toUser: { id: user?.id || '', name: user?.name || '', avatar: user?.avatar || '', status: 'online' },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'pending'
    }
  ]);

  const [searchResults, setSearchResults] = useState<Friend[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Simulate search results
      const mockResults: Friend[] = [
        {
          id: '6',
          name: 'ครีเอทีฟ คิด',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
          bio: 'Creative Director',
          status: 'online',
          mutualFriends: 2
        },
        {
          id: '7',
          name: 'อินสไปร์ ไอเดีย',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
          bio: 'Inspiration Seeker',
          status: 'offline',
          mutualFriends: 0
        }
      ].filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.bio?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    // Add to friends list
    const request = friendRequests.find(req => req.id === requestId);
    if (request) {
      setFriends(prev => [...prev, request.fromUser]);
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleSendFriendRequest = (friendId: string) => {
    // Logic to send friend request
    console.log('Sending friend request to:', friendId);
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-500' : 'bg-gray-400';
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'เมื่อสักครู่';
    if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`;
    return `${Math.floor(hours / 24)} วันที่แล้ว`;
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold">เพื่อน</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4">
        <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-4">
          {[
            { id: 'friends', label: 'เพื่อน', count: friends.length },
            { id: 'requests', label: 'คำขอ', count: friendRequests.length },
            { id: 'search', label: 'ค้นหา', count: null },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 ${
                activeTab === tab.id 
                  ? 'bg-background shadow-sm' 
                  : 'hover:bg-background/50'
              }`}
            >
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Search Bar for Search Tab */}
        {activeTab === 'search' && (
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาเพื่อนใหม่..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Friends List */}
        {activeTab === 'friends' && (
          <div className="space-y-3">
            {friends.map((friend) => (
              <Card key={friend.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <ImageWithFallback
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-background`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{friend.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{friend.bio}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      {friend.status === 'online' ? (
                        <span className="text-green-400">● ออนไลน์</span>
                      ) : (
                        <span>เข้าใช้ {friend.lastSeen ? formatLastSeen(friend.lastSeen) : 'ไม่ทราบ'}</span>
                      )}
                      {friend.mutualFriends && friend.mutualFriends > 0 && (
                        <span>• เพื่อนร่วม {friend.mutualFriends} คน</span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => onStartChat(friend)}
                    className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2]"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Friend Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-3">
            {friendRequests.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">ไม่มีคำขอเป็นเพื่อน</p>
              </div>
            ) : (
              friendRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={request.fromUser.avatar}
                      alt={request.fromUser.name}
                      className="w-12 h-12 rounded-full"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{request.fromUser.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.fromUser.bio}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{formatLastSeen(request.createdAt)}</span>
                        {request.fromUser.mutualFriends && request.fromUser.mutualFriends > 0 && (
                          <span>• เพื่อนร่วม {request.fromUser.mutualFriends} คน</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Search Results */}
        {activeTab === 'search' && (
          <div className="space-y-3">
            {searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">ไม่พบผลการค้นหา</p>
              </div>
            ) : (
              searchResults.map((result) => (
                <Card key={result.id} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <ImageWithFallback
                        src={result.avatar}
                        alt={result.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(result.status)} rounded-full border-2 border-background`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">{result.bio}</p>
                      {result.mutualFriends && result.mutualFriends > 0 && (
                        <p className="text-xs text-muted-foreground">
                          เพื่อนร่วม {result.mutualFriends} คน
                        </p>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendFriendRequest(result.id)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      เพิ่มเพื่อน
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}