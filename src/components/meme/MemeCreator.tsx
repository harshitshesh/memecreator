import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, PaintBucket, Type, Sparkles } from 'lucide-react';
import { MemeTemplate } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useMemes } from '../../contexts/MemeContext';

interface MemeCreatorProps {
  onComplete?: (memeId: string) => void;
}

const MemeCreator: React.FC<MemeCreatorProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const { templates, createMeme } = useMemes();
  
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(36);
  const [fontColor, setFontColor] = useState('#FFFFFF');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [step, setStep] = useState<'template' | 'customize' | 'publish'>('template');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Handle template selection
  const selectTemplate = (template: MemeTemplate) => {
    setSelectedTemplate(template);
    setUploadedImage(null);
    setStep('customize');
  };
  
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
      setSelectedTemplate(null);
      setStep('customize');
    };
    reader.readAsDataURL(file);
  };
  
  // Handle tag input
  const handleTagAdd = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 5) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Render the meme canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Set canvas dimensions to match image dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Configure text style
      ctx.font = `bold ${fontSize}px Impact`;
      ctx.fillStyle = fontColor;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = fontSize / 15;
      ctx.textAlign = 'center';
      
      // Draw top text
      if (topText) {
        const topY = canvas.height * 0.1 + fontSize / 2;
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, topY);
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, topY);
      }
      
      // Draw bottom text
      if (bottomText) {
        const bottomY = canvas.height * 0.9;
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, bottomY);
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, bottomY);
      }
    };
    
    img.src = uploadedImage || (selectedTemplate?.url || '');
  }, [selectedTemplate, uploadedImage, topText, bottomText, fontSize, fontColor]);
  
  // Generate and suggest some AI captions (simulated)
  const generateAICaptions = () => {
    // In a real app, this would call an AI service
    const suggestions = [
      { top: "WHEN YOU FINALLY", bottom: "DEBUG THAT ONE LINE" },
      { top: "NOBODY:", bottom: "ABSOLUTELY NOBODY:" },
      { top: "ME EXPLAINING MEMES", bottom: "MY MOM TRYING TO UNDERSTAND" },
      { top: "THAT MOMENT WHEN", bottom: "YOU REALIZE IT'S MONDAY" },
      { top: "EXPECTATION", bottom: "REALITY" }
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setTopText(randomSuggestion.top);
    setBottomText(randomSuggestion.bottom);
  };
  
  // Generate AI tags (simulated)
  const generateAITags = () => {
    // In a real app, this would analyze the image and texts
    const tagSuggestions = ['funny', 'relatable', 'tech', 'monday', 'programming'];
    const randomTags = tagSuggestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setTags(randomTags);
  };
  
  // Publish the meme
  const publishMeme = async () => {
    if (!canvasRef.current) return;
    
    const imageUrl = uploadedImage || (selectedTemplate?.url || '');
    
    // In a real app, we would upload the canvas content
    const newMeme = createMeme({
      templateId: selectedTemplate?.id || '',
      imageUrl,
      topText,
      bottomText,
      creatorId: user?.id || '',
      creatorUsername: user?.username || '',
      tags
    });
    
    if (onComplete) {
      onComplete(newMeme.id);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {step === 'template' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Choose a template or upload your own</h2>
          
          {/* Upload option */}
          <div className="mb-6">
            <label className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Click to upload your own image</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or GIF (max. 5MB)</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          
          {/* Template grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map(template => (
              <div
                key={template.id}
                className="aspect-w-1 aspect-h-1 cursor-pointer hover:opacity-90 transition-opacity border border-gray-200 rounded-lg overflow-hidden"
                onClick={() => selectTemplate(template)}
              >
                <img
                  src={template.url}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {step === 'customize' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Customize your meme</h2>
            <button
              onClick={() => setStep('template')}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Meme preview */}
            <div className="md:col-span-2 bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative w-full">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto mx-auto"
                />
              </div>
            </div>
            
            {/* Controls */}
            <div className="space-y-6">
              {/* Text inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Top Text
                  </label>
                  <input
                    type="text"
                    value={topText}
                    onChange={e => setTopText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="TOP TEXT"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bottom Text
                  </label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={e => setBottomText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="BOTTOM TEXT"
                  />
                </div>
                
                <button
                  onClick={generateAICaptions}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Captions
                </button>
              </div>
              
              {/* Styling options */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <PaintBucket className="h-4 w-4 mr-1" />
                  Style Options
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Font Size
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="60"
                      value={fontSize}
                      onChange={e => setFontSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Font Color
                    </label>
                    <input
                      type="color"
                      value={fontColor}
                      onChange={e => setFontColor(e.target.value)}
                      className="w-full h-9 p-1 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setStep('publish')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Continue to Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {step === 'publish' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Publish your meme</h2>
            <button
              onClick={() => setStep('customize')}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Meme preview */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative w-full">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto mx-auto"
                />
              </div>
            </div>
            
            {/* Publishing options */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Type className="h-4 w-4 mr-1" />
                  Add Tags (max 5)
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 text-purple-500 hover:text-purple-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    onKeyPress={e => e.key === 'Enter' && handleTagAdd()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Add a tag"
                    maxLength={20}
                  />
                  <button
                    onClick={handleTagAdd}
                    className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                
                <button
                  onClick={generateAITags}
                  className="mt-2 w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Tags
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={publishMeme}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Publish Meme
                </button>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  By publishing, you confirm that your meme follows our community guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeCreator;