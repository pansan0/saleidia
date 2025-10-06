import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Lightbulb, User, ShoppingBag, Music, Book, Palette, Rocket, Film } from 'lucide-react';
import type { User } from '../App';

interface OnboardingProps {
  onUserCreated: (user: User) => void;
}

export function Onboarding({ onUserCreated }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'creator' | 'buyer' | null>(null);
  const [personality, setPersonality] = useState<string>('');
  const [interests, setInterests] = useState<string[]>([]);

  const personalities = [
    { id: 'writer', label: 'Writer', icon: Book },
    { id: 'musician', label: 'Musician', icon: Music },
    { id: 'innovator', label: 'Innovator', icon: Lightbulb },
    { id: 'investor', label: 'Investor', icon: ShoppingBag },
    { id: 'designer', label: 'Designer', icon: Palette },
  ];

  const interestOptions = [
    'Pop Music', 'Jazz', 'Classical', 'Electronic',
    'Romance', 'Fantasy', 'Sci-Fi', 'Mystery', 'Thriller',
    'Superhero Comics', 'Web Comics', 'Manga',
    'Tech Startups', 'Social Impact', 'E-commerce', 'SaaS',
    'Short Films', 'Documentaries', 'Animation'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleComplete = () => {
    if (!userType || !personality) return;

    const user: User = {
      id: `user_${Date.now()}`,
      name: 'Alex Rivera',
      email: 'alex@example.com',
      type: userType,
      interests,
      personality,
      avatar: 'https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNyZWF0aXZlJTIwcGVyc29uJTIwcHJvZmlsZXxlbnwxfHx8fDE3NTk3Nzc1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: userType === 'creator' ? 'Passionate creator turning dreams into reality' : 'Looking for the next big idea',
      totalEarnings: userType === 'creator' ? 2500 : undefined,
      ideasSold: userType === 'creator' ? 12 : undefined,
      rating: userType === 'creator' ? 4.8 : undefined,
    };

    onUserCreated(user);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center mb-2">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] bg-clip-text text-transparent">
          DreaMark
        </h1>
        <p className="text-muted-foreground mt-1">Turn Dreams Into Market</p>
      </div>

      {/* Step 1: User Type Selection */}
      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-xl mb-2">Welcome to the future of creativity</h2>
            <p className="text-muted-foreground">How would you like to join our community?</p>
          </div>

          <div className="space-y-4 mb-8">
            <Card 
              className={`p-6 border-2 cursor-pointer transition-all ${
                userType === 'creator' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setUserType('creator')}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Join as Creator</h3>
                  <p className="text-sm text-muted-foreground">Share your ideas and earn from your creativity</p>
                </div>
              </div>
            </Card>

            <Card 
              className={`p-6 border-2 cursor-pointer transition-all ${
                userType === 'buyer' 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setUserType('buyer')}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Join as Investor / Buyer</h3>
                  <p className="text-sm text-muted-foreground">Discover and invest in amazing ideas</p>
                </div>
              </div>
            </Card>
          </div>

          <Button 
            onClick={() => setStep(2)}
            disabled={!userType}
            className="w-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90 transition-opacity"
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Personality Selection */}
      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-xl mb-2">Which type describes you best?</h2>
            <p className="text-muted-foreground">This helps us personalize your experience</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {personalities.map((type) => {
              const Icon = type.icon;
              return (
                <Card
                  key={type.id}
                  className={`p-4 cursor-pointer transition-all text-center ${
                    personality === type.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setPersonality(type.id)}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{type.label}</p>
                </Card>
              );
            })}
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={() => setStep(3)}
              disabled={!personality}
              className="flex-1 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90 transition-opacity"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Interests Selection */}
      {step === 3 && (
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-xl mb-2">What kind of ideas do you love?</h2>
            <p className="text-muted-foreground">Select all that interest you</p>
          </div>

          <div className="flex-1 overflow-y-auto mb-6">
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant={interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    interests.includes(interest)
                      ? 'bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90'
                      : 'hover:border-primary'
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setStep(2)}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}