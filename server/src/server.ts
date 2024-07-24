import Fastify from "fastify";
import cors from "@fastify/cors";
import { corsConfig } from "./config/cors";
import newsletterRoutes from "./routes/newsletter";
import adminRoutes from "./routes/admin";

const fastify = Fastify();

fastify.register(cors, corsConfig);

fastify.register(newsletterRoutes);
fastify.register(adminRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
