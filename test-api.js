import { PrismaClient } from "./db/generated/client/index.js";

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    console.log("Testing Prisma connection...");
    const images = await prisma.waldoImage.findMany();
    console.log("✅ Prisma works! Found images:", images);
  } catch (error) {
    console.error("❌ Prisma error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();