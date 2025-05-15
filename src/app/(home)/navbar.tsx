import Image from "next/image"
import Link from "next/link"
// import { SearchInput } from "./search-input"

export const Navbar = () =>{
    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image className="mx-2 my-2" src="/logo.svg" alt="logo" width={30} height={70} />
                </Link>
                <p className="text-md font-semibold text-2xl text-zinc-600">Collaborative Document</p>
            </div> 
            
        </nav>
    )
}