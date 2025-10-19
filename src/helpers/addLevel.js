import { PrismaClient } from "../../db/generated/client/index.js";

const prisma = new PrismaClient();

//example
  // data: {
  //       url: "http://example.com/waldo1.png",
  //       title: "Waldo 1",
  //       waldoSpots: {
  //         waldo1: {
  //           x: [100, 150],
  //           y: [200, 250],
  //         },
  //       },
  //       level: 2,
  //     },




 async function addImageToDatabase() {
  await prisma.waldoImage.create({
      data: {
        url: "/waldo6.jpg",
        title: "Waldo in the Circus",
        waldoSpots: {
          waldo1: {
            x: [196, 233],
            y: [144, 257],
          },
        },
        level: 1,
      },
  });

}


addImageToDatabase();