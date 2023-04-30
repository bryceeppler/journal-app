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
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  create: publicProcedure
    // body is of JSONContent type
    .input(
      z.object({ authorId: z.string(), body: z.unknown(), title: z.string() })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.journalEntry.create({
        data: {
          title: input.title,
          authorId: input.authorId,
          body: JSON.stringify(input.body),
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        body: z.optional(z.unknown()),
        title: z.optional(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.journalEntry.update({
        where: {
          id: input.id,
        },
        data: {
          body: JSON.stringify(input.body),
          title: input.title,
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
