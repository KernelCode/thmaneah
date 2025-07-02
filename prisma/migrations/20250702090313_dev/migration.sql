/*
  Warnings:

  - You are about to drop the `SearchKeyword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EpisodeKeywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PodcastKeywords` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trackTimeMillis` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EpisodeKeywords" DROP CONSTRAINT "_EpisodeKeywords_A_fkey";

-- DropForeignKey
ALTER TABLE "_EpisodeKeywords" DROP CONSTRAINT "_EpisodeKeywords_B_fkey";

-- DropForeignKey
ALTER TABLE "_PodcastKeywords" DROP CONSTRAINT "_PodcastKeywords_A_fkey";

-- DropForeignKey
ALTER TABLE "_PodcastKeywords" DROP CONSTRAINT "_PodcastKeywords_B_fkey";

-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "trackTimeMillis" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SearchKeyword";

-- DropTable
DROP TABLE "_EpisodeKeywords";

-- DropTable
DROP TABLE "_PodcastKeywords";

-- CreateTable
CREATE TABLE "SearchKeywords" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,

    CONSTRAINT "SearchKeywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PodcastToSearchKeywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PodcastToSearchKeywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EpisodeToSearchKeywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EpisodeToSearchKeywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchKeywords_keyword_key" ON "SearchKeywords"("keyword");

-- CreateIndex
CREATE INDEX "_PodcastToSearchKeywords_B_index" ON "_PodcastToSearchKeywords"("B");

-- CreateIndex
CREATE INDEX "_EpisodeToSearchKeywords_B_index" ON "_EpisodeToSearchKeywords"("B");

-- AddForeignKey
ALTER TABLE "_PodcastToSearchKeywords" ADD CONSTRAINT "_PodcastToSearchKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToSearchKeywords" ADD CONSTRAINT "_PodcastToSearchKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchKeywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeToSearchKeywords" ADD CONSTRAINT "_EpisodeToSearchKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeToSearchKeywords" ADD CONSTRAINT "_EpisodeToSearchKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchKeywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
