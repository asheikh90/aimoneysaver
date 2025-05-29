import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AuthContext } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import Button from '../../components/Button';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen = () => {
  const { colors, borderRadius } = useTheme();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { register } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    try {
      setIsLoading(true);
      await register(name, email, password);
    } catch (error) {
      Alert.alert('Registration Failed', error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.gray[500] }]}>
            Sign up to start saving money with AI
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.gray[700] }]}>Full Name</Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.card,
                borderColor: colors.gray[300],
                borderRadius: borderRadius.md
              }
            ]}>
              <User size={20} color={colors.gray[500]} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.gray[400]}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.gray[700] }]}>Email</Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.card,
                borderColor: colors.gray[300],
                borderRadius: borderRadius.md
              }
            ]}>
              <Mail size={20} color={colors.gray[500]} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your email"
                placeholderTextColor={colors.gray[400]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.gray[700] }]}>Password</Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.card,
                borderColor: colors.gray[300],
                borderRadius: borderRadius.md
              }
            ]}>
              <Lock size={20} color={colors.gray[500]} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Create a password"
                placeholderTextColor={colors.gray[400]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.gray[500]} />
                ) : (
                  <Eye size={20} color={colors.gray[500]} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={[styles.passwordHint, { color: colors.gray[500] }]}>
              Password must be at least 8 characters with a number and special character
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View style={[
              styles.checkbox, 
              { 
                borderColor: agreeToTerms ? colors.primary : colors.gray[400],
                backgroundColor: agreeToTerms ? colors.primary : 'transparent'
              }
            ]}>
              {agreeToTerms && <Check size={16} color={colors.white} />}
            </View>
            <Text style={[styles.termsText, { color: colors.gray[700] }]}>
              I agree to the{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            isLoading={isLoading}
            style={styles.registerButton}
          />
          
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.gray[300] }]} />
            <Text style={[styles.dividerText, { color: colors.gray[500], backgroundColor: colors.background }]}>
              Or continue with
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.gray[300] }]} />
          </View>
          
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={[
                styles.socialButton, 
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.gray[300],
                  borderRadius: borderRadius.md
                }
              ]}
            >
              <Text style={[styles.socialButtonText, { color: colors.text }]}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.socialButton, 
                { 
                  backgroundColor: colors.card,
                  borderColor: colors.gray[300],
                  borderRadius: borderRadius.md
                }
              ]}
            >
              <Text style={[styles.socialButtonText, { color: colors.text }]}>Apple</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.gray[500] }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
  },
  eyeIcon: {
    padding: 12,
  },
  passwordHint: {
    fontSize: 12,
    marginTop: 4,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
  },
  registerButton: {
    height: 50,
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  loginText: {
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
