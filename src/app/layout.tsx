import './globals.css'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { Toaster } from "@/components/ui/toaster"
import { Provider } from '@/providers/providers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MainMenu from '@/components/main-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

import LoginBox from '@/components/login-box'
import configLua from '@/hooks/configLua'
import RashidBox from '@/components/rashid-box'
import CountDown from '@/components/count-down'
import { StatusServer } from '@/utils/statusServer'
import { Typography } from '@/components/Typography'
import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Suspense } from 'react'
import { IconiFy } from '@/components/Iconify'

const lua = configLua()

export const metadata: Metadata = {
  title: {
    default: lua['serverName'],
    template: `%s - ${lua['serverName']}`,
  }
}

export async function status() {
  try {
    const statusServer = new StatusServer();
    const host = lua['ip']
    const port = +lua['statusProtocolPort'];
    const status = await statusServer.getStatus(host, port);
    return {
      status: !!status,
    };
  } catch (error) {
    console.error('Ocorreu um erro ao verificar o status do servidor:', error);
    return {
      status: false,
    };
  }
}

export async function totalOnline() {
  try {
    const som = await prisma.players_online.count()
    return som
  } catch (error) {
    console.error('Ocorreu um erro ao contar o toral de players online:', error);
    return 0
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const statusServer = await status()
  const countOnline = await totalOnline()

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning >
        <>
          <Provider>
            <ScrollArea className="h-screen w-full px-2">
              <div className='sm:grid sm:grid-cols-12 sm:space-x-2 sm:space-y-0 space-y-2 grid-cols-1 mx-auto max-w-screen-xl mt-10 hidden'>
                <div className='col-span-2 space-y-2' >
                  <Image src={'/testlogo2.png'} priority width={212} height={200} className='w-auto h-auto' alt='Logo' />

                </div>
                <div className='col-span-8 space-y-2'>
                </div>

                <div className='sm:col-span-2 col-span-1 hidden sm:block gap-2'>
                  <div className='flex flex-row justify-center items-end h-full pb-2 gap-2'>
                    <div className='bg-background/10 shadow rounded-sm backdrop-blur-[6px] p-3'>
                      <Image src={'https://www.tibiawiki.com.br/images/7/7e/Charged_Anomaly.gif'} width={80} height={80} alt='Logo' />
                    </div>
                    <div className='bg-background/10 shadow rounded-sm backdrop-blur-[6px] p-3'>
                      <Image src={'https://www.tibiawiki.com.br/images/7/7e/Charged_Anomaly.gif'} width={80} height={80} alt='Logo' />
                    </div>
                  </div>
                </div>

              </div>
              <div className='grid sm:grid-cols-12 sm:space-x-2 sm:space-y-0 space-y-2 grid-cols-1 mx-auto max-w-screen-xl'>

                <div className='sm:col-span-2 col-span-1 gap-2 space-y-2 '>
                  <LoginBox />

                  <div className='flex flex-col p-1 gap-2 bg-background/10 shadow rounded-md backdrop-blur-[6px]'>
                    <div className='flex flex-col space-y-2'>
                      <Button size={'lg'} variant={'blue'} asChild>
                        <Link href={'/download'} className='justify-start gap-2'>Download</Link>
                      </Button>
                    </div>
                  </div>

                  <div className='flex flex-col p-1 gap-2 bg-background/10 shadow rounded-md backdrop-blur-[6px]'>
                    <MainMenu />
                  </div>

                </div>

                <div className='col-span-8 space-y-2 pb-8'>
                  <div className='flex flex-col p-1 gap-2 bg-background/10 shadow rounded-md backdrop-blur-[6px]'>
                    <div className='flex items-center justify-between bg-gray-50 rounded-sm p-1'>
                      <Button variant={'link'} size={'sm'}>
                        Join Discord
                      </Button>

                      <div className='flex items-center space-x-1 p-1 px-2'>
                        {statusServer.status
                          ? <Badge variant={'info'}>{countOnline} players</Badge>
                          : <Badge variant={'error'}>OFFLINE</Badge>
                        }
                      </div>

                    </div>
                  </div>

                  <div className='flex flex-col p-1 gap-2 bg-background/10 shadow rounded-md backdrop-blur-[6px]'>
                    {children}
                  </div>

                  <div className='flex justify-between p-2 gap-2 bg-background/10 shadow-md rounded-md backdrop-blur-[6px]'>
                    <Typography variant={'overline'} className='text-white'>
                      &copy; Progamo Ltda.
                    </Typography>
                    <Typography variant={'overline'} className='text-white'>
                      Developed by Manoel Neto
                    </Typography>
                  </div>

                </div>

                <div className='sm:col-span-2 col-span-1 gap-2 space-y-2 '>
                  <div className='flex flex-col p-1 gap-2 bg-background/10 shadow rounded-md backdrop-blur-[6px]'>
                    <CountDown hour={19} min={55} />
                  </div>
                  <div className='flex flex-col p-1 gap-2 bg-background/10 shadow rounded-md backdrop-blur-[6px]'>
                    <RashidBox />
                  </div>

                </div>
              </div>
            </ScrollArea>
          </Provider>
          <Toaster />
        </>
      </body>
    </html>
  )
}
