import { sql } from "../db.js";
import { randomUUID } from "node:crypto"

export class PostgresDb {
    async ViewVideos(searchParam) {
        let videos;

        if(!searchParam) {
            videos = await sql`select * from videos`;
        } else {
            videos = await sql`select * from videos where title ilike ${"%" + searchParam + "%"}`;
        }

        return videos;
    }

    async CreateVideo(video) {
        const idVideo = randomUUID();
        const { title, description, duration } = video;

        await sql`insert into videos (id, title, description, duration) values (${idVideo}, ${title}, ${description}, ${duration})`
    }

    async UpdateVideo(id, data) {
        const { title, description, duration } = data;

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async DeleteVideo(id) {
        await sql`delete from videos where id = ${id}`
    }
}