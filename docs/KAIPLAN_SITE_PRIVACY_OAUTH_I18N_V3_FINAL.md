# Kaiplan Website --- atualização final de Privacy Policy e internacionalização PT-BR / EN

## Objetivo

Atualizar o site institucional do **Kaiplan** para:

1.  refletir corretamente o comportamento atual do aplicativo;
2.  atender aos requisitos do processo de verificação OAuth do Google;
3.  atualizar a Política de Privacidade em português;
4.  criar a versão integral em inglês da Política de Privacidade;
5.  criar versões em inglês das páginas públicas do site;
6.  disponibilizar navegação simples entre PT-BR e EN;
7.  remover textos desatualizados que ainda tratem Google Calendar,
    anúncios ou a versão publicada como recursos futuros/de teste.

Site de produção:

-   `https://kaiplan.com.br/`
-   `https://kaiplan.com.br/index.html`
-   `https://kaiplan.com.br/privacy.html`
-   `https://kaiplan.com.br/terms.html`

Este agente manipula **somente o site**.

As informações técnicas sobre o aplicativo descritas neste documento já
foram auditadas e validadas no projeto Kaiplan. Não é necessário --- nem
permitido --- inventar comportamento adicional do aplicativo.

------------------------------------------------------------------------

# 1. Regras gerais

Antes de alterar qualquer arquivo:

-   leia todas as páginas atuais;
-   identifique a estrutura de navegação;
-   preserve identidade visual, CSS, imagens, responsividade e
    componentes existentes;
-   preserve URLs públicas utilizadas pelo Google;
-   não remova arquivos de verificação de domínio/Search Console;
-   não invente funcionalidades;
-   não transforme recursos planejados em recursos existentes;
-   não transforme recursos existentes em recursos futuros;
-   não faça alterações no aplicativo móvel;
-   não altere Google Cloud, OAuth Client IDs ou scopes.

Não fazer commit, push ou deploy automaticamente sem solicitação
explícita.

------------------------------------------------------------------------

# 2. Estado atual confirmado do Kaiplan

## 2.1 Arquitetura

O Kaiplan é um aplicativo **local-first**.

Os dados de planejamento criados pelo usuário são mantidos localmente no
dispositivo.

Não foi encontrado backend próprio Kaiplan recebendo os eventos
provenientes do Google Calendar.

A integração Google Calendar é opcional e funciona como integração
externa.

------------------------------------------------------------------------

# 3. Google OAuth

A integração utiliza Google Sign-In.

Scopes atualmente utilizados:

-   `openid`
-   `email`
-   `profile`
-   `https://www.googleapis.com/auth/calendar.calendarlist.readonly`
-   `https://www.googleapis.com/auth/calendar.events.readonly`

A configuração utiliza `offlineAccess: false`.

A aplicação solicita access token em tempo de sincronização para
realizar chamadas à Google Calendar API.

Não foi encontrado armazenamento explícito pelo código do Kaiplan de:

-   access token em SQLite;
-   refresh token em SQLite;
-   Client Secret;
-   senha Google;
-   credenciais OAuth no backup JSON manual.

A biblioteca nativa Google Sign-In gerencia internamente aspectos da
sessão/autenticação.

A política não deve fazer afirmações específicas sobre a implementação
interna da biblioteca além do que pode ser garantido pelo Kaiplan.

------------------------------------------------------------------------

# 4. Integração Google Calendar

A integração atual é **somente leitura / read-only**.

O Kaiplan pode:

-   conectar voluntariamente uma Conta Google;
-   identificar a conta conectada;
-   listar os calendários disponíveis;
-   permitir que o usuário selecione quais calendários deseja
    visualizar;
-   consultar eventos dos calendários selecionados;
-   manter cache local dos eventos necessários;
-   apresentar esses eventos nas telas de agenda do Kaiplan;
-   atualizar o cache durante sincronizações.

O Kaiplan NÃO utiliza a integração atual para:

-   criar eventos no Google Calendar;
-   editar eventos no Google Calendar;
-   excluir eventos no Google Calendar;
-   enviar alterações da agenda local de volta ao Google Calendar.

Não descrever a integração como bidirecional.

------------------------------------------------------------------------

# 5. Dados Google acessados

A Privacy Policy deve possuir uma seção claramente identificável, por
exemplo:

## Integração com Google Calendar e dados das APIs do Google

Explicar que, quando o usuário opta por conectar sua Conta Google, o
Kaiplan pode acessar dados necessários à autenticação e à integração.

## 5.1 Conta Google

Dados utilizados pela integração podem incluir:

-   identificador da conta;
-   endereço de e-mail;
-   nome de exibição;
-   foto de perfil;
-   informações relacionadas aos scopes concedidos;
-   estado e timestamps necessários à conexão/sincronização.

## 5.2 Calendários

Podem ser processados campos necessários ao funcionamento da integração,
incluindo:

-   identificador do calendário;
-   nome/título;
-   descrição, quando fornecida;
-   cor;
-   timezone;
-   papel/permissão de acesso;
-   indicação de calendário principal;
-   seleção local;
-   informações necessárias à sincronização.

## 5.3 Eventos

O cache local atual mantém apenas os campos necessários à identificação,
sincronização e exibição dos eventos.

Os campos persistidos no cache podem incluir:

-   origem/source;
-   identificador da conta;
-   identificador do calendário;
-   identificador externo do evento;
-   etag;
-   status;
-   título;
-   descrição;
-   localização;
-   início;
-   fim;
-   indicador de evento de dia inteiro;
-   timezone;
-   link HTML do evento;
-   identificador de evento recorrente;
-   timestamp de atualização externa;
-   informações/timestamps técnicos necessários ao cache.

Não é necessário expor nomes internos de colunas na política pública. A
lista acima serve para orientar a redação correta.

------------------------------------------------------------------------

# 6. Minimização de dados

O Kaiplan foi ajustado para não persistir o payload bruto completo
retornado pela Google Calendar API.

O antigo campo `raw_json` foi removido:

-   do schema atual;
-   da escrita durante a sincronização;
-   de bancos existentes por migration.

Bancos antigos são migrados para uma estrutura sem `raw_json`,
preservando somente os campos necessários.

A Privacy Policy pode afirmar:

> O Kaiplan mantém localmente apenas os dados necessários para
> identificar, sincronizar e exibir os eventos utilizados pela
> integração. O payload bruto completo retornado pela API do Google
> Calendar não é armazenado pelo aplicativo.

Não mencionar `raw_json` pelo nome na política pública, salvo se houver
motivo técnico/jurídico específico.

------------------------------------------------------------------------

# 7. Uso dos dados Google

Explicar que os dados provenientes das APIs do Google são utilizados
exclusivamente para fornecer e melhorar a funcionalidade solicitada pelo
usuário relacionada à integração Google Calendar.

São utilizados para:

-   autenticação/autorização da integração;
-   identificação da Conta Google conectada;
-   listagem dos calendários;
-   seleção das agendas;
-   sincronização de leitura;
-   exibição dos eventos no Kaiplan;
-   funcionamento offline/cache local;
-   controle técnico da sincronização.

Os dados Google Calendar NÃO são utilizados pelo Kaiplan para:

-   publicidade direcionada baseada no conteúdo da agenda;
-   personalização de anúncios com base em eventos;
-   criação de perfis publicitários;
-   marketing baseado no conteúdo do Google Calendar;
-   concessão ou análise de crédito;
-   venda de dados;
-   finalidades não relacionadas à funcionalidade solicitada.

------------------------------------------------------------------------

# 8. Armazenamento local

O Kaiplan utiliza SQLite e preferências locais.

O banco principal dos dados locais é separado do cache de integrações
externas.

A integração Google Calendar utiliza um cache local separado.

Preferências relacionadas à integração podem manter informações como:

-   integração habilitada/desabilitada;
-   e-mail da conta;
-   timestamps de sincronização;
-   estado/cursor técnico da sincronização.

Não afirmar que o banco SQLite é criptografado.

Não afirmar criptografia ponta a ponta.

Não afirmar que todos os dados do aplicativo utilizam criptografia
adicional além dos mecanismos realmente fornecidos pelas
plataformas/serviços utilizados.

------------------------------------------------------------------------

# 9. Retenção dos dados Google

A política deve explicar de forma clara que dados necessários da
integração podem permanecer temporariamente armazenados no dispositivo
como cache enquanto a Conta Google estiver conectada.

O cache é utilizado para:

-   exibir os eventos;
-   permitir funcionamento local/offline;
-   evitar dependência de nova consulta para cada visualização;
-   manter o estado da sincronização.

Os eventos do calendário selecionado são atualizados/substituídos
durante sincronizações conforme o comportamento do aplicativo.

Não prometer um TTL fixo em horas/dias, pois não existe uma política de
expiração por prazo confirmada.

------------------------------------------------------------------------

# 10. Desmarcar calendário NÃO é desconectar Google

Manter esta distinção.

Ao apenas desmarcar/desabilitar um calendário dentro da integração:

-   a seleção local é alterada;
-   isso não deve ser descrito como revogação da Conta Google;
-   isso não deve ser descrito como exclusão total dos dados da
    integração.

Não prometer exclusão completa ao simplesmente desmarcar uma agenda.

A exclusão descrita na próxima seção corresponde à ação de **desconectar
a Conta Google**.

------------------------------------------------------------------------

# 11. Desconexão e exclusão

Este comportamento foi corrigido e validado no aplicativo.

Quando o usuário desconecta a integração Google:

1.  o Kaiplan tenta revogar o acesso Google;
2.  tenta encerrar a sessão da integração;
3.  remove fisicamente do cache externo os eventos Google relacionados à
    integração ativa;
4.  remove os calendários Google armazenados para essa integração;
5.  remove o registro local da conta externa;
6.  limpa as preferências locais relacionadas à sincronização Google.

A limpeza local foi implementada de forma independente do sucesso da
revogação remota, preservando a intenção do usuário de remover os dados
do dispositivo.

A política pode afirmar:

> Ao desconectar a Conta Google do Kaiplan, os dados em cache associados
> à integração Google Calendar são removidos do armazenamento local do
> aplicativo, incluindo os eventos e calendários armazenados para a
> integração e as informações locais relacionadas à conta e à
> sincronização.

Não afirmar que isso exclui eventos da conta do usuário no próprio
Google Calendar.

O Kaiplan NÃO exclui os eventos de origem do Google.

------------------------------------------------------------------------

# 12. Backup manual JSON

O backup JSON manual do Kaiplan exporta dados locais e determinadas
preferências do aplicativo.

Ele NÃO inclui:

-   `external_accounts`;
-   calendários Google em cache;
-   eventos Google em cache;
-   tokens OAuth;
-   preferências `kaiplan.googleSync`.

Na política pública, usar linguagem amigável:

> Os dados em cache provenientes da integração com Google Calendar e as
> credenciais/tokens OAuth não fazem parte do backup JSON manual do
> Kaiplan.

Não expor nomes internos de tabelas/configurações ao usuário final.

------------------------------------------------------------------------

# 13. Android Backup

A auditoria anterior identificou que o Android Auto Backup/Device
Transfer possui regras próprias e pode incluir determinados dados do
aplicativo, como armazenamento de preferências da plataforma.

O cache externo Google não foi explicitamente incluído nas regras
analisadas de Android Auto Backup.

Não fazer afirmações absolutas como:

-   "nenhum dado relacionado ao Google jamais pode ser restaurado pelo
    Android";
-   "todos os dados são necessariamente apagados de qualquer backup de
    sistema".

Se a política mencionar backup do sistema operacional, utilizar
linguagem prudente informando que mecanismos de backup/restauração
oferecidos pelo Android podem estar sujeitos às configurações e
políticas da própria plataforma.

------------------------------------------------------------------------

# 14. Transferência / terceiros

A auditoria identificou comunicação com serviços externos necessários às
funcionalidades do aplicativo, incluindo:

-   Google Sign-In;
-   Google Calendar API;
-   Google Mobile Ads / AdMob;
-   serviços Expo utilizados pelo aplicativo.

Não foi encontrado backend próprio Kaiplan recebendo eventos do Google
Calendar.

Não foi encontrado envio explícito, pela lógica do Kaiplan, de dados de
eventos Google para o AdMob.

Não foi encontrado envio explícito para publicidade de:

-   título de evento;
-   descrição;
-   localização;
-   Calendar ID;
-   Event ID;
-   e-mail Google

como dados usados pelo Kaiplan para segmentação de anúncios.

A política deve distinguir:

1.  dados Google Calendar processados pela integração;
2.  dados técnicos que SDKs/serviços externos podem processar para suas
    próprias finalidades legítimas.

Não afirmar que SDKs terceiros não coletam dados técnicos próprios.

------------------------------------------------------------------------

# 15. AdMob e publicidade

O Kaiplan utiliza Google AdMob.

O aplicativo Android declara Advertising ID conforme necessário à
integração de publicidade.

Atualizar a política para refletir que publicidade já existe no produto.

Remover qualquer texto que trate anúncios apenas como recurso futuro.

Deixar claro que os dados provenientes do conteúdo do Google Calendar
não são utilizados pelo Kaiplan para personalizar ou direcionar
anúncios.

Quando apropriado, explicar que o SDK de publicidade pode processar
identificadores e dados técnicos conforme as políticas do Google/AdMob.

------------------------------------------------------------------------

# 16. IA / Machine Learning

A auditoria do aplicativo não encontrou integração de IA/ML no fluxo
Google Calendar.

Não foram encontradas integrações com:

-   OpenAI;
-   Gemini;
-   Anthropic;
-   modelos locais

para processamento dos dados Google Calendar.

Adicionar declaração clara:

> Os dados obtidos pelo Kaiplan por meio das APIs do Google não são
> utilizados para desenvolver, melhorar ou treinar modelos de
> inteligência artificial ou machine learning, nem são transferidos
> intencionalmente pelo Kaiplan a terceiros para treinamento desses
> modelos.

Versão inglesa equivalente:

> Google user data accessed by Kaiplan is not used to develop, improve,
> or train artificial intelligence or machine learning models, nor is it
> intentionally transferred by Kaiplan to third parties for training
> such models.

------------------------------------------------------------------------

# 17. Google Limited Use

Esta declaração é obrigatória.

Na versão PT-BR incluir explicitamente:

> O uso e a transferência, pelo Kaiplan, de informações recebidas das
> APIs do Google obedecem à Política de Dados do Usuário dos Serviços de
> API do Google, incluindo os requisitos de Uso Limitado (Limited Use).

Na versão EN:

> Kaiplan's use and transfer of information received from Google APIs
> adheres to the Google API Services User Data Policy, including the
> Limited Use requirements.

Quando possível, transformar "Google API Services User Data Policy" em
link para a política oficial do Google.

------------------------------------------------------------------------

# 18. Proteção dos dados

Descrever somente fatos que possam ser sustentados.

Podem ser mencionados:

-   integração Google Calendar somente leitura;
-   cache Google separado do banco principal;
-   minimização dos dados persistidos;
-   tokens OAuth não incluídos no backup JSON manual;
-   cache Google não incluído no backup JSON manual;
-   remoção do cache Google ao desconectar a integração;
-   comunicação com APIs Google utilizando os mecanismos seguros
    fornecidos pelas APIs/plataformas.

NÃO afirmar:

-   banco SQLite criptografado;
-   criptografia ponta a ponta;
-   certificações de segurança inexistentes;
-   armazenamento próprio de tokens em infraestrutura Kaiplan;
-   proteção absoluta contra acesso indevido.

------------------------------------------------------------------------

# 19. Atualizar `privacy.html`

A atual Política de Privacidade está desatualizada.

Ela ainda contém linguagem semelhante a:

> "Nesta versão de testes... Recursos futuros de sincronização, Google
> Calendar, backup em nuvem e anúncios..."

Esse conteúdo não representa mais corretamente o produto atual.

Reescrever/revisar `privacy.html`.

Atualizar a data de revisão para a data em que a nova política for
efetivamente publicada.

A política final deve possuir, de forma organizada, conteúdo equivalente
às seguintes áreas:

1.  Introdução
2.  Dados armazenados localmente
3.  Conta Google e autenticação
4.  Integração Google Calendar
5.  Dados Google acessados
6.  Como os dados Google são utilizados
7.  Armazenamento/cache local
8.  Retenção
9.  Desconexão e exclusão
10. Backup manual
11. Transferência/compartilhamento
12. Publicidade / Google AdMob
13. Feedback / Formspree
14. Notificações
15. Proteção dos dados
16. IA/ML
17. Google API Services User Data Policy / Limited Use
18. Controle/direitos do usuário
19. Contato

Não é obrigatório usar exatamente esses títulos, mas todos os assuntos
precisam estar claramente cobertos.

------------------------------------------------------------------------

# 20. Formspree

A política atual informa que o formulário do site utiliza Formspree.

Preservar essa transparência.

Explicar que:

-   o envio do formulário é voluntário;
-   informações fornecidas pelo usuário são transmitidas ao Formspree
    para processamento técnico/encaminhamento;
-   Formspree pode processar informações técnicas conforme sua própria
    política.

Não misturar esse fluxo com Google Calendar.

Dados enviados voluntariamente pelo formulário do site e dados obtidos
da API Google são fluxos diferentes.

Preservar o link existente para a política do Formspree, verificando se
continua correto.

------------------------------------------------------------------------

# 21. Notificações

Preservar as informações corretas sobre notificações locais.

Não afirmar que eventos Google recebem notificações locais do Kaiplan se
isso não estiver implementado.

A auditoria indicou que eventos Google não recebem notificações locais
Kaiplan na lógica analisada.

------------------------------------------------------------------------

# 22. Criar `privacy-en.html`

Criar versão integral em inglês da política final.

Não resumir.

Não criar política diferente.

A versão EN deve conter os mesmos compromissos e informações da versão
PT-BR.

Usar linguagem natural e profissional.

Termos recomendados:

-   Privacy Policy
-   Google Account
-   Google Calendar Integration
-   Google User Data
-   Data Access
-   Data Use
-   Local Storage
-   Data Retention
-   Data Deletion
-   Data Sharing and Transfer
-   Data Protection
-   Google API Services User Data Policy
-   Limited Use requirements

------------------------------------------------------------------------

# 23. Termos de Uso

Manter:

-   `terms.html` --- PT-BR

Criar:

-   `terms-en.html` --- EN

Antes da tradução, revisar textos evidentemente desatualizados.

A página atual ainda possui referência à "versão de testes/beta".

Como o aplicativo já é produto publicado, não manter afirmações
incorretas de que toda a aplicação continua apenas em beta/testes.

Também revisar textos que tratem sincronização Google como recurso
apenas futuro.

Não inventar recursos Premium ou condições comerciais ainda não
definidas.

Se uma alteração mudar substancialmente o significado jurídico dos
Termos, registrar isso no relatório final.

------------------------------------------------------------------------

# 24. Atualizar páginas públicas desatualizadas

Antes de traduzir, procurar em todas as páginas PT-BR por expressões
como:

-   versão de testes;
-   beta;
-   Google Calendar planejado;
-   sincronização futura;
-   anúncios futuros;
-   AdMob futuro;
-   recursos que "ainda não fazem parte da versão disponível".

A página `features.html`, por exemplo, pode conter descrição de Google
Calendar como recurso futuro.

Atualizar apenas fatos comprovadamente desatualizados.

Google Calendar deve ser descrito conforme o estado atual:

-   integração opcional;
-   Free, se esta for a regra atual do produto;
-   somente leitura;
-   seleção de calendários;
-   visualização/sincronização de eventos Google.

Não anunciar sincronização bidirecional.

Não anunciar criação/edição de eventos Google.

Não transformar recursos planejados como Cloud/Web/Premium em recursos
existentes.

------------------------------------------------------------------------

# 25. Criar versões em inglês

Criar versões equivalentes das páginas públicas existentes.

No mínimo, se esses arquivos existirem:

-   `index-en.html`
-   `features-en.html`
-   `screenshots-en.html`
-   `learning-en.html`
-   `privacy-en.html`
-   `terms-en.html`
-   `support-en.html`
-   `feedback-en.html`

Se existirem outras páginas públicas presentes na navegação principal,
criar a versão EN correspondente.

Não criar versões para arquivos técnicos, páginas internas ou arquivos
de verificação Google.

------------------------------------------------------------------------

# 26. Navegação PT \| EN

Adicionar seletor discreto de idioma em todas as páginas públicas:

`PT | EN`

Mapear cada página para sua equivalente.

Exemplos:

-   `index.html` ↔ `index-en.html`
-   `features.html` ↔ `features-en.html`
-   `screenshots.html` ↔ `screenshots-en.html`
-   `learning.html` ↔ `learning-en.html`
-   `privacy.html` ↔ `privacy-en.html`
-   `terms.html` ↔ `terms-en.html`
-   `support.html` ↔ `support-en.html`
-   `feedback.html` ↔ `feedback-en.html`

Ao trocar idioma, manter o usuário na página equivalente.

Usar links HTML normais.

Não criar dependência desnecessária de JavaScript.

------------------------------------------------------------------------

# 27. HTML lang

Páginas PT-BR:

``` html
<html lang="pt-BR">
```

Páginas EN:

``` html
<html lang="en">
```

------------------------------------------------------------------------

# 28. SEO e hreflang

Para cada par de páginas, adicionar quando apropriado:

``` html
<link rel="alternate" hreflang="pt-BR" href="https://kaiplan.com.br/PAGINA-PT">
<link rel="alternate" hreflang="en" href="https://kaiplan.com.br/PAGINA-EN">
```

Também revisar:

-   `<title>`;
-   meta description;
-   canonical, se já utilizado;
-   `hreflang`;
-   idioma do documento;
-   links internos.

Não inventar keywords ou claims de marketing.

------------------------------------------------------------------------

# 29. URLs críticas do Google OAuth

Estas URLs devem continuar funcionando:

-   `https://kaiplan.com.br/`
-   `https://kaiplan.com.br/index.html`
-   `https://kaiplan.com.br/privacy.html`
-   `https://kaiplan.com.br/terms.html`

Não substituir as URLs PT-BR já cadastradas no Google Auth Platform
pelas versões EN sem solicitação.

As páginas inglesas são complementares.

Não alterar domínio.

Não remover arquivos/registros necessários ao Google Search Console ou à
verificação de propriedade.

------------------------------------------------------------------------

# 30. Não fazer

NÃO:

-   alterar o aplicativo Kaiplan;
-   alterar scopes OAuth;
-   alterar Client IDs;
-   alterar Google Cloud;
-   criar backend;
-   afirmar que Google Calendar é bidirecional;
-   afirmar que Kaiplan cria eventos Google;
-   afirmar que Kaiplan modifica eventos Google;
-   afirmar que Kaiplan exclui eventos da conta Google;
-   afirmar que SQLite é criptografado;
-   afirmar criptografia ponta a ponta;
-   afirmar que nenhum SDK coleta dados técnicos próprios;
-   afirmar que nenhum mecanismo do Android pode realizar backup de
    preferências;
-   afirmar que o Google Sign-In não mantém internamente informações de
    sessão;
-   afirmar que o Kaiplan armazena refresh token;
-   afirmar que Google Calendar entra no backup JSON manual;
-   afirmar que conteúdo do Calendar é utilizado para anúncios;
-   afirmar uso de IA/ML inexistente;
-   manter textos de "versão de testes" se estiverem descrevendo
    incorretamente o produto publicado;
-   inventar recursos Premium;
-   inventar Cloud;
-   inventar sincronização bidirecional;
-   inventar garantias jurídicas ou técnicas.

------------------------------------------------------------------------

# 31. Checklist específico da verificação OAuth Google

Antes de concluir a nova Privacy Policy, confirmar que ela responde
claramente:

-   [ ] Quais dados Google o Kaiplan acessa?
-   [ ] Por que esses dados são acessados?
-   [ ] Como esses dados são usados?
-   [ ] Onde os dados ficam armazenados?
-   [ ] O cache é local?
-   [ ] Existe backend próprio recebendo eventos Google?
-   [ ] Os dados são vendidos?
-   [ ] Os dados Calendar são usados para publicidade?
-   [ ] Há compartilhamento/transferência?
-   [ ] Como os dados são protegidos?
-   [ ] Como funciona a retenção?
-   [ ] O que ocorre ao desconectar Google?
-   [ ] Os dados em cache são apagados ao desconectar?
-   [ ] O backup JSON manual inclui dados Google?
-   [ ] Tokens entram no backup JSON?
-   [ ] Dados Google são utilizados para IA/ML?
-   [ ] A declaração de Limited Use está explícita?
-   [ ] A integração está corretamente descrita como read-only?

------------------------------------------------------------------------

# 32. Validação técnica do site

Após as alterações, verificar:

-   [ ] `/` funciona;
-   [ ] `/index.html` funciona;
-   [ ] `/index-en.html` funciona;
-   [ ] `/privacy.html` funciona;
-   [ ] `/privacy-en.html` funciona;
-   [ ] `/terms.html` funciona;
-   [ ] `/terms-en.html` funciona;
-   [ ] demais páginas PT funcionam;
-   [ ] demais páginas EN funcionam;
-   [ ] PT → EN funciona;
-   [ ] EN → PT funciona;
-   [ ] links internos estão corretos;
-   [ ] assets carregam nas páginas EN;
-   [ ] CSS permanece correto;
-   [ ] responsividade foi preservada;
-   [ ] HTTPS permanece funcionando;
-   [ ] arquivos Google não foram removidos;
-   [ ] páginas legais podem ser abertas sem login;
-   [ ] PT e EN possuem conteúdo juridicamente equivalente;
-   [ ] Limited Use está presente nas duas versões;
-   [ ] Google Calendar aparece como read-only;
-   [ ] nenhuma informação inexistente foi adicionada.

------------------------------------------------------------------------

# 33. Relatório final obrigatório

Ao concluir, gerar um relatório curto contendo:

## Arquivos modificados

Liste todos.

## Arquivos criados

Liste todas as versões EN.

## Privacy Policy

Informe:

-   se Data Access está coberto;
-   se Data Use está coberto;
-   se Data Transfer está coberto;
-   se Data Protection está coberto;
-   se Data Retention & Deletion está coberto;
-   se Limited Use está presente;
-   se IA/ML está explicitamente tratado.

## Conteúdo desatualizado

Liste páginas/textos que foram atualizados por ainda tratarem:

-   Kaiplan como versão de testes;
-   Google Calendar como futuro;
-   AdMob/anúncios como futuro.

## Idiomas

Confirme:

-   PT-BR;
-   EN;
-   seletor PT \| EN;
-   hreflang.

## URLs críticas

Confirme que permanecem acessíveis:

-   `/`
-   `/privacy.html`
-   `/terms.html`

## Pendências

Liste qualquer afirmação que não tenha sido possível atualizar com
segurança.

Não invente uma resposta para eliminar pendências.

------------------------------------------------------------------------

# 34. Critério de conclusão

A tarefa só está concluída quando:

1.  a Política de Privacidade PT-BR representa o comportamento atual do
    Kaiplan;
2.  a versão EN é equivalente;
3.  os requisitos de transparência solicitados pelo Google estão
    cobertos;
4.  Limited Use está explicitamente declarado;
5.  retenção e exclusão refletem a exclusão física do cache no
    disconnect;
6.  o payload bruto completo não é descrito como armazenado;
7.  AdMob está corretamente declarado;
8.  Google Calendar não é mais tratado como recurso futuro;
9.  versões EN das páginas públicas foram criadas;
10. navegação PT/EN funciona;
11. nenhuma URL crítica do Google foi quebrada;
12. nenhuma funcionalidade ou garantia inexistente foi inventada.

Não fazer commit, push ou deploy automaticamente sem solicitação
explícita.
