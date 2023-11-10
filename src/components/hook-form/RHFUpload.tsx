import { Controller, useFormContext } from 'react-hook-form'

import Upload from '../upload/Upload';
import { UploadProps } from '../upload/types';
import UploadShopImage from '../upload/UploadShop';
import UploadGuildImage from '../upload/UploadGuild';

interface Props extends Omit<UploadProps, 'file'> {
  name: string
  multiple?: boolean;
}

export function RHFUploadShopImage({ name, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadShopImage
            accept={{ 'image/*': [] }}
            error={!!error}
            file={field.value}
            {...other}
          />

          {!!error && (<div className='px-2 text-center text-red-500'>{error.message}</div>)}
        </div>
      )}
    />
  );
}

export function RHFUploadGuildImage({ name, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadGuildImage
            accept={{ 'image/*': [] }}
            error={!!error}
            file={field.value}
            {...other}
          />

          {!!error && (<div className='px-2 text-center text-red-500'>{error.message}</div>)}
        </div>
      )}
    />
  );
}

export function RHFUpload({ name, multiple, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            accept={{ 'image/*': [] }}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <div className='text-sm text-red-500'>{error ? error?.message : helperText}</div>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            accept={{ 'image/*': [] }}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <div className='text-sm text-red-500'>{error ? error?.message : helperText}</div>
              )
            }
            {...other}
          />
        )
      }
    />
  );
}