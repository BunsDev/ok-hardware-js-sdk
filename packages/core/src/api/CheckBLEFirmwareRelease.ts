import { BaseMethod } from './BaseMethod';

import { UI_REQUEST } from '../constants/ui-request';
import { getBleFirmwareReleaseInfo } from './firmware/releaseHelper';

export default class CheckBLEFirmwareRelease extends BaseMethod {
  init() {
    this.notAllowDeviceMode = [...this.notAllowDeviceMode, UI_REQUEST.BOOTLOADER];
    this.checkDeviceId = true;
    this.useDevicePassphraseState = false;
    this.skipForceUpdateCheck = true;
  }

  run() {
    if (this.device.features) {
      const releaseInfo = getBleFirmwareReleaseInfo(this.device.features);
      return Promise.resolve(releaseInfo);
    }
    return Promise.resolve(null);
  }
}
