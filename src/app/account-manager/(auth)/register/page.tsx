
import { Metadata } from "next"

import { UseRegisterForm } from "./components/user-register-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/Typography";

import configLua from "@/hooks/configLua";
import { ScrollArea } from "@/components/ui/scroll-area";
const lua = configLua()


export const metadata: Metadata = {
  title: "Create Account",
  description: "Login forms built using the components.",
}

export default function Register() {
  return (
    <>
      <Card className="rounded-md relative">
        <CardHeader className="border-b">
          <CardTitle>Create New Account</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ScrollArea className="h-[220px] sm:h-[440px] border rounded p-2">
            <div className="space-y-3">
              <Typography variant={'h5'}>1. TERMOS</Typography>
              <Typography variant={'body1'} component={'p'} >
                Todos os titulares de contas do {lua['serverName']} são responsáveis pela segurança de suas contas, endereços de email registrados e sistemas de computador. Eles não devem divulgar dados da conta para outras pessoas.
                O {lua['serverName']} não se responsabiliza por qualquer dano causado por contas comprometidas.
                Enquanto estiver jogando {lua['serverName']} ou fazendo uso dos serviços do website o usuário deve respeitar as regras do servidor. Se o usuário violar alguma dessas regras, o mesmo poderá ser punido com a remoção temporaria ou permanente da conta e todos os serviços vinculados a essa conta serão encerrados imediatamente.
              </Typography>

              <Typography variant={'h5'}>2. SERVIÇOS</Typography>
              <Typography variant={'body1'} component={'p'} >
                Todo o conteúdo disponibilizados no website ou jogo online é de propriedade exclusiva e unica do aurera-global, até mesmo aqueles obtidos através de doações. O jogador tem o direito de usar todo o conteúdo assim que seguir as regras estabelecidas nesses termos e condições e nas regras do servidor.
                {lua['serverName']} tem total direito de remover, modificar e ter acesso na totalidade das contas dos usuarios.
                {lua['serverName']} não garante que o website ou conteúdo do jogo online estarão disponíveis, serão ininterruptos ou livre de erros.
              </Typography>

              <Typography variant={'h5'}>3. CONTRIBUIÇÕES MONETARIA</Typography>
              <Typography variant={'body1'} component={'p'} >
                Para realizar uma contribuição monetaria aos nossos serviços, os usuários menores de 18 anos devem obter aprovação de um pai ou responsável e deve atender a todos os requisitos de validade e exeqüibilidade no Brasil para tanto. Usuários menores de 16 anos precisam solicitar ao pai ou responsável aprovação e assistência durante a realização da contribuição, caso a forma de pagamento escolhida for Cartão de Crédito o {lua['serverName']} poderá solicitar que o usuário forneça determinadas informações para o fim específico de confirmar a validade do titular da conta.
                Ao realizar uma contribuição, o usuário concorda que não receberá nada em troca, exceto por créditos virtuais e sem valor, esses créditos são entregues como forma de agradecimento pela contribuição nos enviada.
              </Typography>

              <Typography variant={'h5'}>4. MODIFICAÇÃO OU CANCELAMENTO DOS SERVIÇOS</Typography>
              <Typography variant={'body1'} component={'p'} >
                O {lua['serverName']} poderá modificar, suspender ou descontinuar o serviço do jogo (ou qualquer parte do mesmo) a qualquer momento por qualquer motivo, a nosso critério.
              </Typography>

              <Typography variant={'h5'}>5. ALTERAÇÕES DOS TERMOS E CONDIÇÕES</Typography>
              <Typography variant={'body1'} component={'p'} >
                {lua['serverName']} poderá alterar esses Termos e Condições, a qualquer momento e portanto o usuario se compromete conferir periodicamente se há uma versão mais atualizada destes Termos e Condições.
                Esses Termos e Condições compreendem a integralidade do acordo entre você e {lua['serverName']}.
              </Typography>
            </div>
          </ScrollArea>
          <div>
            <UseRegisterForm />
          </div>
        </CardContent>
      </Card>
    </>
  )
}