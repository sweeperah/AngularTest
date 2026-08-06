import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../generated/prisma/client.js'

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

const PRODUCTS = [
  {
    id: 'aurora-lounge-chair',
    name: 'Aurora Lounge Chair',
    category: 'Furniture',
    price: 249,
    rating: 4,
    imageSeed: 'aurora-lounge-chair',
    isDirectPay: true,
  },
  {
    id: 'nimbus-table-lamp',
    name: 'Nimbus Table Lamp',
    category: 'Lighting',
    price: 89,
    rating: 5,
    imageSeed: 'nimbus-table-lamp',
    isDirectPay: false,
  },
  {
    id: 'drift-ceramic-vase',
    name: 'Drift Ceramic Vase',
    category: 'Decor',
    price: 34,
    rating: 3,
    imageSeed: 'drift-ceramic-vase',
    isDirectPay: false,
  },
  {
    id: 'haven-throw-blanket',
    name: 'Haven Throw Blanket',
    category: 'Textiles',
    price: 59,
    rating: 5,
    imageSeed: 'haven-throw-blanket',
    isDirectPay: false,
  },
  {
    id: 'lumen-pendant-light',
    name: 'Lumen Pendant Light',
    category: 'Lighting',
    price: 129,
    rating: 4,
    imageSeed: 'lumen-pendant-light',
    isDirectPay: false,
  },
  {
    id: 'ridge-oak-shelf',
    name: 'Ridge Oak Shelf',
    category: 'Furniture',
    price: 179,
    rating: 4,
    imageSeed: 'ridge-oak-shelf',
    isDirectPay: true,
  },
  {
    id: 'solace-linen-cushion',
    name: 'Solace Linen Cushion',
    category: 'Textiles',
    price: 42,
    rating: 3,
    imageSeed: 'solace-linen-cushion',
    isDirectPay: true,
  },
  {
    id: 'echo-wall-mirror',
    name: 'Echo Wall Mirror',
    category: 'Decor',
    price: 149,
    rating: 5,
    imageSeed: 'echo-wall-mirror',
    isDirectPay: false,
  },
  {
    id: 'juniper-storage-basket',
    name: 'Juniper Storage Basket',
    category: 'Decor',
    price: 45,
    rating: 4,
    imageSeed: 'juniper-storage-basket',
    isDirectPay: false,
  },
  {
    id: 'cascade-floor-rug',
    name: 'Cascade Floor Rug',
    category: 'Textiles',
    price: 219,
    rating: 5,
    imageSeed: 'cascade-floor-rug',
    isDirectPay: true,
  },
]

async function main(): Promise<void> {
  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    })
  }
}

main()
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
