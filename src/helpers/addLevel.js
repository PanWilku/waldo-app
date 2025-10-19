import { PrismaClient } from "../../db/generated/client/index.js";

const prisma = new PrismaClient();

 function addImageToDatabase() {
  await prisma.waldoImage.create({
    data: {
      url: "http://example.com/waldo1.png",
      title: "Waldo 1",
      waldoSpots: {
        waldo1: {
          x: [100, 150],
          y: [200, 250],
        },
      },
      level: 2,
    },
  });
}
