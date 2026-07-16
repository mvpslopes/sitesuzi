# Site — Suzi Resende Ads

Site institucional em **HTML, CSS e JavaScript puro** (sem frameworks), desenvolvido para o domínio **suziresendeads.com.br**.

## Estrutura de pastas

```
SiteSuzi/
├── index.html          → página única com todas as seções do site
├── css/
│   └── style.css       → estilo visual (cores, layout, responsivo)
├── js/
│   └── script.js       → menu, animações, slider de depoimentos, etc.
├── img/                → imagens otimizadas usadas no site
├── dist/               → build pronto para enviar à Hostinger
├── logo/               → arquivos originais da logo (não enviar à hospedagem)
└── fotos/              → fotos originais (não enviar à hospedagem)
```

> Para hospedar, use **apenas o conteúdo da pasta `dist/`**.

## Cores da marca

| Uso | Cor |
|---|---|
| Primária | `#A47A64` |
| Secundária | `#F5F1EB` |

## Seções do site

1. **Header** com logo e menu fullscreen
2. **Hero** — chamada principal + foto
3. **Sobre** — quem é a Suzane Resende
4. **Serviços** — os 8 serviços oferecidos
5. **Por que tráfego pago** — diferenciais do trabalho
6. **Resultados** — números e "para quem é o trabalho"
7. **Missão e valores**
8. **Depoimentos** — slider com as 5 avaliações do Google (nota 5,0)
9. **CTA final** — chamada para WhatsApp/Instagram
10. **Footer** — contato, navegação e dados da empresa (CNPJ)
11. Botão flutuante de **WhatsApp**

## Como testar localmente

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080`.

## Como gerar o build (`dist`)

No PowerShell, a partir da pasta do projeto:

```powershell
if (Test-Path dist) { Remove-Item -Recurse -Force dist }
New-Item -ItemType Directory -Path dist | Out-Null
Copy-Item index.html dist\
Copy-Item -Recurse css, js, img dist\
```

A pasta `dist/` terá apenas: `index.html`, `css/`, `js/` e `img/`.

## Como publicar na Hostinger

1. Acesse o **hPanel** da Hostinger → **Gerenciador de Arquivos** (ou use FTP).
2. Abra a pasta `public_html` do domínio **suziresendeads.com.br**.
3. Envie **todo o conteúdo** da pasta `dist/` (não a pasta `dist` em si) para dentro de `public_html`:
   - `index.html`
   - pasta `css/`
   - pasta `js/`
   - pasta `img/`
4. Confirme que o `index.html` ficou **direto** dentro de `public_html`.
5. Acesse `https://suziresendeads.com.br`.
6. Ative o **SSL gratuito (Let's Encrypt)** no hPanel, se ainda não estiver ativo.

Não é necessário banco de dados, PHP ou backend — é um site 100% estático.

## Como alterar informações depois

- **Textos**: edite o `index.html` (procure a seção pelo comentário, ex. `<!-- ===== SERVIÇOS ===== -->`).
- **Cores**: altere as variáveis no topo do `css/style.css`.
- **WhatsApp**: o número está nos links `https://wa.me/5531998024355`.
- **Fotos / logos**: substitua os arquivos em `img/` mantendo o mesmo nome, depois regenere a pasta `dist/`.

Depois de editar, regenere a `dist/` e envie novamente para a Hostinger.
