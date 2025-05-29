import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Switch,
  Alert
} from 'react-native';
import { 
  User, 
  CreditCard, 
  Lock, 
  Bell, 
  Home,
  ChevronRight,
  LogOut,
  HelpCircle,
  Settings,
  Star
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AuthContext } from '../../contexts/AuthContext';
import Card from '../../components/Card';

const ProfileScreen = () => {
  const { colors, borderRadius } = useTheme();
  const { user, logout } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('personal');
  
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User size={20} color={colors.gray[500]} /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={20} color={colors.gray[500]} /> },
    { id: 'security', label: 'Security', icon: <Lock size={20} color={colors.gray[500]} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} color={colors.gray[500]} /> },
    { id: 'connected', label: 'Connected Accounts', icon: <Home size={20} color={colors.gray[500]} /> },
  ];
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => logout(),
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'User'}</Text>
              <Text style={[styles.email, { color: colors.gray[500] }]}>{user?.email || 'user@example.com'}</Text>
              <View style={[styles.premiumBadge, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.premiumText, { color: colors.primary }]}>Premium Member</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>$1,053</Text>
              <Text style={[styles.statLabel, { color: colors.gray[500] }]}>Total Savings</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.gray[200] }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>8</Text>
              <Text style={[styles.statLabel, { color: colors.gray[500] }]}>Bills Analyzed</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.gray[200] }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>3</Text>
              <Text style={[styles.statLabel, { color: colors.gray[500] }]}>Group Discounts</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabButton,
                  activeTab === tab.id && { 
                    backgroundColor: colors.primary,
                    borderColor: colors.primary
                  },
                  { 
                    borderColor: colors.gray[300],
                    borderRadius: borderRadius.full
                  }
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <View style={styles.tabIcon}>
                  {React.cloneElement(tab.icon, { 
                    color: activeTab === tab.id ? colors.white : colors.gray[500]
                  })}
                </View>
                <Text 
                  style={[
                    styles.tabLabel, 
                    { color: activeTab === tab.id ? colors.white : colors.gray[700] }
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {activeTab === 'personal' && (
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Personal Information</Text>
            
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.gray[500] }]}>Full Name</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{user?.name || 'Sarah Johnson'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.gray[500] }]}>Email Address</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>{user?.email || 'sarah@example.com'}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.gray[500] }]}>Phone Number</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>(555) 123-4567</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.gray[500] }]}>Address</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>123 Main St, San Francisco, CA 94105</Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.editButton, 
                { 
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md
                }
              ]}
            >
              <Text style={[styles.editButtonText, { color: colors.white }]}>Edit Profile</Text>
            </TouchableOpacity>
          </Card>
        )}
        
        {activeTab === 'payment' && (
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment Methods</Text>
            
            {[
              { 
                type: 'Visa', 
                last4: '4242', 
                expiry: '09/25',
                isDefault: true
              },
              { 
                type: 'Mastercard', 
                last4: '5678', 
                expiry: '12/24',
                isDefault: false
              }
            ].map((card, index) => (
              <View 
                key={index} 
                style={[
                  styles.paymentCard,
                  { 
                    borderColor: colors.gray[200],
                    borderRadius: borderRadius.md
                  }
                ]}
              >
                <View style={styles.paymentCardContent}>
                  <View style={[styles.paymentCardIcon, { backgroundColor: colors.primary + '10' }]}>
                    <CreditCard size={24} color={colors.primary} />
                  </View>
                  <View style={styles.paymentCardInfo}>
                    <Text style={[styles.paymentCardTitle, { color: colors.text }]}>
                      {card.type} •••• {card.last4}
                    </Text>
                    <Text style={[styles.paymentCardSubtitle, { color: colors.gray[500] }]}>
                      Expires {card.expiry}
                    </Text>
                  </View>
                  {card.isDefault && (
                    <View style={[styles.defaultBadge, { backgroundColor: colors.success + '20' }]}>
                      <Text style={[styles.defaultText, { color: colors.success }]}>Default</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
            
            <TouchableOpacity 
              style={[
                styles.addButton, 
                { 
                  borderColor: colors.primary,
                  borderRadius: borderRadius.md
                }
              ]}
            >
              <Text style={[styles.addButtonText, { color: colors.primary }]}>Add Payment Method</Text>
            </TouchableOpacity>
          </Card>
        )}
        
        {activeTab === 'security' && (
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Security Settings</Text>
            
            <View style={styles.securitySection}>
              <Text style={[styles.securitySectionTitle, { color: colors.text }]}>Change Password</Text>
              
              <TouchableOpacity 
                style={[
                  styles.securityButton, 
                  { 
                    backgroundColor: colors.primary,
                    borderRadius: borderRadius.md
                  }
                ]}
              >
                <Text style={[styles.securityButtonText, { color: colors.white }]}>Change Password</Text>
              </TouchableOpacity>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.gray[200] }]} />
            
            <View style={styles.securitySection}>
              <Text style={[styles.securitySectionTitle, { color: colors.text }]}>Two-Factor Authentication</Text>
              <Text style={[styles.securitySectionDescription, { color: colors.gray[500] }]}>
                Add an extra layer of security to your account
              </Text>
              
              <View style={styles.toggleContainer}>
                <Text style={[styles.toggleLabel, { color: colors.text }]}>Enable 2FA</Text>
                <Switch
                  trackColor={{ false: colors.gray[300], true: colors.primary + '80' }}
                  thumbColor={colors.white}
                  ios_backgroundColor={colors.gray[300]}
                  value={false}
                />
              </View>
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.gray[200] }]} />
            
            <View style={styles.securitySection}>
              <Text style={[styles.securitySectionTitle, { color: colors.text }]}>Login Sessions</Text>
              
              <View 
                style={[
                  styles.sessionItem, 
                  { 
                    backgroundColor: colors.gray[50],
                    borderRadius: borderRadius.md
                  }
                ]}
              >
                <View style={styles.sessionInfo}>
                  <Text style={[styles.sessionDevice, { color: colors.text }]}>iPhone 13</Text>
                  <Text style={[styles.sessionDetails, { color: colors.gray[500] }]}>
                    San Francisco, CA • 192.168.1.2 • 1 day ago
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
                </TouchableOpacity>
              </View>
              
              <View 
                style={[
                  styles.sessionItem, 
                  { 
                    backgroundColor: colors.gray[50],
                    borderRadius: borderRadius.md
                  }
                ]}
              >
                <View style={styles.sessionInfo}>
                  <View style={styles.sessionCurrentContainer}>
                    <Text style={[styles.sessionDevice, { color: colors.text }]}>MacBook Pro</Text>
                    <View style={[styles.currentBadge, { backgroundColor: colors.success + '20' }]}>
                      <Text style={[styles.currentText, { color: colors.success }]}>Current</Text>
                    </View>
                  </View>
                  <Text style={[styles.sessionDetails, { color: colors.gray[500] }]}>
                    San Francisco, CA • 192.168.1.1 • 2 hours ago
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.logoutAllContainer}>
                <Text style={[styles.logoutAllText, { color: colors.error }]}>Logout of All Devices</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}
        
        {activeTab === 'notifications' && (
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notification Preferences</Text>
            
            <View style={styles.notificationSection}>
              <Text style={[styles.notificationSectionTitle, { color: colors.text }]}>Email Notifications</Text>
              
              {[
                { 
                  title: 'Savings Opportunities', 
                  description: 'Get notified when we find new ways to save',
                  enabled: true
                },
                { 
                  title: 'Bill Reminders', 
                  description: 'Receive reminders before bills are due',
                  enabled: true
                },
                { 
                  title: 'Group Discount Updates', 
                  description: 'Updates on group discounts you\'ve joined',
                  enabled: true
                },
                { 
                  title: 'Monthly Savings Report', 
                  description: 'Monthly summary of your savings',
                  enabled: false
                }
              ].map((notification, index) => (
                <View key={index} style={styles.notificationItem}>
                  <View style={styles.notificationInfo}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      {notification.title}
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.gray[500] }]}>
                      {notification.description}
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: colors.gray[300], true: colors.primary + '80' }}
                    thumbColor={colors.white}
                    ios_backgroundColor={colors.gray[300]}
                    value={notification.enabled}
                  />
                </View>
              ))}
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.gray[200] }]} />
            
            <View style={styles.notificationSection}>
              <Text style={[styles.notificationSectionTitle, { color: colors.text }]}>Push Notifications</Text>
              
              {[
                { 
                  title: 'Savings Alerts', 
                  description: 'Immediate alerts for significant savings opportunities',
                  enabled: true
                },
                { 
                  title: 'Bill Analysis Complete', 
                  description: 'When your bill analysis is ready to view',
                  enabled: true
                },
                { 
                  title: 'Group Discount Milestones', 
                  description: 'Updates when group discounts reach key milestones',
                  enabled: false
                }
              ].map((notification, index) => (
                <View key={index} style={styles.notificationItem}>
                  <View style={styles.notificationInfo}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      {notification.title}
                    </Text>
                    <Text style={[styles.notificationDescription, { color: colors.gray[500] }]}>
                      {notification.description}
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: colors.gray[300], true: colors.primary + '80' }}
                    thumbColor={colors.white}
                    ios_backgroundColor={colors.gray[300]}
                    value={notification.enabled}
                  />
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.saveButton, 
                { 
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md
                }
              ]}
            >
              <Text style={[styles.saveButtonText, { color: colors.white }]}>Save Preferences</Text>
            </TouchableOpacity>
          </Card>
        )}
        
        {activeTab === 'connected' && (
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Connected Accounts</Text>
            
            <View style={styles.connectedSection}>
              <Text style={[styles.connectedSectionTitle, { color: colors.text }]}>Banking & Financial</Text>
              
              {[
                { 
                  name: 'Chase Bank', 
                  type: 'Banking',
                  status: 'Connected',
                  lastSync: '2 hours ago',
                  icon: '🏦'
                },
                { 
                  name: 'Capital One', 
                  type: 'Credit Card',
                  status: 'Connected',
                  lastSync: '1 day ago',
                  icon: '💳'
                },
                { 
                  name: 'Venmo', 
                  type: 'Payment',
                  status: 'Not connected',
                  lastSync: null,
                  icon: '💸'
                }
              ].map((account, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.connectedItem, 
                    { 
                      borderColor: colors.gray[200],
                      borderRadius: borderRadius.md
                    }
                  ]}
                >
                  <View style={styles.connectedItemContent}>
                    <View style={[styles.connectedIcon, { backgroundColor: colors.gray[100] }]}>
                      <Text style={styles.connectedIconText}>{account.icon}</Text>
                    </View>
                    <View style={styles.connectedInfo}>
                      <Text style={[styles.connectedName, { color: colors.text }]}>{account.name}</Text>
                      <Text style={[styles.connectedType, { color: colors.gray[500] }]}>{account.type}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.connectedStatus}>
                    {account.status === 'Connected' ? (
                      <>
                        <Text style={[styles.connectedStatusText, { color: colors.success }]}>Connected</Text>
                        <Text style={[styles.connectedLastSync, { color: colors.gray[500] }]}>
                          Last synced {account.lastSync}
                        </Text>
                        <TouchableOpacity>
                          <Text style={[styles.disconnectText, { color: colors.primary }]}>Disconnect</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity 
                        style={[
                          styles.connectButton, 
                          { 
                            backgroundColor: colors.primary,
                            borderRadius: borderRadius.md
                          }
                        ]}
                      >
                        <Text style={[styles.connectButtonText, { color: colors.white }]}>Connect</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
            
            <View style={[styles.divider, { backgroundColor: colors.gray[200] }]} />
            
            <View style={styles.connectedSection}>
              <Text style={[styles.connectedSectionTitle, { color: colors.text }]}>Utility Providers</Text>
              
              {[
                { 
                  name: 'EcoEnergy Solutions', 
                  type: 'Electricity',
                  status: 'Connected',
                  lastSync: '3 days ago',
                  icon: '⚡'
                },
                { 
                  name: 'FastNet Communications', 
                  type: 'Internet',
                  status: 'Connected',
                  lastSync: '1 week ago',
                  icon: '🌐'
                },
                { 
                  name: 'City Water Services', 
                  type: 'Water',
                  status: 'Not connected',
                  lastSync: null,
                  icon: '💧'
                }
              ].map((account, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.connectedItem, 
                    { 
                      borderColor: colors.gray[200],
                      borderRadius: borderRadius.md
                    }
                  ]}
                >
                  <View style={styles.connectedItemContent}>
                    <View style={[styles.connectedIcon, { backgroundColor: colors.gray[100] }]}>
                      <Text style={styles.connectedIconText}>{account.icon}</Text>
                    </View>
                    <View style={styles.connectedInfo}>
                      <Text style={[styles.connectedName, { color: colors.text }]}>{account.name}</Text>
                      <Text style={[styles.connectedType, { color: colors.gray[500] }]}>{account.type}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.connectedStatus}>
                    {account.status === 'Connected' ? (
                      <>
                        <Text style={[styles.connectedStatusText, { color: colors.success }]}>Connected</Text>
                        <Text style={[styles.connectedLastSync, { color: colors.gray[500] }]}>
                          Last synced {account.lastSync}
                        </Text>
                        <TouchableOpacity>
                          <Text style={[styles.disconnectText, { color: colors.primary }]}>Disconnect</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity 
                        style={[
                          styles.connectButton, 
                          { 
                            backgroundColor: colors.primary,
                            borderRadius: borderRadius.md
                          }
                        ]}
                      >
                        <Text style={[styles.connectButtonText, { color: colors.white }]}>Connect</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[
                styles.addAccountButton, 
                { 
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md
                }
              ]}
            >
              <Text style={[styles.addAccountButtonText, { color: colors.white }]}>Connect New Account</Text>
            </TouchableOpacity>
          </Card>
        )}
        
        <Card>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: colors.primary + '10' }]}>
                <Star size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Premium Membership</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: colors.gray[100] }]}>
                <Settings size={20} color={colors.gray[700]} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>App Settings</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: colors.gray[100] }]}>
                <HelpCircle size={20} color={colors.gray[700]} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.text }]}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={colors.gray[400]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuItemLeft}>
              <View style={[styles.menuItemIcon, { backgroundColor: colors.error + '10' }]}>
                <LogOut size={20} color={colors.error} />
              </View>
              <Text style={[styles.menuItemText, { color: colors.error }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </Card>
        
        <View style={styles.footer}>
          <Text style={[styles.version, { color: colors.gray[500] }]}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  tabsContainer: {
    marginVertical: 16,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  paymentCard: {
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  paymentCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentCardInfo: {
    flex: 1,
  },
  paymentCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  paymentCardSubtitle: {
    fontSize: 14,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '500',
  },
  addButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  securitySection: {
    marginBottom: 16,
  },
  securitySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  securitySectionDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  securityButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  securityButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  sessionItem: {
    padding: 12,
    marginBottom: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionCurrentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDevice: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  sessionDetails: {
    fontSize: 12,
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  currentText: {
    fontSize: 12,
    fontWeight: '500',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutAllContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  logoutAllText: {
    fontSize: 16,
    fontWeight: '500',
  },
  notificationSection: {
    marginBottom: 16,
  },
  notificationSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 16,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
  },
  saveButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  connectedSection: {
    marginBottom: 16,
  },
  connectedSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  connectedItem: {
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  connectedItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  connectedIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  connectedIconText: {
    fontSize: 20,
  },
  connectedInfo: {
    flex: 1,
  },
  connectedName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  connectedType: {
    fontSize: 14,
  },
  connectedStatus: {
    alignItems: 'flex-end',
  },
  connectedStatusText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  connectedLastSync: {
    fontSize: 12,
    marginBottom: 4,
  },
  disconnectText: {
    fontSize: 14,
    fontWeight: '500',
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  connectButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addAccountButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addAccountButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    padding: 16,
  },
  version: {
    fontSize: 14,
  },
});

export default ProfileScreen;
