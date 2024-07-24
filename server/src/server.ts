import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import jwt from 'jsonwebtoken';

const fastify = Fastify();
const prisma = new PrismaClient();

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

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

fastify.post("/admin-login", async (request, reply) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return reply.status(401).send({ message: "Credenciais inválidas." });
    }

    if (admin.password !== password) {
      return reply.status(401).send({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      'afsdagdhfdagdsfds',
      { expiresIn: '1h' }
    );
    console.log(token);
    

    return reply.status(200).send({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Erro ao tentar fazer login." });
  }
});

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
