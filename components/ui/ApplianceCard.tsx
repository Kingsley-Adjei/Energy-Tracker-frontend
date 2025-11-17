import { borderRadius, colors, shadows, spacing, typography } from '@/constants/design';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ApplianceCardProps {
  name: string;
  type: string;
  power: string;
  usage: string;
  status: 'active' | 'idle' | 'warning';
  icon?: React.ReactNode;
  onPress?: () => void;
}

export function ApplianceCard({ name, type, power, usage, status, icon, onPress }: ApplianceCardProps) {
  const getStatusColor = () => {
    if (status === 'active') return colors.success;
    if (status === 'warning') return colors.warning;
    return colors.textLight;
  };

  const getStatusBg = () => {
    if (status === 'active') return colors.successLight;
    if (status === 'warning') return colors.warningLight;
    return colors.borderLight;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight + '20' }]}>
          {icon}
        </View>
        
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>{power}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.statText}>{usage}</Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusBg() }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  type: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...typography.small,
    color: colors.textLight,
  },
  separator: {
    ...typography.small,
    color: colors.textLight,
    marginHorizontal: spacing.xs,
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
  },
});
