import Fastify from "fastify";
import cors from "@fastify/cors";
import { corsConfig } from "./config/cors";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, corsConfig);

fastify.register(userRoutes);
fastify.register(adminRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3005, host: "0.0.0.0" });
    fastify.log.info(`Servidor rodando na porta ${3005}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
