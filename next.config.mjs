/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['example.com'], // Reemplaza con los dominios de tus imágenes
    },
}
export default nextConfig;
