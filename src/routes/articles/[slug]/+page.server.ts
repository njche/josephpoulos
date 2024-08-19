import { TURNSTILE_SECRET_KEY } from "$env/static/private"
import { PrismaClient, Prisma } from "@prisma/client"
import { error } from "@sveltejs/kit"
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity"
import type { Actions, PageServerLoad } from "./$types"

let postId: number

export const load: PageServerLoad = async ({ params }: { params: { slug: string } }) => {
    const prisma = new PrismaClient
    const article = await prisma.post.findFirst({
        where: {
            slug: {
                equals: params.slug
            }
        }
    })
    
    if (article === null) {
        return error(404, "Not Found.")
    }

    const recent = await prisma.post.findMany({
        take: 10,
        orderBy: {
            createdAt: Prisma.SortOrder.desc
        }
    })

    const comments = await prisma.post.findFirst({
        where: {
            slug: {
                equals: params.slug
            }
        }
    }).then(async (post) => {
        if (post) {
            postId = post.id
            const comments = await prisma.comment.findMany({
                where: {
                    postId: {
                        equals: post.id
                    }
                }
            })
            return comments
        }

        return []
    })

    const replies = await prisma.reply.findMany({
        where: {
            postId: {
                equals: postId
            }
        }
    })

    return {
        article,
        comments,
        replies,
        recent
    }
}

export const actions: Actions = {
    comment: async ({ request }) => {
        const data = await request.formData()
        const token = data.get('cf-turnstile-response')
        const ip = request.headers.get('CF-Connecting-IP')
        
        data.append('secret', TURNSTILE_SECRET_KEY)
        data.append('response', token as FormDataEntryValue)
        data.append('remoteip', ip as FormDataEntryValue)
    
        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
        const result = await fetch(url, {
            body: data,
            method: 'POST',
        });

        const outcome = await result.json()

        if (outcome.success) {
            const prisma = new PrismaClient
            const name = data.get('name') as string
            const content = data.get('comment') as string
            const title = data.get('title') as string

            const matcher = new RegExpMatcher({
                ...englishDataset.build(),
                ...englishRecommendedTransformers,
            });

            if (matcher.hasMatch(content)) {
                return {
                    success: false,
                    message: 'Your comment has profanity that is not prohibited. Please try again.'
                }
            }
    
            await prisma.comment.create({
                data: {
                    postId: postId,
                    articleTitle: title,
                    name: name.toLowerCase(),
                    content: content,
                }
            })
    
            return {
                success: true,
                message: 'Comment successfully sent.'
            }
        }

        return { 
            success: false,
            message: 'Something went wrong, try again later.'
        }
    },
    reply: async ({ request }) => {
        const data = await request.formData()
        const token = data.get('cf-turnstile-response')
        const ip = request.headers.get('CF-Connecting-IP')
        
        data.append('secret', TURNSTILE_SECRET_KEY)
        data.append('response', token as FormDataEntryValue)
        data.append('remoteip', ip as FormDataEntryValue)
        
        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
        const result = await fetch(url, {
            body: data,
            method: 'POST',
        });
        
        const outcome = await result.json()
        
        if (outcome.success) {
            const prisma = new PrismaClient
            const name = data.get('name') as string
            const content = data.get('comment') as string
            const commentId = Number(data.get('comment-id')) as number
            const replyId = Number(data.get('reply-id')) as number
            const title = data.get('title') as string

            const matcher = new RegExpMatcher({
                ...englishDataset.build(),
                ...englishRecommendedTransformers,
            });

            if (matcher.hasMatch(content)) {
                return {
                    success: false,
                    message: 'Your comment has profanity that is not prohibited. Please try again.'
                }
            }

            if (replyId) {
                await prisma.reply.create({
                    data: {
                        postId: postId,
                        commentId: commentId,
                        replyId: replyId,
                        articleTitle: title,
                        name: name.toLowerCase(),
                        content: content,
                    }
                })

                return {
                    success: true,
                    message: 'Reply successfully sent.'
                }
            }

            await prisma.reply.create({
                data: {
                    postId: postId,
                    commentId: commentId,
                    replyId: -1,
                    articleTitle: title,
                    name: name.toLowerCase(),
                    content: content,
                }
            })

            return {
                success: true,
                message: 'Reply successfully sent.'
            }
        }

        return {
            success: false,
            message: 'Something went wrong, try again later.'
        }
    },
}