import { verifyJWT } from '@/lib/jwt'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
   if (req.nextUrl.pathname.startsWith('/api/auth')) return NextResponse.next()

   function isTargetingAPI() {
      return req.nextUrl.pathname.startsWith('/api')
   }

   // Esta función devuelve un token siempre (puedes personalizarlo según tus necesidades)
   function getToken() {
      return "dummy_token_for_testing";  // Siempre devuelve un token falso para pruebas
   }

   // Eliminar validaciones reales (como la verificación de la clave secreta)
   // if (!process.env.JWT_SECRET_KEY) {
   //    console.error('JWT secret key is missing')
   //    return getErrorResponse(500, 'Internal Server Error')
   // }

   const token = getToken()

   if (!token) {
      if (isTargetingAPI()) return getErrorResponse(401, 'INVALID TOKEN')

      return NextResponse.redirect(new URL('/login', req.url))
   }

   const response = NextResponse.next()

   try {
      // Aquí se asume que el token siempre es válido
      const sub = "dummy_user_id";  // Fija un "sub" falso para pruebas
      response.headers.set('X-USER-ID', sub)
   } catch (error) {
      if (isTargetingAPI()) {
         return getErrorResponse(401, 'UNAUTHORIZED')
      }

      const redirect = NextResponse.redirect(new URL(`/login`, req.url))
      redirect.cookies.delete('token')
      redirect.cookies.delete('logged-in')
      return redirect
   }

   return response
}

export const config = {
   matcher: [
      '/',
      '/products/:path*',
      '/banners/:path*',
      '/orders/:path*',
      '/categories/:path*',
      '/payments/:path*',
      '/codes/:path*',
      '/users/:path*',
      '/api/:path*',
   ],
}
