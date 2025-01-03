import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "alejo" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Aquí deberías verificar las credenciales con tu base de datos
        // Por ahora, usaremos un usuario hardcodeado para demostración
        if (credentials?.username === "user" && credentials?.password === "password") {
          return { id: "1", name: "Alejo", email: "alejo@example.com" }
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
})
