import Image from 'next/image';
import { CustomFile } from '../types';

type Props = {
  file: CustomFile | string | null;
};

export default function SingleFilePreview({ file }: Props) {
  if (!file) { return null; }
  const imgUrl = typeof file === 'string' ? file : file.preview;
  return (
    <div className="flex items-center justify-center min-h-[64px]">
      <Image
        src={imgUrl ?? ''}
        alt="Picture of the product"
        width={300}
        height={300}
        style={{
          width: 'auto',
          height: 'auto',
        }}
      />
    </div>
  );
}
