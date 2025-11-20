// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, View } from 'react-native';
import { theme } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
    };

    if (variant === 'secondary') {
      buttonStyle.backgroundColor = theme.colors.secondary;
    } else if (variant === 'outline') {
      buttonStyle.backgroundColor = 'transparent';
      buttonStyle.borderWidth = 1;
      buttonStyle.borderColor = theme.colors.primary;
    } else if (variant === 'text') {
      buttonStyle.backgroundColor = 'transparent';
      buttonStyle.paddingVertical = 0;
      buttonStyle.paddingHorizontal = 0;
    }

    if (size === 'small') {
      buttonStyle.paddingVertical = theme.spacing.xs;
      buttonStyle.paddingHorizontal = theme.spacing.md;
    } else if (size === 'large') {
      buttonStyle.paddingVertical = theme.spacing.lg;
      buttonStyle.paddingHorizontal = theme.spacing.xl;
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyle: TextStyle = {
      color: variant === 'primary' || variant === 'secondary' ? '#fff' : theme.colors.primary,
      fontWeight: '600',
      fontSize: 16,
    };

    if (variant === 'text') {
      textStyle.color = theme.colors.primary;
    }

    if (size === 'small') {
      textStyle.fontSize = 14;
    } else if (size === 'large') {
      textStyle.fontSize = 18;
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextStyle().color} />
      ) : (
        <>
          {icon && <>{icon}</>}
          {icon && title ? <View style={{ width: 8 }} /> : null}
          {title ? <Text style={[getTextStyle(), textStyle]}>{title}</Text> : null}
        </>
      )}
    </TouchableOpacity>
  );
};

// Add this to your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});