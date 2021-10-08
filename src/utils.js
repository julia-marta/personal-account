export const getRandomAvatar = (photos) => {
  return photos[Math.floor(Math.random()*photos.length)];
}
