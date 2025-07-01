/*
  Warnings:

  - The primary key for the `Episode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Podcast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `collectionHdPrice` on the `Podcast` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_collectionId_fkey";

-- AlterTable
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "collectionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Episode_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Podcast" DROP CONSTRAINT "Podcast_pkey",
DROP COLUMN "collectionHdPrice",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Podcast"("id") ON DELETE SET NULL ON UPDATE CASCADE;
