import LastNews from "./(news)/last-news/page";

export default function Home() {

  return (
    <>
      {/* <Card>
        <CardHeader className="border-b">
          <CardTitle>News Ticker</CardTitle>
        </CardHeader>
        <CardContent>
          {news?.map((post) => {
            return (
              <article key={post.id}>
                <header className='flex p-2 space-x-2 items-center justify-between rounded-sm  bg-gray-100'>
                  <div className="flex flex-row gap-2 items-center">
                    <Typography variant="h6" className="leading-3" >{post.title}</Typography>
                  </div>
                  <time className='flex flex-col text-xs items-center font-normal text-gray-400'>{dayjs(post.createdAt).format('D/M/YYYY h:m')}</time>
                </header>
                <article className="no-tailwindcss-base p-2" dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
            )
          })}
        </CardContent>
      </Card> */}

      <LastNews />
    </>
  )
}
