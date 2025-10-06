import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Music, 
  Book, 
  Palette, 
  Rocket, 
  Film, 
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react';
import type { Idea } from '../App';

interface CategoriesPageProps {
  onIdeaSelect: (idea: Idea) => void;
}

export function CategoriesPage({ onIdeaSelect }: CategoriesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('trending');

  const categories = [
    { id: 'all', name: 'All', icon: Filter, color: 'from-gray-400 to-gray-600' },
    { id: 'music', name: 'Music', icon: Music, color: 'from-purple-400 to-pink-400' },
    { id: 'story', name: 'Stories', icon: Book, color: 'from-blue-400 to-cyan-400' },
    { id: 'comic', name: 'Comics', icon: Palette, color: 'from-green-400 to-emerald-400' },
    { id: 'startup', name: 'Startups', icon: Rocket, color: 'from-orange-400 to-red-400' },
    { id: 'script', name: 'Scripts', icon: Film, color: 'from-indigo-400 to-purple-400' },
  ];

  const sortOptions = [
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'price-low', name: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', name: 'Price: High to Low', icon: DollarSign },
    { id: 'newest', name: 'Newest', icon: Clock },
  ];

  const ideas: Idea[] = [
    {
      id: '1',
      title: 'Ethereal Dreams',
      description: 'A soothing ambient track with ethereal vocals and dreamy soundscapes',
      category: 'music',
      price: 350,
      licenseType: 'shared',
      tags: ['Ambient', 'Vocals', 'Dreamy'],
      thumbnail: 'https://images.unsplash.com/photo-1727383196205-7205669078f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvJTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NTk2OTYzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator1',
      creator: { name: 'Luna Sounds', avatar: 'https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=100', verified: true },
      likes: 245,
      views: 892,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'The Time Traveler\'s Dilemma',
      description: 'A gripping sci-fi story about a physicist who discovers time travel but faces moral consequences',
      category: 'story',
      price: 750,
      licenseType: 'full',
      tags: ['Sci-Fi', 'Time Travel', 'Thriller'],
      thumbnail: 'https://images.unsplash.com/photo-1612969307625-3e1a6ec6081a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxib29rJTIwd3JpdGluZyUyMHN0b3J5dGVsbGluZ3xlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator2',
      creator: { name: 'Marcus Writer', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100', verified: false },
      likes: 156,
      views: 634,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Urban Legends',
      description: 'A dark comic series exploring modern urban legends in a cyberpunk setting',
      category: 'comic',
      price: 1200,
      licenseType: 'shared',
      tags: ['Cyberpunk', 'Urban Fantasy', 'Dark'],
      thumbnail: 'https://images.unsplash.com/photo-1733004441407-275c8b2f239e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb21pYyUyMGJvb2slMjBpbGx1c3RyYXRpb24lMjBhcnR8ZW58MXx8fHwxNzU5Nzc3NTczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator3',
      creator: { name: 'Pixel Artist', avatar: 'https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=100', verified: true },
      likes: 89,
      views: 445,
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'GreenTech Solutions',
      description: 'Revolutionary solar panel technology that increases efficiency by 40%',
      category: 'startup',
      price: 5000,
      licenseType: 'full',
      tags: ['GreenTech', 'Solar', 'Innovation'],
      thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdGFydHVwJTIwYnVzaW5lc3MlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1OTc3NTU3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      creatorId: 'creator4',
      creator: { name: 'Tech Innovator', avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100', verified: false },
      likes: 34,
      views: 178,
      createdAt: new Date()
    },
  ];

  const filteredIdeas = selectedCategory === 'all' 
    ? ideas 
    : ideas.filter(idea => idea.category === selectedCategory);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <h1 className="text-xl font-bold mb-4">Explore Ideas</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search in categories..."
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  isActive 
                    ? `bg-gradient-to-r ${category.color} text-white border-0` 
                    : 'hover:border-primary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredIdeas.length} ideas found
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-input-background border border-input rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredIdeas.map((idea) => (
            <Card 
              key={idea.id} 
              className="cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
              onClick={() => onIdeaSelect(idea)}
            >
              <div className="relative">
                <ImageWithFallback
                  src={idea.thumbnail}
                  alt={idea.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {idea.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                    ${idea.price}
                  </Badge>
                </div>
                {idea.creator.verified && (
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      ✓ Verified
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-2">{idea.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {idea.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <ImageWithFallback
                      src={idea.creator.avatar}
                      alt={idea.creator.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">{idea.creator.name}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>❤️ {idea.likes}</span>
                    <span>👁️ {idea.views}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {idea.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      idea.licenseType === 'full' 
                        ? 'border-green-500 text-green-400' 
                        : idea.licenseType === 'shared'
                        ? 'border-blue-500 text-blue-400'
                        : 'border-yellow-500 text-yellow-400'
                    }`}
                  >
                    {idea.licenseType === 'full' ? 'Full Rights' : 
                     idea.licenseType === 'shared' ? 'Shared Royalty' : 
                     'Non-Commercial'}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="hover:border-primary">
            Load More Ideas
          </Button>
        </div>
      </div>
    </div>
  );
}