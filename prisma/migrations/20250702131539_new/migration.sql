-- CreateTable
CREATE TABLE "Podcast" (
    "id" TEXT NOT NULL,
    "wrapperType" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "trackName" TEXT NOT NULL,
    "collectionCensoredName" TEXT NOT NULL,
    "collectionViewUrl" TEXT NOT NULL,
    "feedUrl" TEXT,
    "trackViewUrl" TEXT NOT NULL,
    "artworkUrl30" TEXT NOT NULL,
    "artworkUrl60" TEXT NOT NULL,
    "artworkUrl100" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "primaryGenreName" TEXT NOT NULL,
    "artworkUrl600" TEXT NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "episodeUrl" TEXT NOT NULL,
    "episodeGuid" TEXT NOT NULL,
    "genres" JSONB NOT NULL,
    "feedUrl" TEXT,
    "trackName" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "closedCaptioning" TEXT NOT NULL,
    "collectionId" TEXT,
    "collectionName" TEXT,
    "kind" TEXT NOT NULL,
    "wrapperType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "artistViewUrl" TEXT,
    "collectionViewUrl" TEXT,
    "trackViewUrl" TEXT NOT NULL,
    "artworkUrl60" TEXT NOT NULL,
    "artworkUrl600" TEXT NOT NULL,
    "artworkUrl160" TEXT NOT NULL,
    "episodeFileExtension" TEXT NOT NULL,
    "episodeContentType" TEXT NOT NULL,
    "trackTimeMillis" INTEGER NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Podcast_id_key" ON "Podcast"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_id_key" ON "Episode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SearchKeywords_keyword_key" ON "SearchKeywords"("keyword");

-- CreateIndex
CREATE INDEX "_PodcastToSearchKeywords_B_index" ON "_PodcastToSearchKeywords"("B");

-- CreateIndex
CREATE INDEX "_EpisodeToSearchKeywords_B_index" ON "_EpisodeToSearchKeywords"("B");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Podcast"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToSearchKeywords" ADD CONSTRAINT "_PodcastToSearchKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToSearchKeywords" ADD CONSTRAINT "_PodcastToSearchKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchKeywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeToSearchKeywords" ADD CONSTRAINT "_EpisodeToSearchKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EpisodeToSearchKeywords" ADD CONSTRAINT "_EpisodeToSearchKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchKeywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
