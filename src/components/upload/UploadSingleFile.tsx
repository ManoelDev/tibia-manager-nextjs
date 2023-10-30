"use client"
import * as React from "react"
import Image from "next/image"
import { cn } from '@/lib/utils'
import { DropzoneOptions, useDropzone, FileRejection } from 'react-dropzone'
import getFileData from "@/utils/getFileData"
import { Typography } from "../Typography"
import numeral from 'numeral'
import { CustomFile } from "./type"


export interface UploadProps extends DropzoneOptions {
  error?: boolean
  file: CustomFile | string | null
  helperText?: React.ReactNode
}

export default function UploadSingleFile({ error = false, file, helperText, ...other }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({ multiple: false, ...other })
  console.log('file', file)
  return (<>
    <div className="outline-none h-auto overflow-hidden relative p-[12px 16px] rounded-md border-2 border-dashed border-gray-300 hover:opacity-75 hover:cursor-pointer">
      <div className={cn(
        "",
        isDragActive && 'opacity-75',
        (isDragReject || error) && "border-red-300 bg-red-200",
        file && 'p-2'
      )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <BlockContent />

        {file && (
          <img
            alt="file preview"
            src={typeof file === 'string' ? file : file.preview ?? ''}
            className="top-0 left-0 rounded-sm absolute h-[calc(100% - 16px)] w-[calc(100% - 16px)]"
          />
        )}
        {fileRejections.length > 0 && (<RejectionFiles fileRejections={fileRejections} />)}
        {helperText && helperText}
      </div>
    </div>
  </>)
}

function fData(number: string | number) { return numeral(number).format('0.0 b') }

type FileRejectionsProps = { fileRejections: FileRejection[] }
export function RejectionFiles({ fileRejections }: FileRejectionsProps) {
  return (<>
    <div className="py-1 px-2 mt-3 bg-red-500/80">
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = getFileData(file)
        return (
          <div key={path} >
            <Typography variant="subtitle2">
              {path} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <div
                key={error.code}
              >
                {error.message}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  </>)
}


interface BlockContentProps { dropZoneText?: string }

export function BlockContent({
  dropZoneText = ''
}: BlockContentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <Typography variant="h5">{dropZoneText}</Typography>
      <Typography variant="body2" component="span">
        Arraste e solte os arquivos aqui ou clique para fazer upload.
      </Typography>
    </div>
  )
}