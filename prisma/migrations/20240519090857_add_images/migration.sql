/*
  Warnings:

  - Added the required column `image` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "image" TEXT NOT NULL;
