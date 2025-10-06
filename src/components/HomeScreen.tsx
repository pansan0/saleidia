import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DreamMarkLogo } from './DreamMarkLogo';
import { Bell, Search, Play, Heart, Eye, TrendingUp, Zap } from 'lucide-react';

interface HomeScreenProps {
  userType: 'creator' | 'buyer';
  userInterests: string[];
}

export function HomeScreen({ userType, userInterests }: HomeScreenProps) {
  const trendingIdeas = [
    {
      id: 1,
      title: "Synthwave Romance",
      category: "Music",
      price: "฿1,299",
      image: "https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=400",
      author: "Luna Nova",
      likes: 847,
      tags: ["Pop", "Synthwave", "Romantic"]
    },
    {
      id: 2,
      title: "Time Travel Mystery",
      category: "Story",
      price: "฿2,499",
      image: "https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwd3JpdGluZyUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=400",
      author: "Alex Chen",
      likes: 1203,
      tags: ["Sci-Fi", "Mystery", "Thriller"]
    },
    {
      id: 3,
      title: "Eco-Hero Comics",
      category: "Comic",
      price: "฿1,899",
      image: "https://images.unsplash.com/photo-1733004441407-275c8b2f239e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBpbGx1c3RyYXRpb24lMjBhcnR8ZW58MXx8fHwxNzU5Nzc3NTczfDA&ixlib=rb-4.1.0&q=80&w=400",
      author: "Maya Studios",
      likes: 692,
      tags: ["Superhero", "Environmental", "Action"]
    }
  ];

  const reelsData = [
    {
      id: 1,
      title: "AI-Powered Food Delivery",
      author: "StartupGenius",
      views: "12.5K",
      duration: "0:28",
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwYnVzaW5lc3MlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1OTc3NzU3M3ww&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 2,
      title: "Melody That Heals",
      author: "SoundHealer",
      views: "8.2K",
      duration: "0:15",
      thumbnail: "https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  const successStories = [
    {
      title: "From DreaMark to Billboard",
      subtitle: "How 'Midnight Dreams' became a global hit",
      image: "https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwcGVyc29uJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B]">
      {/* Header */}
      <div className="bg-[#1A2137]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <DreamMarkLogo showText={false} />
          
          <div className="flex-1 max-w-sm mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search ideas..." 
                className="w-full pl-10 pr-4 py-2 bg-[#2A3547] border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#8E2DE2]"
              />
            </div>
          </div>
          
          <Button size="sm" variant="ghost" className="relative">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD369] rounded-full"></div>
          </Button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Trending Ideas */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#FFD369]" />
              <h2 className="text-xl text-white">Trending Ideas</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-[#8E2DE2]">
              See All
            </Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trendingIdeas.map((idea) => (
              <Card key={idea.id} className="flex-shrink-0 w-72 bg-gradient-to-br from-[#1A2137] to-[#2A3547] border-white/10 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback 
                    src={idea.image}
                    alt={idea.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#8E2DE2] text-white border-0">
                      {idea.category}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button size="sm" variant="ghost" className="text-white bg-black/20 backdrop-blur-sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-medium mb-2">{idea.title}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#8E2DE2] text-white text-xs">
                        {idea.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{idea.author}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-[#2A3547] text-[#C0C0C0] border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{idea.likes}</span>
                    </div>
                    <span className="font-medium text-[#FFD369]">{idea.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Short Reels Zone */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#FFD369]" />
              <h2 className="text-xl text-white">Short Reels Zone</h2>
            </div>
            <Button variant="ghost" size="sm" className="text-[#8E2DE2]">
              Watch All
            </Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {reelsData.map((reel) => (
              <Card key={reel.id} className="flex-shrink-0 w-48 bg-gradient-to-br from-[#1A2137] to-[#2A3547] border-white/10 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback 
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <Button 
                    size="sm" 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-0 rounded-full w-12 h-12"
                  >
                    <Play className="w-5 h-5 text-white fill-white" />
                  </Button>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm font-medium mb-1">{reel.title}</h3>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>{reel.author}</span>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3" />
                        <span>{reel.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs">{reel.duration}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Dream Stories */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">📰</span>
            <h2 className="text-xl text-white">Dream Stories</h2>
          </div>
          
          {successStories.map((story, index) => (
            <Card key={index} className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 overflow-hidden">
              <div className="flex">
                <ImageWithFallback 
                  src={story.image}
                  alt={story.title}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-white font-medium mb-1">{story.title}</h3>
                  <p className="text-sm text-muted-foreground">{story.subtitle}</p>
                  <Button variant="ghost" size="sm" className="text-[#8E2DE2] p-0 h-auto mt-2">
                    Read More →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* For You Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">🧠</span>
            <h2 className="text-xl text-white">For You</h2>
          </div>
          
          <Card className="bg-gradient-to-br from-[#1A2137] to-[#2A3547] border-white/10 p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-white font-medium mb-2">AI Recommendations Coming Soon</h3>
            <p className="text-muted-foreground text-sm mb-4">
              We're analyzing your interests to suggest perfect ideas for you
            </p>
            <Button className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white border-0">
              Explore Categories
            </Button>
          </Card>
        </section>
      </div>
    </div>
  );
}