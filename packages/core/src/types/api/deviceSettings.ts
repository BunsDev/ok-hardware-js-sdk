import { SafetyCheckLevel, Success } from '@onekeyfe/hd-transport/src/types/messages';
import type { Response } from '../params';

export type DeviceSettingsParams = {
  language?: string;
  label?: string;
  usePassphrase?: boolean;
  homescreen?: string;
  passphraseSource?: number;
  autoLockDelayMs?: number;
  displayRotation?: number;
  passphraseAlwaysOnDevice?: boolean;
  safetyChecks?: SafetyCheckLevel;
  experimentalFeatures?: boolean;
};

export declare function deviceSettings(connectId: string): Response<Success>;
