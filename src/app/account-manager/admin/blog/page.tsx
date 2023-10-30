'use client'
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, RHFSelect, RHFTextEditor, RHFTextField } from '@/components/hook-form';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function AdminBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState({
    posts: [],
    totalPages: 1,
  })
  const [page, setPage] = useState(1)

  const FormSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    category: z.enum(['BLOG', 'TICKER', 'ROADMAP']).default('BLOG'),
    content: z.string(),
  })

  type FormValues = z.infer<typeof FormSchema>
  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: 'BLOG'
    }
  })
  const { handleSubmit, getValues, reset } = methods

  async function onSubmit(data: FormValues) {
    try {
      await fetch("/api/administration/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data
        }),
      }).then(async (res) => {
        if (res.status === 201) {
          toast({
            title: "Success!",
            description: (
              <div>Post has been created.</div>
            ),
            variant: 'success'
          })
          reset()
          getPosts(1)
          return
        } else {
          const { error } = await res.json();
          toast({
            title: "Error:",
            variant: 'destructive',
            description: (
              <div>{error}</div>
            ),
          })
        }
      });
    } catch (error: any) {
      toast({
        title: "Error:",
        variant: 'destructive',
        description: (
          <div>{error.message}</div>
        ),
      })
    }
  }

  const getPosts = async (page: number) => {
    setIsLoading(true)
    const get = await fetch(`/api/administration/blog?page=${page}`, {
      method: 'GET'
    })

    if (get.ok) {
      const body = await get.json()
      console.log('body', body)
      setPosts({
        posts: body.posts,
        totalPages: body.totalPages,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getPosts(page)
  }, [page])

  async function onDeleteSubmit(id: number) {
    const get = await fetch(`/api/administration/blog?id=${id}`, {
      method: 'DELETE'
    })

    if (get.ok) {
      toast({
        title: "Success!",
        description: (
          <div>Post has been deleted.</div>
        ),
        variant: 'success'
      })
      getPosts(posts.posts.length === 1 ? page - 1 : page)
    }

  }
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}  >
        <div className='border rounded-sm'>
          <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
            Create new Post
          </div>

          <div className='p-2 space-y-2'>
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-2'>
                <RHFTextField
                  name="title"
                  placeholder='Title'
                />
              </div>
              <RHFSelect
                LabelOption={'label'} keyValue={'value'}
                placeholder='Category'
                name='category'
                defaultValue={getValues('category')}
                options={[
                  { value: 'BLOG', label: 'BLOG' },
                  // { value: 'TICKER', label: 'TICKER' },
                  { value: 'ROADMAP', label: 'ROADMAP' }
                ]}
              />
            </div>
            <RHFTextEditor
              name='content'
              id='content'
              defaultValue={getValues('content')}
              value={getValues('content')}
            />

            <div className='flex justify-end'>
              <Button type='submit'>Create</Button>
            </div>
          </div>
        </div>
      </FormProvider>

      <div className='border rounded-sm'>
        <div className='flex p-2 items-center justify-between bg-gray-100 text-sm border-b'>
          News Manager
          <div className="flex flex-row gap-2 items-center">
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0" disabled={page === 1} onClick={() => setPage(page - 1)} >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 7l-5 5m0 0l5 5" />
              </svg>
            </Button>
            <span>
              {page} of {posts.totalPages}
            </span>
            <Button variant={'outline'} className="bg-white hover:bg-slate-50 w-[24px] h-[24px] p-0" disabled={posts.totalPages === page} onClick={() => setPage(page + 1)} >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 17l5-5l-5-5" />
              </svg>
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader className="pointer-events-none">
            <TableRow className='whitespace-nowrap'>
              <TableHead className='w-full'></TableHead>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading && posts.posts.map((post: any) => (
              <TableRow key={post.id.toString()}>
                <TableCell>{post.title}</TableCell>
                <TableCell><Badge>{post.category}</Badge></TableCell>
                <TableCell className="text-right w-[30px]">

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-[24px] h-[24px] p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                          <path fill="currentColor" d="M144 128a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm-84-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm136 0a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => onDeleteSubmit(post.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </TableCell>
              </TableRow>
            ))}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <div
                    className='col-span-1 my-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'
                  >
                    <svg
                      aria-hidden='true'
                      className='h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                    <span className='sr-only'>Loading...</span>
                  </div>

                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </>
  );
}

