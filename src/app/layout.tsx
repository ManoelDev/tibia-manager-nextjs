import './globals.css'
import 'react-lazy-load-image-component/src/effects/blur.css';

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
import { IconiFy } from '@/components/Iconify';
import Boosted from '@/components/aimations/boosted';

const lua = configLua()

export const revalidate = 0

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

async function boostedBoss() {

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

function extractIdsFromArrayOfObjects(array: any) {
  function extractIdFromUrl(url: string) {
    const match = url.match(/id=(\d+)/);
    return match ? match[1] : null;
  }

  function extractIdsFromObject(obj: any) {
    const id = extractIdFromUrl(obj.value);
    return { id, config: obj.config };
  }

  return array.map(extractIdsFromObject);
}


async function getSeverConfig(value: string) {
  const array1 = await prisma.$queryRaw<{ config: string, value: string }>`SELECT * from server_config WHERE config = ${value}`

  return extractIdsFromArrayOfObjects(array1);

}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const statusServer = await status()
  const countOnline = await totalOnline()

  const boostedCreature = await getSeverConfig('boost_monster_url')
  const boostedBoss = await getSeverConfig('boost_boss_url')


  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning >
        <>
          <Provider>
            <ScrollArea className="h-screen w-full px-2">
              <div className='sm:grid sm:grid-cols-12 sm:space-x-2 sm:space-y-0 space-y-2 grid-cols-1 mx-auto max-w-screen-xl mt-10 hidden'>
                <div className='col-span-2 space-y-2' >

                  {/* <Link href="/">
                    <Image src={'/testlogo2.png'} priority width={212} height={200} className='w-auto h-auto' alt='Logo' />
                  </Link> */}
                </div>
                <div className='col-span-8 space-y-2'>
                  <div className='flex justify-center items-center'>
                    <Link href="/">
                      <video className='w-[380px]' autoPlay muted playsInline loop>
                        <source src="/movies/logo.webm" type="video/webm" />
                      </video>
                    </Link>
                  </div>
                </div>

                <div className='sm:col-span-2 col-span-1 hidden sm:block gap-2'>
                  <div className='flex flex-row justify-center items-end h-full pb-2 gap-2'>
                    <div className='bg-background/10 shadow rounded-sm backdrop-blur-[6px] p-3'>
                      <Boosted boosted={{
                        boostname: boostedCreature[0].id,
                        lookaddons: 0,
                        lookbody: 0,
                        lookfeet: 0,
                        lookhead: 0,
                        looklegs: 0,
                        lookmount: 0,
                        looktype: boostedCreature[0].id
                      }} kind="creature" />
                    </div>
                    <div className='bg-background/10 shadow rounded-sm backdrop-blur-[6px] p-3'>
                      <Boosted boosted={{
                        boostname: boostedBoss[0].id,
                        lookaddons: 0,
                        lookbody: 0,
                        lookfeet: 0,
                        lookhead: 0,
                        looklegs: 0,
                        lookmount: 0,
                        looktype: boostedBoss[0].id
                      }} kind="boss" />
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


                      <div className='flex flex-row gap-4'>
                        <Link href={'/download'} className='flex flex-row items-center text-xs'>
                          <IconiFy icon={'line-md:download-loop'} /> Download
                        </Link>
                        <Link href={process.env.DISCORD_URL ?? '#'} className='flex flex-row items-center text-xs'>
                          <IconiFy icon={'line-md:discord'} className='w-6' /> Join Discord
                        </Link>
                        <Link href={process.env.YOUTUBE_URL ?? ' #'} className='flex flex-row items-center text-xs '>
                          <IconiFy icon={'line-md:youtube'} className='w-6' /> YouTube
                        </Link>
                        <Link href={process.env.INSTAGRAM_URL ?? '#'} className='flex flex-row items-center text-xs '>
                          <IconiFy icon={'line-md:instagram'} className='w-6' /> Instagram
                        </Link>
                        <Link href={process.env.FACEBOOK_URL ?? '#'} className='flex flex-row items-center text-xs '>
                          <IconiFy icon={'line-md:facebook'} className='w-6' /> facebook
                        </Link>
                        <Link href={process.env.WHATSAPP_URL ?? '#'} className='flex flex-row items-center text-xs '>
                          <IconiFy icon={'ic:twotone-whatsapp'} className='w-6' /> Whatsapp
                        </Link>
                      </div>

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
