import { StatCard } from '@/components/ui/StatCard';
import { borderRadius, colors, spacing, typography } from '@/constants/design';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// NEW COMPONENT NEEDED: Create UserAvatar.tsx component
// Props: { imageUri?: string, name: string, size?: number }
// Returns a circular avatar with user image or initials

export default function DashboardScreen() {
  // User data - replace with actual user data from your auth/context
  const userName = "John Doe"; // Replace with actual user name
  const userAvatar = null; // Replace with actual user avatar URI
  
  // State for modals
  const [showTodayDetails, setShowTodayDetails] = useState(false);
  const [showMonthBreakdown, setShowMonthBreakdown] = useState(false);
  
  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Dummy data
  const currentUsage = 2.4; // kW
  const todayUsage = 18.5; // kWh
  const todayCost = 4.25; // USD
  const monthlyUsage = 425; // kWh
  const monthlyCost = 97.50; // USD
  const notificationCount = 3; // Unread notifications

  // Last 6 hours data (dynamic based on current time)
  const getCurrentHourData = () => {
    const current = new Date().getHours();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const hour = (current - i + 24) % 24;
      const usage = Math.random() * 5 + 0.5; // Random data for demo
      data.push({
        hour: `${hour % 12 || 12}${hour < 12 ? 'AM' : 'PM'}`,
        usage: parseFloat(usage.toFixed(1))
      });
    }
    return data;
  };

  // Full 24 hours data for details view
  const getFullDayData = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
      const usage = Math.random() * 5 + 0.5; // Random data for demo
      data.push({
        hour: `${i % 12 || 12}${i < 12 ? 'AM' : 'PM'}`,
        usage: parseFloat(usage.toFixed(1))
      });
    }
    return data;
  };

  const hourlyData = getCurrentHourData();
  const fullDayData = getFullDayData();

  // Monthly data for line chart (similar to Image 1 with two lines)
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [200, 180, 120, 70, 250, 150, 60, 40, 220, 100, 140, 50],
        color: (opacity = 1) => `rgba(251, 146, 60, ${opacity})`, // Orange line
        strokeWidth: 3,
      },
      {
        data: [150, 120, 100, 60, 280, 200, 80, 50, 250, 150, 180, 100],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Blue line
        strokeWidth: 3,
      }
    ],
  };

  const maxUsage = Math.max(...hourlyData.map(d => d.usage));
  const maxFullDayUsage = Math.max(...fullDayData.map(d => d.usage));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* NEW HEADER with User Profile and Notification */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            {/* TODO: Import and use UserAvatar component here */}
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{getGreeting()} 👋</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subtitle}>Here&apos;s your energy overview</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>

        {/* Current Usage - Large Display */}
        <View style={styles.currentUsageCard}>
          <Text style={styles.currentLabel}>Current Usage</Text>
          <View style={styles.currentValueContainer}>
            <Text style={styles.currentValue}>{currentUsage}</Text>
            <Text style={styles.currentUnit}>kW</Text>
          </View>
          <Text style={styles.currentSubtext}>
            {(currentUsage * 24).toFixed(1)} kWh if maintained for 24h
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <StatCard
              title="Today's Usage"
              value={`${todayUsage} kWh`}
              subtitle="Last 24 hours"
              icon={<Ionicons name="flash" size={24} color="#eab308" />}
              trend="down"
              trendValue="12% vs yesterday"
            />
          </View>
          <View style={styles.statItem}>
            <StatCard
              title="Today's Cost"
              value={`$${todayCost}`}
              subtitle="At $0.23/kWh"
              icon={<Ionicons name="cash" size={24} color="#10b981" />}
              color="#10b981"
            />
          </View>
        </View>

        {/* Today's Pattern - Last 6 Hours (Similar to Image 1) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today&apos;s Pattern</Text>
            <TouchableOpacity onPress={() => setShowTodayDetails(true)}>
              <Text style={styles.sectionLink}>View Details</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View style={styles.chartLegend}>
                <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                <Text style={styles.legendText}>Normal</Text>
              </View>
              <View style={styles.chartLegend}>
                <View style={[styles.legendDot, { backgroundColor: '#f97316' }]} />
                <Text style={styles.legendText}>High Usage</Text>
              </View>
            </View>
            <View style={styles.chart}>
              {hourlyData.map((item, index) => {
                const barHeight = (item.usage / maxUsage) * 120;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={styles.barWrapper}>
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            height: barHeight,
                            backgroundColor: item.usage > 4 ? '#f97316' : '#3b82f6' 
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.barLabel}>{item.hour}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.chartFooter}>Last 6 hours</Text>
          </View>
        </View>

        {/* This Month Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Month</Text>
            <TouchableOpacity onPress={() => setShowMonthBreakdown(true)}>
              <Text style={styles.sectionLink}>See Breakdown</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.monthlyCard}>
            <View style={styles.monthlyRow}>
              <View style={styles.monthlyItem}>
                <Text style={styles.monthlyLabel}>Total Usage</Text>
                <Text style={styles.monthlyValue}>{monthlyUsage} kWh</Text>
                <Text style={styles.monthlyTrend}>↑ 8% vs last month</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.monthlyItem}>
                <Text style={styles.monthlyLabel}>Total Cost</Text>
                <Text style={styles.monthlyValue}>${monthlyCost}</Text>
                <Text style={styles.monthlyTrend}>↑ $7.20 vs last month</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Today's Details Modal */}
      <Modal
        visible={showTodayDetails}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTodayDetails(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Today&apos;s Usage Pattern</Text>
              <TouchableOpacity onPress={() => setShowTodayDetails(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalChartCard}>
                <View style={styles.chartHeader}>
                  <View style={styles.chartLegend}>
                    <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                    <Text style={styles.legendText}>Normal</Text>
                  </View>
                  <View style={styles.chartLegend}>
                    <View style={[styles.legendDot, { backgroundColor: '#f97316' }]} />
                    <Text style={styles.legendText}>High Usage</Text>
                  </View>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <View style={[styles.chart, { width: fullDayData.length * 35 }]}>
                    {fullDayData.map((item, index) => {
                      const barHeight = (item.usage / maxFullDayUsage) * 120;
                      return (
                        <View key={index} style={styles.barContainer}>
                          <View style={styles.barWrapper}>
                            <View 
                              style={[
                                styles.bar, 
                                { 
                                  height: barHeight,
                                  backgroundColor: item.usage > 4 ? '#f97316' : '#3b82f6' 
                                }
                              ]} 
                            />
                          </View>
                          <Text style={styles.barLabel}>{item.hour}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                <Text style={styles.chartFooter}>Full 24 hours</Text>
              </View>
              
              <View style={styles.modalStats}>
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatLabel}>Peak Usage</Text>
                  <Text style={styles.modalStatValue}>{maxFullDayUsage.toFixed(1)} kW</Text>
                </View>
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatLabel}>Average</Text>
                  <Text style={styles.modalStatValue}>
                    {(fullDayData.reduce((a, b) => a + b.usage, 0) / fullDayData.length).toFixed(1)} kW
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Monthly Breakdown Modal */}
      <Modal
        visible={showMonthBreakdown}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMonthBreakdown(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Monthly Breakdown</Text>
              <TouchableOpacity onPress={() => setShowMonthBreakdown(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.lineChartCard}>
                <View style={styles.chartHeader}>
                  <View style={styles.chartLegend}>
                    <View style={[styles.legendDot, { backgroundColor: '#fb923c' }]} />
                    <Text style={styles.legendText}>Energy Produced</Text>
                  </View>
                  <View style={styles.chartLegend}>
                    <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                    <Text style={styles.legendText}>Energy Consumed</Text>
                  </View>
                </View>
                <LineChart
                  data={monthlyData}
                  width={width - spacing.md * 4}
                  height={250}
                  chartConfig={{
                    backgroundColor: '#1e293b',
                    backgroundGradientFrom: '#1e293b',
                    backgroundGradientTo: '#334155',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.6})`,
                    style: {
                      borderRadius: borderRadius.md,
                    },
                    propsForDots: {
                      r: '0',
                    },
                  }}
                  bezier
                  style={styles.lineChart}
                  withVerticalLines={false}
                  withHorizontalLines={true}
                  withDots={false}
                  withInnerLines={true}
                />
                <Text style={styles.lineChartFooter}>Updated 10 minutes ago</Text>
              </View>

              <View style={styles.monthlyDetailCard}>
                <Text style={styles.monthlyDetailTitle}>Current Month Summary</Text>
                <View style={styles.monthlyDetailRow}>
                  <View style={styles.monthlyDetailItem}>
                    <Text style={styles.monthlyDetailLabel}>Total Usage</Text>
                    <Text style={styles.monthlyDetailValue}>{monthlyUsage} kWh</Text>
                  </View>
                  <View style={styles.monthlyDetailItem}>
                    <Text style={styles.monthlyDetailLabel}>Total Cost</Text>
                    <Text style={styles.monthlyDetailValue}>${monthlyCost}</Text>
                  </View>
                </View>
                <View style={styles.monthlyDetailRow}>
                  <View style={styles.monthlyDetailItem}>
                    <Text style={styles.monthlyDetailLabel}>Avg Daily</Text>
                    <Text style={styles.monthlyDetailValue}>{(monthlyUsage / 30).toFixed(1)} kWh</Text>
                  </View>
                  <View style={styles.monthlyDetailItem}>
                    <Text style={styles.monthlyDetailLabel}>Projection</Text>
                    <Text style={styles.monthlyDetailValue}>{(monthlyUsage * 1.1).toFixed(0)} kWh</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
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
    paddingBottom: spacing.sm,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
  },
  userName: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '600',
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
    backgroundColor: '#fff',
    borderRadius: borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ef4444',
    borderRadius: borderRadius.full,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: '#10b981',
    marginRight: spacing.sm,
  },
  liveText: {
    ...typography.captionBold,
    color: '#10b981',
  },
  currentUsageCard: {
    backgroundColor: '#3b82f6',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  currentLabel: {
    ...typography.caption,
    color: '#fff',
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  currentValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  currentValue: {
    fontSize: 56,
    fontWeight: '700',
    color: '#fff',
  },
  currentUnit: {
    ...typography.h3,
    color: '#fff',
    marginLeft: spacing.sm,
    opacity: 0.9,
  },
  currentSubtext: {
    ...typography.caption,
    color: '#fff',
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  statItem: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '600',
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionLink: {
    ...typography.captionBold,
    color: '#3b82f6',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  dropdownText: {
    ...typography.captionBold,
    color: '#fff',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
  },
  legendText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 2,
  },
  bar: {
    width: '100%',
    borderRadius: borderRadius.sm,
    minHeight: 4,
  },
  barLabel: {
    ...typography.small,
    color: colors.textLight,
    marginTop: spacing.sm,
    fontSize: 10,
  },
  chartFooter: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  lineChartCard: {
    backgroundColor: '#1e293b',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: borderRadius.md,
  },
  lineChartFooter: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  monthlyCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  monthlyRow: {
    flexDirection: 'row',
  },
  monthlyItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: spacing.lg,
  },
  monthlyLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  monthlyValue: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  monthlyTrend: {
    ...typography.small,
    color: '#ef4444',
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
    maxHeight: '90%',
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
  modalChartCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalStats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalStatItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalStatLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  modalStatValue: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
  },
  monthlyDetailCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  monthlyDetailTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  monthlyDetailRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  monthlyDetailItem: {
    flex: 1,
  },
  monthlyDetailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  monthlyDetailValue: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
  },
});