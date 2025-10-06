import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Settings, 
  Edit, 
  TrendingUp, 
  Heart, 
  Eye, 
  Star, 
  Award,
  Crown,
  Zap,
  ShoppingBag,
  DollarSign
} from 'lucide-react';

export function ProfileScreen() {
  const [userStats] = useState({
    totalEarnings: 47850,
    ideasSold: 23,
    followers: 1247,
    totalViews: 15680,
    rating: 4.8,
    badges: ['Top Seller', 'Innovator', 'Verified Creator']
  });

  const myIdeas = [
    {
      id: 1,
      title: "Synthwave Romance",
      category: "Music",
      price: "฿1,299",
      status: "sold",
      views: 847,
      likes: 234,
      image: "https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 2,
      title: "Time Travel Mystery",
      category: "Story",
      price: "฿2,499",
      status: "active",
      views: 1203,
      likes: 456,
      image: "https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwd3JpdGluZyUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  const purchasedIdeas = [
    {
      id: 3,
      title: "Digital Nomad App",
      category: "Startup",
      price: "฿8,999",
      author: "TechVision",
      purchaseDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwYnVzaW5lc3MlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1OTc3NTU3M3ww&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Top Seller': return <Crown className="w-4 h-4" />;
      case 'Innovator': return <Zap className="w-4 h-4" />;
      case 'Verified Creator': return <Award className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Top Seller': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'Innovator': return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'Verified Creator': return 'bg-gradient-to-r from-green-500 to-teal-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B] pb-20">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="absolute top-4 right-4 text-white bg-black/20 backdrop-blur-sm"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end space-x-4 -mt-8">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-[#0B132B]">
                <AvatarImage src="https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwcGVyc29uJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=200" />
                <AvatarFallback className="bg-[#8E2DE2] text-white text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FFD369] rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 text-[#0B132B]" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-xl text-white">Jane Creator</h1>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                Digital artist & music producer | Creating the future
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {userStats.badges.map((badge) => (
                  <Badge 
                    key={badge} 
                    className={`${getBadgeColor(badge)} text-white border-0 flex items-center space-x-1`}
                  >
                    {getBadgeIcon(badge)}
                    <span>{badge}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FFD369]/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#FFD369]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Earnings</p>
                <p className="text-lg text-white">฿{userStats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#8E2DE2]/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#8E2DE2]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ideas Sold</p>
                <p className="text-lg text-white">{userStats.ideasSold}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#4A00E0]/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#4A00E0]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-lg text-white">{userStats.followers.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="text-lg text-white">{userStats.rating}/5.0</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="px-6">
        <Tabs defaultValue="my-ideas" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#1A2137] border border-white/10">
            <TabsTrigger value="my-ideas" className="text-white data-[state=active]:bg-[#8E2DE2]">
              My Ideas
            </TabsTrigger>
            <TabsTrigger value="purchases" className="text-white data-[state=active]:bg-[#8E2DE2]">
              Purchases
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-[#8E2DE2]">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-ideas" className="mt-6">
            <div className="space-y-4">
              {myIdeas.map((idea) => (
                <Card key={idea.id} className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 overflow-hidden">
                  <div className="flex">
                    <ImageWithFallback 
                      src={idea.image}
                      alt={idea.title}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-medium">{idea.title}</h3>
                          <Badge variant="secondary" className="mt-1 bg-[#2A3547] text-[#C0C0C0] border-0">
                            {idea.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-[#FFD369] font-medium">{idea.price}</p>
                          <Badge 
                            className={
                              idea.status === 'sold' 
                                ? 'bg-green-500/20 text-green-400 border-0' 
                                : 'bg-blue-500/20 text-blue-400 border-0'
                            }
                          >
                            {idea.status === 'sold' ? 'Sold' : 'Active'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{idea.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{idea.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <div className="space-y-4">
              {purchasedIdeas.map((idea) => (
                <Card key={idea.id} className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 overflow-hidden">
                  <div className="flex">
                    <ImageWithFallback 
                      src={idea.image}
                      alt={idea.title}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 p-4">
                      <h3 className="text-white font-medium">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground">by {idea.author}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="bg-[#2A3547] text-[#C0C0C0] border-0">
                          {idea.category}
                        </Badge>
                        <div className="text-right">
                          <p className="text-[#FFD369] font-medium">{idea.price}</p>
                          <p className="text-xs text-muted-foreground">{idea.purchaseDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-6 text-center">
              <TrendingUp className="w-12 h-12 text-[#8E2DE2] mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Detailed insights into your idea performance and earnings
              </p>
              <Button className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white border-0">
                View Full Analytics
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}