-- CreateTable
CREATE TABLE "WaldoImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "waldoSpots" JSONB NOT NULL,

    CONSTRAINT "WaldoImage_pkey" PRIMARY KEY ("id")
);
