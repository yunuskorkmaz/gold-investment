import React, {useState} from 'react';
import {
  Layout,
  Text,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Divider,
  List,
  Card,
} from '@ui-kitten/components';
import {SafeAreaView, View, StyleSheet} from 'react-native';

const data = [
  {
    buying: 379.918,
    change_rate: 0.6999,
    code: 'gram-altin',
    full_name: 'Gram Altın',
    latest: 377,
    max: 380.8206,
    min: 376.5913,
    name: 'gram-altin',
    selling: 380.4235,
    shortName: 'Altın',
    subtitle: 'Gram Altın',
  },
  {
    buying: 379.918,
    change_rate: 0.6999,
    code: 'gram-altin',
    full_name: 'Gram Altın',
    latest: 377,
    max: 380.8206,
    min: 376.5913,
    name: 'gram-altin',
    selling: 380.4235,
    shortName: 'Altın',
    subtitle: 'Gram Altın',
  },
];

const Markets = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <Card style={styles.itemContainer}>
        <View style={styles.itemRow}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>{item.full_name}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text>{item.buying.toFixed(2)} </Text>
            <Text>{item.buying.toFixed(2)} </Text>
          </View>
          {/* <Text style={styles.itemCell}>{item.selling.toFixed(2)} </Text>
          <Text style={styles.itemCell}>%{item.change_rate.toFixed(2)}</Text> */}
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MarketsPageHeader
        onPressSetting={() => navigation.navigate('Settings')}
      />
      <Layout style={{flex: 1}}>
        <List
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{flex: 1, height: 10}} />}
        />
      </Layout>
    </SafeAreaView>
  );
};

export default Markets;

const MarketsPageHeader = ({onPressSetting}) => {
  const SettingsIcon = props => {
    return <Icon {...props} name="settings-2-outline" />;
  };
  return (
    <>
      <TopNavigation
        accessoryRight={() => (
          <TopNavigationAction icon={SettingsIcon} onPress={onPressSetting} />
        )}
        title="Altın Cüzdanı"
      />
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  itemFirstCell: {
    flex: 1,
  },
  itemCell: {
    width: '20%',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});
