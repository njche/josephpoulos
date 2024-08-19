import { PrismaClient } from "@prisma/client"
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({ params }) => {
    const prisma = new PrismaClient
    await prisma.post.update({
        where: {
            slug: params.slug
        },
        data: {
            views: {
                increment: 1
            }
        }
    })

    return new Response(JSON.stringify({ status: 200 }))
}