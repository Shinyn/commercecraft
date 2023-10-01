//This file handles db-connection
import { PrismaClient } from '@prisma/client'
declare global {
    var prisma: PrismaClient | undefined //Declare a global var containing prismaclient if existing or undefined?
};

const prismadb = globalThis.prisma || new PrismaClient()//If global prismaClient is defined use this, otherwise, create new prisma client.
if (process.env.NODE_ENV === 'production') globalThis.prisma = prismadb

export default prismadb