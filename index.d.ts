
export declare interface BaseDataConfig {
    method: string
    url: string
}

export declare type SerializyInstance = Function
export declare interface RequestConfig extends BaseDataConfig {}
export declare interface ResponseConfig extends BaseDataConfig {
    isError: boolean
    errorModel: SerializyInstance
    error: object | any
}

export declare function deserializeRequestData(model: SerializyInstance, data: any, config: RequestConfig): { data: object }
export declare function serializeResponseData(model: SerializyInstance, data: any, config: ResponseConfig): { data: object, error: object | any }
