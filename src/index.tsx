import { useState, useEffect } from "react";

interface IFetchParams {
  url: RequestInfo;
  options?: RequestInit;
  key: string;
  dependsOn?: boolean[];
}

class FetchError extends Error {
  public status: number;
  public statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.statusText = statusText;
  }
}

export const fetchMany = function <T>(params: IFetchParams[]) {
  const urls = params.map(({ url }) => url).join("");
  const blocked = !params
    .map(({ dependsOn }) => dependsOn || [])
    .reduce((prev, x) => [...prev, ...x], [])
    .every((x) => x);
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
          const key = params[index]?.key;
          if (!res.ok) {
            throw new FetchError(
              `Error fetching resource for key ${key}.`,
              res.status,
              res.statusText
            );
          }
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
    if (!blocked) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [urls, blocked]);
  return { data, isLoading, error };
};

export const fetchSingle = function <T>(
  url: RequestInfo,
  options?: RequestInit,
  dependsOn?: boolean[]
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const blocked =
    dependsOn !== undefined &&
    dependsOn.length > 0 &&
    !dependsOn.every((x) => x);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new FetchError(
            "Error fetching resource.",
            res.status,
            res.statusText
          );
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
    if (!blocked) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [url, blocked]);
  return { data, isLoading, error };
};
