import { Typography } from "@/components/Typography";
import TableEmptyState from "@/components/table-empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import configLua from "@/hooks/configLua";
const lua = configLua()

export default function PremiumHistory() {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Rules</CardTitle>
        </CardHeader>

        <CardContent className="p-2 space-y-2">
          <div className="space-y-2">
            <Typography variant={'body1'} component={'div'} className="text-xs">
              A fim de garantir que o jogo seja agradável para todos no Aurera Global, esperamos que todos os jogadores sigam as regras. caso seja pego quebrando as regras,poderá resultar em banimento temporário ou permanente de sua conta.
              Nós também nos reservamos o direito de banir temporária ou permanentemente sua conta por qualquer motivo, no entanto, você pode reduzir esse risco de acontecer a zero, seguindo as regras. Por favor, reserve um tempo e leia as regras antes de jogar.
            </Typography>

            <Typography variant={'body1'} component={'div'} className="text-xs">
              Todo report deve ser feito em Vídeo: Caso tenha reportado no Help a irregularidade e um Gamemaster não estiver online no momento para checar a ocorrência, os mesmos devem gravar a infração e reportar em um dos canais de atendimento.
            </Typography>
          </div>
          <div>
            <Typography variant={'body1'} component={'div'} className="text-xs pt-4 mb-4">
              * Os tópicos que estiverem com  está idêntificando que a regra foi atualizada ou adicionada recentemente.
            </Typography>
          </div>

          <div className="flex flex-col rounded-sm border shadow p-2 ">

            <table className="text-xs w-full max-w-full table-auto">
              <thead>
                <tr>
                  <th><b>Categoria</b></th>
                  <th><b>Regra</b></th>
                </tr>
              </thead>
              <tbody className="table-row-group align-middle">
                <tr className="border-b">
                  <td width={'20%'}><b> 1 - Nomes Inadequados</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <li>Utilização de nomes que são insultantes, racistas, relacionados a sexo, relacionados a drogas, assediantes ou geralmente censuráveis.</li>
                    <li>Nomes sem qualquer sentido. (ex.: &quot;ahausdhaauhsd&quot;)</li>
                    <li>Nomes que contenham as palavras que se refiram à administração (ex. &quot;ADM&quot;, &quot;GOD&quot;,  &quot;CM&quot;, &quot;GM&quot;, &quot;TUTOR&quot;)</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>2 - Gamemasters</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <li>Ameaçar um gamemaster por causa de suas ações ou posição como um gamemaster.</li>
                    <li>Fingindo ser um gamemaster ou ter influência sobre as decisões de um gamemaster.</li>
                    <li>Intencionalmente fornecendo informações erradas ou enganosas para um gamemaster que digam respeito aos seus inquéritos ou fazendo denúncias falsas sobre violações de regra.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b><b>3 - Player Killing</b></b></td>
                  <td className="px-6 py-4 space-y-2">Proibida a pratica de <span className="label label-info" data-action="popover" data-placement="right">“TRAP RED/TRAP BLACK”</span>: “utilização de vários personagens empilhados em um só local, com a finalidade de fazer com que outro(s) jogador(es) adquirir red skull ou black skull involuntariamente.”</td>
                </tr>

                <tr className="border-b">
                  <td><b> 4 - Chat Público</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <li>Proibido SPAM: “Vários jogadores enviar frases similares em curto período de tempo”.</li>
                    <li>O limite de anúncios que um jogador pode enviar dentro de depots, barcos templos é de 15 segundos.</li>
                    <li>É proibido o compartilhamento de informações pessoais (ex: IP, endereços, redes sociais e etc).</li>
                    <li>É proibido também a tentiva de compra dessas informações.</li>
                    <li>É proibido a divulgação de outros servidores em qualquer chat, seja ele público ou privado.</li>
                    <li>O chat do Help é de uso restrito para esclarecimento de dúvidas. Deve ser utilizado pra qualquer questionamento, referente a mecânica do jogo, as quests, itens, addons, mounts, dúvidas sobre as contas, atualizações e etc. Ficando claro que o channel deve ser utilizado para perguntas. Qualquer player que utilizar do help para outros fins, como reclamação, discussão, piadas, spam, venda, anúncio, etc, e for visto por algum tutor ou membro da staff, além de receber um mute será passível de banimento da conta utilizada. Temos os tickets e o fórum para vocês expressarem toda sua opinião, indignação ou elogio, não utilize o Help para isso.</li>
                    <li>World chat &amp; English chat: Proíbido anuncios de venda, compras e trocas. Proíbido Spam&apos;s (envio de uma mesma mensagem similar num curto periodo de tempo).</li>
                    <li>Todas as mensagens que envolvam qualquer tipo de troca de fora do Aurera para dentro e vice-versa deverão ser feitas em um novo canal chamado &quot;World Trade&quot;. Qualquer mensagem com relação a estes temas que forem feitas em qualquer outro canal, inclusive no Local Chat será passível de banimento, tanto do char utilizado e podendo também acarretar banimento a todos os personagens do jogador.</li>
                    <li>Os anúncios nos chats, com exceção do Help Channel, que envolvem a questão de cassino continuam liberados, porém agora existe um tempo mínimo para que sejam enviados. Anúncios deste tipo só podem ser enviados uma vez por minuto, independente do local enviado, caso seja verificado pela staff um spam do mesmo, a prática será punida com banimento.</li>
                  </td>
                </tr>


                <tr className="border-b">
                  <td><b> 5 - Bloqueio a locais</b></td>
                  <td className="px-6 py-4 space-y-2">
                    Está terminantemente proibido a obstrução de locais, sendo eles: acessos a <b>quests</b>, <b>hunts</b> ou <b>barcos</b>. Caso comprovado a infração, todos os envolvidos, incluindo os main char, serão passíveis de banimento. Mesmo que o main char não esteja envolvido diretamente na ação.
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>6 - Eventos</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <li>Proibido a utilização de <span className="label label-info" data-action="popover" data-placement="right">MULTICLIENTES</span> dentro de eventos organizado pelo jogo {lua['serverName']}.</li>
                    <li>É extremamente proibido a formação de times dentro do evento <a href="?view=battle_royale">Battle Royale.</a> </li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>7 - HACKING</b></td>
                  <td>
                    <li>Será considerado HACK LINK qualquer site divulgado no jogo, salvo o site oficial (www.{lua['serverName']}.com) e os fansites de tíbia.</li>
                    <li>Não se aplica para links de videos no youtube de jogadores que produzem conteudo que não prejudique a boa reputação do jogo {lua['serverName']}.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b> 8A. - Multi-Client </b></td>
                  <td className="px-6 py-4 space-y-2">
                    A regra de Multi-Client determina um limite máximo de 2 personagens para cada jogador, que estão juntos realizando a mesma função em um mesmo local e o limite máximo de 8 personagens por jogador em funções e/ou locais diferentes. Caso sejam detectados mais de 8 personagens por jogador independente do local/função ou mais de 2 personagens juntos em um mesmo local/função, o mesmo será punido.
                    <b>Existem algumas particularidades na regra que serão listadas abaixo:</b>
                    <li>Antes da aplicação da regra, será feita uma avaliação criteriosa por um membro da staff e somente depois de todos os passos estipulados pela staff, a punição será aplicada caso seja necessário.</li>
                    <li>Vários jogadores podem se unir com seus personagens para realizar uma mesma função em um mesmo local, porém, a partir do momento que pelo menos 2 jogadores se unem, o limite de personagens é de 1 para cada jogador e não de 2 como citado anteriormente.</li>
                    <li><u>Exemplo 1</u>:  Se 15 personagens estiverem juntos fazendo a mesma função no mesmo local e tenham 15 jogadores, cada um controlando seu personagem, os mesmos estão dentro da regra.</li>
                    <li><u>Exemplo 2</u>: Se existirem 3 personagens no mesmo local e na mesma função e apenas 2 jogadores controlando, os mesmos estão infringindo a regra.</li>
                    <li>Outra particularidade da regra se trata do uso de vocações diferente, onde o limite máximo em um mesmo local/função é aumentado de 2 para 4.</li>
                    <li>Exemplo 1: Caso um jogador esteja com 4 personagens juntos no mesmo local e função e cada um é de uma vocação diferente (Knight, Druid, Sorcerer, Paladin), ele está dentro da regra.</li>
                    <li>Exemplo 2: Caso um jogador esteja com 3 personagens, sendo que dois ou mais deles sejam da mesma vocação (1 Knight + 2 Druid), o mesmo está infringindo a regra.</li>

                    A última particularidade se trata do uso de personagens no trainer online, onde os mesmos não são considerados na soma total de personagens por jogador, ou seja, não entram na conta do limite máximo de 8 personagens por jogador.
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>8B. - Navigation </b></td>
                  <td className="px-6 py-4 space-y-2">
                    Fica terminantemente proibido em nosso servidor o uso da função <span className="label label-info" data-action="popover" data-placement="right">&quot;navigation&quot;</span> dos bots utilizados, independente do número de personagens ou jogadores envolvidos. Caso seja comprovada a infração, após ser checada pela staff, os envolvidos serão punidos
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>9 - Compra e Venda de conteúdo virtual</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <li>É considerado ilegal a compra ou venda de qualquer conteúdo virtual oriundo do jogo {lua['serverName']}, como moedas, itens, houses, personagens, contas, etc, utilizando como moeda de troca o dinheiro real (R$, $). O jogador que for flagrado cometendo tal infração sofrerá as punições cabíveis ao caso, que consiste no banimento do personagem utilizado para compra, para a oferta ou a venda em si e TODOS os personagens vinculados a este char.</li>
                    <li>Da mesma forma, a compra de qualquer conteúdo virtual com as características já mencionadas no ponto anterior é considerada ilegal.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>10 - Abuso de bugs</b></td>
                  <td className="px-6 py-4 space-y-2">
                    Por uma questão lógica, é proibido o abuso de qualquer bug dentro do jogo {lua['serverName']}, independente do &quot;benefício&quot; que o jogador tenta obter com tal ação.
                    <li> A punição para abuso de bugs será uma das mais severas em nosso jogo. Nos casos onde for comprovado o envolvimento de um ou mais players, haverá um delete irreversível de todas as contas pertencentes aquele jogador, mesmo que outras contas não tenham participado ativamente da infração.</li>
                    <li>Todo caso de bug deve ser reportado diretamente a staff, preferencialmente via ticket, para que seja analisado e sendo possível, resolvido. Contamos com ajuda e colaboração de todos os jogadores para mantermos nosso jogo livre desse inconveniente.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>11 - Informações Pessoais</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <div>O jogador está ciente que a administração do jogo poderá acessar as informações pessoais de um usuário para a segurança do jogo e do próprio usuario, estas informação podem ser, ip, conversas no jogo, transacões nos bancos do jogo, compras na store, compras no market e toda ou qualquer tipo de movimentação do jogador que interesse ao jogo.</div>
                    <li> Esta informação nunca será revelada ao público, só será usada em casos de necessidade.</li>
                    <li> O jogador está ciente que nenhum membro da equipe irá pedir qualquer tipo de informação já mencionado anteriormente, já que a são geradas automaticamente apenas pelo jogador está conectado.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>12 - Cassinos</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <li>Será permitida a prática do cassino dentro do jogo, independente se for cassino online ou offline.</li>
                    <li>É terminantemente proibido a prática do cassino dentro dos depot&apos;s do jogo, a única exceção é no depot de Rangiroa, onde especificamente nessa cidade a prática fica liberada.</li>
                    <li>O player que decidir jogar em um cassino, tem total responsabilidade por seus atos e pelo valor ou item utilizado no mesmo. A staff, não se responsabiliza, investiga e/ou devolve qualquer item ou valor perdido pelo jogador em casos de roubo. Ou seja, a prática do cassino, tanto para quem cria e para quem joga é de total e exclusiva responsabilidade pessoal.</li>
                    <li>Independente da prova obtida pelo jogador de um possível roubo que for postada em nossos meios de atendimento (FÓRUM e TICKET) o tópico será fechado, sem que haja resposta da staff.</li>
                    <li>Está proibida a utilização do cast para personagens que estejam realizando a prática de cassino. Independentemente se for por bot, pelo jogador em si, em depot&apos;s liberados ou em houses. Sendo que os casos serão passivos de banimento, aplicados nos personagens envolvidos, no main char do jogador e até no dono da house envolvida.
                      A regra também se aplica a personagens que estejam fazendo cast com o intuito de mostrar um outro personagem fazendo cassino.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b>13 - Power Abuse</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <div>É terminantemente proibida a prática de Power Abuse dentro das hunts do jogo. Ao infrator caberá o recebimento de notificações dadas pelos Gamemasters, podendo acumular ao ponto de receber um banimento do personagem em questão.</div>
                    <b>Obs 1:</b> Todos os reports in game serão avaliados por um Gamemaster logo que possível, seguindo uma análise criteriosa e observando os parâmetros necessários, as notificações poderão ou não serem aplicadas. Para reports fora do jogo, serão aceitas provas em forma de vídeo, onde toda a tela deve ser capturada, mostrando toda a ação do possível infrator, esses reports deverão ser encaminhados via fórum ou pelo WhatsApp de suporte do jogo.
                    <b>Obs 2:</b> Após 5 notificações aplicadas, um banimento ocorrerá na conta do infrator.
                    <b>Obs 3:</b> Os critérios observados pelo Gamemaster durante a ação do possível infrator serão:
                    <li>O level dos envolvidos no Power Abuse em relação ao level dos personagens atacados.</li>
                    <li>A hunt especificamente que os jogadores estão invadindo para praticar Power Abuse.</li>
                    <li>A real intenção do jogador ao entrar em uma hunt e matar os players que estavam caçando anteriormente.</li>
                    <li>A frequência das atividades anteriores de Power Abuse do personagem em questão.</li>
                    <li>O número de personagens que estiverem juntos no momento da possível prática de Power Abuse.</li>
                    <li>A ação tomada pelos personagens denunciados após matarem jogadores dentro da hunt.</li>
                    <li>Essa regra não se aplicará para locais que não sejam especificamente de hunt, como cidades, rotas, etc.</li>

                  </td>
                </tr>

                <tr className="border-b">
                  <td><b> 14 - Cast</b></td>
                  <td className="px-6 py-4 space-y-2">
                    É proibida a utilização do cast para personagens que estejam treinando ml, independentemente se for por bot, pelo jogador em si, em depots ou em houses. O jogador que descumprir essa regra será banido do cast por 15 dias.
                    A regra também se aplica a personagens que estejam de cast aberto com o intuito de mostrar um outro personagem treinando.
                  </td>
                </tr>

                <tr className="border-b">
                  <td><b> 15 - Racismo e Discriminação:</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <div>
                      <li>É estritamente proibido o uso de linguagem, nomes, imagens ou qualquer comportamento que promova racismo, discriminação ou preconceito de qualquer tipo. Isso inclui, mas não se limita a, discriminação por raça, cor, etnia, religião ou origem nacional.</li>
                      <li>Expressões, símbolos ou gestos racistas, incluindo &quot;piadas&quot; que marginalizem ou diminuam um grupo, não são permitidos.</li>
                      <li>Violações desta regra resultarão em punições severas, incluindo, mas não se limitando a, mutes, bans temporários ou permanentes, dependendo da gravidade do incidente.</li>
                    </div>

                  </td>
                </tr>


                <tr className="border-b">
                  <td><b>16 - Chargeback / Contestação:</b></td>
                  <td className="px-6 py-4 space-y-2">
                    <u><b>Definição:</b></u> Um &quot;chargeback&quot; ocorre quando um jogador contesta uma transação através de seu banco ou provedor de serviços de cartão de crédito, alegando, por exemplo, que não reconhece a transação ou que não recebeu os itens comprados.
                    <u><b>Consequências do Chargeback Injustificado:</b></u> Entendemos que situações genuínas de chargeback podem ocorrer devido a erros ou fraudes bancárias. No entanto, se identificarmos que um jogador abriu um chargeback de forma injustificada, isto é, após ter recebido e utilizado os itens ou vantagens adquiridas, tomaremos as seguintes medidas:
                    <li>A conta associada ao chargeback injustificado será banida permanentemente.</li>
                    <li>Reservamo-nos o direito de recuperar quaisquer custos associados ao processo do chargeback, incluindo taxas administrativas.</li>
                    <u><b>Prevenção e Comunicação:</b></u>
                    <li>Se um jogador acreditar que houve um erro na transação ou tiver outras preocupações relacionadas a pagamentos, encorajamos que entre em contato com a nossa equipe de suporte antes de abrir um chargeback. Estamos aqui para ajudar e resolver quaisquer problemas relacionados a transações.</li>
                  </td>
                </tr>

                <tr className="border-b">
                  <td>
                    <b>17 Discurso de Ódio:</b>
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    <b><u>Definição:</u></b> Discurso de ódio é definido como qualquer comunicação que degrade, insulte, ameace ou prejudique um indivíduo ou grupo com base em atributos como raça, religião, etnia, orientação sexual, gênero, identidade de gênero, deficiência ou qualquer outro traço. Isso também se estende a ataques pessoais, insultos ou ameaças direcionadas a um jogador ou sua família.
                    <u><b>Consequências:</b></u>
                    <li><u>Primeira Ofensa:</u> O jogador receberá um aviso e será silenciado no jogo por um período determinado pela equipe administrativa.</li>
                    <li><u>Segunda Ofensa:</u> A conta do jogador será suspensa por um período específico, que pode variar de alguns dias a semanas, dependendo da gravidade da ofensa.</li>
                    <li><u>Terceira Ofensa ou Ofensas Graves:</u> A conta do jogador será banida permanentemente.</li>
                  </td>
                </tr>

                <tr className="">
                  <td><b>18 -  Publicidade:</b></td>
                  <td className="px-6 py-4 space-y-2">
                    É estritamente proibido fazer publicidade ou promover produtos, serviços ou outros jogos que não estejam diretamente relacionados ao {lua['serverName']}.
                  </td>
                </tr>

              </tbody>
            </table>

          </div>
        </CardContent>
      </Card>
    </>
  )
}