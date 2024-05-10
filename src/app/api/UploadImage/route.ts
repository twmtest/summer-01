import prisma from "@/app/lib/db";
import type { NextApiRequest, NextApiResponse } from 'next'
import { UploadRequest } from "@/app/types/uploadDatabase";
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
