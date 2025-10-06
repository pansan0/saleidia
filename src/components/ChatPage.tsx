import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  Send,
  Smile,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Camera,
  Mic
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatPageProps {
  chatId: string;
  currentUserId: string;
  participant: {
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastSeen?: Date;
  };
  onBack: () => void;
}

export function ChatPage({ chatId, currentUserId, participant, onBack }: ChatPageProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'สวัสดีครับ! เห็นไอเดียเพลงของคุณในแอป เจ๋งมากเลย',
      senderId: currentUserId,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      text: 'ขอบคุณมากค่ะ! ดีใจที่คุณชอบ',
      senderId: 'other',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      text: 'อยากถามว่าคุณเปิดรับความร่วมมือมั้ยครับ? ผมทำ lyrics ได้',
      senderId: currentUserId,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      text: 'เปิดรับค่ะ! จริงๆ แล้วกำลังหาคนเขียนเนื้อเพลงอยู่พอดี',
      senderId: 'other',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '5',
      text: 'เยี่ยมเลย! คุณสะดวกคุยรายละเอียดเมื่อไหร่ครับ?',
      senderId: currentUserId,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '6',
      text: 'ตอนนี้สะดวกเลยค่ะ ว่าแต่มีผลงานเก่าให้ฟังมั้ย?',
      senderId: 'other',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: '7',
      text: 'มีครับ! จะส่งให้ฟังในอีกสักครู่',
      senderId: currentUserId,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'text',
      status: 'delivered'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        senderId: currentUserId,
        timestamp: new Date(),
        type: 'text',
        status: 'sending'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        ));
      }, 500);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return '⏳';
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const dateKey = message.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    
    return groups;
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'วันนี้';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'เมื่อวาน';
    } else {
      return date.toLocaleDateString('th-TH', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="relative">
              <ImageWithFallback
                src={participant.avatar}
                alt={participant.name}
                className="w-10 h-10 rounded-full"
              />
              {participant.status === 'online' && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{participant.name}</h2>
              <p className="text-xs text-muted-foreground">
                {participant.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([dateString, groupMessages]) => (
          <div key={dateString}>
            {/* Date Header */}
            <div className="flex justify-center mb-4">
              <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                {formatDateHeader(dateString)}
              </div>
            </div>
            
            {/* Messages for this date */}
            {groupMessages.map((msg, index) => {
              const isOwn = msg.senderId === currentUserId;
              const showAvatar = !isOwn && (
                index === 0 || 
                groupMessages[index - 1].senderId !== msg.senderId
              );
              
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  {!isOwn && (
                    <div className="w-8 mr-2">
                      {showAvatar && (
                        <ImageWithFallback
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>
                  )}
                  
                  <div className={`max-w-[70%] ${isOwn ? 'ml-4' : 'mr-4'}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        isOwn
                          ? 'bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    
                    <div className={`flex items-center space-x-1 mt-1 text-xs text-muted-foreground ${
                      isOwn ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{formatTimestamp(msg.timestamp)}</span>
                      {isOwn && (
                        <span className={`${
                          msg.status === 'read' ? 'text-blue-400' : ''
                        }`}>
                          {getStatusIcon(msg.status)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Camera className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="พิมพ์ข้อความ..."
              className="pr-12 resize-none"
              rows={1}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}