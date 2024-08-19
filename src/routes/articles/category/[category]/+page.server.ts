import { getMarkdownPages } from '$lib/utils/index.js'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, params }) => {
    const pageNumber = Number(url.searchParams.get('page'))
    return {
        articles: await getMarkdownPages(pageNumber, params.category, '')
    }
}