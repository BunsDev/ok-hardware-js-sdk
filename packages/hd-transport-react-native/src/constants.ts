export const IOS_PACKET_LENGTH = 128;
export const ANDROID_PACKET_LENGTH = 192;

export const isOnekeyDevice = (name: string | null, id?: string): boolean => {
  if (id?.startsWith?.('MI')) {
    return true;
  }

  // 过滤 BixinKeyxxx 和 Kxxxx 和 Txxxx
  // i 忽略大小写模式
  const re = /(BixinKey\d{10})|(K\d{4})|(T\d{4})|(Touch\s\w{4})/i;
  if (name && re.exec(name)) {
    return true;
  }
  return false;
};

type BluetoothServices = Record<
  string,
  {
    serviceUuid: string;
    writeUuid?: string;
    notifyUuid?: string;
  }
>;

const ClassicServiceUUID = '00000001-0000-1000-8000-00805f9b34fb';

const OneKeyServices: Record<string, BluetoothServices> = {
  classic: {
    [ClassicServiceUUID]: {
      serviceUuid: ClassicServiceUUID,
      writeUuid: '00000002-0000-1000-8000-00805f9b34fb',
      notifyUuid: '00000003-0000-1000-8000-00805f9b34fb',
    },
  },
};

const bluetoothServices: string[] = [];

for (const deviceType of Object.keys(OneKeyServices)) {
  const services = OneKeyServices[deviceType];
  bluetoothServices.push(...Object.keys(services));
}

export const getBluetoothServiceUuids = () => bluetoothServices;
export const getInfosForServiceUuid = (serviceUuid: string, deviceType: 'classic') => {
  const services = OneKeyServices[deviceType];
  if (!services) {
    return null;
  }
  const service = services[serviceUuid];
  if (!service) {
    return null;
  }
  return service;
};
