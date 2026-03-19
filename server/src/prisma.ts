import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends({
    result: {
      address: {
        formattedAddress: {
          needs: {
            lineOne: true,
            lineTwo: true,
            city: true,
            country: true,
            pincode: true
          },
          compute: (addr) => {
            return `${addr.lineOne}, ${addr.lineTwo ? addr.lineTwo + ', ' : ''}${addr.city}, ${addr.country} - ${addr.pincode}`
          }
        }
      }
    }
  })
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prismaClient = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient as any;

