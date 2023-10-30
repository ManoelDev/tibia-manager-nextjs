import FileThumbnail, { fileData } from '../../file-thumbnail';

import { UploadProps } from '../types';
import { Button } from '@/components/ui/button';
import { IconiFy } from '@/components/Iconify';
import { Typography } from '@/components/Typography';
import { fData } from '@/utils/formatNumber';


export default function MultiFilePreview({ thumbnail, files, onRemove }: UploadProps) {
  if (!files?.length) { return null; }

  return (
    <div>
      {files.map((file) => {
        const { key, name = '', size = 0 } = fileData(file);
        const isNotFormatFile = typeof file === 'string';
        if (thumbnail) {
          return (
            <div key={key} className=''>
              <FileThumbnail
                tooltip
                imageView
                file={file}
              />
              {onRemove && (
                <Button
                  size="sm"
                  onClick={() => onRemove(file)}
                  className='p-0 m-0 h-auto rounded-full opacity-75 mr-1'
                >
                  <IconiFy icon="eva:close-fill" className='w-4' />
                </Button>
              )}
            </div>
          );
        }
        return (
          <div
            key={key}
            className='flex border p-1 rounded items-center justify-center gap-2 relative'
          >
            <FileThumbnail file={file} />

            <div className='grow min-w-0'>
              <Typography variant="subtitle2" className='text-xs'>
                {isNotFormatFile ? file : name}
              </Typography>

              <Typography variant="caption" className='text-xs font-medium'>
                {isNotFormatFile ? '' : fData(size)}
              </Typography>
            </div>

            {onRemove && (
              <Button size="sm" onClick={() => onRemove(file)} className='p-1 m-0 h-auto rounded-full opacity-75 mr-1'>
                <IconiFy icon="eva:close-fill" className='w-4' />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
