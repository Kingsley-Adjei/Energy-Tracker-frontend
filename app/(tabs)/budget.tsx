import { ProgressBar } from '@/components/ui/ProgressBar';
import { borderRadius, colors, spacing, typography } from '@/constants/design';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  // Modal states
  const [showEditTarget, setShowEditTarget] = useState(false);
  const [showSetTarget, setShowSetTarget] = useState(false);
  const [showRechargeSchedule, setShowRechargeSchedule] = useState(false);
  
  // Target data state
  const [targets, setTargets] = useState({
    daily: 20,
    weekly: 140,
    monthly: 600,
  });

  // Budget data state
  const [budgets, setBudgets] = useState({
    daily: 15.0,
    monthly: 450.0,
  });

  // Dummy budget data
  const dailyTarget = targets.daily; // kWh
  const dailyCurrent = 18.5; // kWh
  const weeklyTarget = targets.weekly; // kWh
  const weeklyCurrent = 125; // kWh
  const monthlyTarget = targets.monthly; // kWh
  const monthlyCurrent = 425; // kWh

  const dailyBudget = budgets.daily; // GHS
  const dailySpent = 12.75; // GHS (converted from USD at approx 3x rate)
  const monthlyBudget = budgets.monthly; // GHS
  const monthlySpent = 292.50; // GHS

  const daysToRecharge = 18; // days
  const projectedUsage = 540; // kWh
  const projectedSavings = 45; // GHS

  // Form states
  const [editForm, setEditForm] = useState({
    daily: targets.daily.toString(),
    weekly: targets.weekly.toString(),
    monthly: targets.monthly.toString(),
  });

  const [budgetForm, setBudgetForm] = useState({
    daily: budgets.daily.toString(),
    monthly: budgets.monthly.toString(),
  });

  const [rechargeForm, setRechargeForm] = useState({
    amount: '',
    date: '',
    autoRecharge: false,
  });

  const handleSaveTargets = () => {
    setTargets({
      daily: parseFloat(editForm.daily) || 20,
      weekly: parseFloat(editForm.weekly) || 140,
      monthly: parseFloat(editForm.monthly) || 600,
    });
    setShowEditTarget(false);
  };

  const handleSaveBudgets = () => {
    setBudgets({
      daily: parseFloat(budgetForm.daily) || 15.0,
      monthly: parseFloat(budgetForm.monthly) || 450.0,
    });
    setShowSetTarget(false);
  };

  const handleScheduleRecharge = () => {
    // TODO: Implement recharge scheduling logic
    console.log('Scheduling recharge:', rechargeForm);
    setShowRechargeSchedule(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Budget & Goals</Text>
            <Text style={styles.subtitle}>Track and optimize your spending</Text>
          </View>
        </View>

        {/* Days to Recharge Card */}
        <View style={styles.rechargeCard}>
          <View style={styles.rechargeIcon}>
            <Ionicons name="calendar-outline" size={32} color="#fff" />
          </View>
          <View style={styles.rechargeContent}>
            <Text style={styles.rechargeLabel}>Days to Next Recharge</Text>
            <View style={styles.rechargeValueContainer}>
              <Text style={styles.rechargeValue}>{daysToRecharge}</Text>
              <Text style={styles.rechargeUnit}>days</Text>
            </View>
            <Text style={styles.rechargeSubtext}>
              Based on your current usage pattern
            </Text>
          </View>
        </View>

        {/* Budget Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Overview</Text>
          
          <View style={styles.budgetGrid}>
            <View style={styles.budgetCard}>
              <View style={styles.budgetIconContainer}>
                <Ionicons name="wallet-outline" size={24} color="#10b981" />
              </View>
              <Text style={styles.budgetLabel}>Daily Budget</Text>
              <Text style={styles.budgetValue}>GH₵{dailySpent.toFixed(2)} / GH₵{dailyBudget.toFixed(2)}</Text>
              <View style={styles.budgetBar}>
                <View 
                  style={[
                    styles.budgetBarFill, 
                    { 
                      width: `${Math.min((dailySpent / dailyBudget) * 100, 100)}%`,
                      backgroundColor: dailySpent > dailyBudget ? '#ef4444' : '#10b981'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.budgetPercentage}>
                {((dailySpent / dailyBudget) * 100).toFixed(0)}% used
              </Text>
            </View>

            <View style={styles.budgetCard}>
              <View style={styles.budgetIconContainer}>
                <Ionicons name="wallet-outline" size={24} color="#3b82f6" />
              </View>
              <Text style={styles.budgetLabel}>Monthly Budget</Text>
              <Text style={styles.budgetValue}>GH₵{monthlySpent.toFixed(2)} / GH₵{monthlyBudget.toFixed(2)}</Text>
              <View style={styles.budgetBar}>
                <View 
                  style={[
                    styles.budgetBarFill, 
                    { 
                      width: `${Math.min((monthlySpent / monthlyBudget) * 100, 100)}%`,
                      backgroundColor: '#3b82f6'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.budgetPercentage}>
                {((monthlySpent / monthlyBudget) * 100).toFixed(0)}% used
              </Text>
            </View>
          </View>
        </View>

        {/* Usage Targets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Usage Targets</Text>
            <TouchableOpacity onPress={() => setShowEditTarget(true)}>
              <Text style={styles.sectionLink}>Edit Targets</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.targetsCard}>
            <ProgressBar
              label="Daily Target"
              current={dailyCurrent}
              target={dailyTarget}
              unit="kWh"
            />
            
            <ProgressBar
              label="Weekly Target"
              current={weeklyCurrent}
              target={weeklyTarget}
              unit="kWh"
            />
            
            <ProgressBar
              label="Monthly Target"
              current={monthlyCurrent}
              target={monthlyTarget}
              unit="kWh"
              showPercentage={true}
            />
          </View>
        </View>

        {/* Projection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Month&apos;s Projection</Text>
          
          <View style={styles.projectionCard}>
            <View style={styles.projectionRow}>
              <View style={styles.projectionItem}>
                <Text style={styles.projectionLabel}>Projected Usage</Text>
                <Text style={styles.projectionValue}>{projectedUsage} kWh</Text>
                <View style={styles.projectionBadge}>
                  <Ionicons name="trending-down" size={16} color="#10b981" />
                  <Text style={styles.projectionBadgeText}>Under target</Text>
                </View>
              </View>
              
              <View style={styles.projectionDivider} />
              
              <View style={styles.projectionItem}>
                <Text style={styles.projectionLabel}>Potential Savings</Text>
                <Text style={[styles.projectionValue, { color: '#10b981' }]}>
                  GH₵{projectedSavings}
                </Text>
                <Text style={styles.projectionSubtext}>vs last month</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.7}
            onPress={() => setShowSetTarget(true)}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="radio-button-on-outline" size={28} color="#3b82f6" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Set New Budget</Text>
              <Text style={styles.actionSubtitle}>Adjust your daily or monthly budget goals</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.7}
            onPress={() => setShowRechargeSchedule(true)}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="calendar-outline" size={28} color="#3b82f6" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Plan Recharge Schedule</Text>
              <Text style={styles.actionSubtitle}>Optimize electricity purchase timing</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Savings Tip */}
        <View style={styles.section}>
          <View style={styles.savingsTip}>
            <View style={styles.savingsTipHeader}>
              <Ionicons name="cash-outline" size={24} color="#10b981" />
              <Text style={styles.savingsTipTitle}>Savings Opportunity</Text>
            </View>
            <Text style={styles.savingsTipText}>
              You&apos;re on track to save GH₵180 this month by staying under your target. Keep up the great work!
            </Text>
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Edit Targets Modal */}
      <Modal
        visible={showEditTarget}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditTarget(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Usage Targets</Text>
              <TouchableOpacity onPress={() => setShowEditTarget(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDescription}>
                Set your energy usage targets to track your consumption goals
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Daily Target (kWh)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 20"
                  value={editForm.daily}
                  onChangeText={(text) => setEditForm({...editForm, daily: text})}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Weekly Target (kWh)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 140"
                  value={editForm.weekly}
                  onChangeText={(text) => setEditForm({...editForm, weekly: text})}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Monthly Target (kWh)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 600"
                  value={editForm.monthly}
                  onChangeText={(text) => setEditForm({...editForm, monthly: text})}
                  keyboardType="decimal-pad"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveTargets}
              >
                <Text style={styles.saveButtonText}>Save Targets</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowEditTarget(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Set Budget Modal */}
      <Modal
        visible={showSetTarget}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSetTarget(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set New Budget</Text>
              <TouchableOpacity onPress={() => setShowSetTarget(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDescription}>
                Set your budget limits to control your electricity spending
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Daily Budget (GH₵)</Text>
                <View style={styles.inputWithIcon}>
                  <Text style={styles.currencySymbol}>GH₵</Text>
                  <TextInput
                    style={styles.inputWithPrefix}
                    placeholder="15.00"
                    value={budgetForm.daily}
                    onChangeText={(text) => setBudgetForm({...budgetForm, daily: text})}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Monthly Budget (GH₵)</Text>
                <View style={styles.inputWithIcon}>
                  <Text style={styles.currencySymbol}>GH₵</Text>
                  <TextInput
                    style={styles.inputWithPrefix}
                    placeholder="450.00"
                    value={budgetForm.monthly}
                    onChangeText={(text) => setBudgetForm({...budgetForm, monthly: text})}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.tipBox}>
                <Ionicons name="information-circle-outline" size={20} color="#3b82f6" />
                <Text style={styles.tipText}>
                  Based on your current usage, we recommend a monthly budget of GH₵420-480
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveBudgets}
              >
                <Text style={styles.saveButtonText}>Save Budget</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowSetTarget(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Recharge Schedule Modal */}
      <Modal
        visible={showRechargeSchedule}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowRechargeSchedule(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Plan Recharge Schedule</Text>
              <TouchableOpacity onPress={() => setShowRechargeSchedule(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDescription}>
                Schedule your next electricity recharge
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Recharge Amount (GH₵)</Text>
                <View style={styles.inputWithIcon}>
                  <Text style={styles.currencySymbol}>GH₵</Text>
                  <TextInput
                    style={styles.inputWithPrefix}
                    placeholder="100.00"
                    value={rechargeForm.amount}
                    onChangeText={(text) => setRechargeForm({...rechargeForm, amount: text})}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Preferred Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YYYY"
                  value={rechargeForm.date}
                  onChangeText={(text) => setRechargeForm({...rechargeForm, date: text})}
                  placeholderTextColor="#9ca3af"
                />
                <Text style={styles.helperText}>
                  We&apos;ll remind you 2 days before this date
                </Text>
              </View>

              <View style={styles.infoCard}>
                <Ionicons name="bulb-outline" size={24} color="#f59e0b" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoTitle}>Smart Tip</Text>
                  <Text style={styles.infoText}>
                    Based on your usage, you&apos;ll need approximately GH₵{(dailySpent * daysToRecharge).toFixed(2)} for the next {daysToRecharge} days
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleScheduleRecharge}
              >
                <Text style={styles.saveButtonText}>Set Reminder</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowRechargeSchedule(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
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
  rechargeCard: {
    backgroundColor: '#3b82f6',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  rechargeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  rechargeContent: {
    flex: 1,
  },
  rechargeLabel: {
    ...typography.caption,
    color: '#fff',
    opacity: 0.9,
    marginBottom: spacing.xs,
  },
  rechargeValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs / 2,
  },
  rechargeValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  rechargeUnit: {
    ...typography.body,
    color: '#fff',
    marginLeft: spacing.sm,
    opacity: 0.9,
  },
  rechargeSubtext: {
    ...typography.small,
    color: '#fff',
    opacity: 0.8,
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
  sectionLink: {
    ...typography.captionBold,
    color: '#3b82f6',
  },
  budgetGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  budgetCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  budgetLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  budgetValue: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
    fontSize: 13,
  },
  budgetBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  budgetBarFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  budgetPercentage: {
    ...typography.small,
    color: colors.textSecondary,
    fontSize: 11,
  },
  targetsCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectionCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectionRow: {
    flexDirection: 'row',
  },
  projectionItem: {
    flex: 1,
  },
  projectionDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: spacing.lg,
  },
  projectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  projectionValue: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  projectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  projectionBadgeText: {
    ...typography.small,
    color: '#10b981',
    marginLeft: spacing.xs / 2,
    fontWeight: '600',
  },
  projectionSubtext: {
    ...typography.small,
    color: colors.textLight,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.xs / 2,
    fontWeight: '600',
  },
  actionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  savingsTip: {
    backgroundColor: '#dcfce7',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  savingsTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  savingsTipTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  savingsTipText: {
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
    marginBottom: spacing.md,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '600',
  },
  modalDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingLeft: spacing.md,
  },
  currencySymbol: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  inputWithPrefix: {
    flex: 1,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
  },
  helperText: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  tipText: {
    flex: 1,
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
    lineHeight: 18,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  infoTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
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
});