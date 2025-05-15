import {mutation, query} from "./_generated/server"
import {ConvexError, v} from "convex/values"


export const create = mutation({
    args:{title:v.optional(v.string()), initialContent:v.optional(v.string())},
    handler: async (ctx,args) =>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("unauthorize");
        }
        const documentId = await ctx.db.insert("documents",{
            title: args.title ?? "Untitled coumnt",
            ownerId: user.subject,
            initialContent: args.initialContent,
        })
        return documentId;
    }
});



export const get = query({
    handler:async(ctx) => {
        return await ctx.db.query("documents").collect()
    }
})

export const getbyId = query({
    args:{id: v.id("documents")},
    handler: async(ctx,{id}) => {
        return await ctx.db.get(id);
        
    },
});