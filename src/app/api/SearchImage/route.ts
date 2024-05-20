import prisma from "@/app/lib/db";
import { parse } from 'url';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse){
    try{
        const parsedUrl = parse(req.url!, true); // 解析请求的 URL
        const parama = parsedUrl.query.parama as string; // 获取 URL 查询参数中的 userId
        console.log(parama)
        // 这里执行根据 userId 查询图片的逻辑
        const images = await prisma.image.findMany({
            where:{
                imageName: {
                    contains: parama // 使用 contains 来执行模糊搜索
                }
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
