import { cert, initializeApp } from "firebase-admin/app";
import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});
