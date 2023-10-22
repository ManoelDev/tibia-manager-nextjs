import Image from "next/image"
import { Typography } from "./Typography"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const mensagens: string[] = ["Carlin", "Svargrond", "Liberty Bay", "Port Hope", "Ankrahmun", "Darashia", "Edron"];

export default function RashidBox() {
  const diaDaSemana: number = new Date().getDay();

  let rashid = ''

  if (diaDaSemana >= 0 && diaDaSemana < mensagens.length) {
    rashid = mensagens[diaDaSemana]
  }

  return (
    <>
      <Card>
        {/* <CardHeader className="border-b">
          <CardTitle className="text-center">Rashid</CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2 font-semibold">
            <Image src={'/icons/Rashid.gif'} alt="Rashid position" width={64} height={64} />
            <div className="flex gap-1">
              <Typography variant={'body2'}>City:</Typography>
              <Typography variant={'body2'}>{rashid}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}