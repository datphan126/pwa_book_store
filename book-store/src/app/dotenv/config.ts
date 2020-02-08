import * as loadedConfig from "!val-loader!./config-loader";

export interface IConfig {
    cfg: {
        backendHost: '',
        backendPort: '',
        backendProtocol: ''
    };
}

export const config = loadedConfig as IConfig;