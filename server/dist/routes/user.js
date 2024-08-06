"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const userRoutes = async (fastify) => {
    fastify.post("/newsletter_subscribe", async (request, reply) => {
        try {
            const { email, nome } = request.body;
            await prisma_1.default.user.create({
                data: {
                    email,
                    nome,
                },
            });
            return reply.send({ message: "Subscription successful!" });
        }
        catch (err) {
            request.log.error(err);
            return reply.status(500).send({ message: "Failed to add subscription" });
        }
    });
    fastify.get("/aulas", async (request, reply) => {
        try {
            const aulas = await prisma_1.default.aula.findMany();
            return reply.send(aulas);
        }
        catch (err) {
            request.log.error(err);
            return reply.status(500).send({ message: "Failed to retrieve classes" });
        }
    });
};
exports.default = userRoutes;
