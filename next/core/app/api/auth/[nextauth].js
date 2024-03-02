import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const res = await axios.post("http://localhost:8000/api/login/", credentials)
                    const user = res.data
                    if (user) {
                        return { status: 'ok', id: user.id, name: user.username }
                    } else {
                        return null
                    }
                } catch (err) {
                    return null
                }
            }
        })
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session(session, token) {
            session.user.id = token.id
            return session
        }
    }
})