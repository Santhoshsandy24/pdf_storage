import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { Heading1 } from "lucide-react";
import Link from "next/link";
import {LogIn} from "lucide-react"
import Fileupload from "@/components/ui/Fileupload";


export default async function Home() {
  const {userId} = await auth() 
  const isAuth = !!userId
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-red-200 via-red-300 to-yellow-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center ">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl f">Chat With Any PDF </h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Go to chat</Button>}
          </div>
          <p className="max-w-xl mr-1 text-lg text-slate-600">Join Million of students, Researcher and professional to instally answer the question and understand research with AI  </p>
          
          <div className="w-full mt-4">
            {isAuth ? ( 
            <Fileupload/>
            ):(
              <Link href="/sign-in">
                <Button>login to get started
                  <LogIn className="w-4 h-4 ml-2"/>

                  
                </Button>

              </Link>
            )}
          </div>
          </div>

        </div>
      </div>
  )
}
