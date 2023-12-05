export default function Custom404() {
  return (
    <>
      <main className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-semibold text-indigo-600 text-9xl">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Lamentamos, mas não conseguimos encontrar a página que procura.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pagina inicial
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Suporte <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}