import { rateLimit, ipKeyGenerator } from "express-rate-limit";

export const publicApiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  keyGenerator: (req) => {
    const cloudflareIp = req.get("cf-connecting-ip");
    const forwardedIp = req.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ip = cloudflareIp || forwardedIp || req.ip;

    if (!ip) {
      return "unknown-client";
    }

    return ipKeyGenerator(ip);
  },

  message: {
    error: "Demasiadas solicitudes. Inténtalo de nuevo en un minuto.",
  },
});
