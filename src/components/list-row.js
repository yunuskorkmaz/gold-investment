import React from 'react';
import styled from 'styled-components';
import {compose, border, color, space} from 'styled-system';
import Box from './box';
import Ripple from 'react-native-material-ripple';
const listRowItem = ({as, ...props}) => <Box {...props} as={as || Ripple} />;
const ListRow = styled(listRowItem)(
  compose(
    color,
    border,
    space,
  ),
);

ListRow.defaultProps = {
  flexDirection: 'row',
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 20,
  paddingBottom: 20,
  borderBottomWidth: '1px',
  borderBottomColor: 'line',
};

export default ListRow;
