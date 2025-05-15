"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import { api } from "../../../convex/_generated/api";



export const TemplatesGallery = () =>{
    const router = useRouter();
    const create = useMutation(api.documents.create)
    const [isCreating,setIsCreating] = useState(false)
    const onTemplateClick = (title:string, initialContent:string) =>{
        setIsCreating(true)
        create({title,initialContent})
        .then((documentId)=>{
            router.push(`/${documentId}`);
        })
        .finally(()=>{
            setIsCreating(false)
        })
    }
  
    return(
        <div className="bg-[#f1f3f4]">
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3>Start a new document</h3>
               <Carousel>
  <CarouselContent className="-ml-4">
    <CarouselItem className="basis-1/2 lg:basis-1/4 pl-4">
      <div
        className={cn(
          "aspect-[3/4] flex flex-col gap-y-2.5",
          isCreating && "pointer-events-none opacity-50"
        )}
      >
        <button
          disabled={isCreating}
           onClick={() => onTemplateClick("Blank Document", "")}
        
          style={{
            backgroundImage: `url(/blank.svg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
          className="size-full hover:border-blue-500 rounded-sm flex flex-col items-center justify-center gap-y-4 bg-white"
        />
        <p className="text-sm font-medium truncate">Blank Document</p>
      </div>
    </CarouselItem>
  </CarouselContent>
</Carousel>

            </div>
           
        </div>
    )
}