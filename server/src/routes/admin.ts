import { FastifyPluginAsync } from 'fastify';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwt';

const adminRoutes: FastifyPluginAsync = async (fastify) => {
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
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

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
};

export default adminRoutes;