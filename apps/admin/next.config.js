/** @type {import('next').NextConfig} */

module.exports = {
   images: {
      domains: ['localhost'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
}
