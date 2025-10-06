import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  Heart,
  Share,
  BookmarkPlus,
  Play,
  Download,
  MessageCircle,
  Star,
  Shield,
  Clock,
  Eye,
  Music,
  Book,
  Palette,
  Rocket,
  Film,
  User,
  DollarSign,
  Lock,
  Globe
} from 'lucide-react';
import type { Idea } from '../App';

interface IdeaDetailPageProps {
  idea: Idea | null;
  onBack: () => void;
}

export function IdeaDetailPage({ idea, onBack }: IdeaDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!idea) return null;

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

  const getLicenseIcon = (licenseType: string) => {
    switch (licenseType) {
      case 'full': return Lock;
      case 'shared': return Share;
      case 'non-commercial': return Globe;
      default: return Shield;
    }
  };

  const licenseDescriptions = {
    full: 'Complete ownership transfer. Buyer gets all rights to use, modify, and commercialize.',
    shared: 'Shared ownership model. Both creator and buyer benefit from future profits.',
    'non-commercial': 'Personal use only. Perfect for hobbyists and personal projects.'
  };

  const CategoryIcon = getCategoryIcon(idea.category);
  const LicenseIcon = getLicenseIcon(idea.licenseType);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <BookmarkPlus className={`w-5 h-5 ${isBookmarked ? 'text-accent' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hero Image */}
        <div className="relative">
          <ImageWithFallback
            src={idea.thumbnail}
            alt={idea.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <CategoryIcon className="w-3 h-3" />
              <span className="capitalize">{idea.category}</span>
            </Badge>
          </div>

          {/* Play Button for Music/Video */}
          {(idea.category === 'music' || idea.category === 'script') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black">
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
          )}

          {/* Title and Creator Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold text-white mb-2">{idea.title}</h1>
            <div className="flex items-center space-x-3">
              <ImageWithFallback
                src={idea.creator.avatar}
                alt={idea.creator.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white/90">{idea.creator.name}</span>
              {idea.creator.verified && (
                <Badge className="bg-accent text-accent-foreground text-xs">
                  ✓ Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Stats and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {idea.views.toLocaleString()}
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {idea.likes}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                2 days ago
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </Button>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-3">About this idea</h2>
            <p className="text-muted-foreground leading-relaxed">{idea.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {idea.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* License Information */}
          <Card className="p-4">
            <div className="flex items-start space-x-3">
              <LicenseIcon className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1 capitalize">
                  {idea.licenseType === 'non-commercial' ? 'Non-Commercial License' : 
                   idea.licenseType === 'shared' ? 'Shared Royalty License' : 
                   'Full Rights License'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {licenseDescriptions[idea.licenseType]}
                </p>
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-accent" />
                <span className="text-3xl font-bold">{idea.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {idea.licenseType === 'shared' ? 'Initial investment + ongoing royalties' :
                 idea.licenseType === 'full' ? 'One-time purchase' :
                 'Personal use license'}
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90">
                  Purchase Now
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Creator
                </Button>
              </div>
            </div>
          </Card>

          {/* Creator Profile */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <ImageWithFallback
                src={idea.creator.avatar}
                alt={idea.creator.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold">{idea.creator.name}</h3>
                  {idea.creator.verified && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    4.8/5.0
                  </span>
                  <span>12 ideas sold</span>
                  <span>2.3K followers</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </Card>

          {/* Similar Ideas */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Similar Ideas</h2>
            <div className="space-y-3">
              {[1, 2].map((item) => (
                <Card key={item} className="p-3 cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex space-x-3">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-${item === 1 ? '1727383196205-7205669078f7' : '1612969307625-3e1a6ec6081a'}?w=80&h=60&fit=crop`}
                      alt="Similar idea"
                      className="w-16 h-12 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">
                        {item === 1 ? 'Neon Dreams' : 'Future Dystopia'}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {item === 1 ? 'Another synthwave masterpiece' : 'Cyberpunk story concept'}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-accent font-semibold">
                          ${item === 1 ? '250' : '600'}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {item === 1 ? 'Music' : 'Story'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}