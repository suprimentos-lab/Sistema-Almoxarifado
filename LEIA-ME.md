# Virtus · Almoxarifado — app

App instalável (PWA) que abre o Sistema de Almoxarifado em tela cheia, com o ícone
da Virtus, sem a barra do Google e sem a barra do navegador. O sistema continua
sendo o mesmo do Apps Script: nada muda na planilha nem nas telas.

## 1. Configurar o link do sistema (uma vez)

1. No Apps Script: **Implantar → Gerenciar implantações** e copie o **URL do app da Web**
   (termina em `/exec`).
2. Abra `index.html` e cole o link na linha:
   ```js
   const URL_SISTEMA = 'COLE_AQUI_O_LINK_QUE_TERMINA_EM_/exec';
   ```
   O link não muda quando você publica novas versões do sistema.

> A implantação precisa estar com **Quem pode acessar: Qualquer pessoa** (é como o
> sistema já funciona, com o login próprio dele).

## 2. Publicar no GitHub Pages

1. Em github.com, crie um repositório (ex.: `virtus-almoxarifado`). Pode ser público.
2. **Add file → Upload files** e envie TODO o conteúdo desta pasta (incluindo a pasta `icons`).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   Branch: `main`, pasta `/ (root)` → **Save**.
4. Em 1 a 2 minutos o app fica no ar em `https://SEU-USUARIO.github.io/virtus-almoxarifado/`.

## 3. Instalar nos celulares e computadores

- **iPhone/iPad (Safari):** abra o link → botão **Compartilhar** → **Adicionar à Tela de Início**.
- **Android (Chrome):** abra o link → aparece **Instalar** na parte de baixo (ou menu ⋮ → **Instalar app**).
- **Computador (Chrome/Edge):** abra o link → ícone de instalar na barra de endereço.

O próprio app mostra essa dica para quem abrir pelo navegador.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | Tela de abertura + o sistema em tela cheia (é aqui que vai o link) |
| `manifest.webmanifest` | Nome, cores e ícones do app |
| `sw.js` | Deixa o app instalável e mostra aviso quando estiver sem internet |
| `icons/` | Ícones e logo da tela de abertura |

Se mudar algum desses arquivos depois, aumente a versão em `sw.js`
(`virtus-almox-v1` → `v2`) para os celulares pegarem a atualização.

## Limitações conhecidas

- **iPhone:** o Safari pode pedir login no sistema com mais frequência que no navegador.
- Sem notificações no celular (o sino do sistema continua funcionando com o app aberto).
- Precisa de internet (sem internet, o app mostra um aviso em vez de travar).
