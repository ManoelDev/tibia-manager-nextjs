import { ReactNode } from 'react'
import { DropzoneOptions } from 'react-dropzone'

export interface CustomFile extends File {
  path?: string
  preview?: string
  lastModifiedDate?: Date
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean
  file: CustomFile | string | null
  helperText?: ReactNode
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files: (File | string)[]
  error?: boolean
  showPreview?: boolean
  isMultiple?: boolean
  helperText?: ReactNode
  dropZoneText?: string
  onUpload?: VoidFunction
  onRemove?: (file: File | string) => void
  onRemoveAll?: VoidFunction
}
