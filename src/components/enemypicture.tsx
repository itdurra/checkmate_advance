import Image from 'next/image';

export function EnemyPicture({ filename }: {filename: string}) {
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
