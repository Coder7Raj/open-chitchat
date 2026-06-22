import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ error: "rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "bot access denied" });
      } else {
        return res
          .status(403)
          .json({ message: "access denied by security policy" });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bit detected.",
        message: "malicious bot activity detected.",
      });
    }

    next();
  } catch (err) {
    console.error("arcjet protection error", err);
    next();
  }
};
