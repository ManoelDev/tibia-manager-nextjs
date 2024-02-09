## Passo 1: Instalação

- CLonando o repositório.

```bash
# Cloning repository
git clone https://github.com/ManoelDev/tibia-manager-nextjs.git
```

## Passo 2: Instalação das dependências

```bash
# Acesse o diretório
cd tibia-manager-nextjs
npm install
```

## Passo 3: Configurando o projeto

> Configurando o outfit
>
> - Download animations outfit https://ots.me/downloads/?dir=data/outfit-images
> - Extrai o aquivo e copie a pasta outfits_anim para pasta do projeto

> Configurado variáveis de ambiente
>
> - copie e renomeie .env.example para .env
> - edite o arquivo com as correspondentes variáveis

## Passo 3: Criando o banco dedos

```bash
npx prisma migrate dev
```

## Passo 4: Iniciando a aplicação

```bash
npm run dev
```
