import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['error', 'warn', 'info'],
    });
  }
  prisma = global.prisma;
}

export { prisma };
