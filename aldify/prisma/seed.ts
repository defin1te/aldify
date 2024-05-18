import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example: Create an artist
  const newArtist = await prisma.artist.create({
    data: {
      name: "Kairat Nurtas",
    },
  });
  console.log(newArtist);

  // Example: Create an album
  const newAlbum = await prisma.album.create({
    data: {
      title: "Almaty Tunderi",
      releaseDate: new Date(),
      artistId: newArtist.id,
    },
  });
  console.log(newAlbum);

  // Example: Create a song
  const newSong = await prisma.song.create({
    data: {
      title: "Song Title",
      duration: 240, // duration in seconds
      albumId: newAlbum.id,
      artistId: newArtist.id,
    },
  });
  console.log(newSong);

  // Example: Create a playlist
//   const newPlaylist = await prisma.playlist.create({
//     data: {
//       name: "My Playlist",
//       songs: {
//         connect: { songId: newSong.id },
//       },
//     },
//   });
//   console.log(newPlaylist);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
