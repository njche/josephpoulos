import { PrismaClient } from "@prisma/client";
import { BinaryLike, createHash, randomUUID } from "node:crypto";
import type { Actions, PageServerLoad } from "./$types";

export const prerender = false;

export const load = (async ({ getClientAddress }) => {
    console.log(getClientAddress())
}) satisfies PageServerLoad;

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData()
        const username = data.get('username') as String
        const password = data.get('password') as BinaryLike
        const secret = createHash('sha256').update(password).digest('hex');

        if (username.trim() != process.env.ADMIN_NAME || secret != process.env.ADMIN_SECRET) {
            return {
                success: false,
                message: 'incorrect credentials'
            }
        }

        const prisma = new PrismaClient
        const key = randomUUID()

        await prisma.secret.deleteMany()
        
        await prisma.secret.create({
            data: {
                secret: key
            }
        })

        cookies.set('access', key, {
            // send cookie for every page
            path: '',
            // server side only cookie so you can't use `document.cookie`
            httpOnly: true,
            // only requests from same site can send cookies
            // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
            sameSite: 'strict',
            // only sent over HTTPS in production
            // secure: process.env.NODE_ENV === 'production',
            // set cookie to expire after ~1 day
            maxAge: 100000,
        })

        await prisma.$disconnect()
        
        return {
            success: true,
            message: 'login successful'
        }
    }
}