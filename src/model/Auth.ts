import { AuthChecker } from "type-graphql";
import jwt from "jwt-simple";

import { Context } from "../types/context";

export const getPayload = (ctx: Context) => {
  // return { message: "Autenticated", exp: new Date().setMilliseconds(2000) };

  const auth = ctx.request.headers?.authorization;
  const token = auth && auth.substring(7)

  if (!token) return false;

  return jwt.decode(token, process.env.APP_AUTH_SECRET);
}

export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles,
) => {
  const payload = getPayload(context);

  if (!payload) return false;

  if(new Date(payload.exp * 1000) <= new Date()) return false;

  return true;
};

