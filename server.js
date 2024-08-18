import { fastify } from "fastify";
// import { MemoryDb } from "./database/Database-memory.js"
import { PostgresDb } from "./database/PostgresDb.js";

const server = fastify();
// const Db = new MemoryDb();
const PostGresDb = new PostgresDb();

server.get("/videos", (request, reply) => {
    const searchQuery = request.query.search;
    const videosList = PostGresDb.ViewVideos(searchQuery);

    return videosList;
})

// Request body

server.post("/create", async (request, reply) => {
    const { title, description, duration } = request.body;

    await PostGresDb.CreateVideo({
        title,
        description,
        duration
    })

    return reply.status(201).send();
})

server.put("/video/:id", async (request, reply) => {
    const id = request.params.id;
    const { title, description, duration } = request.body;

    await PostGresDb.UpdateVideo(id, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete("/delete/video/:id", async (request, reply) => {
    const videoId = request.params.id;

    await PostGresDb.DeleteVideo(videoId);

    return reply.status(204);
})

server.listen({
    host: "0.0.0.0",
    port: process.env.PORT ?? 8080,
})