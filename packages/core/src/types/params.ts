export interface CommonParams {
  keepSession?: boolean;
  /**
   * polling connect max retry count
   */
  retryCount?: number;
  /**
   * polling interval time
   */
  pollIntervalTime?: number;
  /**
   * Timeout time for single polling
   */
  timeout?: number;
}

export type Params<T> = CommonParams & T & { bundle?: undefined };

export interface Unsuccessful {
  success: false;
  payload: { error: string; code?: string | number };
}

export interface Success<T> {
  success: true;
  payload: T;
}

export type Response<T> = Promise<Success<T> | Unsuccessful>;
