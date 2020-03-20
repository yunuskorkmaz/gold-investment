import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {
  color,
  compose,
  size,
  space,
  flexbox,
  border,
  typography,
} from 'styled-system';
import Box from './box';

const ListItemCell = ({children, ...props}) => (
  <Box {...props}>
    <Text {...props}>{children}</Text>
  </Box>
);

const ListCell = styled(ListItemCell)(
  compose(
    color,
    size,
    space,
    flexbox,
    border,
    typography,
  ),
);

ListCell.defaultProps = {
  width: '20%',
  alignItems: 'flex-end',
};

export default ListCell;
