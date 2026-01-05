import React, { useMemo } from 'react';
import { LiquidEther, LiquidEtherProps } from './reactbits/LiquidEther';

interface ThemedLiquidEtherProps extends Omit<LiquidEtherProps, 'colors'> {
  isDarkMode: boolean;
}

const darkThemeColors = ['#3b82f6', '#8b5cf6', '#6366f1'];
const lightThemeColors = ['#93c5fd', '#c4b5fd', '#a5b4fc'];

export const ThemedLiquidEther: React.FC<ThemedLiquidEtherProps> = ({
  isDarkMode,
  ...otherProps
}) => {
  const colors = useMemo(() => {
    return isDarkMode ? darkThemeColors : lightThemeColors;
  }, [isDarkMode]);

  return <LiquidEther colors={colors} {...otherProps} />;
};
