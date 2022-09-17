import { Video, VideoModel } from "./video.model";

export function createVideo(owner: string) {
  return VideoModel.create({ owner });
}

export function findVideoById(id: Video["videoId"]) {
  return VideoModel.findOne({ videoId: id });
}

export function findVideos() {
  return VideoModel.find({ published: true }).lean();
}
