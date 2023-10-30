import { useDropzone } from 'react-dropzone';
import { UploadProps } from './types';
import RejectionFiles from './errors/RejectionFiles';
import { IconiFy } from '../Iconify';
import { cn } from '@/lib/utils';
import ShopPreview from './preview/ShopPreview';

export default function UploadShopImage({ error, file, disabled, helperText, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    disabled,
    ...other,
  });

  const hasFile = !!file;

  const isError = isDragReject || !!error;

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "w-[160px] h-[96px] m-auto flex cursor-pointer p-2 rounded items-center relative justify-center border border-dashed",
          (isDragActive && 'opacity-75'),
          (isError && 'border-red-300'),
          (disabled && 'opacity-50 pointer-events-none'),
          (hasFile && ''),

        )}
      >
        <input {...getInputProps()} />

        {hasFile && <ShopPreview file={file} />}

        <div
          className={cn(
            "z-[7] flex rounded absolute items-center flex-col justify-center w-full h-full hover:opacity-70 text-sm",
            (hasFile && "z-10 opacity-0 text-white bg-gray-900/70"),
            (isError && "text-red-500 bg-red-200")
          )}
        >
          <IconiFy icon="ic:round-add-a-photo" className='mb-1' />
          <span>{file ? 'Update image' : 'Upload image'}</span>
        </div>
      </div>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />
    </>
  );
}
