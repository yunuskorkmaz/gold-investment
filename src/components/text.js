import React from 'react';
import {Text} from 'react-native';
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

const Label = styled(Text)(
  compose(
    color,
    size,
    space,
    flexbox,
    border,
    typography,
  ),
);
Label.defaultProps = {
  color: 'primaryText',
};
export default Label;
