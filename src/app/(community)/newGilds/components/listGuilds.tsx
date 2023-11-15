import Image from 'next/image'
import { Typography } from "@/components/Typography";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableEmptyState from '@/components/table-empty-state';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ListGuilds({ guilds = [] }: { guilds: any[] }) {
  return (<>
    {guilds.length > 0
      ? (
        <Table>
          <TableHeader className="pointer-events-none border-t bg-gray-100">
            <TableRow>
              <TableHead className="w-[80px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Leader</TableHead>
              <TableHead>Members</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guilds.map((guild, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="min-w-[64px]">
                    <Image src='/guilds/default.gif' alt=" logo name " width={64} height={64} className="min-w-[64px]" />
                  </TableCell>
                  <TableCell className="w-full">
                    <Typography component={'span'} variant={'h6'}>{guild.name}</Typography>
                    <Typography component={'p'} variant={'body1'} className=" line-clamp-2 text-sm">{guild.description}</Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap ">
                    <Typography component={'span'} variant={'overline'} className='flex gap-1 items-center'>
                      {/* <TooltipProvider delayDuration={0}>
                        <Tooltip disableHoverableContent>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                              <path className='fill-green-500' fill="currentColor" d="M7 18a8 8 0 1 0 0-12a8 8 0 0 0 0 12Z" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Online</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider> */}
                      {guild.players.name}
                    </Typography>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-end">
                    {guild.guild_membership.length}

                    {/* <div className='flex flex-row items-center'>
                      {guild.guild_membership.length}{' '}
                      (<TooltipProvider delayDuration={0}>
                        <Tooltip disableHoverableContent>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                              <path className='fill-green-500' fill="currentColor" d="M7 18a8 8 0 1 0 0-12a8 8 0 0 0 0 12Z" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Online</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      3 )
                    </div> */}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )
      : <TableEmptyState />
    }
  </>)
}