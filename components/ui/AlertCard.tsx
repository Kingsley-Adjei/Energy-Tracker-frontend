import { borderRadius, colors, shadows, spacing, typography } from '@/constants/design';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AlertCardProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  icon?: React.ReactNode;
}

export function AlertCard({ type, title, message, time, icon }: AlertCardProps) {
  const getColors = () => {
    switch (type) {
      case 'warning':
        return { bg: colors.warningLight, border: colors.warning, icon: colors.warning };
      case 'error':
        return { bg: colors.errorLight, border: colors.error, icon: colors.error };
      case 'success':
        return { bg: colors.successLight, border: colors.success, icon: colors.success };
      default:
        return { bg: colors.infoLight, border: colors.info, icon: colors.info };
    }
  };

  const colorScheme = getColors();

  return (
    <View style={[styles.card, { backgroundColor: colorScheme.bg, borderLeftColor: colorScheme.border }]}>
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}
        
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    ...shadows.sm,
  },
  content: {
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: spacing.md,
    marginTop: spacing.xs / 2,
  },
  textContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.text,
    flex: 1,
  },
  time: {
    ...typography.small,
    color: colors.textLight,
    marginLeft: spacing.sm,
  },
  message: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
