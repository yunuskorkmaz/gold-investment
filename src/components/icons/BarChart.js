import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgBarChart(props) {
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
      className="bar-chart_svg__feather bar-chart_svg__feather-bar-chart-2"
      {...props}>
      <Path d="M18 20V10M12 20V4M6 20v-6" />
    </Svg>
  );
}

export default SvgBarChart;
