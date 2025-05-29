import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Camera as CameraIcon, Image as ImageIcon, X, Check } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import Button from './Button';

interface BillScannerProps {
  onScanComplete: (imageUri: string, analysis: any) => void;
}

const BillScanner: React.FC<BillScannerProps> = ({ onScanComplete }) => {
  const { colors, borderRadius } = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const cameraRef = useRef<Camera>(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setCameraVisible(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setCameraVisible(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const analyzeBill = async () => {
    if (!imageUri) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate OCR and analysis process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
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
              ]
            };
            
            setIsAnalyzing(false);
            onScanComplete(imageUri, mockAnalysis);
          }, 500);
        }
        return newProgress;
      });
    }, 300);
  };

  const resetScanner = () => {
    setImageUri(null);
    setIsAnalyzing(false);
    setProgress(0);
  };

  if (cameraVisible && hasPermission) {
    return (
      <View style={styles.container}>
        <Camera 
          ref={cameraRef} 
          style={styles.camera}
          type={Camera.Constants.Type.back}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={[styles.closeButton, { backgroundColor: colors.gray[800] }]}
                onPress={() => setCameraVisible(false)}
              >
                <X size={24} color={colors.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.captureButton, { backgroundColor: colors.white }]}
                onPress={takePicture}
              >
                <View style={[styles.captureButtonInner, { borderColor: colors.primary }]} />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <View style={[styles.uploadContainer, { borderColor: colors.gray[300] }]}>
          <Text style={[styles.uploadTitle, { color: colors.text }]}>
            Scan a bill to analyze
          </Text>
          <Text style={[styles.uploadSubtitle, { color: colors.gray[500] }]}>
            Take a photo or upload an image of your bill
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Take Photo"
              leftIcon={<CameraIcon size={20} color={colors.white} />}
              onPress={requestCameraPermission}
              style={styles.button}
            />
            <Button
              title="Upload Image"
              variant="outline"
              leftIcon={<ImageIcon size={20} color={colors.primary} />}
              onPress={pickImage}
              style={styles.button}
            />
          </View>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: imageUri }}
            style={[styles.previewImage, { borderRadius: borderRadius.md }]}
          />
          
          {isAnalyzing ? (
            <View style={styles.analysisContainer}>
              <Text style={[styles.analysisText, { color: colors.text }]}>
                Analyzing bill...
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressLabels}>
                  <Text style={{ color: colors.gray[500] }}>Scanning</Text>
                  <Text style={{ color: colors.gray[500] }}>{progress}%</Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: colors.gray[200] }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${progress}%`,
                        backgroundColor: colors.primary
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.previewControls}>
              <Button
                title="Retake"
                variant="outline"
                leftIcon={<X size={20} color={colors.primary} />}
                onPress={resetScanner}
                style={[styles.previewButton, { marginRight: 8 }]}
              />
              <Button
                title="Analyze Bill"
                leftIcon={<Check size={20} color={colors.white} />}
                onPress={analyzeBill}
                style={styles.previewButton}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    margin: 16,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 12,
  },
  previewContainer: {
    flex: 1,
    margin: 16,
  },
  previewImage: {
    width: '100%',
    height: '80%',
    marginBottom: 16,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    flex: 1,
  },
  analysisContainer: {
    marginTop: 16,
  },
  analysisText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default BillScanner;
