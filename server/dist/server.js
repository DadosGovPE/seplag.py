"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const cors_2 = require("./config/cors");
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.register(cors_1.default, cors_2.corsConfig);
fastify.register(user_1.default);
fastify.register(admin_1.default);
const start = async () => {
    try {
        await fastify.listen({ port: 3005, host: "0.0.0.0" });
        fastify.log.info(`Servidor rodando na porta ${3005}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
