import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgArrowUp(props) {
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
      className="arrow-up_svg__feather arrow-up_svg__feather-arrow-up-right"
      {...props}>
      <Path d="M7 17L17 7M7 7h10v10" />
    </Svg>
  );
}

export default SvgArrowUp;
