import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const journalEntryRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.journalEntry.findMany();
  }),
  getByAuthor: publicProcedure
    .input(z.object({ authorId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.journalEntry.findMany({
        where: {
          authorId: input.authorId,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ authorId: z.string(), body: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.journalEntry.create({
        data: {
          authorId: input.authorId,
          body: input.body,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        body: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.journalEntry.update({
        where: {
          id: input.id,
        },
        data: {
          body: input.body,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.journalEntry.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
