"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const adminRoutes = async (fastify) => {
    fastify.post("/admin-login", async (request, reply) => {
        const { email, password } = request.body;
        try {
            const admin = await prisma_1.default.admin.findUnique({
                where: { email },
            });
            if (!admin) {
                return reply.status(401).send({ message: "Credenciais inválidas." });
            }
            if (admin.password !== password) {
                return reply.status(401).send({ message: "Credenciais inválidas." });
            }
            const token = jsonwebtoken_1.default.sign({ id: admin.id, email: admin.email }, jwt_1.JWT_SECRET, {
                expiresIn: jwt_1.JWT_EXPIRATION,
            });
            return reply.status(200).send({
                message: "Login bem-sucedido!",
                token,
                user: {
                    id: admin.id,
                    email: admin.email,
                },
            });
        }
        catch (err) {
            request.log.error(err);
            return reply.status(500).send({ message: "Erro ao tentar fazer login." });
        }
    });
    fastify.post("/aulas", async (request, reply) => {
        const { title, description, link, date } = request.body;
        try {
            const newAula = await prisma_1.default.aula.create({
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
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar cadastrar a aula." });
        }
    });
    fastify.put("/aulas/:id", async (request, reply) => {
        const { id } = request.params;
        const { title, description, link, date } = request.body;
        try {
            const updatedAula = await prisma_1.default.aula.update({
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
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar atualizar a aula." });
        }
    });
    fastify.delete("/aulas/:id", async (request, reply) => {
        const { id } = request.params;
        try {
            await prisma_1.default.aula.delete({
                where: { id: Number(id) },
            });
            return reply.status(200).send({
                message: "Aula deletada com sucesso!",
            });
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar deletar a aula." });
        }
    });
    fastify.post("/agendamentos", async (request, reply) => {
        const { content, date, createdAt } = request.body;
        if (!content || !date) {
            return reply.status(400).send({
                message: "Campos 'content' e 'date' são obrigatórios.",
            });
        }
        try {
            const newAgendamento = await prisma_1.default.agendamento.create({
                data: {
                    content: content,
                    date: new Date(date),
                    createdAt: new Date(Date.now())
                },
            });
            return reply.status(201).send({
                message: "Agendamento criado com sucesso!",
                agendamento: newAgendamento,
            });
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar criar o agendamento." });
        }
    });
    fastify.get("/agendamentos", async (request, reply) => {
        try {
            const agendamentos = await prisma_1.default.agendamento.findMany({
                orderBy: { date: "asc" },
            });
            return reply.status(200).send(agendamentos);
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar listar os agendamentos." });
        }
    });
    fastify.put("/agendamentos/:id", async (request, reply) => {
        const { id } = request.params;
        const { content, date } = request.body;
        try {
            const updatedAgendamento = await prisma_1.default.agendamento.update({
                where: { id: Number(id) },
                data: {
                    content,
                    date: date ? new Date(date) : undefined,
                },
            });
            return reply.status(200).send({
                message: "Agendamento atualizado com sucesso!",
                agendamento: updatedAgendamento,
            });
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar atualizar o agendamento." });
        }
    });
    fastify.delete("/agendamentos/:id", async (request, reply) => {
        const { id } = request.params;
        try {
            await prisma_1.default.agendamento.delete({
                where: { id: Number(id) },
            });
            return reply.status(200).send({
                message: "Agendamento deletado com sucesso!",
            });
        }
        catch (err) {
            request.log.error(err);
            return reply
                .status(500)
                .send({ message: "Erro ao tentar deletar o agendamento." });
        }
    });
};
exports.default = adminRoutes;
