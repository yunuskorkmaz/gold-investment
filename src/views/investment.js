import React, {useState} from 'react';
import {
  StatusBar,
  Button,
  FlatList,
  Picker,
  Modal,
  View,
  Alert,
} from 'react-native';
import Box from '../components/box';
import Label from '../components/text';
import {inject, observer} from 'mobx-react';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment-timezone';
import {Threedots, SettingsIcon} from '../components/icons';
import {useTheme} from 'styled-components';
import OptionPopup from '../components/OptionPopup';

function InvestmentScreen({navigation, gold}) {
  const {colors} = useTheme();
  navigation.setOptions({
    headerRight: () => <Label>TEST</Label>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
    },
  });

  useFocusEffect(React.useCallback(() => {}, []));

  const createConfirmDialog = id => {
    Alert.alert('', 'Bu yatırımı silmek istediğinize emin misiniz?', [
      {
        text: 'İptal',
      },
      {
        text: 'Tamam',
        onPress: () => gold.deleteInvestment(id),
      },
    ]);
  };

  return (
    <Box flex={1} bg="pageBg">
      <Box
        bg="listItemBg"
        p={10}
        mb={15}
        flexDirection="column"
        alignItems="center">
        <Label>Bakiye</Label>
        <Label fontSize={19}>₺{gold.totalValue.toFixed(2)}</Label>
        <Label>Kar/Zarar</Label>
        <Label
          fontSize={18}
          p={5}
          bg={gold.totalGain <= 0 ? 'red' : 'green'}
          m={2}>
          ₺{Math.abs(gold.totalGain.toFixed(2))}
        </Label>
        <Label
          fontSize={18}
          p={5}
          bg={gold.totalGain <= 0 ? 'red' : 'green'}
          m={2}>
          %{gold.totalPercentGain}
        </Label>
      </Box>

      <FlatList
        keyExtractor={item => item.date.toString()}
        data={gold.investments}
        renderItem={({item}) => {
          var data = gold.data.filter(a => a.code === item.code)[0];
          var value = data.selling.toFixed(2);
          var diff = parseFloat(data.selling) - parseFloat(item.price);
          return (
            <Box bg="listItemBg" p={10} ml={10} mr={10} mb={15}>
              <Box mb={5} flexDirection="row">
                <Box width="55%">
                  <Label fontSize={17}>{data.full_name}</Label>
                </Box>
                <Box flex={2}>
                  <Label fontSize={11}>{item.count} Adet</Label>
                </Box>
                <Box width={25} alignItems="center" justifyContent="center">
                  <OptionPopup
                    options={['Sil']}
                    actions={[() => createConfirmDialog(item.id)]}
                  />
                </Box>
              </Box>
              <Box mb={5} flexDirection="row">
                <Box width="55%">
                  <Label fontWeight="bold">
                    ₺{item.price}
                    {item.count > 1 ? `x${item.count}` : ''}
                  </Label>
                  <Label fontSize={11}>Alış</Label>
                </Box>
                <Box width="50%">
                  <Label color={diff <= 0 ? 'red' : 'green'} fontWeight="bold">
                    ₺{Math.abs(item.count * value).toFixed(2)}
                  </Label>
                  <Label fontSize={11}>Değer</Label>
                </Box>
              </Box>
              <Box mb={5} flexDirection="row">
                <Box width="55%">
                  <Label fontWeight="bold">
                    {moment(item.date)
                      .locale('tr')
                      .format('DD MMMM YYYY')}
                  </Label>
                  <Label fontSize={11}>Tarih</Label>
                </Box>
                <Box width="50%">
                  <Label color={diff <= 0 ? 'red' : 'green'} fontWeight="bold">
                    ₺{Math.abs(item.count * diff).toFixed(2)}
                  </Label>
                  <Label fontSize={11}>Değişim</Label>
                </Box>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
}
export default inject('gold')(observer(InvestmentScreen));
