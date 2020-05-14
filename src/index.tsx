import { useState, useEffect } from "react";

interface IFetchParams {
  url: RequestInfo;
  options?: RequestInit;
  key: string;
}

export const FetchMany = function <T>(params: IFetchParams[]) {
  const urls = params.map(({ url }) => url).join("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const promiseArray: Promise<Response>[] = params.map(({ url, options }) =>
        fetch(url, options)
      );
      try {
        const responses = await Promise.all(promiseArray);
        const allData: { [key: string]: any } = {};
        let index = 0;
        for (const res of responses) {
          if (!res.ok) {
            throw new Error();
          }
          const key = params[index]?.key;
          try {
            allData[key] = await res.json();
          } catch (err) {
            // do nothing
          }

          index++;
        }
        setData((allData as unknown) as T);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [urls]);
  return { data, isLoading, error };
};

export const FetchSingle = function <T>(
  url: RequestInfo,
  options?: RequestInit
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error();
        }
        try {
          const jsonData = await res.json();
          setData((jsonData as unknown) as T);
        } catch (err) {
          // do nothing
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [url]);
  return { data, isLoading, error };
};
