import React from 'react';
import Box from './box';
import Label from './text';

const InvestmentHeader = ({totalValue, totalGain, totalPercentGain}) => {
  return (
    <Box
      bg="listItemBg"
      p={10}
      borderRadius={6}
      flexDirection="column"
      alignItems="center">
      <Label>Bakiye</Label>
      <Label fontSize={19}>₺{totalValue.toFixed(2)}</Label>
      <Label>Kar/Zarar</Label>
      <Label fontSize={18} p={5} bg={totalGain <= 0 ? 'red' : 'green'} m={2}>
        ₺{Math.abs(totalGain.toFixed(2))}
      </Label>
      <Label fontSize={18} p={5} bg={totalGain <= 0 ? 'red' : 'green'} m={2}>
        %{totalPercentGain}
      </Label>
    </Box>
  );
};

export default InvestmentHeader;
