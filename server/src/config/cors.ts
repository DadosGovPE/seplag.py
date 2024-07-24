import cors from "@fastify/cors";

export const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
