import { useDropzone } from 'react-dropzone';

import { UploadProps } from './types';
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreview from './preview/MultiFilePreview';
import SingleFilePreview from './preview/SingleFilePreview';
import { IconiFy } from '../Iconify';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Typography } from '../Typography';

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  file,
  onDelete,
  files,
  thumbnail,
  onUpload,
  isUploading,
  onRemove,
  onRemoveAll,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;
  const hasFiles = files && multiple && files.length > 0;
  const isError = isDragReject || !!error;

  return (
    <div className='w-full h-auto relative'>
      <div
        {...getRootProps()}
        className={cn(
          "outline-none cursor-pointer p-1 rounded-sm border-dashed block border border-gray-300 select-none",
          isError && "border-red-500",
          isDragActive && 'opacity-75 border-gray-300/75',
          disabled && "opacity-50 pointer-events-none",
        )}
      >
        <input {...getInputProps()} />
        {!hasFile && <Placeholder />}
        {hasFile && <SingleFilePreview file={file} />}
      </div>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && !disabled && (
        <Button
          size="sm"
          onClick={onDelete}
          className='top-2 right-2 z-[9] absolute p-1 m-0 h-auto p rounded-full opacity-75'
        >
          <IconiFy icon="eva:close-fill" size={'sm'} className='leading-none' />
        </Button>
      )}

      {hasFiles && (
        <>
          <div className='my-2'>
            <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
          </div>

          <div className='flex flex-row justify-end  gap-2'>
            {onRemoveAll && (
              <Button variant="outline" size="sm" onClick={onRemoveAll}> Remove all</Button>
            )}

            {onUpload && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  onUpload()
                }}
                disabled={isUploading}
              >
                Upload files
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Placeholder({ dropZoneText = 'Drop or Select file' }: { dropZoneText?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2">
      <Typography variant="h5">{dropZoneText}</Typography>
      <Typography variant="body2" component="span">
        Drop files here or click browse thorough your machine
      </Typography>
    </div>
  );
}
