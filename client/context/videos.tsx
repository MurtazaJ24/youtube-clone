import { Loader } from "@mantine/core";
import { createContext, ReactNode, useContext } from "react";
import { RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import { getVideos } from "../api";
import { QueryKeys, Video } from "../types";

const VideosContext = createContext<{
  videos: Video[];
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => any;
  // @ts-ignore
}>(null);

function VideosContextProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery(QueryKeys.videos, getVideos);

  return (
    <VideosContext.Provider value={{ videos: data, refetch }}>
      {isLoading ? <Loader /> : children}
    </VideosContext.Provider>
  );
}

const useVideos = () => useContext(VideosContext);

export { VideosContextProvider, useVideos };
