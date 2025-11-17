import { borderRadius, colors, shadows, spacing, typography } from '@/constants/design';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

export function StatCard({ title, value, subtitle, icon, trend, trendValue, color }: StatCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return colors.error;
    if (trend === 'down') return colors.success;
    return colors.textSecondary;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && <View style={styles.icon}>{icon}</View>}
      </View>
      
      <Text style={[styles.value, color && { color }]}>{value}</Text>
      
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      
      {trendValue && (
        <View style={styles.trendContainer}>
          <Text style={[styles.trend, { color: getTrendColor() }]}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  icon: {
    opacity: 0.6,
  },
  value: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textLight,
  },
  trendContainer: {
    marginTop: spacing.xs,
  },
  trend: {
    ...typography.captionBold,
  },
});
