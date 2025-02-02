import { TypedCall } from '@onekeyfe/hd-transport';
import { ERRORS, HardwareErrorCode } from '@onekeyfe/hd-shared';
import { TypedResponseMessage } from '../../device/DeviceCommands';
import { validatePath } from '../helpers/pathUtils';
import { BaseMethod } from '../BaseMethod';
import { validateParams } from '../helpers/paramsValidator';
import { NexaSignTransactionParams, NexaSignature } from '../../types';

export default class NexaSignTransaction extends BaseMethod<NexaSignTransactionParams> {
  hasBundle = false;

  init() {
    const payload = this.payload as NexaSignTransactionParams;

    payload.inputs.forEach(input => {
      validateParams(input, [
        { name: 'path', type: 'string', required: true },
        { name: 'message', type: 'string', required: true },
        { name: 'prefix', type: 'string', required: true },
      ]);
      return input;
    });
    this.params = payload;
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

  async processTxRequest(
    typedCall: TypedCall,
    res: TypedResponseMessage<'NexaTxInputRequest'> | TypedResponseMessage<'NexaSignedTx'>,
    index: number,
    signatures: NexaSignature[]
  ): Promise<NexaSignature[]> {
    const { signature } = res.message;
    if (!signature) {
      throw ERRORS.TypedError(
        HardwareErrorCode.ResponseUnexpectTypeError,
        'signature is not valid'
      );
    }
    if (res.type === 'NexaSignedTx') {
      signatures.push({
        index,
        signature,
      });

      return signatures;
    }

    if (res.type === 'NexaTxInputRequest') {
      signatures.push({
        index,
        signature,
      });

      const nextIndex = res.message.request_index;
      const input = this.params.inputs[nextIndex];
      const response = await typedCall(
        'NexaTxInputAck',
        // @ts-expect-error
        ['NexaTxInputRequest', 'NexaSignedTx'],
        {
          address_n: input.path,
          raw_message: input.message,
        }
      );

      // @ts-expect-error
      return this.processTxRequest(typedCall, response, nextIndex, signatures);
    }

    return signatures;
  }

  async run() {
    const { device, params } = this;
    const input = params.inputs[0];

    const response = await device.commands.typedCall(
      'NexaSignTx',
      ['NexaTxInputRequest', 'NexaSignedTx'],
      {
        address_n: validatePath(input.path, 3),
        raw_message: input.message,
        prefix: input.prefix,
        input_count: params.inputs.length,
      }
    );
    return this.processTxRequest(
      device.commands.typedCall.bind(device.commands),
      response as any,
      0,
      []
    );
  }
}
