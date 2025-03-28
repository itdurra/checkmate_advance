import Image from 'next/image';

export function EnemyPicture({ filename }: { filename: string }) {
  return (
    <Image
      src={filename}
      width={100}
      height={100}
      priority
      quality={100}
      alt='Enemy Profile Picture'
    />
  );
}

export function cutScenePicture(image: string) {
  return (
    <Image
      src={image}
      width={400}
      height={400}
      priority
      quality={100}
      alt='Story Picture'
      className='w-full rounded-md'
    />
  );
}

export function gamePortrait(image: string) {
  return (
    <Image
      src={image}
      width={100}
      height={100}
      priority
      quality={100}
      alt='Enemy Profile Picture'
      className='rounded-md'
    />
  );
}

export function roundedPortrait(
  image: string,
  setLevel: (level: number) => void,
  level: number
) {
  return (
    <div onClick={() => setLevel(level)}>
      <Image
        src={image}
        width={400}
        height={400}
        priority
        quality={100}
        alt='Enemy Profile Picture'
        className='w-full rounded-md'
      />
    </div>
  );
}

export function bigPortrait(image: string) {
  return (
    <Image
      src={image}
      width={300}
      height={300}
      priority
      quality={100}
      alt='Enemy Profile Picture'
      className='w-full rounded-md'
    />
  );
}

export function smallPortrait(
  image: string,
  setLevel: (level: number) => void,
  level: number
) {
  return (
    <div onClick={() => setLevel(level)}>
      <Image
        src={image}
        width={200}
        height={200}
        priority
        quality={100}
        alt='Enemy Profile Picture'
        className='w-full rounded-md'
      />
    </div>
  );
}

export function cardPortrait(
  image: string,
) {
  return (
    <Image
      src={image}
      width={200}
      height={200}
      priority
      quality={100}
      alt='Enemy Profile Picture'
      className='w-full rounded-md'
    />
  );
}

export function shopPortrait(
  image: string,
) {
  return (
    <Image
      src={image}
      width={100}
      height={100}
      priority
      quality={100}
      alt='Enemy Profile Picture'
      className='rounded-md'
    />
  );
}