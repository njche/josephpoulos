import { Prisma, PrismaClient } from '@prisma/client'
import fs, { readFileSync } from 'fs'
import sharp from 'sharp'

function sortByDate(a: { meta: { date: string }}, b: { meta: { date: string }}) {
    const dateA = new Date(a.meta.date)
    const dateB = new Date(b.meta.date)
    if (dateA < dateB) {
        return 1;
    }

    if (dateA > dateB) {
        return -1;
    }

    return 0;
}

export const removeUnwantedTags = (string: string) => {
    // these arrays will store which index we need to start or end our slices
    let sliceStart = []
    let sliceEnd = []
    
    // this loop operation clears all <img> tags from the string param
    for (let i = 0, s = 0; i < string.length; i++) {
        if (string[i] === '<' && string[i + 1] === 'i' && string[i + 2] === 'm' && string[i + 3] === 'g') {
            sliceStart.push(i - 3)
            for (let j = i; j < string.length; j++) {
                if (string[j] === '>') {
                    sliceEnd.push(j + 5)
                    break
                }
            }
            string = (string.substring(0, sliceStart[s]) + string.substring(sliceEnd[s]))
            s++
        }
    }

    // clearing arrays to do nearly the same operation but for <h6> tags which are used below the <img> tags
    sliceStart = []
    sliceEnd = []
    // this loop operation clears all <img> tags from the string param
    for (let i = 0, s = 0; i < string.length; i++) {
        if (string[i] === '<' && 
            string[i + 1] === 'i' && 
            string[i + 2] === 'm' && 
            string[i + 3] === 'g'
        ) {
            sliceStart.push(i)
            for (let j = i; j < string.length; j++) {
                if (string[j] === '>') {
                    sliceEnd.push(j + 1)
                    break
                }
            }
            string = (string.substring(0, sliceStart[s]) + string.substring(sliceEnd[s]))
            s++
        }
    }

    // this loop operation clears all <h6> tags from the string param
    for (let i = 0, s = 0; i < string.length; i++) {
        if (string[i] === '<' && 
            string[i + 1] === 'h' && 
            string[i + 2] === '6' && 
            string[i + 3] === '>'
        ) {
            sliceStart.push(i)
            for (let j = i; j < string.length; j++) {
                if (string[j] === '<' && string[j + 1] === '/' && string[j + 2] === 'h' && string[j + 3] === '6' && string[j + 4] === '>') {
                    sliceEnd.push(j + 5)
                    break
                }
            }
            string = (string.substring(0, sliceStart[s]) + string.substring(sliceEnd[s]))
            s++
        }
    }

    // this loop operation clears all <iframe> tags from the string param
    for (let i = 0, s = 0; i < string.length; i++) {
        if (string[i] === '<' && 
            string[i + 1] === 'i' && 
            string[i + 2] === 'f' && 
            string[i + 3] === 'r' && 
            string[i + 4] === 'a' && 
            string[i + 5] === 'm' && 
            string[i + 6] === 'e'
        ) {
            sliceStart.push(i)
            for (let j = i; j < string.length; j++) {
                if (
                    string[j] === '<' && 
                    string[j + 1] === '/' && 
                    string[j + 2] === 'i' && 
                    string[j + 3] === 'f' && 
                    string[j + 4] === 'r' && 
                    string[j + 5] === 'a' && 
                    string[j + 6] === 'm' && 
                    string[j + 7] === 'e' && 
                    string[j + 8] === '>'
                ) {
                    sliceEnd.push(j + 5)
                    break
                }
            }
            string = (string.substring(0, sliceStart[s]) + string.substring(sliceEnd[s]))
            s++
        }
    }
    
    return string
}

function removeYaml(string: string) {
    let count = 0
    let sliceIndex = 0
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '-' && string[i + 1] === '-' && string[i + 2] === '-') {
            count++
        }
        if (count === 2) {
            sliceIndex = i + 5
            break
        }
    }
    return string.slice(sliceIndex)
}

export const getMarkdownPages = async (page: number, category: string | null, search: string | null) => {
    page ? page : page = 1

    const prisma = new PrismaClient
    const limit = 6
    const start = (page - 1) * limit
    const end = Math.ceil(await prisma.post.count() / limit)

    if (search) {
        const searchResults = await searchArticles(page, search, limit)
        const results = {
            current: {
                page: page
            },
            next: {
                page: page + 1
            },
            previous: {
                page: start > 0 ? page - 1 : null
            },
            totalPages: Math.ceil(searchResults.postCount / limit),
            results: searchResults.results
        }

        return results
    }

    if (category) {
        const searchResults = await searchCategory(page, category, limit)

        const results = {
            current: {
                page: page
            },
            next: {
                page: page + 1
            },
            previous: {
                page: start > 0 ? page - 1 : null
            },
            totalPages: Math.ceil(searchResults.postCount / limit),
            results: searchResults.results  
        }

        return results
    }

    const posts = await prisma.post.findMany({
        take: limit,
        skip: limit * (page - 1),
        orderBy: {
            createdAt: Prisma.SortOrder.desc
        }
    })

    const results = {
        current: {
            page: page
        },
        next: {
            page: page + 1
        },
        previous: {
            page: start > 0 ? page - 1 : null
        },
        totalPages: end,
        results: posts
    }

    return results
}

export const getMarkdownFiles = async ({category = '', amount = 0} = {}) => {
    let index: number = 0
    // import .md files using a vite function 'import.meta.glob'. * is a wildcard and will import any file name with .md
    const files = import.meta.glob('/src/routes/articles/*.md')
    let articlesConstraint: [string, () => Promise<unknown>][]

    if (amount) {
        articlesConstraint = Object.entries(files).length > amount ? Object.entries(files).slice(0, amount) : Object.entries(files)
    } else {
        articlesConstraint = Object.entries(files)
    }

    const iterablePostFiles: [string, () => Promise<unknown>][] = articlesConstraint

    let allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const resolved = await resolver()
            const postTitle = resolved.metadata.title
            const postFileName = path.slice(21)
            const postPath = path.slice(11, -3)
            const postHtml = resolved.default.render()
            const postPreview = removeUnwantedTags(postHtml.html)
            const markdown = readFileSync(path.slice(1), 'utf8')

            return {
                index: (index += 1) - 1,
                meta: resolved.metadata,
                title: postTitle,
                file: postFileName,
                path: postPath,
                preview: postPreview,
                html: postHtml.html,
                markdown: removeYaml(markdown)
            }
        })
    )

    if (category) {
        allPosts = allPosts.filter(post => post.meta.categories.includes(category))
    }

    return allPosts.sort(sortByDate)
}

export const getComments = async (title: string) => {
    const prisma = new PrismaClient

    const comments = await prisma.comment.findMany()

    const replies = await prisma.reply.findMany()

    prisma.$disconnect()

    return {
        comments: comments,
        replies: replies
    }
}

export const getSlideArticles = async () => {
    const prisma = new PrismaClient
    let slidePosts = await prisma.post.findMany({
        orderBy: {
            createdAt: Prisma.SortOrder.desc
        },
        take: 9
    })

    const reverseSlides = [...slidePosts].reverse()

    return {
        slide: slidePosts,
        slide2: slidePosts,
        slide3: slidePosts
    }
}

export const compressImage = async (buffer: Buffer, sizeLimit: number, quality: number): Promise<any> => {
    if (buffer.length == 0) {
        return
    }
    const compressedImage = sharp(buffer).webp({ quality: quality })
    const compressedBuffer = await compressedImage.toBuffer()
    console.log(compressedBuffer.byteLength)
    
    if (compressedBuffer.byteLength > sizeLimit) {
        return compressImage(buffer, sizeLimit, quality - 2)
    }
    
    return {
        image: compressedImage,
        buffer: compressedBuffer
    }
}

export const savePost = async (title: string, synopsis: string, categories: string[], markdown: string, date: string, file: string, imgTag: string, altImg: string) => {
    const prisma = new PrismaClient
    const slug = String(title.replace(/ /g, "-").toLowerCase().match(/([\w-]*)/gm)?.join(""))

    try {
        prisma.post.create({
            data: {
                slug: slug,
                title: title,
                categories: categories,
                synopsis: synopsis,
                author: 'Joe Polous',
                image: file,
                imageTag: imgTag,
                imageAlt: altImg,
                markdown: markdown,
                views: 0
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                success: false,
                message: e.message
            }
        }
    }
    const fullDate = date.replace(/\//g, '-')
    const files = import.meta.glob('/src/routes/articles/*.md')
    const iterablePostFiles = Object.entries(files)
    const yaml = `---\ntitle: |-\n    ${title}\nsynopsis: |-\n    ${synopsis}\nauthor: Joe Polous\ncategories:\n${categories}\nimage: /content/${file}\nimageTag: |-\n    ${imgTag}\naltImg: |-\n    ${altImg}\ndate: ${fullDate}\n---\n\n`

    if (slug!.length === 0) {
        return { 
            success: false,
            message: 'A title is required' 
        }
    }
    
    for (let i = 0; i < iterablePostFiles.length; i++) {
        if (iterablePostFiles[i][0].slice(21, -3) === slug) {
            return { 
                success: false,
                message: 'There is a post already with this title, try a new one.' 
            }
        }
    }

    try {
        await prisma.post.create({
            data: {
                title: title,
                file: `${slug}`,
                views: 0
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e)
            if (e.code === 'P2002') {
                return {
                    success: false,
                    message: `There is already a file/endpoint with this name (${slug}), try renaming your title.`
                }
            } else {
                return {
                    success: false,
                    message: `Something went wrong, try again later`
                }
            }
        }
    }

    prisma.$disconnect()

    // write image and md file to disk
    fs.writeFile((`src/routes/articles/${slug}.md`), yaml + markdown, (err) => {
        if (err) {
            throw err
        }
        console.log("New article published!")
    })

    return { 
        success: true,
        message: 'Article was successfully published.'
    }
}

export const modifyPost = async (newTitle: string, synopsis: string, currentFile: string, markdown: string, categories: string, file: string, imgTag: string, altImg: string) => {
    const prisma = new PrismaClient
    const slug = newTitle.replace(/ /g, "-").toLowerCase().match(/([\w-]*)/gm)?.join("")

    if (slug!.length === 0) {
        return { 
            success: false,
            message: 'A title is required' 
        }
    }

    if (slug === currentFile.slice(0, -3)) {
        fs.readFile('src/routes/articles/' + currentFile, 'utf-8', async (error, data) => {
            if (error) throw error
            
            let sliceIndex = 0
            
            for (let i = 0; i < data.length; i++) {
                if (data[i] === 'd' && data[i + 1] === 'a' && data[i + 2] === 't' && data[i + 3] === 'e' && data[i + 4] === ':') {
                    sliceIndex = i
                    break
                }
            }
            
            let newString = data.slice(sliceIndex)
            sliceIndex = 0
            
            for (let i = 0; i < newString.length; i++) {
                if (newString[i] === '-' && newString[i + 1] === '-' && newString[i + 2] === '-') {
                    sliceIndex = i
                    break
                }
            }

            let yaml = `---\ntitle: |-\n    ${newTitle}\nsynopsis: |-\n    ${synopsis}\nauthor: Joe Polous\ncategories:\n${categories}\nimage: /content/${file.replace('/content/', '')}\nimageTag: |-\n    ${imgTag}\naltImg: |-\n    ${altImg}\n`
            let newYaml = yaml + (newString.slice(0, sliceIndex - newString.length) + `---\n\n`)
            
            fs.writeFile('src/routes/articles/' + currentFile, newYaml + markdown, 'utf-8', (err) => {
                if (err) {
                    throw err
                }
            })

        })
        
        return { 
            success: true,
            message: 'Article was successfully modified and published.'
        }
    }
    
    try {
        await prisma.post.findFirstOrThrow({
            where: {
                file: currentFile
            }
        }).then(async (e) => {
            await prisma.post.update({
                where: {
                    file: e.file
                },
                data: {
                    title: newTitle,
                    file: slug
                }
            })
            prisma.$disconnect()
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e)
            if (e.code === 'P2002') {
                return {
                    success: false,
                    message: `There is already a file/endpoint with this name (${slug}), try renaming your title.`
                }
            } else {
                return {
                    success: false,
                    message: `Something went wrong, try again later`
                }
            }
        }
    }
    
    

    fs.readFile('src/routes/articles/' + currentFile, 'utf-8', async (error, data) => {
        if (error) throw error
        let sliceIndex = 0
        
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 'd' && data[i + 1] === 'a' && data[i + 2] === 't' && data[i + 3] === 'e' && data[i + 4] === ':') {
                sliceIndex = i
                break
            }
        }
        
        let newString = data.slice(sliceIndex)
        sliceIndex = 0
        
        for (let i = 0; i < newString.length; i++) {
            if (newString[i] === '-' && newString[i + 1] === '-' && newString[i + 2] === '-') {
                sliceIndex = i + 3
                break
            }
        }
        
        let yaml = `---\ntitle: |-\n    ${newTitle}\nsynopsis: |-\n    ${synopsis}\nauthor: Joe Poulos\ncategories:\n${categories}\nimage: /content/${file.replace('/content/', '')}\nimageTag: |-\n    ${imgTag}\n`
        let newYaml = yaml + (newString.slice(0, sliceIndex - newString.length) + `\n\n`)
        
        return fs.writeFile(`src/routes/articles/${slug}.md`, newYaml + markdown, 'utf-8', (err) => {
            if (err) {
                throw err
            }
        })
    })

    fs.unlink('src/routes/articles/' + currentFile, (error) => {
        if (error) throw error
    })

    return { 
        success: true,
        message: 'Article was successfully modified and published.'
    }
}

export const deletePost = async (fileName: string) => {
    const prisma = new PrismaClient
    await prisma.post.delete({
        where: {
            file: fileName
        }
    })
    
    fs.unlinkSync(`src/routes/articles/${fileName}`)


    return {
        success: true,
        message: `${fileName} has been deleted.`,
    }
}

export const getArticleViews = async () => {
    const prisma = new PrismaClient
    const views = await prisma.post.findMany()
    prisma.$disconnect()
    
    return views
}

export const searchArticles = async (page: number, query: string, limit: number) => {
    const prisma = new PrismaClient

    const count = await prisma.post.count({
        where: {
            OR: [
                { title: { contains: query }},
                { markdown: { contains: query }},
                { synopsis: { contains: query }},
                { categories: { has: query }}
            ]
        },
    })

    const results = await prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: query }},
                { markdown: { contains: query }},
                { synopsis: { contains: query }},
                { categories: { has: query }}
            ]
        },
        orderBy: {
            createdAt: Prisma.SortOrder.desc
        },
        take: limit,
        skip: limit * (page - 1),
    })
    
    return {
        results: results,
        postCount: count
    }
}

export const searchCategory = async (page: number, category: string, limit: number) => {
    const prisma = new PrismaClient

    const count = await prisma.post.count({
        where: {
            OR: [
                { title: { contains: category }},
                { markdown: { contains: category }},
                { synopsis: { contains: category }},
                { categories: { has: category }}
            ]
        },
    })

    const results = await prisma.post.findMany({
        where: {
            categories: {
                has: category
            }
        },
        orderBy: {
            createdAt: Prisma.SortOrder.desc
        },
        take: limit,
        skip: limit * (page - 1),
    })
    
    return {
        results: results,
        postCount: count
    }
}