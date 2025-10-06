import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Slider } from './ui/slider';
import { Heart, Filter, SlidersHorizontal } from 'lucide-react';

export function CategoriesScreen() {
  const [activeCategory, setActiveCategory] = useState('music');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const categories = [
    { id: 'music', label: '🎵 Music', color: 'from-purple-500 to-pink-500' },
    { id: 'stories', label: '📖 Stories', color: 'from-blue-500 to-indigo-500' },
    { id: 'comics', label: '🎨 Comics', color: 'from-green-500 to-teal-500' },
    { id: 'startups', label: '💼 Startups', color: 'from-orange-500 to-red-500' },
    { id: 'scripts', label: '🎬 Scripts', color: 'from-yellow-500 to-orange-500' }
  ];

  const ideas = {
    music: [
      {
        id: 1,
        title: "Midnight City Vibes",
        price: "฿899",
        image: "https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=400",
        author: "SoundWave",
        likes: 234,
        tags: ["Lo-fi", "Chill", "Urban"],
        description: "Perfect background music for night scenes"
      },
      {
        id: 2,
        title: "Epic Orchestra Theme",
        price: "฿2,499",
        image: "https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=400",
        author: "Maestro",
        likes: 567,
        tags: ["Orchestral", "Epic", "Cinematic"],
        description: "Dramatic orchestral piece for movie trailers"
      }
    ],
    stories: [
      {
        id: 3,
        title: "The Digital Ghost",
        price: "฿1,599",
        image: "https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwd3JpdGluZyUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=400",
        author: "CyberScribe",
        likes: 445,
        tags: ["Sci-Fi", "Thriller", "AI"],
        description: "A haunting tale of AI consciousness"
      }
    ],
    comics: [
      {
        id: 4,
        title: "Neon Samurai",
        price: "฿3,299",
        image: "https://images.unsplash.com/photo-1733004441407-275c8b2f239e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBpbGx1c3RyYXRpb24lMjBhcnR8ZW58MXx8fHwxNzU5Nzc3NTczfDA&ixlib=rb-4.1.0&q=80&w=400",
        author: "InkMaster",
        likes: 789,
        tags: ["Cyberpunk", "Action", "Futuristic"],
        description: "Cyberpunk samurai in neon-lit Tokyo"
      }
    ],
    startups: [
      {
        id: 5,
        title: "EcoDelivery Platform",
        price: "฿15,000",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwYnVzaW5lc3MlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1OTc3NTU3M3ww&ixlib=rb-4.1.0&q=80&w=400",
        author: "GreenTech",
        likes: 123,
        tags: ["Green Tech", "Delivery", "Sustainability"],
        description: "Carbon-neutral delivery network concept"
      }
    ]
  };

  const currentIdeas = ideas[activeCategory as keyof typeof ideas] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B] pb-20">
      {/* Header */}
      <div className="bg-[#1A2137]/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl text-white">Categories</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] text-white border-0 whitespace-nowrap"
                    : "border-white/20 text-white hover:bg-white/10 whitespace-nowrap"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t border-white/10 px-6 py-4 bg-[#1A2137]">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white mb-2 block">
                  Price Range: ฿{priceRange[0]} - ฿{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  Most Popular
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  Newest
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white">
                  Price: Low to High
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ideas Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 gap-4">
          {currentIdeas.map((idea) => (
            <Card key={idea.id} className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 overflow-hidden">
              <div className="flex">
                <div className="relative flex-shrink-0">
                  <ImageWithFallback 
                    src={idea.image}
                    alt={idea.title}
                    className="w-24 h-24 object-cover"
                  />
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="absolute top-2 right-2 text-white bg-black/40 backdrop-blur-sm w-8 h-8 p-0"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-medium">{idea.title}</h3>
                    <span className="font-medium text-[#FFD369]">{idea.price}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="bg-[#8E2DE2] text-white text-xs">
                        {idea.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{idea.author}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Heart className="w-3 h-3" />
                      <span>{idea.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-[#2A3547] text-[#C0C0C0] border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {currentIdeas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-white font-medium mb-2">No ideas in this category yet</h3>
            <p className="text-muted-foreground">Be the first to share your {activeCategory} idea!</p>
          </div>
        )}
      </div>
    </div>
  );
}