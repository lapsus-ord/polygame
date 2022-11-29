import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const server: FastifyInstance = fastify();

server.get("/ping", async (request: FastifyRequest, reply: FastifyReply) => {
  return "pong\n";
});

server.listen({ port: 8080 }, (err: Error | null, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
