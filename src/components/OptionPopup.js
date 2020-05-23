import React, {useState} from 'react';
import Box from './box';
import Label from './text';
import Button from './button';
import {UIManager, findNodeHandle} from 'react-native';
import ThreeDots from './icons/Threedots';

const OptionPopup = ({options, actions}) => {
  const menu = React.useRef(null);

  const handleClick = i => {
    if (i !== undefined && options.length && actions.length) {
      actions[i]();
    }
  };

  const handlePress = () => {
    UIManager.showPopupMenu(
      findNodeHandle(menu.current),
      options,
      () => console.log('show menu error'),
      (e, i) => handleClick(i),
    );
  };

  return (
    <Box>
      <Button p={4} ref={menu} onPress={handlePress}>
        <ThreeDots width={16} height={16} fill="white" />
      </Button>
    </Box>
  );
};

export default OptionPopup;
