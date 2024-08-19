import { author, imageCompressionQuality, imageSizeLimit } from "$lib/config"
import { compile } from 'mdsvex'
import { PrismaClient } from "@prisma/client"
import { removeUnwantedTags, compressImage } from "$lib/utils"
import { SERVER_URL } from '$env/static/private'
import { createWriteStream } from "node:fs"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import type { RequestEvent } from "./$types"

export const prerender = false;

export const load = async () => {
    const prisma = new PrismaClient
    return {
        articles: await prisma.post.findMany(),
        comments: {
            comments: await prisma.comment.findMany(),
            replies: await prisma.reply.findMany()
        },
    }
}


export const actions = {
    create: async ({ request }: RequestEvent) => {
        const prisma = new PrismaClient
       
        const data: FormData = await request.formData()
        const title: FormDataEntryValue | null = data.get('title') as string
        const synopsis: FormDataEntryValue | null = data.get('synopsis') as string
        const categories: FormDataEntryValue | null = data.get('categories') as string
        const imgTag: FormDataEntryValue | null = data.get('img-tag') as string
        const imgAlt: FormDataEntryValue | null = data.get('alt') as string
        const slug: FormDataEntryValue | null = title.replace(/ /g, "-").toLowerCase().match(/([\w-]*)/gm)?.join("") as string
        const date: string = new Date().toLocaleDateString().replace(/\//g, '-')
        const markdownInput: FormDataEntryValue | null = data.get('markdown') as string
        const markdown = await compile(markdownInput) // mdsvex.compile() transforms markdown into HTML
        const file: string = data.get('name') as string
        const image: FormDataEntryValue | null = data.get('image') as File
        const buffer = Buffer.from(await image.arrayBuffer())
        const compressedImage = await compressImage(buffer, imageSizeLimit, imageCompressionQuality)
        const imageName = SERVER_URL + `/${image.name.replace(/\.[^.]*$/, `.${compressedImage.image.options.formatOut}`)}`
        const ws = createWriteStream(`server/images/${image.name.replace(/\.[^.]*$/, `.${compressedImage.image.options.formatOut}`)}`, { flags: 'w', encoding: 'base64' })
        ws.write(compressedImage.buffer)
        
        if (markdown) {
            try {
                if (slug.length > 0) {
                    await prisma.post.create({
                        data: {
                            title: title.trim(),
                            author: author,
                            categories: categories.split(","),
                            date: date,
                            image: imageName,
                            imageAlt: imgAlt,
                            imageTag: imgTag,
                            markdown: markdownInput,
                            mdHtml: markdown.code,
                            mdChopped: removeUnwantedTags(markdown.code),
                            slug: slug,
                            synopsis: synopsis,
                            views: 0
                        }
                    })
                    
                    return {
                        success: true,
                        message: 'Article has been posted!'
                    }
                }

                throw Error('There is an issue with special characters in your title, please try again.')

            } catch (e: unknown) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        return {
                            success: false,
                            message: 'This title/slug already exists, try another.'
                        }
                    }
                    return {
                        success: false,
                        message: e.message
                    }
                }
            }

            return {
                success: false,
                message: 'Something went wrong, double check your input fields'
            }
        }
    },
    modify: async ({ request }: RequestEvent) => {
        const prisma = new PrismaClient
        
        const data: FormData = await request.formData()
        const title: FormDataEntryValue | null = data.get('title') as string
        const oldSlug: FormDataEntryValue | null = data.get('old') as string
        const synopsis: FormDataEntryValue | null = data.get('synopsis') as string
        const categories: FormDataEntryValue | null = data.get('categories') as string
        const imgTag: FormDataEntryValue | null = data.get('img-tag') as string
        const imgAlt: FormDataEntryValue | null = data.get('alt') as string
        const slug: FormDataEntryValue | null = title.replace(/ /g, "-").toLowerCase().match(/([\w-]*)/gm)?.join("") as string
        const markdownInput: FormDataEntryValue | null = data.get('markdown') as string
        const markdown = await compile(markdownInput) // mdsvex.compile() transforms markdown into HTML
        const file: string = data.get('name') as string
        const image: FormDataEntryValue | File = data.get('image') as File
        const buffer = Buffer.from(await image.arrayBuffer())
        const compressedImage = buffer.length > 0 ? await compressImage(buffer, imageSizeLimit, imageCompressionQuality) : null
        const imageName = buffer.length > 0 ? SERVER_URL + `/${image.name.replace(/\.[^.]*$/, `.${compressedImage.image.options.formatOut}`)}` : ''
        const ws = buffer.length > 0 ? createWriteStream(`server/images/${image.name.replace(/\.[^.]*$/, `.${compressedImage.image.options.formatOut}`)}`, { flags: 'w', encoding: 'base64' }) : null

        if (markdown) {
            try {
                if (buffer.length > 0) {
                    ws?.write(compressedImage.buffer)
                }

                await prisma.post.update({
                    where: {
                        slug: oldSlug
                    },
                    data: {
                        title: title.trim(),
                        author: author,
                        categories: categories.split(","),
                        image: buffer.length > 0 ? imageName : file,
                        imageAlt: imgAlt,
                        imageTag: imgTag,   
                        markdown: markdownInput,
                        mdHtml: markdown.code,
                        mdChopped: removeUnwantedTags(markdown.code),
                        slug: slug,
                        synopsis: synopsis,
                    }
                })

                return {
                    success: true,
                    message: 'Article has been updated!'
                }

            } catch (e: unknown) {
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        return {
                            success: false,
                            message: 'This title/slug already exists, try another.'
                        }
                    }
                    return {
                        success: false,
                        message: e.message
                    }
                }
            }
        }

        

        return {
            success: false,
            message: 'Something went wrong, double check your input fields'
        }
    },
    delete: async ({ request }: RequestEvent) => {
        const prisma = new PrismaClient
        const data = await request.formData()
        const post = data.get('delete-title') as string
        const slug = data.get('delete-slug') as string
        const image = data.get('delete-image') as string

        try {
            await prisma.post.delete({
                where: {
                    slug: slug
                }
            })

            return {
                success: true,
                message: `${post} has been deleted.`,
            }
        } catch (e) {
            return {
                success: false,
                message: e
            }
        }
    },
    deleteComment: async ({ request }: RequestEvent) => {
        const data = await request.formData()
        const prisma = new PrismaClient
        const id = Number(data.get('id'))
        prisma.$connect()

        const remove = await prisma.comment.delete({ 
            where: {
                id: id,
            }
        })

        prisma.$disconnect()

        return remove
    },
    deleteReply: async ({ request }: RequestEvent) => {
        const data = await request.formData()
        const prisma = new PrismaClient
        const id = Number(data.get('id'))
        prisma.$connect()

        const remove = await prisma.reply.delete({ 
            where: {
                id: id,
            }
        })

        prisma.$disconnect()

        return remove
    },
    imageUpload: async ({ request }: RequestEvent) => {
        const data = await request.formData()
        const files = data.getAll('image') as File[]

        for (let i = 0; i < files.length; i++) {
            const image: FormDataEntryValue | null = files[i] as File
            const buffer = Buffer.from(await image.arrayBuffer())
            if (image.type === 'image/gif') {
                const ws = createWriteStream(`server/images/${image.name}`, { flags: 'w', encoding: 'base64' })
                return ws.write(buffer)
            }
            const compressedImage = await compressImage(buffer, imageSizeLimit, imageCompressionQuality)
            const ws = createWriteStream(`server/images/${image.name.replace(/\.[^.]*$/, `.${compressedImage.image.options.formatOut}`)}`, { flags: 'w', encoding: 'base64' })
            ws.write(compressedImage.buffer)
        }

    }
}