import { NexaGetAddress as HardwareNexaGetAddress } from '@onekeyfe/hd-transport';
import { UI_REQUEST } from '../../constants/ui-request';
import { serializedPath, validatePath } from '../helpers/pathUtils';
import { BaseMethod } from '../BaseMethod';
import { validateParams } from '../helpers/paramsValidator';
import { NexaGetAddressParams } from '../../types';

export default class NexaGetAddress extends BaseMethod<HardwareNexaGetAddress[]> {
  hasBundle = false;

  init() {
    this.checkDeviceId = true;
    this.notAllowDeviceMode = [...this.notAllowDeviceMode, UI_REQUEST.INITIALIZE];

    this.hasBundle = !!this.payload?.bundle;
    const payload = this.hasBundle ? this.payload : { bundle: [this.payload] };

    // check payload
    validateParams(payload, [{ name: 'bundle', type: 'array' }]);

    // init params
    this.params = [];
    payload.bundle.forEach((batch: NexaGetAddressParams) => {
      const addressN = validatePath(batch.path, 3);

      validateParams(batch, [
        { name: 'path', required: true },
        { name: 'showOnOneKey', type: 'boolean' },
        { name: 'prefix', type: 'string' },
        { name: 'scheme', type: 'string' },
      ]);

      const showOnOneKey = batch.showOnOneKey ?? true;

      this.params.push({
        address_n: addressN,
        show_display: showOnOneKey,
        prefix: batch.prefix,
        // @ts-expect-error
        scheme: batch.scheme,
      });
    });
  }

  getVersionRange() {
    return {
      model_mini: {
        min: '3.2.0',
      },
      model_touch: {
        min: '4.4.0',
      },
    };
  }

  async run() {
    const responses: {
      path: string;
      pub: string;
      address: string;
    }[] = [];

    for (let i = 0; i < this.params.length; i++) {
      const param = this.params[i];

      const res = await this.device.commands.typedCall('NexaGetAddress', 'NexaAddress', {
        ...param,
      });

      const { address } = res.message;

      const result = {
        path: serializedPath(param.address_n),
        pub: res.message.public_key,
        address,
      };
      responses.push(result);
      this.postPreviousAddressMessage(result);
    }

    return Promise.resolve(this.hasBundle ? responses : responses[0]);
  }
}
