import { Typography } from '@/components/Typography';
import { fileData } from '@/components/file-thumbnail';
import { fData } from '@/utils/formatNumber';
import { FileRejection } from 'react-dropzone';


// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  if (!fileRejections.length) { return null; }

  return (
    <div>
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = fileData(file);
        return (
          <div key={path}>
            <Typography variant="subtitle2" className='text-red-500'>
              {path} - {size ? fData(size) : ''}
            </Typography>
            {errors.map((error) => (
              <div key={error.code} className='text-red-500'> - {error.message} </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
