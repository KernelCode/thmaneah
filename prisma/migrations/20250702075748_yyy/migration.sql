/*
  Warnings:

  - You are about to drop the column `searchedKeywords` on the `Episode` table. All the data in the column will be lost.
  - You are about to drop the column `searchedKeywords` on the `Podcast` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "searchedKeywords";

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "searchedKeywords";

-- CreateTable
CREATE TABLE "SearchKeyword" (
    "keyword" TEXT NOT NULL,

    CONSTRAINT "SearchKeyword_pkey" PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "_PodcastKeywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PodcastKeywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EpisodeKeywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EpisodeKeywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchKeyword_keyword_key" ON "SearchKeyword"("keyword");

-- CreateIndex
CREATE INDEX "_PodcastKeywords_B_index" ON "_PodcastKeywords"("B");

-- CreateIndex
CREATE INDEX "_EpisodeKeywords_B_index" ON "_EpisodeKeywords"("B");

-- AddForeignKey
ALTER TABLE "_PodcastKeywords" ADD CONSTRAINT "_PodcastKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastKeywords" ADD CONSTRAINT "_PodcastKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchKeyword"("keyword") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeKeywords" ADD CONSTRAINT "_EpisodeKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeKeywords" ADD CONSTRAINT "_EpisodeKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchKeyword"("keyword") ON DELETE CASCADE ON UPDATE CASCADE;
