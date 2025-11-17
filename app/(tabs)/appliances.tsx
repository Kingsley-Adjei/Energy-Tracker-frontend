import { ApplianceCard } from '@/components/ui/ApplianceCard';
import { borderRadius, colors, spacing, typography } from '@/constants/design';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// NEW COMPONENT NEEDED: Camera component for scanning
// import { Camera } from 'expo-camera'; // Install: expo install expo-camera
// You'll need to request camera permissions

export default function AppliancesScreen() {
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  // Form state for manual add
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: '',
    power: '',
    modelNumber: '',
  });

  // Dummy appliances data
  const appliances = [
    {
      id: '1',
      name: 'Samsung Fridge (Old)',
      type: 'Refrigerator',
      power: '180W',
      usage: '4.3 kWh/day',
      status: 'active' as const,
    },
    {
      id: '2',
      name: 'LG Fridge (Old)',
      type: 'Refrigerator',
      power: '175W',
      usage: '4.2 kWh/day',
      status: 'active' as const,
    },
    {
      id: '3',
      name: 'Whirlpool Fridge (New)',
      type: 'Refrigerator',
      power: '120W',
      usage: '2.9 kWh/day',
      status: 'active' as const,
    },
    {
      id: '4',
      name: 'Split AC Unit',
      type: 'Air Conditioner',
      power: '1500W',
      usage: '12.0 kWh/day',
      status: 'warning' as const,
    },
    {
      id: '5',
      name: 'Smart TV',
      type: 'Television',
      power: '85W',
      usage: '0.7 kWh/day',
      status: 'idle' as const,
    },
    {
      id: '6',
      name: 'Microwave Oven',
      type: 'Kitchen Appliance',
      power: '1200W',
      usage: '0.4 kWh/day',
      status: 'idle' as const,
    },
  ];

  const totalPower = appliances.reduce((sum, app) => {
    const power = parseFloat(app.power.replace('W', ''));
    return sum + power;
  }, 0);

  const activeCount = appliances.filter(a => a.status === 'active').length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'Refrigerator':
        return <Ionicons name="cube" size={24} color="#3b82f6" />
      case 'Air Conditioner':
        return <Ionicons name="snow" size={24} color="#3b82f6" />;
      case 'Television':
        return <Ionicons name="tv" size={24} color="#3b82f6" />;
      default:
        return <Ionicons name="pizza" size={24} color="#3b82f6" />;
    }
  };

  // Handle camera scanner
  const handleScanAppliance = async () => {
    // TODO: Implement camera permissions
    // const { status } = await Camera.requestCameraPermissionsAsync();
    // setHasPermission(status === 'granted');
    // if (status === 'granted') {
    setShowScanner(true);
    // } else {
    //   Alert.alert('Permission Required', 'Camera access is needed to scan appliances');
    // }
  };

  // Handle manual add
  const handleManualAdd = () => {
    setShowManualAdd(true);
  };

  const handleSaveAppliance = () => {
    // TODO: Save appliance logic
    console.log('Saving appliance:', formData);
    setShowManualAdd(false);
    // Reset form
    setFormData({
      name: '',
      brand: '',
      type: '',
      power: '',
      modelNumber: '',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Appliances</Text>
            <Text style={styles.subtitle}>{activeCount} active • {appliances.length} total</Text>
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Power</Text>
              <Text style={styles.summaryValue}>{(totalPower / 1000).toFixed(1)} kW</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Est. Daily Cost</Text>
              <Text style={styles.summaryValue}>$4.80</Text>
            </View>
          </View>
        </View>

        {/* Add Buttons */}
        <View style={styles.addSection}>
          <TouchableOpacity 
            style={styles.addButton} 
            activeOpacity={0.7}
            onPress={handleManualAdd}
          >
            <View style={styles.addIconContainer}>
              <Ionicons name="add" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.addButtonText}>Add Manually</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.addButton} 
            activeOpacity={0.7}
            onPress={handleScanAppliance}
          >
            <View style={styles.addIconContainer}>
              <Ionicons name="camera" size={24} color="#3b82f6" />
            </View>
            <Text style={styles.addButtonText}>Scan Appliance</Text>
          </TouchableOpacity>
        </View>

        {/* Appliances List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Appliances</Text>
          
          {appliances.map((appliance) => (
            <ApplianceCard
              key={appliance.id}
              name={appliance.name}
              type={appliance.type}
              power={appliance.power}
              usage={appliance.usage}
              status={appliance.status}
              icon={getIcon(appliance.type)}
              onPress={() => {}}
            />
          ))}
        </View>

        {/* Tips Card */}
        <View style={styles.section}>
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Energy Tip</Text>
            <Text style={styles.tipsText}>
              Your old fridges are consuming 45% more energy than the new one. Consider replacing them to save up to $120/year.
            </Text>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Manual Add Modal */}
      <Modal
        visible={showManualAdd}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowManualAdd(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Appliance Manually</Text>
              <TouchableOpacity onPress={() => setShowManualAdd(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Appliance Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Kitchen Refrigerator"
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Brand</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Samsung, LG, Whirlpool"
                  value={formData.brand}
                  onChangeText={(text) => setFormData({...formData, brand: text})}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Appliance Type *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Refrigerator, Air Conditioner"
                  value={formData.type}
                  onChangeText={(text) => setFormData({...formData, type: text})}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Power Rating (Watts) *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 150"
                  value={formData.power}
                  onChangeText={(text) => setFormData({...formData, power: text})}
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Model Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., RT28K3922S8"
                  value={formData.modelNumber}
                  onChangeText={(text) => setFormData({...formData, modelNumber: text})}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveAppliance}
              >
                <Text style={styles.saveButtonText}>Save Appliance</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowManualAdd(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Scanner Modal */}
      <Modal
        visible={showScanner}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowScanner(false)}
      >
        <View style={styles.scannerContainer}>
          {/* TODO: Replace with actual Camera component */}
          {/* <Camera style={styles.camera} type={Camera.Constants.Type.back}> */}
          <View style={styles.camera}>
            {/* Scanner Frame Overlay */}
            <View style={styles.scannerOverlay}>
              <View style={styles.scannerTop} />
              <View style={styles.scannerMiddle}>
                <View style={styles.scannerSide} />
                <View style={styles.scannerFrame}>
                  <View style={styles.scannerCornerTopLeft} />
                  <View style={styles.scannerCornerTopRight} />
                  <View style={styles.scannerCornerBottomLeft} />
                  <View style={styles.scannerCornerBottomRight} />
                  
                  {/* Scanning Line Animation */}
                  <View style={styles.scanLine} />
                </View>
                <View style={styles.scannerSide} />
              </View>
              <View style={styles.scannerBottom} />
            </View>

            {/* Instructions */}
            <View style={styles.scannerInstructions}>
              <Text style={styles.scannerTitle}>Scan Appliance Label</Text>
              <Text style={styles.scannerSubtitle}>
                Position the label within the frame
              </Text>
            </View>

            {/* Controls */}
            <View style={styles.scannerControls}>
              <TouchableOpacity 
                style={styles.captureButton}
                onPress={() => {
                  // TODO: Capture photo logic
                  Alert.alert('Photo Captured', 'Processing appliance information...');
                  setShowScanner(false);
                }}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.closeScanner}
              onPress={() => setShowScanner(false)}
            >
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* </Camera> */}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff', // Light blue background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs / 2,
    fontWeight: '600',
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: spacing.lg,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  summaryValue: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
  },
  addSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  addIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  addButtonText: {
    ...typography.captionBold,
    color: '#3b82f6',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#dbeafe',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  tipsTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  tipsText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#f0f9ff',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    ...typography.bodyMedium,
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  cancelButtonText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  // Scanner styles
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Placeholder for camera
  },
  scannerOverlay: {
    flex: 1,
  },
  scannerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scannerMiddle: {
    flexDirection: 'row',
    height: 300,
  },
  scannerSide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scannerFrame: {
    width: 300,
    height: 300,
    position: 'relative',
  },
  scannerCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3b82f6',
    borderTopLeftRadius: 8,
  },
  scannerCornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3b82f6',
    borderTopRightRadius: 8,
  },
  scannerCornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#3b82f6',
    borderBottomLeftRadius: 8,
  },
  scannerCornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#3b82f6',
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#3b82f6',
    top: '50%',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  scannerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scannerInstructions: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scannerTitle: {
    ...typography.h3,
    color: '#fff',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  scannerSubtitle: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scannerControls: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#3b82f6',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
  },
  closeScanner: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});