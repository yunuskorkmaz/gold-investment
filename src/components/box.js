import {View} from 'react-native';
import styled from 'styled-components';
import {
  color,
  compose,
  size,
  space,
  flexbox,
  border,
  boxShadow,
  borderWidth,
  borderColor,
} from 'styled-system';

const Box = styled(View)(
  compose(
    color,
    size,
    space,
    flexbox,
    border,
    boxShadow,
    borderWidth,
    borderColor,
  ),
);

export default Box;
