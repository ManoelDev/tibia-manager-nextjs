import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function DownloadPage() {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Download</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="otClient" className="w-full">
            <TabsList className="w-full justify-start px-1">
              <TabsTrigger value="otClient">OTClient</TabsTrigger>
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
              <TabsTrigger value="mageBot">MageBot</TabsTrigger>
            </TabsList>

            <TabsContent value="otClient">

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClien</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>

                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClient MAC</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>
              </div>

              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  Minimum Requirements
                </div>
                <div className="p-2">
                  <ul className="my-1 ml-6 list-disc [&>li]:mt-2 text-xs font-medium">
                    <li>Sistema Operacional:  Windows</li>
                    <li>Visual C++ Redistribuível para Visual Studio 2015 (baixe aqui)</li>
                    <li>Processador: 1.5 GHz Pentium 4 ou equivalente com SSE2</li>
                    <li>Memoria: 1GB RAM</li>
                    <li>Gráficos: 128MB; se DirectX 9c ou OpenGL 2.1 não são suportados, apenas o modo renderizador de software está disponível (sem efeitos de luz)</li>
                    <li>Disco rígido: min. 150 MB</li>
                  </ul>
                </div>

                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm'>
                  Recommended Requirements
                </div>
                <div className="p-2">
                  <ul className="my-1 ml-6 list-disc [&>li]:mt-2 text-xs font-medium">
                    <li>Sistema Operacional:  Windows (mais recente)</li>
                    <li>Visual C++ Redistribuível para Visual Studio 2015</li>
                    <li>Processador: 2.5 GHz Intel Core i3 ou equivalente</li>
                    <li>Memória: 4GB RAM</li>
                    <li>Gráficos: 512MB; OpenGL 2.1 suporte</li>
                    <li>Disco rígido: min. 150 MB</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col space-y-2 rounded-md border p-2 leading-none mt-2">
                <span className="font-medium">Disclaimer</span>
                <p className="text-xs">
                  The software and any related documentation is provided &quot;as is&quot; without warranty of any kind. The entire risk arising out of use of the software remains with you. In no event shall CipSoft GmbH be liable for any damages to your computer or loss of data.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="client">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClien</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>

                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClient MAC</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="android">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClien</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>

                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClient MAC</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mageBot">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClien</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>

                <div className="border rounded-sm shadow-md">
                  <CardHeader className="border-b">
                    <CardTitle className="text-center">OTClient MAC</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col justify-center items-center h-[120px] ">
                    <Link href={'#'} className="text-blue-600 font-normal">Download</Link>
                    <span className="text-gray-400 text-xs">(Inclui Proxy Opcional)</span>
                  </div>
                  <div className="font-medium bg-gray-100 text-center">150 <strong>MB</strong></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

        </CardContent>
      </Card>
    </>
  )
}