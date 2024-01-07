import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { TicketType } from "@/core/types";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const submitTicket = mutation({
  args: {
    pictureId: v.id("_storage"),
    name: v.string(),
    email: v.string(),
    date: v.string(),
    description: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tickets", {
      pictureId: args.pictureId,
      format: "image",
      name: args.name,
      email: args.email,
      date: args.date,
      description: args.description,
      status: args.status,
      response: "",
    });
  },
});

export const updateTicket = mutation({
  args: {
    id: v.id("tickets"),
    values: v.object({
      response: v.string(),
      status: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      ...args.values,
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const tickets = await ctx.db.query("tickets").collect();
    const ticketList: TicketType[] = await Promise.all(
      tickets.map(async (ticket) => ({
        ...ticket,
        ...(ticket.format === "image"
          ? { image: await ctx.storage?.getUrl?.(ticket.pictureId) }
          : {}),
      }))
    );
    return ticketList;
  },
});
