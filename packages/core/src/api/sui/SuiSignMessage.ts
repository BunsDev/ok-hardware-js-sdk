import { SuiSignMessage as HardwareSuiSignMessage } from '@onekeyfe/hd-transport';
import { UI_REQUEST } from '../../constants/ui-request';
import { validatePath } from '../helpers/pathUtils';
import { BaseMethod } from '../BaseMethod';
import { validateParams } from '../helpers/paramsValidator';
import { stripHexPrefix } from '../helpers/hexUtils';

export default class SuiSignMessage extends BaseMethod<HardwareSuiSignMessage> {
  init() {
    this.checkDeviceId = true;
    this.notAllowDeviceMode = [...this.notAllowDeviceMode, UI_REQUEST.INITIALIZE];

    // check payload
    validateParams(this.payload, [
      { name: 'path', required: true },
      { name: 'messageHex', type: 'hexString', required: true },
    ]);

    const { path, messageHex } = this.payload;
    const addressN = validatePath(path, 3);

    // init params
    this.params = {
      address_n: addressN,
      message: stripHexPrefix(messageHex),
    };
  }

  getVersionRange() {
    return {
      model_mini: {
        min: '3.4.0',
      },
      model_touch: {
        min: '4.6.0',
      },
    };
  }

  async run() {
    const response = await this.device.commands.typedCall('SuiSignMessage', 'SuiMessageSignature', {
      ...this.params,
    });

    return Promise.resolve(response.message);
  }
}
