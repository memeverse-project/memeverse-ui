import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: any) {
   const data = await req.json()
   console.log('-----2-----', data)
   try {
      // Extraer los datos de la solicitud

      // Verifica si los campos necesarios están presentes
      if (!data || !data.title || !data.price) {
         console.error('Missing required fields:', data) // Imprime los datos para depuración
         return new NextResponse('Missing required fields', { status: 400 })
      }

      // Crear el producto
      const newProduct = await prisma.product.create({
         data: {
            title: data.title,
            price: data.price,
            stock: data.stock,
            discount: data.discount,
            isAvailable: data.isAvailable,
            isFeatured: data.isFeatured,
            brand: {
               connect: { id: data.brand.connect.id },
            },
         },
      })

      return NextResponse.json(newProduct, { status: 201 })
   } catch (error) {
      console.error('[PRODUCTS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { searchParams } = new URL(req.url)
      const categoryId = searchParams.get('categoryId') || undefined
      const isFeatured = searchParams.get('isFeatured')

      const products = await prisma.product.findMany()

      return NextResponse.json(products)
   } catch (error) {
      console.error('[PRODUCTS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
