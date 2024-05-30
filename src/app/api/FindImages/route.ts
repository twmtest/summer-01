// /src/app/api/FindImages/route.ts
import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageName = searchParams.get('imageName');
    const imageId = searchParams.get('imageId');
    
    // 检查是否提供了imageName
    if (!imageName) {
      return NextResponse.json({ error: '需要提供imageName参数' }, { status: 400 });
    }
    if (!imageName || typeof imageName !== 'string') {
      return NextResponse.json({ error: 'Invalid imageName' }, { status: 400 });
    }

    // 将 imageId 转换为数字
    const parsedImageId = imageId ? parseInt(imageId, 10) : null;

    const images = await prisma.image.findMany({
      where: {
        imageName: {
          contains: imageName,
        },
        ...(parsedImageId !== null && {
          id: {
            not: parsedImageId,
          }
        }),
      },
      select: {
        id:true,
        imageUrl: true,
        imageName: true,
      },
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching similar images:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
