# Site — Suzi Resende Ads

Site institucional em **HTML, CSS e JavaScript puro** (sem frameworks e sem build), desenvolvido para o domínio **suziresendeads.com.br**.

## Estrutura de pastas

```
SiteSuzi/
├── index.html          → página única com todas as seções do site
├── css/
│   └── style.css       → todo o estilo visual (cores, layout, responsivo)
├── js/
│   └── script.js       → menu mobile, animações, slider de depoimentos, etc.
├── img/                → imagens otimizadas usadas no site (logos + fotos tratadas)
├── logo/               → arquivos originais da logo (fonte, .cdr, PNGs em alta resolução)
└── fotos/              → fotos originais enviadas (fonte)
```

> As pastas `logo/` e `fotos/` contêm os arquivos **originais** em alta resolução — não precisam ser enviadas para a hospedagem. Apenas `index.html`, `css/`, `js/` e `img/` são necessárias no servidor.

## Cores da marca

| Uso | Cor |
|---|---|
| Primária | `#A47A64` |
| Secundária | `#F5F1EB` |

## Seções do site

1. **Header fixo** com logo, menu e botão "Fale comigo"
2. **Hero** — chamada principal + foto + estatísticas
3. **Sobre** — quem é a Suzane Resende
4. **Serviços** — os 8 serviços oferecidos
5. **Por que tráfego pago** — diferenciais do trabalho
6. **Resultados** — números e "para quem é o trabalho"
7. **Missão e valores**
8. **Depoimentos** — slider com as 5 avaliações do Google (nota 5,0)
9. **CTA final** — chamada para WhatsApp/Instagram
10. **Footer** — contato, navegação e dados da empresa (CNPJ)
11. Botão flutuante de **WhatsApp** em todas as páginas

Todos os textos foram escritos a partir do material e das imagens enviadas pela cliente (bio, serviços, depoimentos, missão, etc.).

## Como testar localmente

Como o site não usa nenhuma ferramenta de build, basta abrir o `index.html` diretamente no navegador, ou rodar um servidor local simples, por exemplo:

```bash
# Python já instalado
python -m http.server 8080
```

E acessar `http://localhost:8080`.

## Como publicar na Hostinger

1. Acesse o **hPanel** da Hostinger e entre em **Gerenciador de Arquivos** (ou use um cliente FTP como o FileZilla com os dados de acesso do seu plano).
2. Abra a pasta `public_html` do domínio **suziresendeads.com.br**.
3. Envie **todo o conteúdo** desta pasta do projeto (não a pasta em si) para dentro de `public_html`:
   - `index.html`
   - pasta `css/`
   - pasta `js/`
   - pasta `img/`
4. Confirme que o arquivo `index.html` ficou direto dentro de `public_html` (e não dentro de uma subpasta).
5. Acesse `https://suziresendeads.com.br` para verificar.
6. Na Hostinger, ative o **SSL gratuito (Let's Encrypt)** em "SSL" no hPanel, caso ainda não esteja ativo, para o site abrir com `https://`.

Não é necessário banco de dados, PHP ou qualquer backend — é um site 100% estático.

## Como alterar informações depois

- **Textos**: edite diretamente o `index.html` (procure a seção pelo comentário, ex. `<!-- ===== SERVIÇOS ===== -->`).
- **Cores**: altere as variáveis no topo do `css/style.css`:
  ```css
  :root {
    --color-primary: #A47A64;
    --color-secondary: #F5F1EB;
  }
  ```
- **WhatsApp**: o número está nos links `https://wa.me/5531998024355`. Para trocar, substitua o número (com DDI 55 + DDD + número, sem espaços) em todos os links do `index.html`.
- **Fotos**: troque os arquivos dentro de `img/` mantendo os mesmos nomes, ou atualize o caminho no `index.html`.
- **Depoimentos**: cada depoimento é um bloco `<div class="testimonial-card">` dentro da seção `#depoimentos` — copie um bloco existente para adicionar um novo.

## Observações técnicas

- Site totalmente responsivo (mobile, tablet e desktop).
- Fotos da Suzi tiveram o fundo branco removido/tratado via script Python para um recorte mais moderno.
- Animações de entrada usam `IntersectionObserver`; caso o JavaScript não carregue por algum motivo, todo o conteúdo permanece visível (progressive enhancement).
- Fontes usadas: **Fraunces** (títulos editoriais), **Space Grotesk** (tags/menu/números) e **Poppins** (textos), carregadas via Google Fonts.
