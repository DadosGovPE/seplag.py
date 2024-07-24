// src/routes/userRoutes.ts
import { FastifyPluginAsync } from "fastify";
import prisma from "../prisma";

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post("/newsletter_subscribe", async (request, reply) => {
    try {
      const { email, nome } = request.body as { email: string; nome: string };

      await prisma.user.create({
        data: {
          email,
          nome,
        },
      });

      return reply.send({ message: "Subscription successful!" });
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ message: "Failed to add subscription" });
    }
  });

  fastify.get("/buscar-aulas", async (request, reply) => {
    try {
      const aulas = await prisma.aula.findMany();
      return reply.send(aulas);
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ message: "Failed to retrieve classes" });
    }
  });
};

export default userRoutes;
