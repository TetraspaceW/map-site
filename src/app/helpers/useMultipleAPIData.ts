import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useMultipleApiData =
  (accessToken: string, refreshToken: string) => (endpoints: string[]) => {
    const useApiData = (endpoint: string) => useSWR(endpoint, fetcher("", ""));
    const response = endpoints.map(useApiData);
    return response.reduce(
      (acc, curr) => {
        return {
          data: [...acc.data, curr.data],
          error: acc.error || curr.error,
          isLoading: acc.isLoading || curr.isLoading,
        };
      },
      { data: [] as any[], error: null as any, isLoading: false }
    );
  };
