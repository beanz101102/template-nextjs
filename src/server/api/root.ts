import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";

export const appRouter = createTRPCRouter({
  post: postRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
