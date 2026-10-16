# Obras dos Lagos

Aplicativo para duas obras independentes: **L01 — Lago Seco** e **L02 — Barragem**, com 463 serviços, agenda, orçamento, compras, estoque, medições, diário e documentos.

## Ativar o site

1. Abra **Settings → Pages** neste repositório.
2. Em **Build and deployment → Source**, selecione **Deploy from a branch**.
3. Em **Branch**, selecione **main** e **/(root)** e clique em **Save**.
4. Aguarde o GitHub apresentar o endereço publicado. A página inicial abre o aplicativo em `dist/`.

## Celular

Abra o site no Safari do iPhone ou no Chrome do Android. O botão **Instalar no celular** orienta a adição à tela inicial. Após a primeira abertura e preparação do cache, a interface funciona offline. Não há sincronização automática entre aparelhos: os registros ficam no navegador. Exporte backups regularmente.

## Uso local

Baixe o repositório e abra `dist/index.html`, ou use um servidor estático local. Os PDFs e as fotos originais não estão no repositório: vincule a pasta original em Documentos. O acervo publicado contém os textos extraídos e as referências de origem.

## Testes

Execute `node --test tests/*.test.cjs`. São 24 testes de regras de negócio, geração das telas e comportamento lógico do cache. Testes visuais em Android e iOS reais ainda são necessários.

Leia [LEIA-ME.md](LEIA-ME.md) para a operação completa e as limitações.
