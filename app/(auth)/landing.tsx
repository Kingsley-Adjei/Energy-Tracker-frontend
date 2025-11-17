import { borderRadius, spacing } from '@/constants/design';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// TODO: Replace these with actual images of your app screens
const DEMO_IMAGES = {
  image1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
  image2: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop',
  image3: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=500&fit=crop',
  image4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
};

export default function LandingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/signup');
  };

  const handleSignIn = () => {
    router.push('/(auth)/signin');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b', '#334155']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Header with Logo */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <Ionicons name="flash" size={32} color="#3b82f6" />
                </View>
              </View>
            </View>

            {/* Hero Text */}
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>
                Control Your Power,{'\n'}
                <Text style={styles.heroTitleAccent}>Effortlessly</Text> With Watts<Text style={styles.heroTitleAccent}>AI</Text>
              </Text>
              <Text style={styles.heroSubtitle}>
                Track, manage, and optimize your electricity usage with intelligent insights
              </Text>
            </View>

            {/* Image Grid */}
            <View style={styles.imageGrid}>
              {/* Top Row - 2 columns */}
              <View style={styles.imageRow}>
                <View style={[styles.imageCard, styles.imageCardLarge]}>
                  <Image 
                    source={{ uri: DEMO_IMAGES.image1 }} 
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.imageOverlay}
                  >
                    <View style={styles.imageTag}>
                      <Ionicons name="analytics-outline" size={16} color="#fff" />
                      <Text style={styles.imageTagText}>Live Dashboard</Text>
                    </View>
                  </LinearGradient>
                </View>

                <View style={[styles.imageCard, styles.imageCardMedium]}>
                  <Image 
                    source={{ uri: DEMO_IMAGES.image2 }} 
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.imageOverlay}
                  >
                    <View style={styles.imageTag}>
                      <Ionicons name="home-outline" size={16} color="#fff" />
                      <Text style={styles.imageTagText}>Smart Control</Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>

              {/* Bottom Row - 2 columns */}
              <View style={styles.imageRow}>
                <View style={[styles.imageCard, styles.imageCardMedium]}>
                  <Image 
                    source={{ uri: DEMO_IMAGES.image3 }} 
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.imageOverlay}
                  >
                    <View style={styles.imageTag}>
                      <Ionicons name="speedometer-outline" size={16} color="#fff" />
                      <Text style={styles.imageTagText}>Real-time Tracking</Text>
                    </View>
                  </LinearGradient>
                </View>

                <View style={[styles.imageCard, styles.imageCardLarge]}>
                  <Image 
                    source={{ uri: DEMO_IMAGES.image4 }} 
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    style={styles.imageOverlay}
                  >
                    <View style={styles.imageTag}>
                      <Ionicons name="wallet-outline" size={16} color="#fff" />
                      <Text style={styles.imageTagText}>Budget Control</Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </View>

            {/* Features List */}
            <View style={styles.featuresSection}>
              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                </View>
                <Text style={styles.featureText}>Monitor energy consumption in real-time</Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                </View>
                <Text style={styles.featureText}>Set budgets and receive smart alerts</Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                </View>
                <Text style={styles.featureText}>Track appliances and reduce costs</Text>
              </View>
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaSection}>
              <TouchableOpacity 
                style={styles.primaryButton}
                activeOpacity={0.8}
                onPress={handleGetStarted}
              >
                <LinearGradient
                  colors={['#3b82f6', '#2563eb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>Get Started Now</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={handleSignIn}
              >
                <Text style={styles.secondaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
  style={[styles.secondaryButton, { marginTop: 20 }]}
  activeOpacity={0.8}
  onPress={() => router.push('/(tabs)')}
>
  <Text style={styles.secondaryButtonText}>Skip for now</Text>
</TouchableOpacity>

            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Join thousands of users saving on electricity
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: spacing.md,
  },
  heroTitleAccent: {
    color: '#3b82f6',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  imageGrid: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  imageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  imageCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#1e293b',
  },
  imageCardLarge: {
    flex: 1.5,
    height: 220,
  },
  imageCardMedium: {
    flex: 1,
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
    padding: spacing.sm,
  },
  imageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    gap: spacing.xs / 2,
  },
  imageTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureIcon: {
    marginRight: spacing.sm,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  ctaSection: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  primaryButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButton: {
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
});