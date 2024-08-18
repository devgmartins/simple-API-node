import { randomUUID } from "node:crypto";

export class MemoryDb {
    #videos = new Map();

    ViewVideos(searchParam) {
        return Array.from(this.#videos.entries())
            .map((videoArr) => {
                const id = videoArr[0];
                const data = videoArr[1];

                return {
                    id,
                    ...data
                }
            }).filter((video) => {
                if(searchParam) {
                    return video.title.includes(searchParam)
                }

                return true;
            })
    }

    CreateVideo(video) {
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    UpdateVideo(id, data) {
        this.#videos.set(id, data);
    }

    DeleteVideo(id) {
        this.#videos.delete(id)
    }
}