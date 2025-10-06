import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft,
  Upload, 
  Music, 
  Book, 
  Palette, 
  Rocket, 
  Film,
  Wand2,
  DollarSign,
  Share,
  Lock,
  Globe
} from 'lucide-react';
import type { User } from '../App';

interface CreateIdeaPageProps {
  user: User | null;
  onComplete: () => void;
}

export function CreateIdeaPage({ user, onComplete }: CreateIdeaPageProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [price, setPrice] = useState<number>(100);
  const [licenseType, setLicenseType] = useState<string>('shared');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const categories = [
    {
      id: 'music',
      name: 'Music Ideas',
      icon: Music,
      description: 'Melodies, lyrics, jingles',
      color: 'from-purple-400 to-pink-400',
      examples: ['Pop Song', 'Jingle', 'Soundtrack', 'Beat']
    },
    {
      id: 'story',
      name: 'Story / Novel Ideas',
      icon: Book,
      description: 'Short plots, character concepts',
      color: 'from-blue-400 to-cyan-400',
      examples: ['Romance Plot', 'Mystery', 'Fantasy World', 'Character Arc']
    },
    {
      id: 'comic',
      name: 'Comic Concepts',
      icon: Palette,
      description: 'Character sketches, storylines',
      color: 'from-green-400 to-emerald-400',
      examples: ['Superhero', 'Webcomic', 'Manga Style', 'Character Design']
    },
    {
      id: 'startup',
      name: 'Startup / Product Ideas',
      icon: Rocket,
      description: 'Business concepts, prototypes',
      color: 'from-orange-400 to-red-400',
      examples: ['SaaS', 'Mobile App', 'IoT Device', 'AI Solution']
    },
    {
      id: 'script',
      name: 'Script / Movie Ideas',
      icon: Film,
      description: 'Scene outlines, dialogues',
      color: 'from-indigo-400 to-purple-400',
      examples: ['Short Film', 'Web Series', 'Commercial', 'Documentary']
    },
  ];

  const licenseOptions = [
    {
      id: 'full',
      name: 'Full Sale',
      description: 'Buyer gets complete ownership',
      icon: Lock,
      price: '+ High Price'
    },
    {
      id: 'shared',
      name: 'Shared Royalty',
      description: 'Split profits with buyer',
      icon: Share,
      price: '+ Ongoing Revenue'
    },
    {
      id: 'non-commercial',
      name: 'Non-Commercial Use',
      description: 'Personal use only',
      icon: Globe,
      price: '+ Lower Price'
    },
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    // Here you would typically upload the idea to your backend
    console.log({
      category,
      title,
      description,
      tags,
      price,
      licenseType,
      uploadedFile
    });
    onComplete();
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step > 1 ? setStep(step - 1) : onComplete()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">✨ Share Your Dream Idea</h1>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold mb-2">What type of idea are you sharing?</h2>
              <p className="text-muted-foreground">Choose the category that best fits your creative work</p>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <Card
                    key={cat.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cat.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{cat.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {cat.examples.map(example => (
                            <Badge key={example} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!category}
              className="w-full bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Idea Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold mb-2">Tell us about your idea</h2>
              <p className="text-muted-foreground">Provide details that will help buyers understand your vision</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Idea Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your idea a catchy title..."
                className="w-full p-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your idea in detail. What makes it unique? What's the vision behind it?"
                rows={4}
                className="w-full p-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tags..."
                  className="flex-1 p-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Upload Preview File</label>
              <Card className="p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload audio, image, video, or document
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="audio/*,video/*,image/*,.pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                  {uploadedFile && (
                    <p className="text-sm text-primary mt-2">
                      ✓ {uploadedFile.name}
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* AI Enhancement */}
            <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
              <div className="flex items-center space-x-3">
                <Wand2 className="w-6 h-6 text-accent" />
                <div className="flex-1">
                  <h3 className="font-semibold">AI Enhancement Available</h3>
                  <p className="text-sm text-muted-foreground">Let AI help optimize your title and generate tags</p>
                </div>
                <Button size="sm" variant="outline">
                  Enhance
                </Button>
              </div>
            </Card>

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
                disabled={!title || !description}
                className="flex-1 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Pricing & License */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold mb-2">Set your price and license</h2>
              <p className="text-muted-foreground">Choose how you want to monetize your idea</p>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-medium mb-2">Price (USD) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min="1"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                DreaMark takes a 10% commission on all sales
              </p>
            </div>

            {/* License Type */}
            <div>
              <label className="block text-sm font-medium mb-3">License Type *</label>
              <div className="space-y-3">
                {licenseOptions.map((license) => {
                  const Icon = license.icon;
                  const isSelected = licenseType === license.id;
                  return (
                    <Card
                      key={license.id}
                      className={`p-4 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setLicenseType(license.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{license.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {license.price}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{license.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Preview */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <h3 className="font-semibold mb-2">Preview</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Category:</span> {categories.find(c => c.id === category)?.name}</p>
                <p><span className="text-muted-foreground">Title:</span> {title}</p>
                <p><span className="text-muted-foreground">Price:</span> ${price}</p>
                <p><span className="text-muted-foreground">License:</span> {licenseOptions.find(l => l.id === licenseType)?.name}</p>
                <p><span className="text-muted-foreground">Tags:</span> {tags.join(', ')}</p>
              </div>
            </Card>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:opacity-90"
              >
                Publish Idea
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}