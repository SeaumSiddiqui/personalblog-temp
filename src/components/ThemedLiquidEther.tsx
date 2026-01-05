import React, { useMemo } from 'react';
import { LiquidEther, LiquidEtherProps } from './reactbits/LiquidEther';
import { liquidEtherColors } from '../config/colors';

interface ThemedLiquidEtherProps extends Omit<LiquidEtherProps, 'colors'> {
  isDarkMode: boolean;
}

export const ThemedLiquidEther: React.FC<ThemedLiquidEtherProps> = ({
  isDarkMode,
  ...otherProps
}) => {
  const colors = useMemo(() => {
    return isDarkMode ? liquidEtherColors.dark : liquidEtherColors.light;
  }, [isDarkMode]);

  return <LiquidEther colors={colors} {...otherProps} />;
};
