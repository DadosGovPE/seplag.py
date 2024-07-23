import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Registro do plugin CORS
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Rota para inscrição na newsletter
fastify.post('/newsletter_subscribe', async (request, reply) => {
  try {
    const { email, nome } = request.body as { email: string, nome: string };

    // Adiciona o usuário ao banco de dados
    await prisma.user.create({
      data: {
        email,
        nome,
      },
    });

    return reply.send({ message: 'Subscription successful!' });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: 'Failed to add subscription' });
  }
});

// Rota para login do administrador
fastify.post('/admin-login', async (request, reply) => {
  const { email, password } = request.body as { email: string, password: string };

  try {
    // Encontre o administrador no banco de dados
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' });
    }

    // Verifique a senha (supondo que a senha esteja em texto simples no banco de dados)
    if (admin.password !== password) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' });
    }

    return reply.send({ message: 'Login bem-sucedido!' });
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: 'Erro ao tentar fazer login.' });
  }
});

// Inicializa o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
