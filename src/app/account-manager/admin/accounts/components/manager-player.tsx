"use client"
import { useState } from "react";


import { Input } from "@/components/ui/input";

import { Table, TableBody, TableRow, TableCell, TableHeader, TableHead } from "@/components/ui/table";
import ActionsDropdown from "./actions-dropdown";
import { Button } from "@/components/ui/button";




export default function AdminManagerPlayer() {
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <>

      <div className="flex flex-col rounded-sm border">

        <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
          General information
          <div className="flex flex-row gap-2 items-center">
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 7l-5 5m0 0l5 5" />
              </svg>
            </Button>
            <span>
              0 of 5
            </span>
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 17l5-5l-5-5" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="p-2 border-b">
          <Input
            id="search"
            type="text"
            placeholder="Search Email, Account Name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            autoFocus
          />
        </div>

        <Table>
          <TableHeader className="pointer-events-none">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Email:</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>




            <TableRow>
              <TableCell>00002</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00003</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00004</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00005</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00006</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00007</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00008</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00009</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>00010</TableCell>
              <TableCell>I</TableCell>
              <TableCell className="text-right w-[30px]">
                {/* <ActionsDropdown /> */}

              </TableCell>
            </TableRow>


          </TableBody>
        </Table>
      </div >
    </>
  )
}