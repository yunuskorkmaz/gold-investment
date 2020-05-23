/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Box from '../components/box';
import {useTheme} from 'styled-components';
import {inject, observer} from 'mobx-react';
import Label from '../components/text';
import moment from 'moment-timezone';
import DatePicker from 'react-native-datepicker';

import {Picker, TextInput, Button} from 'react-native';

const AddInvestment = ({gold, navigation}) => {
  const {colors} = useTheme();
  const [date, setDate] = React.useState(moment().locale('tr'));
  const [selectedType, setSelectedType] = React.useState(null);
  const [unitPrice, setUnitPrice] = React.useState(0.0);
  const [count, setCount] = React.useState('1');
  const onChangeType = type => {
    setSelectedType(type);
    if (type !== '') {
      var item = gold.data.find(item => item.code == type);
      setUnitPrice(
        parseFloat(item.selling)
          .toFixed(2)
          .toString(),
      );
    } else {
      setUnitPrice(
        parseFloat(0)
          .toFixed(2)
          .toString(),
      );
    }
  };

  const onSave = () => {
    var data = {
      code: selectedType,
      price: unitPrice,
      date: date,
      count: count,
    };
    gold.addInvestment(data);
    navigation.goBack();
  };

  React.useEffect(() => {
    onChangeType('');
  }, []);

  return (
    <Box flex={1} bg="pageBg" p="10px">
      <Box mb={10} borderBottomWidth="1px" borderBottomColor="secondaryText">
        <Label fontSize={11} color="secondaryText">
          Yatırım Türü
        </Label>
        <Picker
          style={{
            backgroundColor: colors.pageBg,
            color: colors.primaryText,
            height: 40,
            borderWidth: 0,
          }}
          prompt="Yatırım Türü"
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => onChangeType(itemValue)}>
          <Picker.Item label="Seçiniz" value="" />
          {gold.data.map(item => {
            return (
              <Picker.Item
                key={item.code}
                label={item.full_name}
                value={item.code}
              />
            );
          })}
        </Picker>
      </Box>
      <Box mb={10} flexDirection="row">
        <Box width="50%" pr="10px">
          <Box
            mb={10}
            borderBottomWidth="1px"
            borderBottomColor="secondaryText">
            <Label fontSize={11} color="secondaryText">
              Adet/Miktar
            </Label>
            <TextInput
              value={count}
              style={{
                borderWidth: 0,
                height: 40,
                textAlignVertical: 'center',
                color: colors.primaryText,
              }}
              keyboardType="numeric"
              onChangeText={e => setCount(parseInt(e))}
            />
          </Box>
        </Box>
        <Box width="50%">
          <Box borderBottomWidth="1px" borderBottomColor="secondaryText">
            <Label fontSize={11} color="secondaryText">
              Birim Fiyatı
            </Label>
            <TextInput
              value={unitPrice.toString()}
              autoCapitalize="none"
              style={{
                borderWidth: 0,
                height: 40,
                textAlignVertical: 'center',
                color: colors.primaryText,
              }}
              editable={true}
              keyboardType="decimal-pad"
              onChangeText={e => setUnitPrice(e || '')}
            />
          </Box>
        </Box>
      </Box>

      <Box mb={10}>
        <Box borderBottomWidth="1px" borderBottomColor="secondaryText">
          <Label fontSize={11} color="secondaryText">
            Tarih
          </Label>
          <DatePicker
            date={date}
            locale="tr-tr"
            mode="date"
            placeholder="select date"
            format="DD MMMM YYYY"
            maxDate={moment().toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            style={{width: '100%'}}
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
              dateText: {
                marginLeft: 5,
                alignSelf: 'flex-start',
                margin: 0,
                padding: 0,
                color: colors.primaryText,
              },
            }}
            onDateChange={date => {
              setDate(moment(date).locale('tr'));
            }}
          />
        </Box>
      </Box>

      <Button onPress={onSave} title="Kaydet" />
    </Box>
  );
};

export default inject('gold')(observer(AddInvestment));
