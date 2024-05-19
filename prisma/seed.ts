import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Example: Create an artist
  const newArtist = await prisma.artist.create({
    data: {
      name: "Kairat Nurtas",
      image: "https://i1.sndcdn.com/artworks-000121189934-emip30-t500x500.jpg",
    },
  });
  console.log(newArtist);

  // Example: Create an album
  const newAlbum = await prisma.album.create({
    data: {
      title: "Almaty Tunderi",
      releaseDate: new Date(),
      artistId: newArtist.id,
      image:
        "https://adrenalinicsilence.kz/wp-content/uploads/2014/11/IMG_6205.jpg",
    },
  });
  console.log(newAlbum);

  // Example: Create a song
  const newSong = await prisma.song.create({
    data: {
      title: "Ol Sen Emes",
      duration: 247, // duration in seconds
      albumId: newAlbum.id,
      artistId: newArtist.id,
      image:
        "https://is3-ssl.mzstatic.com/image/thumb/Music20/v4/c2/ba/08/c2ba083d-badb-6f24-b241-2fc33d8bd71f/source/1200x1200bb.jpg",
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
