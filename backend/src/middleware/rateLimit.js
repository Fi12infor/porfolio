import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const publicApiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  keyGenerator: (req) => {
    const cloudflareIp = req.headers["cf-connecting-ip"];

    return ipKeyGenerator(cloudflareIp || req.ip);
  },

  message: {
    error: "Demasiadas solicitudes. Inténtalo de nuevo en un minuto.",
  },
});
