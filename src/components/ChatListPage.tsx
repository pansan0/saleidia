import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search,
  MessageCircle,
  ArrowLeft,
  Users,
  MoreVertical,
  Pin
} from 'lucide-react';

interface ChatPreview {
  id: string;
  participant: {
    name: string;
    avatar: string;
    status: 'online' | 'offline';
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  unreadCount: number;
  isPinned: boolean;
}

interface ChatListPageProps {
  onBack: () => void;
  onChatSelect: (chatId: string) => void;
  currentUserId: string;
}

export function ChatListPage({ onBack, onChatSelect, currentUserId }: ChatListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<ChatPreview[]>([
    {
      id: '1',
      participant: {
        name: 'นิชา สร้างสรรค์',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        status: 'online'
      },
      lastMessage: {
        text: 'เฮ้ย! ไอเดียเพลงใหม่ของ��ธอเจ๋งมาก ฟังแล้วติดหู',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: false,
        senderId: '1'
      },
      unreadCount: 2,
      isPinned: true
    },
    {
      id: '2',
      participant: {
        name: 'อาร์ต ดีไซน์',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        status: 'offline'
      },
      lastMessage: {
        text: 'ขอบคุณสำหรับ feedback นะ จะปรับแก้ตามที่แนะนำ',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
        senderId: currentUserId
      },
      unreadCount: 0,
      isPinned: false
    },
    {
      id: '3',
      participant: {
        name: 'มิ้นต์ ไอเดีย',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        status: 'online'
      },
      lastMessage: {
        text: 'คิดว่าไอเดีย startup นี้มีโอกาสเป็นจริงมั้ย?',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isRead: false,
        senderId: '3'
      },
      unreadCount: 1,
      isPinned: false
    },
    {
      id: '4',
      participant: {
        name: 'เจ้ เรื่องสั้น',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        status: 'offline'
      },
      lastMessage: {
        text: 'เรื่องใหม่ที่เขียนเสร็จแล้ว อยากให้อ่านก่อนใครเลย!',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isRead: true,
        senderId: '4'
      },
      unreadCount: 0,
      isPinned: false
    }
  ]);

  const filteredChats = chats.filter(chat =>
    chat.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    // Sort by pinned first, then by timestamp
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
  });

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'เมื่อกี้';
    if (minutes < 60) return `${minutes}น`;
    if (hours < 24) return `${hours}ชม`;
    if (days < 7) return `${days}วัน`;
    
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  };

  const truncateMessage = (text: string, maxLength: number = 45) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold">แชท</h1>
              {totalUnreadCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  ข้อความใหม่ {totalUnreadCount} ข้อความ
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาแชท..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-2">
          {filteredChats.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">ยังไม่มีแชท</h3>
              <p className="text-muted-foreground text-sm">
                เริ่มสนทนากับเพื่อนๆ ของคุณ
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <Card 
                key={chat.id} 
                className={`p-4 cursor-pointer transition-colors hover:border-primary/50 ${
                  chat.unreadCount > 0 ? 'bg-muted/30' : ''
                }`}
                onClick={() => onChatSelect(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <ImageWithFallback
                      src={chat.participant.avatar}
                      alt={chat.participant.name}
                      className="w-14 h-14 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                      chat.participant.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-semibold truncate ${
                          chat.unreadCount > 0 ? 'text-foreground' : 'text-foreground'
                        }`}>
                          {chat.participant.name}
                        </h3>
                        {chat.isPinned && (
                          <Pin className="w-3 h-3 text-accent rotate-45" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs ${
                          chat.unreadCount > 0 ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {formatTimestamp(chat.lastMessage.timestamp)}
                        </span>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {chat.lastMessage.senderId === currentUserId && (
                        <span className="text-muted-foreground text-xs">คุณ:</span>
                      )}
                      <p className={`text-sm truncate ${
                        chat.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
                      }`}>
                        {truncateMessage(chat.lastMessage.text)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}