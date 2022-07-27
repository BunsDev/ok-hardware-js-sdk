import { BaseMethod } from './BaseMethod';

import { getFirmwareReleaseInfo } from './firmware/releaseHelper';

export default class CheckFirmwareRelease extends BaseMethod {
  init() {}

  run() {
    if (this.device.features) {
      const releaseInfo = getFirmwareReleaseInfo(this.device.features);
      return Promise.resolve(releaseInfo);
    }
    return Promise.resolve(null);
  }
}
