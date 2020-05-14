interface IFetchParams {
    url: RequestInfo;
    options?: RequestInit;
    key: string;
}
export declare const FetchMany: <T>(params: IFetchParams[]) => {
    data: T | undefined;
    isLoading: boolean;
    error: any;
};
export declare const FetchSingle: <T>(url: RequestInfo, options?: RequestInit | undefined) => {
    data: T | undefined;
    isLoading: boolean;
    error: any;
};
export {};
