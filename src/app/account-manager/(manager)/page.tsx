import Image from "next/image";

import CharactersList from "./components/characters-list";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChangePasswordForm } from "./components/change-password-form";
import { ConfirmDeletionAccount } from "./components/ConfirmDeletionAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { CharacterForm } from "./components/create-character-form";
import Link from "next/link";
import { LogoutButton } from "@/components/logout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { fUnixToDate } from "@/utils/functions/formatDate";
import { ChangeEmailForm } from "./components/change-email-form";
import { ChangeAccountInfoForm } from "./components/change-account-info-form";
import { ChangeSocialMediaForm } from "./components/change-social-media-form";

import { convertBigIntsToNumbers } from '@/utils/functions/convertBigIntsToNumbers'
import ActiveEmailRequest from "./components/acitver-email-request";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { IconiFy } from "@/components/Iconify";
import JoinGuild from "./components/join-guild";
import TwoFactSettings from "@/components/TwoFactSettings";

async function getAccount(id: number) {
  const account = await prisma.accounts.findUnique({
    where: { id: Number(id) }, include: {
      players: {
        include: {
          guild_invites: {
            include: {
              players: true,
              guilds: true
            }
          }
        }
      },
      account_bans: true,
      profile: true,
      address: true,
      social_medias: true
    }
  })
  return account
}

async function findOnlinePlayer(player_id: number) {
  const query = await prisma.players_online.findFirst({ where: { player_id } })
  if (query) return true
  return false
}



type Params = {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function Dashboard({ params, searchParams }: Params) {

  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) redirect('/')

  const acc = await getAccount(Number(user?.id))
  if (!acc) redirect('/')

  const ids = acc.players.map((i) => i.id)

  const playersOnline = await prisma.players_online.findMany({
    where: { AND: [{ player_id: { in: ids } },], },
    select: { player_id: true }
  })


  const lastLogin = acc.players.sort((a, b) => Number(b.lastlogin) - Number(a.lastlogin));

  // if (!acc.account_bans) {
  //   return (
  //     <Card>
  //       <CardHeader className="border-b">
  //         <CardTitle>Account Manager</CardTitle>
  //       </CardHeader>
  //       <CardContent className="p-2 space-y-2">
  //         <div className="rounded-sm border">
  //           <div className='flex p-2 items-start justify-start bg-red-100 text-sm text-red-500'>
  //             Roles Violation Record Details
  //           </div>
  //           <Table>
  //             <TableBody>
  //               <TableRow>
  //                 <TableCell className="w-[140px]">Date:</TableCell>
  //                 <TableCell>AA</TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="w-[140px]">Last Edit date:</TableCell>
  //                 <TableCell>AA</TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="w-[140px]">Reason:</TableCell>
  //                 <TableCell>AA</TableCell>
  //               </TableRow>
  //                 <TableCell className="w-[140px]">Comment:</TableCell>
  //                 <TableCell>AA</TableCell>
  //               </TableRow>
  //               <TableRow>
  //                 <TableCell className="w-[140px]">Statement:</TableCell>
  //                 <TableCell>AA</TableCell>
  //               </TableRow>
  //             </TableBody>
  //           </Table>
  //         </div >
  //         <div className="flex justify-end pt-2">
  //           <Button>Contact</Button>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  const InitialTab = searchParams?.tab ?? 'status'

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Account Manager</CardTitle>
        </CardHeader>

        <div className="p-2 space-y-2">
          <div className="rounded-sm border">

            <div className="p-2 flex sm:flex-row sm:justify-between gap-2">

              <div className="flex-grow">
                <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm rounded-sm mb-2'>
                  Account Status
                </div>
                <div className="flex items-center gap-2 leading-none">
                  {acc?.premdays ? <Image src={'/account/status_green.gif'} width={32} height={32} alt="Premium" /> : <Image src={'/account/status_red.gif'} width={32} height={32} alt="Free" />}
                  <div>
                    {acc?.premdays ? (
                      <>
                        <Typography variant={"h6"} className="text-green-500 leading-none" >Premium Account</Typography>
                        <Typography variant={"overline"} className="text-sm leading-none">( Balance of Premium Time: <strong>{acc?.premdays}</strong> days )</Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant={"h6"} className="text-red-500" >Free Account</Typography>
                        <Typography variant={"overline"} className="text-sm">To benefit from our great premium features, get Premium Time for your account.</Typography>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {user?.role === 'admin' && (
                  <Button variant={'destructive'} className="whitespace-nowrap" asChild>
                    <Link href={'/account-manager/admin'}>Admin Panel</Link>
                  </Button>
                )}
                <Button className="whitespace-nowrap" asChild><Link href={'/shop'}>Shop</Link></Button>
                <LogoutButton />
              </div>

            </div>
            {!acc.key && (
              <div className="p-2 pt-0">
                <Alert variant={'destructive'} className="rounded-sm">
                  <AlertTitle>Warning!</AlertTitle>
                  <AlertDescription>
                    <div className="flex flex-row gap-2">
                      <div>You account is not register <Link href={'/account-manager'} className="font-bold text-blue-600" >Recovery Key</Link>.</div>
                    </div>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>

        {acc.players.filter(player => player.guild_invites.length).length ? (
          <div className="p-2 pt-0 rounded-sm">
            <Alert className="rounded-sm" variant={'info'}>
              <IconiFy icon={'ph:info'} />
              <AlertTitle>Guild Invitation</AlertTitle>
              <AlertDescription className="flex flex-row justify-between gap-2">
                <p>Hello <strong>{acc.players.filter(player => player.guild_invites.length)[0].guild_invites[0].players.name}</strong>, you have been invited to join the <strong>{acc.players.filter(player => player.guild_invites.length)[0].guild_invites[0].guilds.name} </strong>guild.</p>
                <JoinGuild
                  guild_id={acc.players.filter(player => player.guild_invites.length)[0].guild_invites[0].guilds.id}
                  player_id={acc.players.filter(player => player.guild_invites.length)[0].guild_invites[0].player_id}
                />
              </AlertDescription>
            </Alert>
          </div>
        ) : (<></>)}


        <Tabs defaultValue={InitialTab} className="p-2 pt-0 rounded-sm" activationMode="manual">
          <TabsList className="w-full border-[1px] rounded-sm bg-gray-100">
            <TabsTrigger value="status" className="rounded-sm">Status</TabsTrigger>
            <TabsTrigger value="account" className="rounded-sm">Account</TabsTrigger>
            <TabsTrigger value="history" className="rounded-sm">History</TabsTrigger>
            <TabsTrigger value="tickets" className="rounded-sm">Tickets</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="">
            <div className="space-y-2">
              <div className="space-y-2">
                <div className="flex flex-col rounded-sm border">
                  <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm border-b'>
                    General Information
                  </div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Email Address:</TableCell>
                        <TableCell className="">{acc?.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Created:</TableCell>
                        <TableCell className="">{fUnixToDate(acc.created)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Login (Game):</TableCell>
                        <TableCell className="">{fUnixToDate(Number(lastLogin[0]?.lastlogin))}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Login (Website):</TableCell>
                        <TableCell className="">{fUnixToDate(acc.web_lastlogin)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tibia Coins:</TableCell>
                        <TableCell className="flex items-center gap-1">
                          {acc?.coins}{' '}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger><Image src="/icons/icon-tibiacointrusted.png" alt="tibiacointrusted" width={16} height={16} className=" w-auto h-auto" /></TooltipTrigger>
                              <TooltipContent>
                                <p>Tibia Coins</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {' '}
                          ( include {acc?.tournamentBalance.toString()}
                          {' '}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger><Image src="/icons/icon-tibiacoin.png" alt="tibiacointrusted" width={16} height={16} className=" w-auto h-auto" /></TooltipTrigger>
                              <TooltipContent >
                                <p>No Transferable Coins</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          )</TableCell>
                      </TableRow>

                      {/* <TableRow>
                        <TableCell className="w-[170px]">Tournament Coins:</TableCell>
                        <TableCell className="flex flex-row items-center gap-1">{acc?.tournamentBalance.toString()}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger><Image src="/icons/icon-tournamentcoin.png" alt="tibiacointrusted" width={16} height={16} className=" w-auto h-auto" /></TooltipTrigger>
                              <TooltipContent >
                                <p>Tournament Coins</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow> */}

                      <TableRow>
                        <TableCell className="w-[170px]">Loyalty Points:</TableCell>
                        <TableCell className="">{acc?.loyalty_points.toString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[170px]">Loyalty Title:</TableCell>
                        <TableCell className="">(no title) (Promotion to: Scout of Tibia at 50 Loyalty Points)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-[170px]">Registered:</TableCell>
                        <TableCell className="uppercase"><Badge variant={acc.email_verified === true ? "success" : "destructive"}>{acc.email_verified === true ? "Registered" : "Unregistered"}</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

              </div>

              <CharactersList chars={convertBigIntsToNumbers(acc?.players)} playerOnline={playersOnline} />
              <div className="flex justify-end pt-2">
                <CharacterForm />
              </div>
            </div>

          </TabsContent>

          <TabsContent value="account" className="space-y-2">
            <div className="space-y-2">

              <div className="space-y-2">
                <div className="flex flex-col rounded-sm border">
                  <div className='flex p-2 items-start justify-start  bg-gray-100 text-sm border-b'>
                    Account Information
                  </div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-[200px]">First Name:</TableCell>
                        <TableCell>{acc.profile?.fisrt_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Last Name:</TableCell>
                        <TableCell>{acc.profile?.last_name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gender:</TableCell>
                        <TableCell>{acc.profile?.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Street Address:</TableCell>
                        <TableCell>{acc.address?.street}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>House Number:</TableCell>
                        <TableCell>{acc.address?.house_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Additional Information:</TableCell>
                        <TableCell>{acc.address?.comment}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Postal Code:</TableCell>
                        <TableCell>{acc.address?.zip_code}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>City:</TableCell>
                        <TableCell>{acc.address?.city}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Country:</TableCell>
                        <TableCell>{acc.address?.country}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>State/Province:</TableCell>
                        <TableCell>{acc.address?.state_province}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mobile Phone:</TableCell>
                        <TableCell>{acc.profile?.phone_number}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ChangePasswordForm />
                  <ChangeEmailForm />
                  <ChangeAccountInfoForm defaultValues={{
                    firstName: acc.profile?.fisrt_name ?? '',
                    lastName: acc.profile?.last_name ?? '',
                    gender: acc.profile?.gender ?? '',
                    phoneNumber: acc.profile?.phone_number ?? '',
                    address: {
                      city: acc.address?.city ?? '',
                      comment: acc.address?.comment ?? '',
                      country: acc.address?.country ?? '',
                      houseNumber: acc.address?.house_number ?? '',
                      state: acc.address?.state_province ?? '',
                      street: acc.address?.street ?? '',
                      zipCode: acc.address?.zip_code ?? ''
                    }
                  }} />
                </div>

              </div>

              <div className="flex flex-col rounded-sm border">
                <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
                  Social media
                </div>
                <Table>
                  <TableBody>

                    <TableRow>
                      <TableCell className="w-[200px]">Instagram:</TableCell>
                      <TableCell>{acc.social_medias?.instagram}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Youtube:</TableCell>
                      <TableCell>{acc.social_medias?.youtube}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Twitch:</TableCell>
                      <TableCell>{acc.social_medias?.twitch}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end gap-2">
                <ChangeSocialMediaForm defaultValues={
                  {
                    instagram: acc.social_medias?.instagram ?? '',
                    youTube: acc.social_medias?.youtube ?? '',
                    twitch: acc.social_medias?.twitch ?? ''
                  }
                } />
              </div>


            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-2">
            <div className="space-y-2">
              <div className="flex flex-row justify-between items-center space-x-2 rounded-md border p-2 leading-none">
                <div>
                  <Typography variant={'h5'} className="text-sm">Premium History</Typography>
                  <Typography variant={'body1'} className="text-sm" component={'p'}>Contains all historical data about your Premium Scrolls and Premium Times.</Typography>
                </div>
                <Button size={'sm'} className="whitespace-nowrap" asChild>
                  <Link href={'/account-manager/premium-history'}>View History</Link>
                </Button>
              </div>
              <div className="flex flex-row justify-between items-center space-x-2 rounded-md border p-2 leading-none">
                <div>
                  <Typography variant={'h5'} className="text-sm">Payments History</Typography>
                  <Typography variant={'body1'} className="text-sm" component={'p'}>Contains all historical data of your payments.</Typography>
                </div>
                <Button size={'sm'} className="whitespace-nowrap" asChild>
                  <Link href={'/account-manager/payments-history'}>
                    View History
                  </Link>
                </Button>
              </div>
              <div className="flex flex-row items-center justify-between space-x-2 rounded-md border p-2 leading-none">
                <div>
                  <Typography variant={'h5'} className="text-sm">Coins History</Typography>
                  <Typography variant={'body1'} className="text-sm">Contains all historical data about your Tibia Coins and products buyable with Tibia Coins.</Typography>
                </div>
                <Button size={'sm'} className="whitespace-nowrap">
                  <Link href={'/account-manager/coins-history'}>
                    View History
                  </Link>
                </Button>
              </div>
            </div>



          </TabsContent>

          <TabsContent value="tickets" className="space-y-2">
            <div>
              <div className="flex flex-row items-start space-x-3 rounded-md border p-2 space-y-1 leading-none">
                Tickets
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-2">
            <div className="flex flex-row justify-between items-start space-x-2 rounded-md border p-2 leading-none">
              <div>
                <Typography variant={'h5'} className="text-sm">Activate email code authentication for your account!</Typography>
                <Typography variant={'body1'} className="text-sm" component={'p'}>As a first step to activate email code authentication for your account, click on &quot;Request&quot;! An email code will be sent to the email address assigned to your account. You will be asked to enter this email code on the next page within 24 hours.</Typography>
              </div>
              <ActiveEmailRequest disabled={acc.email_verified} />

            </div>

            <div className="flex flex-row justify-between items-center space-x-2 rounded-md border p-2 leading-none">
              <div>
                <Typography variant={'body1'} className="text-sm" component={'p'}>Two-Factor authentication offers you an additional layer of security to help prevent unauthorised access to your Tibia account. In Tibia you can select one of these two methods:</Typography>
                <ul className="list-disc pl-8 py-2">
                  <li> <div className="flex flex-row justify-between"> Two-Factor Authenticator App <TwoFactSettings user={acc} /></div></li>
                  {/* <li>Two-Factor Email Code Authentication</li> */}
                </ul>
              </div>

            </div>

            <div className="flex justify-end gap-2">
              <ConfirmDeletionAccount />
            </div>
          </TabsContent>
        </Tabs>

      </Card>
    </>
  )
}
