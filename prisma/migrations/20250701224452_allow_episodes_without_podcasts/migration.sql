-- CreateTable
CREATE TABLE "Podcast" (
    "id" BIGINT NOT NULL,
    "wrapperType" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "trackName" TEXT NOT NULL,
    "collectionCensoredName" TEXT NOT NULL,
    "collectionViewUrl" TEXT NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "trackViewUrl" TEXT NOT NULL,
    "artworkUrl30" TEXT NOT NULL,
    "artworkUrl60" TEXT NOT NULL,
    "artworkUrl100" TEXT NOT NULL,
    "collectionHdPrice" BIGINT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "primaryGenreName" TEXT NOT NULL,
    "artworkUrl600" TEXT NOT NULL,
    "searchedKeywords" TEXT[],

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" BIGINT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "episodeUrl" TEXT NOT NULL,
    "episodeGuid" TEXT NOT NULL,
    "genres" JSONB NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "trackName" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "closedCaptioning" TEXT NOT NULL,
    "collectionId" BIGINT,
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
    "searchedKeywords" TEXT[],

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_id_key" ON "Podcast"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_id_key" ON "Episode"("id");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Podcast"("id") ON DELETE SET NULL ON UPDATE CASCADE;
