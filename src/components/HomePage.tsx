import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Bell, 
  TrendingUp, 
  Play, 
  Heart, 
  Eye,
  Star,
  Music,
  Book,
  Palette,
  Rocket,
  Film
} from 'lucide-react';
import type { User, Idea } from '../App';

interface HomePageProps {
  user: User | null;
  onIdeaSelect: (idea: Idea) => void;
}

export function HomePage({ user, onIdeaSelect }: HomePageProps) {
  const trendingIdeas: Idea[] = [
    {
      id: '1',
      title: 'Midnight Vibes',
      description: 'A haunting melody perfect for late-night introspection',
      category: 'music',
      price: 250,
      licenseType: 'shared',
      tags: ['Lo-fi', 'Ambient', 'Chill'],
      thumbnail: 'https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator1',
      creator: { name: 'Jordan Beat', avatar: 'https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=100', verified: true },
      likes: 342,
      views: 1250,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'The Last Library',
      description: 'A dystopian story about the keeper of the world\'s final library',
      category: 'story',
      price: 500,
      licenseType: 'full',
      tags: ['Dystopian', 'Drama', 'Post-apocalyptic'],
      thumbnail: 'https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxib29rJTIwd3JpdGluZyUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator2',
      creator: { name: 'Maya Storyteller', avatar: 'https://images.unsplash.com/photo-1556757175-e33e89b5d7d6?w=100', verified: true },
      likes: 189,
      views: 856,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'EcoFlow',
      description: 'A sustainability-focused water management startup concept',
      category: 'startup',
      price: 2000,
      licenseType: 'shared',
      tags: ['Sustainability', 'IoT', 'Water Management'],
      thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdGFydHVwJTIwYnVzaW5lc3MlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1OTc3NzU3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator3',
      creator: { name: 'Alex Innovator', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100', verified: false },
      likes: 67,
      views: 423,
      createdAt: new Date()
    }
  ];

  const reels = [
    {
      id: 'reel1',
      creator: 'SoundWave_Producer',
      title: 'My new beat dropped! 🎵',
      thumbnail: 'https://images.unsplash.com/photo-1727383196205-7205669078f7?w=300&h=400&fit=crop',
      duration: '0:15'
    },
    {
      id: 'reel2',
      creator: 'StorytellerMike',
      title: 'Plot twist you never saw coming',
      thumbnail: 'https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?w=300&h=400&fit=crop',
      duration: '0:22'
    },
    {
      id: 'reel3',
      creator: 'StartupGuru',
      title: 'This idea could change everything',
      thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
      duration: '0:30'
    }
  ];

  const successStories = [
    {
      title: 'From DreaMark to Billboard',
      description: 'Local artist\'s melody sold for $50K, now tops charts',
      image: 'https://images.unsplash.com/photo-1727383196205-7205669078f7?w=400&h=200&fit=crop'
    },
    {
      title: 'Startup Success Story',
      description: 'EcoTech idea bought for $100K, launches next month',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=200&fit=crop'
    }
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <h1 className="font-bold">DreaMark</h1>
              <p className="text-xs text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ideas, creators, genres..."
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Trending Ideas */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-accent" />
              🔥 Trending Ideas
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {trendingIdeas.map((idea) => {
              const CategoryIcon = getCategoryIcon(idea.category);
              return (
                <Card 
                  key={idea.id} 
                  className="min-w-[280px] p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => onIdeaSelect(idea)}
                >
                  <div className="relative mb-3">
                    <ImageWithFallback
                      src={idea.thumbnail}
                      alt={idea.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {idea.category}
                      </Badge>
                    </div>
                    {idea.creator.verified && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-accent text-accent-foreground text-xs">✓</Badge>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-1">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{idea.description}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent font-semibold">${idea.price}</span>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {idea.likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {idea.views}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ImageWithFallback
                        src={idea.creator.avatar}
                        alt={idea.creator.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-muted-foreground">{idea.creator.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Short Reels Zone */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Play className="w-5 h-5 mr-2 text-accent" />
              🎬 Short Reels Zone
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {reels.map((reel) => (
              <div key={reel.id} className="min-w-[120px] cursor-pointer">
                <div className="relative">
                  <ImageWithFallback
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-4 h-4 text-black ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <Badge variant="secondary" className="text-xs mb-1">
                      {reel.duration}
                    </Badge>
                    <p className="text-xs text-white font-medium">{reel.title}</p>
                    <p className="text-xs text-white/80">@{reel.creator}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dream Stories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Star className="w-5 h-5 mr-2 text-accent" />
              📰 Dream Stories
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          
          <div className="space-y-3">
            {successStories.map((story, index) => (
              <Card key={index} className="p-4 cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex space-x-3">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{story.title}</h3>
                    <p className="text-sm text-muted-foreground">{story.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* For You (AI Suggestions) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              🧠 For You
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">Refresh</Button>
          </div>
          
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Based on your interests in {user?.interests.slice(0, 2).join(' and ')}</p>
              <h3 className="font-semibold mb-2">Discover similar ideas</h3>
              <Button size="sm" className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2]">
                Explore Now
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}