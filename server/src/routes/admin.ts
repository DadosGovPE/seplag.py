import { FastifyPluginAsync } from 'fastify';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/jwt';

const adminRoutes: FastifyPluginAsync = async (fastify) => {
  // Rota de login
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

  // Rota para criar uma nova aula
  fastify.post("/aulas", async (request, reply) => {
    const { title, description, link, date } = request.body as {
      title: string;
      description: string;
      link: string;
      date: string;
    };

    try {
      const newAula = await prisma.aula.create({
        data: {
          title,
          description,
          link,
          date: new Date(date),
        },
      });

      return reply.status(201).send({
        message: "Aula cadastrada com sucesso!",
        aula: newAula,
      });
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ message: "Erro ao tentar cadastrar a aula." });
    }
  });

  // Rota para atualizar uma aula
  fastify.put("/aulas/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const { title, description, link, date } = request.body as {
      title?: string;
      description?: string;
      link?: string;
      date?: string;
    };

    try {
      const updatedAula = await prisma.aula.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          link,
          date: date ? new Date(date) : undefined,
        },
      });

      return reply.status(200).send({
        message: "Aula atualizada com sucesso!",
        aula: updatedAula,
      });
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ message: "Erro ao tentar atualizar a aula." });
    }
  });

  // Rota para deletar uma aula
  fastify.delete("/aulas/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await prisma.aula.delete({
        where: { id: Number(id) },
      });

      return reply.status(200).send({
        message: "Aula deletada com sucesso!",
      });
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ message: "Erro ao tentar deletar a aula." });
    }
  });
};

export default adminRoutes;
