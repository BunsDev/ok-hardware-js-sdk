import { CoreApi } from '@onekeyfe/hd-core';
import React, { useEffect } from 'react';
import { View, Text, Platform, PermissionsAndroid, ScrollView } from 'react-native';

import { CallMethods } from '../../components/CallMethods';
import { getHardwareSDKInstance } from '../../utils/hardwareInstance';

let isSdkInit = false;

const requestLocationPermission = async () => {
  const permissionRequest = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  const granted = permissionRequest === PermissionsAndroid.RESULTS.GRANTED;
  console.log('Location permission granted: ', granted);
  return granted;
};

const requestBluetoothPermission = async () => {
  const permissionRequest = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
  );
  const granted = permissionRequest === PermissionsAndroid.RESULTS.GRANTED;
  console.log('Bluetooth permission granted: ', granted);
  return granted;
};
const requestBluetoothScanPermission = async () => {
  const permissionRequest = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
  );
  const granted = permissionRequest === PermissionsAndroid.RESULTS.GRANTED;
  console.log('Bluetooth permission granted: ', granted);
  return granted;
};

export default function Bluetooth() {
  const [sdk, createSDK] = React.useState<CoreApi>();
  const sdkInit = () => {
    getHardwareSDKInstance().then(res => {
      createSDK(res);
      res.on('UI_EVENT', event => {
        console.log('example received UI_EVENT: ', event);
      });
    });
  };

  useEffect(() => {
    (async () => {
      console.log('Bluetooth init');

      if (!isSdkInit) {
        if (Platform.OS === 'android') {
          console.log('Bluetooth android request permission');
          try {
            if (Platform.Version >= 23 && !(await requestLocationPermission())) return;
            if (Platform.Version >= 31 && !(await requestBluetoothPermission())) return;
            if (Platform.Version >= 31 && !(await requestBluetoothScanPermission())) return;
          } catch (e) {
            console.log('request permission error:', e);
            return;
          }
        }

        console.log('Bluetooth SDK init');

        sdkInit();
        isSdkInit = true;
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>This is Bluetooth example page, will run on iOS / Android device. </Text>
        {sdk && <CallMethods SDK={sdk} type="Bluetooth" />}
      </View>
    </ScrollView>
  );
}
