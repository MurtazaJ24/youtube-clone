import { SimpleGrid } from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import { ReactElement } from "react";
import VideoTeaser from "../components/VideoTeaser";
import { useVideos } from "../context/videos";
import HomePageLayout from "../layout/Home";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { videos } = useVideos();
  return (
    <div className={styles.container}>
      <SimpleGrid cols={3}>
        {videos.map((video) => (
          <VideoTeaser key={video.videoId} video={video} />
        ))}
      </SimpleGrid>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;
