# Obras dos Lagos

Aplicativo local para um engenheiro planejar e acompanhar **duas obras independentes**, com visão consolidada opcional:

- **L01 — Lago Seco:** R$ 562.081,20, 11 etapas e 88 serviços.
- **L02 — Barragem:** R$ 2.022.615,82, 33 etapas e 375 serviços.

Os valores reais e a condição de obras ainda não iniciadas foram confirmados pelo usuário. Datas de início ficam vazias. A base reúne os orçamentos enviados e textos dos 34 PDFs do ZIP da CE 019/2026. O diagnóstico completo está em **Documentos → Diagnóstico e fontes**.

## Começar no Windows

1. Extraia **todo o pacote** para uma pasta fixa.
2. Se tiver Python 3 ou Node.js, dê dois cliques em **INICIAR_WINDOWS.bat**. A janela deve permanecer aberta. O navegador acessa **http://127.0.0.1:8765**.
3. Use sempre esse endereço, o mesmo navegador e o mesmo perfil para manter os registros locais.
4. Sem Python/Node, abra **dist/index.html**. O app funciona sem baixar bibliotecas. O armazenamento em arquivos locais varia por navegador, então o inicializador é o caminho recomendado.
5. Abra **Configurações** (engrenagem). Configure responsável, saldo inicial e, quando conhecidos, início e recebimento da OS **de cada obra**.

No macOS/Linux: `python3 iniciar.py` ou `node iniciar.js`.

## Primeira configuração

1. **Documentos:** revise o diagnóstico e as divergências. O ZIP contém minuta de contrato, não foi identificado contrato assinado. Os PDFs de projetos foram catalogados, mas cotas e geometria não foram validadas. Dois cadernos não geraram texto utilizável.
2. **Pendências:** atribua responsáveis e prazos para contrato assinado, OIS, critérios de medição e esclarecimentos.
3. **Orçamento:** defina as cinco verbas de cada etapa. Zero significa custo inexistente; campo vazio significa custo desconhecido. Inclua encargos e tributos sem duplicação.
4. **Atividades:** programe datas, responsável, equipe, local, dependências e próxima ação. Dependências são restritas à mesma obra e ciclos são rejeitados. Datas e sequência não foram inventadas.
5. **Materiais:** cadastre necessidades por serviço e unidade, estoque inicial, pedidos abertos e prazo de entrega.
6. **Agenda:** transforme as providências em tarefas com data, período e resultado esperado. A semana reúne tarefas, início/término de serviços e limites de pedido.

## Rotina diária

- **Ao iniciar:** selecione a obra no topo, abra Agenda e trate prioridades e impedimentos.
- **Durante o dia:** registre quantitativos, equipe, horas-pessoa, ocorrências e fotos no Diário. Quantidades do diário somam ao avanço do serviço; editar o registro aplica somente a diferença. Não registre novamente um avanço já lançado diretamente na atividade.
- **Compras:** registre cotação em Orçamento → Cotações. Ela só compromete verba quando for cadastrada em Contratos e pagamentos.
- **Estoque:** entradas, consumos e perdas vão em Materiais → Entradas, consumos e perdas. Registrar recebimento **não reduz sozinho** a quantidade em pedidos abertos; atualize o pedido do insumo para evitar dupla contagem.
- **Ao encerrar:** atualize próxima ação, tarefas e pendências e clique em **Exportar backup**.

## Regras de cálculo

### Fotos e DOCX do diário

Em **Diário → Novo registro** ou **Editar**, use **Adicionar fotos**, confira as prévias e preencha as legendas. Salve o registro antes de usar **Gerar DOCX** na linha do diário. O documento contém os dados do registro e uma página por foto, preservando sua proporção. A opção **Fotos** abre as imagens já salvas.

As imagens são reduzidas para até 1.600 pixels e armazenadas como JPEG no IndexedDB deste navegador. JPEG e PNG são os formatos recomendados; outros formatos dependem da capacidade de decodificação do aparelho. Nenhuma foto é enviada ao GitHub. O backup JSON inclui as imagens dos registros e do histórico; importe esse backup para transferir os dados para outro dispositivo. Evite limpar os dados do site sem exportar o backup.

O gerador DOCX e sua biblioteca estão incluídos no aplicativo e no cache offline. A biblioteca docx 9.6.1 é distribuída sob licença MIT, disponível em `dist/vendor/DOCX-LICENSE.txt`.

- Avanço por atividade = executado ÷ quantidade contratada. Conclusão exige quantidade total e data real de término. O status da obra é mantido manualmente em Configurações.
- Avanço agregado = média dos percentuais físicos ponderada pelo valor contratual dos serviços. Não equivale à medição aprovada ou dinheiro recebido.
- Custo final previsto = comprometido + custo ainda não contratado. A pagar = comprometido − pago. Incorrido é registrado separadamente.
- Resultado estimado = valor contratado − custo final, desde que todos os custos e tributos estejam incluídos. Campos faltantes permanecem “A definir”.
- Compra necessária = necessidade produtiva ainda não consumida − estoque disponível − quantidade em pedidos, limitada a zero. Perdas justificadas reduzem estoque e aumentam a reposição necessária. A necessidade do insumo deve ser levantada e validada, não copiada indiscriminadamente do quantitativo do serviço.
- Data limite do pedido = data necessária − entrega do fornecedor em dias corridos. Feriados e dias úteis não são calculados automaticamente.
- Medições acumuladas, inclusive preparadas/apresentadas, reservam quantidade e não podem exceder o executado. Glosadas liberam a quantidade. Valor do item usa quantidade × (total contratual do serviço ÷ quantidade contratual), com arredondamento a centavos.
- Recebimentos não podem exceder o valor aprovado da medição. Registre retenções e documentos nas observações.
- O cronograma gerencial mantém apenas etapas principais, evitando somar subtotais com suas linhas filhas. Reprogramações devem somar 100% e exigir justificativa.
- A distribuição original permanece na base. A referência de avanço planejado interpola os percentuais mensais desde o início informado e é uma aproximação, não uma sequência técnica ou curva de produtividade validada.

## Documentos, fotos e backup

O pacote inclui o **texto extraído e a referência de página** dos PDFs, não os 160 MB de documentos originais. Para consultar os originais: extraia o ZIP da licitação, abra Documentos → Acervo documental → **Vincular pasta dos documentos**, e selecione a pasta extraída. A vinculação é local, sem upload, e deve ser refeita a cada sessão. Os PDFs e fotos permanecem nos arquivos originais; campos de evidência guardam links ou nomes, não os arquivos binários.

Os registros são salvos em `localStorage` deste navegador/endereço. Não são salvos automaticamente como arquivo na pasta do aplicativo. Fechar e abrir no mesmo endereço preserva os dados; limpar dados do navegador, trocar perfil, caminho ou endereço pode torná-los indisponíveis. **Exportar backup** gera um JSON com registros, histórico e textos-base; **Configurações → Importar backup** valida e substitui os dados mediante confirmação. Mantenha backups e os documentos originais juntos. O app avisa se não conseguir salvar, sem aplicar a alteração.

O diário é um controle interno e não substitui automaticamente o livro oficial exigido pelo contrato. Os checklists distinguem itens gerais documentados de sugestões que precisam ser adaptadas aos projetos e critérios de cada serviço.

O aplicativo automatiza cálculos e alertas com base nos registros. Ele não possui uma IA embutida para interpretar mensagens, fotos ou projetos. Para revisão assistida, envie o backup e os novos documentos nesta conversa.

Lançamentos manuais incorretos podem ser removidos pelo botão **Remover lançamento** no formulário, respeitando vínculos e saldos. O valor anterior fica no histórico. Atividades contratuais, bases e documentos não são apagados por esse botão.

## Publicar depois no GitHub

O aplicativo é estático: não precisa compilar nem instalar pacotes. O código e um workflow manual estão incluídos.

1. Crie um repositório e envie o conteúdo desta pasta, preservando `dist`, `tests` e `.github`.
2. Em **Settings → Pages → Build and deployment**, escolha **GitHub Actions**.
3. Em **Actions → Publicar aplicativo no GitHub Pages → Run workflow**, execute a publicação.
4. Abra o endereço apresentado pelo GitHub.
5. Exporte o backup do uso local e importe no endereço publicado. Os dados locais não migram sozinhos.

GitHub Pages hospeda os arquivos do aplicativo, não fornece banco de dados ou sincronização. Os textos-base publicados ficam acessíveis a quem tiver acesso ao site. Os registros pessoais continuam no navegador. Para vários usuários, login, compartilhamento ou sincronização, a próxima etapa é um backend com banco e autenticação.

O workflow foi fornecido como configuração para execução futura; nenhum repositório foi criado e nada foi publicado nesta entrega.

## Android, iPhone e funcionamento offline

Após publicar no GitHub Pages (HTTPS), abra o link no navegador do aparelho e aguarde a indicação **Pronto para uso offline**. Use o botão **Instalar no celular** para receber as instruções do aparelho. No Android, a opção de instalação pode aparecer no menu do Chrome; no iPhone, use Safari → Compartilhar → Adicionar à Tela de Início. A disponibilidade e os nomes dependem da versão do navegador.

O aplicativo inclui manifesto, ícones e service worker. O cache armazena a interface e a base documental para acesso offline após a primeira carga bem-sucedida. PDFs e fotos originais não são incluídos nesse cache. Os dados permanecem no armazenamento do navegador ou aplicativo instalado e precisam de backup. A instalação na tela inicial pode usar um armazenamento separado do navegador em alguns aparelhos: exporte e importe o backup se necessário.

GitHub Pages **não sincroniza** os registros entre celulares e computador. Esta etapa publica a interface e permite uso offline. Sincronização com login exige banco e backend a serem configurados à parte. Em caso de atualização do aplicativo, feche e abra novamente para carregar a nova versão. Os cadastros persistidos não são sobrescritos pelo cache.

## Verificações

Execute `node --test tests/*.test.cjs`. Os testes cobrem os cálculos, estados ausentes, orçamento, dependências, ciclos, quantidades, medições, recebimentos, estoque, backup e renderização lógica das telas. O aplicativo não requer dependências para esses testes. A validação visual e os cliques em navegador real não puderam ser executados no ambiente de criação; recomenda-se conferir o primeiro uso no navegador do engenheiro.

## Estrutura

- `dist/index.html`: entrada do app.
- `dist/app.js`: telas, formulários e persistência.
- `dist/domain.js`: regras de negócio e validações testáveis.
- `dist/data.js`: base documental original e cadastros iniciais.
- `iniciar.py` / `iniciar.js`: servidores locais, apenas em loopback.
- `tests/`: verificações sem dependências.
- `.github/workflows/pages.yml`: publicação manual futura.

Atualizações futuras devem preservar os IDs e o backup. Não publique os backups no repositório. As planilhas e os documentos originais continuam sendo as fontes de referência.
