import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const animalRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ ownerId: z.string().min(1), species: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.animal.create({
        data: {
          ownerId: input.ownerId,
          species: input.species,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.animal.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure
    .input(z.object({ ownerId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.animal.findMany({
        take: 100,
        where: { ownerId: input.ownerId },
        orderBy: { name: "asc" },
      });
    }),

  deleteMany: publicProcedure
    .input(z.object({ animalIds: z.string().min(1).array() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.animal.deleteMany({
        where: { id: { in: input.animalIds } },
      });
    }),
});
