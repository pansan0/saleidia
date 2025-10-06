import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DreamMarkLogo } from './DreamMarkLogo';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingScreenProps {
  onComplete: (userType: 'creator' | 'buyer', interests: string[]) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<'creator' | 'buyer' | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    { id: 'music', label: '🎵 Music & Melodies', color: 'from-purple-500 to-pink-500' },
    { id: 'stories', label: '📖 Stories & Novels', color: 'from-blue-500 to-indigo-500' },
    { id: 'comics', label: '🎨 Comics & Art', color: 'from-green-500 to-teal-500' },
    { id: 'startups', label: '💼 Startup Ideas', color: 'from-orange-500 to-red-500' },
    { id: 'scripts', label: '🎬 Scripts & Movies', color: 'from-yellow-500 to-orange-500' },
    { id: 'design', label: '✨ Design & UI/UX', color: 'from-indigo-500 to-purple-500' }
  ];

  const personalities = [
    { id: 'writer', label: '✍️ Writer', desc: 'I love crafting stories and narratives' },
    { id: 'musician', label: '🎼 Musician', desc: 'Music is my passion and language' },
    { id: 'innovator', label: '💡 Innovator', desc: 'I create solutions and build startups' },
    { id: 'investor', label: '💰 Investor', desc: 'I spot potential and invest in ideas' },
    { id: 'designer', label: '🎨 Designer', desc: 'Visual creativity is my superpower' }
  ];

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleComplete = () => {
    if (userType && selectedInterests.length > 0) {
      onComplete(userType, selectedInterests);
    }
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B] p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <DreamMarkLogo className="justify-center mb-6" />
          
          <div className="relative mb-8">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1750365919878-2735d30fa3d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neSUyMGxpZ2h0YnVsYiUyMGNyZWF0aXZpdHl8ZW58MXx8fHwxNzU5Nzc3NTcxfDA&ixlib=rb-4.1.0&q=80&w=400"
              alt="Futuristic creativity"
              className="w-48 h-48 rounded-2xl object-cover mx-auto shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8E2DE2]/30 to-transparent rounded-2xl"></div>
          </div>

          <h2 className="text-2xl mb-4 text-white">Welcome to the Future of Ideas</h2>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Transform your creative dreams into marketable reality. Join thousands of creators and innovators.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <Button 
            onClick={() => { setUserType('creator'); setStep(1); }}
            className="w-full h-14 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:from-[#4A00E0]/80 hover:to-[#8E2DE2]/80 text-white border-0"
          >
            <span className="text-lg">Join as Creator</span>
          </Button>
          
          <Button 
            onClick={() => { setUserType('buyer'); setStep(1); }}
            variant="outline"
            className="w-full h-14 border-[#8E2DE2] text-[#8E2DE2] hover:bg-[#8E2DE2]/10"
          >
            <span className="text-lg">Join as Investor / Buyer</span>
          </Button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B] p-6">
        <div className="max-w-md mx-auto pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl mb-2 text-white">What inspires you?</h2>
            <p className="text-muted-foreground">Select categories you're interested in</p>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {interests.map((interest) => (
              <Card 
                key={interest.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedInterests.includes(interest.id) 
                    ? 'border-[#8E2DE2] bg-[#8E2DE2]/10' 
                    : 'border-gray-700 hover:border-[#8E2DE2]/50'
                }`}
                onClick={() => toggleInterest(interest.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${interest.color}`}></div>
                  <span className="text-white">{interest.label}</span>
                </div>
              </Card>
            ))}
          </div>

          <Button 
            onClick={() => setStep(2)}
            disabled={selectedInterests.length === 0}
            className="w-full h-12 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:from-[#4A00E0]/80 hover:to-[#8E2DE2]/80 text-white border-0"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B] p-6">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl mb-2 text-white">Which describes you best?</h2>
          <p className="text-muted-foreground">Help us personalize your experience</p>
        </div>

        <div className="space-y-3 mb-8">
          {personalities.map((personality) => (
            <Card 
              key={personality.id}
              className="p-4 cursor-pointer hover:border-[#8E2DE2]/50 transition-all"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{personality.label.split(' ')[0]}</span>
                <div>
                  <h3 className="text-white font-medium">{personality.label.split(' ').slice(1).join(' ')}</h3>
                  <p className="text-sm text-muted-foreground">{personality.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button 
          onClick={handleComplete}
          className="w-full h-12 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:from-[#4A00E0]/80 hover:to-[#8E2DE2]/80 text-white border-0"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
}