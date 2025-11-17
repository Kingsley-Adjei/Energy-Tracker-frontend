import { AlertCard } from '@/components/ui/AlertCard';
import { borderRadius, colors, spacing, typography } from '@/constants/design';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlertsScreen() {
  const [filter, setFilter] = useState<'all' | 'warning' | 'info' | 'success'>('all');

  // Dummy alerts data
  const alerts = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'High Power Consumption Detected',
      message: 'Your Split AC Unit is consuming 35% more power than usual. Check filter or thermostat settings.',
      time: '15 min ago',
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'Daily Usage Update',
      message: 'You\'ve used 18.5 kWh today, which is 12% lower than yesterday. Great job!',
      time: '2 hours ago',
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Budget Alert',
      message: 'You\'re approaching 85% of your daily budget. Consider reducing usage to stay on track.',
      time: '4 hours ago',
    },
    {
      id: '4',
      type: 'success' as const,
      title: 'Target Achieved',
      message: 'Congratulations! You stayed under your weekly usage target. You saved $8.50 this week.',
      time: '1 day ago',
    },
    {
      id: '5',
      type: 'info' as const,
      title: 'Usage Pattern Detected',
      message: 'Peak usage occurs between 6-9 PM daily. Consider shifting some activities to off-peak hours.',
      time: '1 day ago',
    },
    {
      id: '6',
      type: 'warning' as const,
      title: 'Old Appliance Warning',
      message: 'Your Samsung Fridge (Old) is 40% less efficient than modern models. Replacement could save $120/year.',
      time: '2 days ago',
    },
  ];

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const warningCount = alerts.filter(a => a.type === 'warning').length;
  const infoCount = alerts.filter(a => a.type === 'info').length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Ionicons name="alert-circle" size={24} color="red" />
      case 'success':
        return <Ionicons name="checkmark-circle" size={24} color="green" />
      default:
        return <Ionicons name="information-circle" size={24} color="blue" />
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Alerts & Insights</Text>
            <Text style={styles.subtitle}>
              {warningCount} warnings • {infoCount} updates
            </Text>
          </View>
        </View>

        {/* AI Insights Card */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <View style={styles.insightsIcon}>
            <Ionicons name="information-circle" size={24} color="blue" />
            </View>
            <Text style={styles.insightsTitle}>AI Insights</Text>
          </View>
          <Text style={styles.insightsText}>
            Based on your usage patterns, I recommend running your AC at 24°C instead of 21°C. This could reduce your energy consumption by 25% and save approximately $45/month.
          </Text>
          <TouchableOpacity style={styles.insightsButton} activeOpacity={0.7}>
            <Text style={styles.insightsButtonText}>View All Suggestions</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <TouchableOpacity
              style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
              onPress={() => setFilter('all')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                All ({alerts.length})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterTab, filter === 'warning' && styles.filterTabActive]}
              onPress={() => setFilter('warning')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filter === 'warning' && styles.filterTextActive]}>
                Warnings ({warningCount})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterTab, filter === 'info' && styles.filterTabActive]}
              onPress={() => setFilter('info')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filter === 'info' && styles.filterTextActive]}>
                Info ({infoCount})
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.filterTab, filter === 'success' && styles.filterTabActive]}
              onPress={() => setFilter('success')}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, filter === 'success' && styles.filterTextActive]}>
                Success
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Alerts List */}
        <View style={styles.section}>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                time={alert.time}
                icon={getIcon(alert.type)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No alerts in this category</Text>
            </View>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alert Preferences</Text>
          
          <TouchableOpacity style={styles.settingButton} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Notification Settings</Text>
              <Text style={styles.settingSubtitle}>Manage alert frequency and types</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton} activeOpacity={0.7}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>AI Insights Frequency</Text>
              <Text style={styles.settingSubtitle}>Currently: Daily</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  insightsCard: {
    backgroundColor: colors.accent + '15',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  insightsIcon: {
    marginRight: spacing.sm,
  },
  insightsTitle: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  insightsText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  insightsButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  insightsButtonText: {
    ...typography.captionBold,
    color: colors.backgroundSecondary,
  },
  filterContainer: {
    marginBottom: spacing.md,
  },
  filterScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.backgroundSecondary,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.caption,
    color: colors.textLight,
  },
  settingButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  settingSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  settingArrow: {
    ...typography.h2,
    color: colors.textLight,
  },
});
