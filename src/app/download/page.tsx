import { CardTitle } from "@/components/ui/card";
import configLua from "@/hooks/configLua";

const lua = configLua()

export default function DownloadPage() {
  return (
    <>
      <section className='container bg-gray-50 rounded-sm p-0 space-y-2'>
        <header className='flex p-2 items-center justify-between border-b-[1px]'>
          <CardTitle className="flex flex-row justify-between items-center">
            Download
          </CardTitle>
        </header>
        <div className="container p-2">
          <div className="">
            DOWN1
          </div>

          <div className="flex flex-row justify-between items-center space-x-2 rounded-md border p-2 leading-none">
            The software and any related documentation is provided &quot;as is&quot; without warranty of any kind. The entire risk arising out of use of the software remains with you. In no event shall {lua['serverName']} be liable for any damages to your computer or loss of data.
          </div>
        </div>

      </section>

    </>
  )
}