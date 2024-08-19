import { PrismaClient } from '@prisma/client'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({}) => {
	const prisma = new PrismaClient
    const posts = await prisma.post.findMany()
    let categories = {}
    for (const post of posts) {
        post.categories.forEach((category) => {
            if (categories.hasOwnProperty(category)) {
                categories[category].count += 1
            } else {
                categories[category] = {
                    title: category,
                    count: 1
                }
            }
        })
    }

    const sortedCategories = 
        Object.values(categories).sort((a, b) => a.title > b.title ? 1 : a.title === b.title ? 0 : -1)

    return {
        categories: sortedCategories
    }
}