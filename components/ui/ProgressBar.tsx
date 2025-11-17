import { borderRadius, colors, spacing, typography } from '@/constants/design';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  showPercentage?: boolean;
}

export function ProgressBar({ label, current, target, unit, showPercentage = true }: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isOverTarget = current > target;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {current} / {target} {unit}
        </Text>
      </View>
      
      <View style={styles.barContainer}>
        <View 
          style={[
            styles.barFill, 
            { 
              width: `${percentage}%`,
              backgroundColor: isOverTarget ? colors.error : colors.primary 
            }
          ]} 
        />
      </View>
      
      {showPercentage && (
        <Text style={[styles.percentage, isOverTarget && { color: colors.error }]}>
          {percentage.toFixed(0)}% {isOverTarget ? 'over target' : 'of target'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  value: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  barContainer: {
    height: 12,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  percentage: {
    ...typography.small,
    color: colors.textLight,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
});
