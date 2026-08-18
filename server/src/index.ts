import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import type { Product } from 'shared-types'
import { prisma } from './db.js'

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 3000

app.use(cors({ origin: 'http://localhost:4200' }))
app.use(express.json())

app.get('/api/products', async (req, res: Response<Product[]>) => {
  const search = typeof req.query.search === 'string' ? req.query.search : undefined

  const products = await prisma.product.findMany({
    where: search ? { name: { contains: search } } : undefined,
    orderBy: { name: 'asc' },
  })

  res.json(products)
})

app.get('/api/products/:id', async (req, res: Response<Product | { message: string }>) => {
  const product = await prisma.product.findUnique({ where: { id: req.params.id } })

  if (!product) {
    res.status(404).json({ message: 'Product not found' })
    return
  }

  res.json(product)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
