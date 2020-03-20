import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {
  color,
  compose,
  size,
  space,
  flexbox,
  layout,
  border,
} from 'styled-system';

const Button = styled(TouchableOpacity)(
  compose(
    color,
    size,
    space,
    flexbox,
    layout,
    border,
  ),
);

Button.defaultProps = {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Button;
