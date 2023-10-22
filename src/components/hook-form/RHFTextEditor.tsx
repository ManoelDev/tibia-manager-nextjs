
import { Controller, useFormContext } from 'react-hook-form'
import { InputProps } from '../ui/input'
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

type IProps = {
  name: string
  label?: string
  initialValue?: string
}

type Props = IProps & InputProps

export default function RHFTextEditor({ name, label, initialValue, ...other }: Props) {
  const { control } = useFormContext()
  const inputId = React.useId()


  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="grid gap-2">
          <Editor
            id={inputId}
            apiKey={process.env.TinyEditorAPI_KEY ?? '3wm64a35htdlac5v1zehh98br95z1jmh1a837csias6hm3k9'}
            value={field.value}
            // ref={field.ref}

            onEditorChange={field.onChange}
            initialValue={initialValue}

            init={{
              resize: 'both',
              min_height: 400,
              max_width: 836,
              menubar: false,
              formats: {
                // h1: { block: 'h1', classes: 'scroll-m-20 text-4xl font-extrabold tracking-tight' },
                // h2: { block: 'h2', classes: 'scroll-m-20 text-3xl font-semibold tracking-tight' },
                // h3: { block: 'h3', classes: 'scroll-m-20 text-2xl font-semibold tracking-tight' },
                // h4: { block: 'h4', classes: 'scroll-m-20 text-xl font-semibold tracking-tight' },
                // h5: { block: 'h5', classes: 'scroll-m-20 text-mb font-normal tracking-tight' },
                // h6: { block: 'h6', classes: 'scroll-m-20 text-sm font-normal tracking-tight' },

                // p: { block: 'p', classes: 'leading-4' },
                // img: { block: 'img', classes: 'w-auto h-auto leading-4' },
                // blockquote: { block: 'blockquote', classes: 'mt-2 border-l-2 pl-6 italic' },
              },

              plugins: 'autoresize preview importcss tinydrive searchreplace autolink autosave  directionality visualblocks visualchars image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
              toolbar: "undo redo preview | aidialog aishortcuts | blocks fontsizeinput | bold italic strikethrough | align numlist bullist | link image | table media pageembed | lineheight  outdent indent | forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen  | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",

              statusbar: false,

            }}

          />
        </div>
      )}
    />
  )
}