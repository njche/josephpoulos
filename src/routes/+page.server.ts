import { getSlideArticles } from "$lib/utils"

export const load = async () => {
    return {
        result: await getSlideArticles()
    }
}