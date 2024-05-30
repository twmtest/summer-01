import prisma from "@/app/lib/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const { userId, filename, uploaded, variants } = await req.json();
        await prisma.image.create({
            data: {
                userId,
                imageUrl: variants[0],
                imageName: filename,
                createdAt: new Date(uploaded),
            },
        });
        
        
        
        return NextResponse.json({message:'uploadSuccess'})
    } catch (error) {
        console.error('Error uploading image:', error);
        
    }
}

export async function GET(req: NextRequest, res: NextApiResponse){
    try{
       const images = await prisma.image.findMany({
        select: {
            imageUrl: true,
            imageName: true,
            id: true,
          },
       })
       
       return NextResponse.json({ images });
    }catch(error){
        console.log('Error get image',error)
    }
}