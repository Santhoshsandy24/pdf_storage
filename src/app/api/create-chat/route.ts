import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server"

export async function POST(req:Request,res: Response) {
    try {
        const Body = await req.json()
        const {file_key,file_name } = Body;
        console.log(file_key,file_name);
        const pages = await loadS3IntoPinecone(file_key);
        return NextResponse.json({pages});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error:"internl server error "
            },
            {
                status:500
            }
        );
    }
    
}