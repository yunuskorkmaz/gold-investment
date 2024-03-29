import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgArrowDown(props) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow-down_svg__feather arrow-down_svg__feather-arrow-down-left"
      {...props}>
      <Path d="M17 7L7 17M17 17H7V7" />
    </Svg>
  );
}

export default SvgArrowDown;
