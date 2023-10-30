//
import { fileData, fileFormat, fileThumb } from './utils';
import DownloadButton from './DownloadButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import Image from 'next/image';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: File | string;
  tooltip?: boolean;
  imageView?: boolean;
  onDownload?: VoidFunction;
};

export default function FileThumbnail({
  file,
  tooltip,
  imageView,
  onDownload,
}: FileIconProps) {
  const { name = '', path = '', preview = '' } = fileData(file);

  const format = fileFormat(path || preview);

  const renderContent =
    format === 'image' && imageView ? (
      <Image src={preview} className='flex-shrink-0 object-cover' alt={''} width={300} height={300} style={{ width: 'auto', height: 'auto' }} />
    ) : (
      <Image src={fileThumb(format)} className='w-8 flex-shrink-0' alt={''} width={32} height={32} style={{ width: '32px', height: 'auto' }} />
    );

  if (tooltip) {
    return (
      <div title={name}>
        <span className='flex-shrink-0 items-center justify-center w-fit h-[inherit]'>
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </span>
      </div>
    );
  }

  return (
    <>
      {renderContent}
      {onDownload && <DownloadButton onDownload={onDownload} />}
    </>
  );
}
