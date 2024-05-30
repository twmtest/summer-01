import prisma from "@/app/lib/db";
import { parse } from 'url';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse){
    try{
        const parsedUrl = parse(req.url!, true);
        const imageId = parseInt(parsedUrl.query.imageId as string, 10); // 将 imageId 转换为数字类型
    
        if (isNaN(imageId)) {
          return res.status(400).json({ error: 'Invalid imageId' });
        }

        // 这里执行根据 userId 查询图片的逻辑
        const images = await prisma.image.findMany({
            where:{
                id:imageId
            },
            select: {
                imageUrl: true,
                imageName: true,
            },
        });

        // 返回查询到的图片数组
        return NextResponse.json({ images });
    }catch(error){
        console.log('Error get image',error);
        return NextResponse.error(); // 返回错误信息
    }
}
