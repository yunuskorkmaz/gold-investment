import React from 'react';
import {
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';
import Box from '../components/box';
import {useTheme} from 'styled-components';
import {inject, observer} from 'mobx-react';
import Label from '../components/text';
import moment from 'moment-timezone';

import {
  TextInput,
  Picker,
  Keyboard,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} from 'react-native';

const AddInvestment = ({gold}) => {
  const {colors} = useTheme();
  const [date, setDate] = React.useState(moment().toDate());
  const [show, setShow] = React.useState(false);

  return (
    <Box flex={1} bg="pageBg" p="10px">
      <Box>
        {/* <Dropdown
          baseColor={colors.primaryText}
          overlayStyle={{backgroundColor: colors.pageBg}}
          pickerStyle={{backgroundColor: colors.listItemBg}}
          textColor={colors.primaryText}
          itemColor={colors.primaryText}
          itemCount={8}
          label="Altın Türü"
          data={gold.data.map(a => Object.assign({}, {value: a.full_name}))}
        /> */}
        <Box mb={10} borderBottomWidth="1px" borderBottomColor="secondaryText">
          <Box
            bg="pageBg"
            as={Picker}
            color="primaryText"
            prompt="Yatırım Türü">
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Box>
        </Box>
      </Box>
      <Box width="100%">
        <Box
          padding={0}
          borderBottomColor="#777"
          borderBottomWidth="1px"
          height={40}>
          <Box
            as={TouchableOpacity}
            justifyContent="center"
            onPress={() => setShow(true)}
            flex={1}>
            <Label color="primaryText">{date.toString()}</Label>
          </Box>
        </Box>
        {show && <></>}
      </Box>
      <Box width="50%">
        {/* <TextField
          label="Phone number"
          keyboardType="decimal-pad"
          baseColor={colors.primaryText}
          textColor={colors.primaryText}
        /> */}
      </Box>
      <Label>{date.toString()}</Label>
    </Box>
  );
};

export default inject('gold')(observer(AddInvestment));
