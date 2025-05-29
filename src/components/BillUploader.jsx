import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import Tesseract from 'tesseract.js';

const BillUploader = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });
  
  const analyzeBill = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    try {
      // Simulate OCR processing with Tesseract
      const result = await Tesseract.recognize(
        preview,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(parseInt(m.progress * 100));
            }
          }
        }
      );
      
      // Mock analysis result
      setTimeout(() => {
        const mockAnalysis = {
          provider: 'Energy Company XYZ',
          billDate: '2023-09-15',
          dueDate: '2023-10-05',
          totalAmount: 142.75,
          lineItems: [
            { description: 'Electricity usage', amount: 98.50 },
            { description: 'Service fee', amount: 25.00 },
            { description: 'Environmental charge', amount: 12.25 },
            { description: 'Tax', amount: 7.00 }
          ],
          potentialSavings: [
            { description: 'Switch to time-of-use plan', amount: 22.50, confidence: 0.85 },
            { description: 'Energy efficiency rebate', amount: 15.00, confidence: 0.75 },
            { description: 'Group discount opportunity', amount: 18.75, confidence: 0.92 }
          ],
          rawText: result.data.text
        };
        
        setIsAnalyzing(false);
        onAnalysisComplete(mockAnalysis);
      }, 2000);
      
    } catch (error) {
      console.error('Error analyzing bill:', error);
      setIsAnalyzing(false);
    }
  };
  
  const removeFile = () => {
    setFile(null);
    setPreview('');
  };
  
  return (
    <div className="w-full">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a bill image or PDF'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supports JPG, PNG, and PDF files
          </p>
          <button
            type="button"
            className="mt-4 btn-primary"
          >
            Browse files
          </button>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FiFile className="h-6 w-6 text-primary" />
              <span className="ml-2 text-sm font-medium truncate max-w-xs">
                {file.name}
              </span>
            </div>
            <button
              onClick={removeFile}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <FiX className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {preview && (
            <div className="mb-4">
              <img
                src={preview}
                alt="Bill preview"
                className="max-h-64 mx-auto rounded-lg"
              />
            </div>
          )}
          
          {isAnalyzing ? (
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Analyzing bill...</span>
                <span className="text-sm font-medium text-gray-700">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <button
              onClick={analyzeBill}
              className="w-full btn-primary"
            >
              Analyze Bill
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BillUploader;
