import {Liveblocks} from "@liveblocks/node"
import {auth, currentUser} from "@clerk/nextjs/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "../../../../convex/_generated/api";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
// const colors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];
// const randomColor = colors[Math.floor(Math.random() * colors.length)];
const liveblocks = new Liveblocks({
    secret:process.env.LIVEBLOCKS_SECRET_KEY!
})
export async function POST(req:Request){
    const {sessionClaims} = await auth();
    if(!sessionClaims){
        return new Response("Unauthorize",{status:401})
    }

    const user = await currentUser();
    if(!user){
        return new Response("Unauthorize",{status:401})
    }


     const {room} = await req.json();
     const document = await convex.query(api.documents.getbyId,{id:room})

     if(!document){
        return new Response("Unauthorized",{status:401})
     }

    //  const isOwner = document.ownerId === user.id
    //  const isOrganizationMember = document.organizationId === sessionClaims.org_id

    //  if(!isOwner && !isOrganizationMember){
    //     return new Response("Unauthorized",{status:401})
    //  }
    const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous"
    const nameToNumber = name.split("").reduce((acc,char)=>acc+char.charCodeAt(0),0)
    const hue = Math.abs(nameToNumber) % 360
    const color = `hsl(${hue}, 80%, 60%)`;
    const session = liveblocks.prepareSession(user.id,{
        userInfo:{
            name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
            
             color,
            // avatar: user.imageUrl ?? "/default-avatar.png",
        }
    })
    session.allow(room,session.FULL_ACCESS);
    const {body, status} = await session.authorize()
    return new Response(body,{status})
};