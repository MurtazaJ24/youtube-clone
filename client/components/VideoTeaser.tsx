import { Card, Text } from "@mantine/core";
import Link from "next/link";
import { Video } from "../types";

function VideoTeaser({ video }: { video: Video }) {
  return (
    <Link href={`/watch/${video.videoId}`}>
      <Card shadow="sm" p="xl">
        <Text weight={500} size="lg">
          {video.title}
        </Text>
        <Text size="sm">{video.description}</Text>
      </Card>
    </Link>
  );
}

export default VideoTeaser;
