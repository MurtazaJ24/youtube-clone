import { useRouter } from "next/router";

function WatchVideoPage() {
  const { query } = useRouter();
  const videoId = query.videoId;
  const src = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/video/${videoId}`;
  return (
    <div>
      <video
        src={src}
        width={800}
        height="auto"
        controls
        autoPlay
        id="video-player"
      ></video>
    </div>
  );
}

export default WatchVideoPage;
