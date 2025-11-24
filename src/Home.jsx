import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video, AlertCircle, Trash2, Recycle, Leaf } from 'lucide-react';

const Home = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const dummyGarbageInfo = {
    type: 'Plastic Bottle',
    category: 'Recyclable',
    description: 'PET plastic bottle commonly used for beverages. This is a recyclable item that should be properly disposed of in recycling bins.',
    disposalMethod: 'Rinse the bottle and remove the cap. Place in blue recycling bin.',
    decompositionTime: '450 years',
    environmentalImpact: 'High - Takes centuries to decompose and can harm marine life if not properly disposed.',
    recyclingTips: [
      'Remove labels if possible',
      'Crush the bottle to save space',
      'Keep cap separate or ensure it\'s also recyclable',
      'Never throw in regular trash'
    ],
    alternativeSuggestions: [
      'Use reusable water bottles',
      'Choose glass or metal containers',
      'Support brands using recycled materials'
    ]
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(fileURL);
      
      if (selectedFile.type.startsWith('image/')) {
        setFileType('image');
      } else if (selectedFile.type.startsWith('video/')) {
        setFileType('video');
      }
      setShowInfo(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setFileType(null);
    setShowInfo(false);
  };

  const handleAnalyze = () => {
    if (file) {
      setShowInfo(true);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Recyclable':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Non-Recyclable':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Compostable':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Recycle className="w-10 h-10 text-green-600" />
            Garbage Identifier
          </h1>
          <p className="text-gray-600">Upload an image or video to identify and learn about proper waste disposal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Media</h2>
            
            {!file ? (
              <label className="flex flex-col items-center justify-center w-full h-96 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="mb-2 text-lg font-semibold text-gray-700">
                    Click to upload
                  </p>
                  <p className="text-sm text-gray-500">Image or Video (MAX. 10MB)</p>
                  <div className="flex gap-3 mt-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ImageIcon className="w-4 h-4" />
                      JPG, PNG, WEBP
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Video className="w-4 h-4" />
                      MP4, WEBM
                    </div>
                  </div>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative">
                <div className="bg-gray-100 rounded-xl overflow-hidden h-96 flex items-center justify-center">
                  {fileType === 'image' ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <video 
                      src={preview} 
                      controls 
                      className="max-h-full max-w-full"
                    />
                  )}
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {file && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">File: <span className="font-semibold text-gray-800">{file.name}</span></p>
                  <p className="text-sm text-gray-600">Size: <span className="font-semibold text-gray-800">{(file.size / 1024 / 1024).toFixed(2)} MB</span></p>
                </div>
                <button
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                >
                  Analyze Garbage
                </button>
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Garbage Information</h2>
            
            {!showInfo ? (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <AlertCircle className="w-20 h-20 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Upload and analyze media to see information</p>
              </div>
            ) : (
              <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
                {/* Type and Category */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dummyGarbageInfo.type}</h3>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(dummyGarbageInfo.category)}`}>
                    {dummyGarbageInfo.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-blue-600" />
                    Description
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{dummyGarbageInfo.description}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Disposal Method</h4>
                  <p className="text-blue-800">{dummyGarbageInfo.disposalMethod}</p>
                </div>

              
                <div className="flex items-center gap-3 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">Decomposition Time</h4>
                    <p className="text-yellow-800">{dummyGarbageInfo.decompositionTime}</p>
                  </div>
                </div>

             
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Environmental Impact</h4>
                  <p className="text-gray-600 leading-relaxed">{dummyGarbageInfo.environmentalImpact}</p>
                </div>

          
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Recycle className="w-5 h-5 text-green-600" />
                    Recycling Tips
                  </h4>
                  <ul className="space-y-2">
                    {dummyGarbageInfo.recyclingTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Eco-Friendly Alternatives
                  </h4>
                  <ul className="space-y-2">
                    {dummyGarbageInfo.alternativeSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span className="text-green-800">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;