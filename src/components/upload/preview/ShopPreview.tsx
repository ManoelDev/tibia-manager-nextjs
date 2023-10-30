import Image from 'next/image';
import { CustomFile } from '../types';


type Props = {
  file: CustomFile | string | null;
};

export default function ShopPreview({ file }: Props) {
  if (!file) { return null }
  const imgUrl = typeof file === 'string' ? file : file.preview;
  return (
    <div className="flex items-center justify-center">
      <Image
        src={imgUrl ?? ''}
        alt="Picture of the product"
        width={128}
        height={64}
        quality={100}
        style={{
          zIndex: 8,
          overflow: 'hidden',
          position: 'absolute',
          width: `calc(100% - 16px)`,
          height: `calc(100% - 16px)`,
        }}
        className='h-[64px]'
      />
    </div>
  );
}
