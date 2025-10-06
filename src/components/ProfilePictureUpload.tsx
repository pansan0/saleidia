import React, { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Camera,
  Upload,
  X,
  Check,
  RotateCcw,
  Crop,
  ArrowLeft
} from 'lucide-react';

interface ProfilePictureUploadProps {
  currentAvatar: string;
  userName: string;
  onSave: (newAvatarUrl: string) => void;
  onBack: () => void;
}

export function ProfilePictureUpload({ 
  currentAvatar, 
  userName, 
  onSave, 
  onBack 
}: ProfilePictureUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would upload to your storage service
      // For now, we'll just use the selected image as the new avatar
      onSave(selectedImage);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('การอัปโหลดล้มเหลว กรุณาลองอีกครั้ง');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1556557286-bf3be5fd9d06?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold">เปลี่ยนรูปโปรไฟล์</h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={!selectedImage || isUploading}
            className="bg-gradient-to-r from-[#4A00E0] to-[#8E2DE2]"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                บันทึก
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Preview */}
        <Card className="p-6">
          <div className="text-center">
            <h2 className="font-semibold mb-4">รูปโปรไฟล์ปัจจุบัน</h2>
            <div className="relative inline-block">
              <ImageWithFallback
                src={selectedImage || currentAvatar}
                alt={userName}
                className="w-32 h-32 rounded-full mx-auto border-4 border-primary"
              />
              {selectedImage && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              ขนาดที่แนะนำ: 400x400 พิกเซล
            </p>
          </div>
        </Card>

        {/* Upload Options */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">เลือกรูปภาพใหม่</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="h-20 flex-col space-y-2"
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">อัปโหลดรูป</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="h-20 flex-col space-y-2"
            >
              <Camera className="w-6 h-6" />
              <span className="text-sm">ถ่ายรูป</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            capture="user"
          />

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• ไฟล์ที่รองรับ: JPG, PNG, GIF</p>
            <p>• ขนาดไฟล์สูงสุด: 5MB</p>
            <p>• ควรเป็นรูปสี่เหลี่ยมจัตุรัสสำหรับผลลัพธ์ที่ดีที่สุด</p>
          </div>
        </Card>

        {/* Preset Avatars */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">หรือเลือกจากรูปตัวอย่าง</h3>
          
          <div className="grid grid-cols-4 gap-3">
            {presetAvatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(avatar)}
                className={`relative rounded-full overflow-hidden border-2 transition-colors ${
                  selectedImage === avatar 
                    ? 'border-primary' 
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <ImageWithFallback
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
                {selectedImage === avatar && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-4 bg-muted/50">
          <h3 className="font-semibold mb-2 flex items-center">
            <Camera className="w-4 h-4 mr-2" />
            เคล็ดลับการถ่ายรูปโปรไฟล์ที่ดี
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• ใช้แสงธรรมชาติหรือแสงสว่างที่เพียงพอ</li>
            <li>• หันหน้าตรงไปที่กล้องและยิ้ม</li>
            <li>• เลือกพื้นหลังที่เรียบง่าย</li>
            <li>• ใบหน้าควรอยู่ตรงกลางกรอบ</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}