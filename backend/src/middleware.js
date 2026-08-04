import { env } from "cloudflare:workers";

export function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Autenticación necesaria.",
    });
  }

  const token = authorization.slice(7);

  if (token !== env.ADMIN_API_KEY) {
    return res.status(403).json({
      error: "No tienes permisos para realizar esta acción.",
    });
  }

  next();
}
