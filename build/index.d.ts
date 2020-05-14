interface IFetchParams {
    url: RequestInfo;
    options?: RequestInit;
    key: string;
}
export declare const fetchMany: <T>(params: IFetchParams[]) => {
    data: T | undefined;
    isLoading: boolean;
    error: any;
};
export declare const fetchSingle: <T>(url: RequestInfo, options?: RequestInit | undefined) => {
    data: T | undefined;
    isLoading: boolean;
    error: any;
};
export {};
