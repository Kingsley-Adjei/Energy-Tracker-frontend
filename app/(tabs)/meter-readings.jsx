import { borderRadius, colors, spacing, typography } from "@/constants/design";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: Install and import expo-image-picker
// import * as ImagePicker from 'expo-image-picker';

export default function MeterReadingScreen() {
  const [inputMethod, setInputMethod] = useState("upload"); // default method
  const [screenshot, setScreenshot] = useState(null); // no screenshot initially
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    currentReading: "",
    previousReading: "",
    meterNumber: "",
    billingMonth: "",
  });

  // Handle screenshot upload
  const handleUploadScreenshot = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need permission to access your photos"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setScreenshot(result.assets[0].uri);
      setShowPreview(true);
    }

    // Temporary alert for demo
    Alert.alert("Upload Screenshot", "Image picker will be implemented here");
    setInputMethod("upload");
  };

  // Handle taking photo
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need permission to access your camera"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setScreenshot(result.assets[0].uri);
      setShowPreview(true);
    }

    // Temporary alert for demo
    Alert.alert("Take Photo", "Camera will be implemented here");
    setInputMethod("upload");
  };

  // Handle manual entry
  const handleManualEntry = () => {
    setInputMethod("manual");
    setScreenshot(null);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (inputMethod === "upload" && !screenshot) {
      Alert.alert(
        "Missing Screenshot",
        "Please upload a screenshot of your meter reading"
      );
      return;
    }

    if (inputMethod === "manual") {
      if (!formData.currentReading || !formData.meterNumber) {
        Alert.alert(
          "Missing Information",
          "Please fill in all required fields"
        );
        return;
      }
    }

    // TODO: Process the meter reading
    console.log("Meter Reading Submitted:", {
      inputMethod,
      screenshot,
      formData,
    });
    Alert.alert(
      "Success!",
      "Your meter reading has been recorded successfully",
      [{ text: "OK", onPress: () => resetForm() }]
    );
  };

  const resetForm = () => {
    setInputMethod(null);
    setScreenshot(null);
    setFormData({
      currentReading: "",
      previousReading: "",
      meterNumber: "",
      billingMonth: "",
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Meter Reading</Text>
            <Text style={styles.subtitle}>Add your ECG meter reading</Text>
          </View>
          {inputMethod && (
            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Ionicons name="refresh" size={20} color="#3b82f6" />
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="information-circle" size={24} color="#3b82f6" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>How to Add Your Reading</Text>
            <Text style={styles.infoText}>
              You can either upload a screenshot from the ECG Power app or enter
              your meter details manually
            </Text>
          </View>
        </View>

        {/* Input Method Selection */}
        {!inputMethod && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Input Method</Text>

            <View style={styles.methodGrid}>
              {/* Upload Screenshot */}
              <TouchableOpacity
                style={styles.methodCard}
                activeOpacity={0.7}
                onPress={handleUploadScreenshot}
              >
                <View style={styles.methodIconContainer}>
                  <Ionicons name="image-outline" size={32} color="#3b82f6" />
                </View>
                <Text style={styles.methodTitle}>Upload Screenshot</Text>
                <Text style={styles.methodDescription}>From ECG Power app</Text>
                <View style={styles.methodBadge}>
                  <Text style={styles.methodBadgeText}>Recommended</Text>
                </View>
              </TouchableOpacity>

              {/* Take Photo */}
              <TouchableOpacity
                style={styles.methodCard}
                activeOpacity={0.7}
                onPress={handleTakePhoto}
              >
                <View style={styles.methodIconContainer}>
                  <Ionicons name="camera-outline" size={32} color="#3b82f6" />
                </View>
                <Text style={styles.methodTitle}>Take Photo</Text>
                <Text style={styles.methodDescription}>Of your meter</Text>
              </TouchableOpacity>
            </View>

            {/* Manual Entry Button */}
            <TouchableOpacity
              style={styles.manualButton}
              activeOpacity={0.7}
              onPress={handleManualEntry}
            >
              <View style={styles.manualIconContainer}>
                <Ionicons name="create-outline" size={24} color="#3b82f6" />
              </View>
              <View style={styles.manualContent}>
                <Text style={styles.manualTitle}>Enter Manually</Text>
                <Text style={styles.manualDescription}>
                  Type your meter reading details
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Screenshot Preview & Processing */}
        {inputMethod === "upload" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Screenshot Upload</Text>

            {screenshot ? (
              <View style={styles.screenshotPreview}>
                <Image
                  source={{ uri: screenshot }}
                  style={styles.screenshotImage}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => setScreenshot(null)}
                >
                  <Ionicons name="close-circle" size={32} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={64}
                  color="#9ca3af"
                />
                <Text style={styles.uploadPlaceholderText}>
                  No screenshot selected
                </Text>
              </View>
            )}

            {/* AI Processing Indicator (Future) */}
            {screenshot && (
              <View style={styles.processingCard}>
                <View style={styles.processingHeader}>
                  <Ionicons name="sparkles" size={20} color="#f59e0b" />
                  <Text style={styles.processingTitle}>AI Processing</Text>
                </View>
                <Text style={styles.processingText}>
                  We&apos;ll extract the meter reading from your screenshot
                  automatically
                </Text>
              </View>
            )}

            {/* Extracted Data (After AI Processing) */}
            {screenshot && (
              <View style={styles.extractedCard}>
                <Text style={styles.extractedTitle}>Extracted Information</Text>

                <View style={styles.extractedItem}>
                  <Text style={styles.extractedLabel}>Meter Number</Text>
                  <TextInput
                    style={styles.extractedInput}
                    placeholder="Will be auto-filled"
                    value={formData.meterNumber}
                    onChangeText={(text) =>
                      setFormData({ ...formData, meterNumber: text })
                    }
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <View style={styles.extractedItem}>
                  <Text style={styles.extractedLabel}>
                    Current Reading (kWh)
                  </Text>
                  <TextInput
                    style={styles.extractedInput}
                    placeholder="Will be auto-filled"
                    value={formData.currentReading}
                    onChangeText={(text) =>
                      setFormData({ ...formData, currentReading: text })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                  />
                </View>

                <Text style={styles.extractedNote}>
                  Review and edit if needed
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Manual Entry Form */}
        {inputMethod === "manual" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enter Meter Details</Text>

            <View style={styles.formCard}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Meter Number *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="barcode-outline" size={20} color="#6b7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 12345678901"
                    value={formData.meterNumber}
                    onChangeText={(text) =>
                      setFormData({ ...formData, meterNumber: text })
                    }
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Current Reading (kWh) *</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="speedometer-outline"
                    size={20}
                    color="#6b7280"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 1250"
                    value={formData.currentReading}
                    onChangeText={(text) =>
                      setFormData({ ...formData, currentReading: text })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Previous Reading (kWh)</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="speedometer-outline"
                    size={20}
                    color="#6b7280"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., 1100 (optional)"
                    value={formData.previousReading}
                    onChangeText={(text) =>
                      setFormData({ ...formData, previousReading: text })
                    }
                    keyboardType="numeric"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Billing Month</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#6b7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., November 2024"
                    value={formData.billingMonth}
                    onChangeText={(text) =>
                      setFormData({ ...formData, billingMonth: text })
                    }
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.tipBox}>
                <Ionicons name="bulb-outline" size={20} color="#f59e0b" />
                <Text style={styles.tipText}>
                  You can find these details on your ECG bill or meter display
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Submit Button */}
        {inputMethod && (
          <View style={styles.submitSection}>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Save Meter Reading</Text>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Screenshot Preview Modal */}
      <Modal
        visible={showPreview}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowPreview(false)}
            >
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            {screenshot && (
              <Image
                source={{ uri: screenshot }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    fontWeight: "600",
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    gap: 4,
  },
  resetText: {
    ...typography.captionBold,
    color: "#3b82f6",
    fontSize: 13,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#dbeafe",
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  infoIconContainer: {
    marginRight: spacing.sm,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  methodGrid: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  methodCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3b82f6",
    borderStyle: "dashed",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  methodIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  methodTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  methodDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  methodBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginTop: spacing.sm,
  },
  methodBadgeText: {
    ...typography.small,
    color: "#10b981",
    fontWeight: "600",
    fontSize: 11,
  },
  manualButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  manualIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  manualContent: {
    flex: 1,
  },
  manualTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: "600",
    marginBottom: 2,
  },
  manualDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  screenshotPreview: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  screenshotImage: {
    width: "100%",
    height: 300,
  },
  removeButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: "#fff",
    borderRadius: borderRadius.full,
  },
  uploadPlaceholder: {
    backgroundColor: "#fff",
    borderRadius: borderRadius.lg,
    padding: spacing.xl * 2,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
  },
  uploadPlaceholderText: {
    ...typography.body,
    color: "#9ca3af",
    marginTop: spacing.sm,
  },
  processingCard: {
    backgroundColor: "#fef3c7",
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  processingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  processingTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },
  processingText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  extractedCard: {
    backgroundColor: "#fff",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  extractedTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  extractedItem: {
    marginBottom: spacing.md,
  },
  extractedLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontWeight: "500",
  },
  extractedInput: {
    backgroundColor: "#f9fafb",
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  extractedNote: {
    ...typography.small,
    color: "#3b82f6",
    fontStyle: "italic",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  input: {
    flex: 1,
    padding: spacing.sm,
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  tipBox: {
    flexDirection: "row",
    backgroundColor: "#fef3c7",
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
  },
  tipText: {
    flex: 1,
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    lineHeight: 18,
  },
  submitSection: {
    paddingHorizontal: spacing.md,
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    gap: spacing.sm,
  },
  submitButtonText: {
    ...typography.bodyMedium,
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalClose: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "80%",
  },
});
