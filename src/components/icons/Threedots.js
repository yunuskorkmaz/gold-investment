import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function SvgThreedots(props) {
  return (
    <Svg
      viewBox="0 0 512 512"
      width="24"
      height="24"
      color="red"
      stroke="red"
      {...props}>
      <Circle cx={256} cy={256} r={64} />
      <Circle cx={256} cy={448} r={64} />
      <Circle cx={256} cy={64} r={64} />
    </Svg>
  );
}

export default SvgThreedots;
