import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Upload, Sparkles, FileText, Image, Music, Video, X } from 'lucide-react';

export function CreateIdeaScreen() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    licenseType: '',
    tags: [] as string[],
    files: [] as File[]
  });

  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    { value: 'music', label: '🎵 Music & Melodies' },
    { value: 'stories', label: '📖 Stories & Novels' },
    { value: 'comics', label: '🎨 Comics & Art' },
    { value: 'startups', label: '💼 Startup Ideas' },
    { value: 'scripts', label: '🎬 Scripts & Movies' },
    { value: 'design', label: '✨ Design & UI/UX' }
  ];

  const licenseTypes = [
    { value: 'full-sale', label: 'Full Rights Sale', desc: 'Complete ownership transfer' },
    { value: 'shared-royalty', label: 'Shared Royalty', desc: 'Split future earnings' },
    { value: 'license', label: 'Usage License', desc: 'Keep ownership, license usage' },
    { value: 'collaboration', label: 'Collaboration', desc: 'Work together on development' }
  ];

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit to your backend
    console.log('Submitting idea:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#1A2137] to-[#0B132B] pb-20">
      <div className="px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl text-white">Share Your Dream Idea</h1>
          </div>
          <p className="text-muted-foreground">Transform your creativity into opportunity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-6">
            <h2 className="text-lg text-white mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">Idea Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your idea a catchy title..."
                  className="bg-[#2A3547] border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-white">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-[#2A3547] border-white/20 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A3547] border-white/20">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="text-white">
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your idea in detail. What makes it special?"
                  className="bg-[#2A3547] border-white/20 text-white min-h-24"
                />
              </div>
            </div>
          </Card>

          {/* Tags */}
          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-6">
            <h2 className="text-lg text-white mb-4">Tags</h2>
            
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tags (e.g., Pop, Romance, AI...)"
                  className="bg-[#2A3547] border-white/20 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm" className="bg-[#8E2DE2] hover:bg-[#8E2DE2]/80">
                  Add
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} className="bg-[#8E2DE2] text-white border-0 flex items-center space-x-1">
                      <span>{tag}</span>
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* File Upload */}
          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-6">
            <h2 className="text-lg text-white mb-4">Upload Files</h2>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-white mb-2">Upload your files</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Audio, video, images, documents (Max 50MB per file)
                </p>
                <input
                  type="file"
                  multiple
                  accept="audio/*,video/*,image/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Choose Files
                  </Button>
                </Label>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#2A3547] rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="text-white text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-muted-foreground hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Pricing & License */}
          <Card className="bg-gradient-to-r from-[#1A2137] to-[#2A3547] border-white/10 p-6">
            <h2 className="text-lg text-white mb-4">Pricing & License</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="price" className="text-white">Price (฿)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Set your price in Thai Baht"
                  className="bg-[#2A3547] border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="license" className="text-white">License Type</Label>
                <Select value={formData.licenseType} onValueChange={(value) => setFormData(prev => ({ ...prev, licenseType: value }))}>
                  <SelectTrigger className="bg-[#2A3547] border-white/20 text-white">
                    <SelectValue placeholder="Choose license type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A3547] border-white/20">
                    {licenseTypes.map((license) => (
                      <SelectItem key={license.value} value={license.value} className="text-white">
                        <div>
                          <div>{license.label}</div>
                          <div className="text-xs text-muted-foreground">{license.desc}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* AI Enhancement */}
          <Card className="bg-gradient-to-r from-[#4A00E0]/20 to-[#8E2DE2]/20 border-[#8E2DE2]/30 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD369]" />
              <h2 className="text-lg text-white">AI Enhancement</h2>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Let our AI help optimize your idea presentation
            </p>
            
            <div className="flex space-x-3">
              <Button type="button" variant="outline" className="border-[#8E2DE2] text-[#8E2DE2] hover:bg-[#8E2DE2]/10">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Title Ideas
              </Button>
              <Button type="button" variant="outline" className="border-[#8E2DE2] text-[#8E2DE2] hover:bg-[#8E2DE2]/10">
                Enhance Description
              </Button>
            </div>
          </Card>

          {/* Submit Buttons */}
          <div className="flex space-x-3">
            <Button type="button" variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              Save Draft
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2] hover:from-[#4A00E0]/80 hover:to-[#8E2DE2]/80 text-white border-0"
            >
              Publish Idea
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}