# Kaiplan Project Manual

## Visao geral

- Kaiplan e um planejador local-first que combina o melhor do Google Agenda com o Microsoft To Do.
- O produto deve unir calendario, tarefas, subtarefas, eventos, backup, feedback e arquitetura premium-ready.
- A stack atual e React Native + Expo + JavaScript.
- O foco inicial e Android/mobile; Windows fica na wishlist futura.
- A versao atual de pre-lancamento e `0.1.2`; a versao `1.0` fica reservada para o primeiro lancamento publico.

## Stack atual

- Entrada do app: `App.js`.
- Configuracao Expo: `app.json`.
- Dependencias: `package.json` e `package-lock.json`.
- UI e navegacao simples: React Native sem React Navigation, com estado local em `App.js`.
- Banco local: `expo-sqlite`, arquivo `kaiplan.db`.
- Preferencias: `@react-native-async-storage/async-storage`.
- Backup e compartilhamento: `expo-file-system`, `expo-sharing`, `expo-document-picker`.
- Notificacoes: `expo-notifications`, com import dinamico porque Expo Go Android nao suporta notificacoes completas.

## Site Institucional

- O site temporario do Kaiplan fica em `site_draft/`, pasta ignorada pelo git deste app.
- `site_draft/` deve ser copiada/publicada manualmente no repositorio ou hospedagem externa do site.
- O site e HTML/CSS estatico e deve ter Home, Recursos, Capturas, Politica de Privacidade, Termos de Uso, Suporte e Feedback/Bugs.
- A Home (`index.html`) deve funcionar como porta de entrada e linkar todas as paginas principais pelo menu e, quando possivel, por cards no corpo.
- O conteudo do site deve ser atualizado a partir deste manual, de `.codex/project_patterns.md`, de `docs/react_native_roadmap.md`, de `docs/play_testing_publication.md` e da politica local em `src/content/privacyPolicy.js`.
- A Politica de Privacidade publicada no site deve refletir a versao local do app e servir como URL publica exigida pela Play Console.
- O formulario de Feedback/Bugs do site pode ser visual enquanto nao houver backend/e-mail definido; quando for ativado, atualizar este manual e a politica se houver coleta/envio de dados.
- O agente que cuidar do site deve manter linguagem simples, visual coerente com o Kaiplan, contraste legivel e nao prometer recursos premium ainda nao liberados.

## Estrutura

- `src/components`: componentes compartilhados como cards, secoes e detalhes.
- `src/data`: banco SQLite e repositorios.
- `src/screens`: telas Home, Dia, Semana, Mes, Tarefas, Configuracoes e criacao/edicao.
- `src/services`: servicos como notificacoes.
- `src/theme`: cores e tema.
- `src/utils`: datas, horarios e helpers.
- `.codex/project_patterns.md`: memoria curta e regras que qualquer IA deve ler primeiro.
- `docs/react_native_roadmap.md`: roadmap priorizado para proximas alteracoes React Native.
- `docs/improvement_backlog.md`: backlog e prioridades.
- `docs/skills`: skills operacionais do projeto.
- Mudancas de regra/padrao do aplicativo devem ser confirmadas com o usuario antes de serem implementadas.
- Toda melhoria, correcao ou risco descoberto deve entrar em `docs/improvement_backlog.md` para revisao continua; ao implementar, atualizar o status para nao deixar pendencias esquecidas.
- Listas de comandos do usuario devem virar checklist de execucao; a resposta final deve declarar o que foi feito, o que precisa validar e o que ficou pendente.

## Telas e responsabilidades

- Home: deve abrir por padrao, mantendo `Compromissos de Hoje` e `Tarefas do dia` sempre visiveis.
- Dia: deve exibir data, numero do dia do ano, itens de dia todo no topo e timeline por horarios, sempre abrindo no dia atual.
- Semana: deve seguir a mesma aparencia/comportamento da tela Dia, exibindo dias lado a lado nos modos 3 dias, dias uteis e semana completa.
- Mes: deve ocupar bem a tela mobile, mostrar mini-cards legiveis de eventos/tarefas e abrir lista do dia ao tocar.
- Tarefas: deve listar tarefas por lista, criar listas via botao `+`, permitir concluir/reabrir via checkbox, duplicar e excluir.
- Configuracoes: deve controlar tema `system/light/dark`, notificacoes globais, resumo diario, backup, restauracao e feedback.
- Configuracoes tambem expoe Politica de Privacidade local/versionada, premium/sem ADS, backup e entrada futura para `Usuario e Agenda`.
- Na ordem de Configuracoes, `Politica de Privacidade` deve ser a penultima secao e `Feedback` a ultima antes da versao do app.
- Criar/Editar Item: deve criar e editar eventos/tarefas, categoria, tags, cor, dia todo e notificacao por card.
- Detalhes do Card: deve abrir ao tocar em card, mostrar dados, permitir editar, duplicar, excluir e concluir/reabrir tarefas.

## Dados

- `planning_items`: guarda eventos, tarefas e subtarefas.
- `task_lists`: guarda listas de tarefas, com `Tarefas` como lista padrao e campos opcionais de cor/icone para customizacao premium-ready.
- `feedback_entries`: guarda bugs/sugestoes localmente para envio futuro.
- Subtarefas usam `parent_id` e nao devem aparecer nas consultas principais.
- Itens removidos usam exclusao logica por `is_deleted`.
- Tags estao serializadas no campo `tags` por enquanto; futuro pode normalizar em tabelas.
- Categorias estao no item por enquanto; futuro pode normalizar e customizar por plano.

## Regras de produto

- Datas numericas usam `dd/MM/yyyy` e sempre dois digitos para dia/mes.
- Horarios devem usar slots de 15 minutos: 00, 15, 30 e 45.
- Dia e Semana devem ser praticamente iguais na exibicao de timeline; Dia mostra um unico dia, e Semana mostra 3 dias, dias uteis ou semana completa.
- Semana completa sempre inicia no domingo e encerra no sabado.
- Criacao deve usar o horario atual arredondado para o proximo slot de 15 minutos.
- Em eventos, hora final padrao deve ser 30 minutos apos a inicial.
- Dia e Semana devem abrir criacao por long press na grade, preenchendo o dia/horario clicado com snap de 15 minutos.
- Na edicao, `Dia todo` deve ser um interruptor; datas devem abrir calendario, horas devem abrir combo/lista de 15 em 15 minutos, e o item deve ter no minimo 15 minutos.
- A tela de edicao de eventos deve agrupar `Inicio` com data/hora e `Fim` com data/hora para leitura rapida.
- Campos de data/hora da edicao devem ser editaveis, iniciar com o valor salvo/preenchido e ter botao lateral para calendario/lista de horarios.
- A lista de horarios deve abrir posicionada no horario atual do campo, e nao sempre em `00:00`.
- Ao alterar inicio por digitacao ou seletor, o fim deve ser ajustado automaticamente para inicio +30 minutos, mantendo minimo de 15 minutos.
- Evento/tarefa multi-dia deve renderizar por intersecao com o dia.
- Displays de periodo devem exibir `De: DD/MM/AAAA às HH:MM` e `Até: DD/MM/AAAA às HH:MM`; itens sem hora exibem apenas data.
- Tarefas de dia todo e dias totalmente cobertos por evento multi-dia ficam no topo, fora da timeline.
- Cards devem renderizar acima das linhas da timeline; linhas nunca devem atravessar o card.
- Linhas da timeline tambem devem aparecer na coluna de horas, alinhadas com a grade principal.
- Eventos passados devem usar visual opaco, semelhante a tarefa concluida.
- Dia completo intermediario de evento multi-dia deve aparecer no topo do dia.
- Duplicar item deve alterar apenas o titulo com sufixo `copia`, sem alterar descricao.
- Tags free limitadas a 1 por card; Premium podera liberar mais tags e customizacao ampliada.
- Categorias devem ter local proprio de criacao/edicao antes do beta, com categorias padrao por tipo e limite free de 3 categorias criadas.
- Categorias premium devem ser livres e customizaveis, incluindo cor/icone quando a camada premium existir.
- Categorias ficam persistidas em tabela propria `categories`; categorias padrao nao podem ser removidas e categorias criadas no free ficam limitadas a 3 no total.
- Free permite ate 5 listas de tarefas; Pro nao tera limite.
- Subtarefas devem ter limite de 100 por tarefa.
- Concluir tarefa no Dia nao remove o card da timeline; o card permanece no horario com checkbox marcado e titulo riscado.
- Subtarefas podem ser criadas na edicao antes de salvar uma tarefa nova, e devem ser marcaveis como concluidas dentro da edicao, nos detalhes e nos cards.
- Tarefas concluidas nao devem sumir das listas principais; devem ficar marcadas, riscadas e mais opacas.
- Na Home, tarefas concluidas devem sair das listas abertas e aparecer em `Concluidas` quando estiverem nos ultimos 15 dias.
- Na Home, cards iniciam compactos exibindo apenas o titulo; tarefas tambem exibem checkbox para concluir sem expandir.
- Na Home, toque simples expande/fecha detalhes inline e toque longo abre a edicao.
- Na Home, o mesmo item pode aparecer em secoes diferentes, mas a expansao deve ser independente em cada ocorrencia visual.
- Na Home, concluir subtarefa dentro de um card expandido nao deve recolher o card; a atualizacao deve ser local ao card sempre que possivel.
- Na Home, `Compromissos de Hoje` mostra `Nao ha compromissos hoje` quando vazio e `Tarefas do dia` mostra `Nao ha tarefas para hoje` quando vazia.
- Na Home, `Atrasadas` mostra tarefas com data/hora vencida e ainda nao concluidas.
- Na Home, `Proximos dias` mostra itens de amanha ate 7 dias a frente.
- Na Home, `Em andamento`, `Atrasadas`, `Proximos dias` e `Concluidas` so aparecem quando tiverem cards aplicaveis.
- Tarefas podem ser sem data/hora; nesse caso aparecem apenas na tela Tarefas.
- Tarefas com data/hora aparecem em Dia/Semana/Mes ocupando sempre 30 minutos.
- Tarefas nao exibem nem editam data fim; a duracao visual e fixa em 30 minutos.
- Toda tarefa pertence a uma lista; `Tarefas` e a lista padrao, e listas customizadas ficam reservadas/preparadas para Premium.
- A tela Tarefas e o unico lugar para criar listas; o botao `+` abre um toast/painel `Customizar` com nome, cor e icone.
- Na tela Tarefas, o `+` principal cria lista de tarefas; tarefas novas devem ser criadas pelo `+` dentro da lista correspondente.
- Listas de tarefas devem ter menu proprio para editar titulo, definir como padrao e remover quando nao forem a lista padrao.
- Cores e icones customizados de listas ficam visiveis como area premium bloqueada ate a camada de planos existir.
- Grupos/listas da tela Tarefas devem recolher e expandir como as secoes da Home.
- Cards dentro da tela Tarefas tambem devem iniciar recolhidos e expandir/recolher por toque simples, igual aos cards da Home.
- A tela Criar/Editar Item deve apenas selecionar uma lista existente para a tarefa, sem criar ou vender customizacao de lista ali.
- Ao salvar ou voltar de Criar/Editar Item, o app deve retornar para a tela de origem em vez de forcar Home.
- A tela Tarefas permite visualizar tarefas por lista e iniciar nova tarefa ja vinculada a uma lista.
- Ao abrir criacao pelo FAB na tela Tarefas, o tipo inicial deve ser `Tarefa`.
- Ao criar subtarefa, solicitar apenas titulo; descricao curta deve ser preenchida ao clicar na subtarefa ja criada.
- Subtarefas so alternam conclusao pelo checkbox; clique simples abre edicao de titulo/descricao.
- Segurar uma subtarefa deve prender o item ao toque/mouse para arrastar; ao soltar, a nova ordem e salva sem botoes de ordenacao.
- A duracao fixa de 30 minutos de tarefa agendada e regra de calendario e nao precisa aparecer no card/detalhes da tarefa.

## Padroes visuais

- Cor base Ecru: `#E0CD95`.
- Fundo claro: `#F4E8C9`.
- Evento: marrom `#7A4F2A`.
- Tarefa: verde oliva `#7C8F57`.
- Todo texto, icone, botao, chip e item selecionado deve ter contraste explicito.
- Nunca confiar em cor herdada quando o fundo for customizado.
- Cards devem exibir titulo, horario, descricao breve, local, categoria e tags quando houver espaco.
- Na Home, o card fechado deve exibir titulo e checkbox quando for tarefa; detalhes, subtarefas e acoes aparecem apenas no card expandido.
- Cards de dia todo no topo da tela Dia devem ser compactos e mostrar apenas o titulo.
- Descricao em previews deve ser curta para nao estourar cards.
- Timeline Dia/Semana deve manter linhas em 00/15/30/45, com 30 em destaque moderado.
- Dia e Semana devem manter alinhamento, densidade, linhas, horarios e cards visualmente semelhantes.
- Semana deve abrir com o dia atual visivel/centralizado; se ele nao existir no modo atual, focar o proximo dia visivel sem deixar a lateral distante demais.
- Dia e Semana devem abrir verticalmente perto da hora corrente e mostrar linha de destaque na hora atual quando hoje estiver na tela.
- Esse auto-scroll deve funcionar mesmo quando nao existem itens de dia todo ou blocos antes da timeline.
- A linha de hora atual deve ser desenhada sem sombra/elevation para evitar artefatos visuais.
- Na tela Dia, o cabecalho do calendario deve ficar fixo e o conteudo da timeline deve rolar abaixo dele.
- O icone de calendario da tela Dia deve voltar para o dia atual e rolar para a hora atual.
- A coluna de horarios da Semana deve ficar fixa e proxima da grade, sem grandes vazios laterais.
- A coluna de horarios da Semana deve usar a mesma origem vertical da grade; linhas de hora/quartos precisam alinhar exatamente.
- Na Semana, o cabecalho dos dias e a faixa de itens de dia todo devem ficar fixos na rolagem vertical e sincronizados com a rolagem horizontal da grid.
- A grid da Semana deve comecar logo abaixo dessa faixa fixa, com apenas respiro basico antes de `00:00`.
- Se nao houver item de dia todo na Semana, nao reservar uma faixa vazia grande entre os dias e a grid.
- Titulos de mes/ano devem manter a preposicao `de` minuscula, por exemplo `Julho de 2026`.
- Paineis, toasts e modais customizados devem fechar ao tocar fora, tornando a interacao mais intuitiva.
- Feedback deve ser aberto por botao/link em modal e confirmado por toast/alert, sem textarea fixa ocupando a tela.
- No beta, feedback pode ficar salvo localmente em `feedback_entries`; envio externo por e-mail/share sheet ou backend/API fica como prioridade pos-beta.
- Ate o envio externo existir, a opcao de Feedback em Configuracoes deve ficar desativada como `Em breve` para nao gerar expectativa falsa de envio.
- Temas prontos devem incluir Kaiplan (Padrao), Cores Vivas, Google Agenda e Windows Old, todos com contraste explicito.
- Temas prontos devem afetar fundo, header, lateral, selecoes, linhas e paleta de cards; nao apenas as cores dos cards.
- Cada tema pronto deve definir suas proprias variantes clara e escura; nenhum preset deve herdar automaticamente o escuro do Kaiplan.
- Temas devem carregar um campo `fontFamily` preparado para fontes futuras, ainda que o valor inicial seja nulo.
- Cada tema pronto deve oferecer 26 cores de card em claro e escuro, mantendo a mesma posicao semantica entre temas.
- O tema Padrao Kaiplan deve oferecer 26 cores de card em tons pasteis, respeitando o marrom de eventos e o verde de tarefas; no modo escuro, usar variantes mais luminosas para manter leitura.
- O tema Cores Vivas deve ter fundo claro branco/solar e 26 cores de card vibrantes de verao, mantendo variantes legiveis no modo escuro.
- O tema Google Agenda deve usar base branca/cinza no fundo, header e lateral, com paleta ampla inspirada no Google Calendar para cards e equivalentes legiveis no modo escuro.
- O tema Windows Old deve usar base de terminal/Windows antigo: cores solidas, fundo vinho escuro, header/lateral cinza antigo e textos amarelados/esverdeados.
- A cor selecionada do card deve ser salva como posicao da paleta (`slot:N`), nao como hex fixo; ao trocar tema, a cor 1 vira a cor 1 do novo tema.
- O seletor de cor do card deve permanecer recolhido e abrir uma box compacta estilo Google Calendar ao ser tocado.
- Cards e mini-cards devem ter borda visivel para diferenciar fundo, card e conteudo em todos os temas.
- Tema customizavel fica reservado ao Premium, permitindo ajustar fundo, menus, cards e categorias sem esconder textos/icones.
- Area de ADS deve existir apenas no mobile como rodape discreto e nao pode atrapalhar a experiencia de calendario/tarefas.
- O app deve ter flag/estado preparado para modo sem ads, ligado futuramente a Premium.
- ADS deve ser controlado por preferencia local para testes e manter espaco previsivel de rodape; o FAB deve subir quando o banner estiver visivel.
- O slot de ADS deve ser renderizado por `AdBanner`, apenas mobile, sempre no rodape e de forma discreta; web/futuras plataformas podem usar outro posicionamento proprio.
- Na tela Configuracoes, Publicidade deve mostrar apenas `Modo sem ADS` com chamada `Pegar Premium`; a ativacao/desativacao tecnica de ADS nao deve aparecer como controle do usuario free.
- Na tela Configuracoes, escolhas simples devem ser exibidas em grade horizontal com icones quadrados pequenos e representativos, evitando listas verticais longas quando couber em tiles.
- A tela Mes deve permitir navegar entre meses, exibir cabecalho dos dias da semana, destacar o dia atual e usar long press no dia para iniciar criacao.
- A tela Mes deve ter botao/icone no cabecalho para voltar rapidamente ao mes atual depois de navegar por outros meses.
- Mini-cards do Mes devem ser quadradinhos coloridos com icone do tipo do card, mantendo contador de itens extras sem texto longo dentro da celula.
- Ao tocar em um dia no Mes, abrir painel com cards completos do dia, opcao de criar card e fechamento ao tocar fora.

## Free e Premium

- Free: SQLite local, eventos/tarefas, listas limitadas, tags limitadas, backup export/import, feedback local e cores basicas de card.
- Premium futuro: Google Calendar sync, backup automatico na nuvem, agendas diferentes, temas diferentes, categorias customizadas, eventos customizaveis, recorrencia, anexos completos e planos mensal/trimestral/anual.
- Recorrencia fica premium-ready: diaria, semanal, mensal e anual.
- Recorrencia deve ter UI/dados preparados, mas bloqueada para Premium no free.
- Modo de impressao/exportacao visual deve ser planejado para Dia/Semana/Mes, priorizando uma solucao simples e compartilhavel antes de uma impressao nativa completa.
- Google Drive no free deve ser via compartilhamento nativo; API/OAuth direto fica para sync premium.
- Backup free deve ter destino claro, nome de arquivo versionado e restauracao por seletor; Google Drive via share sheet continua o caminho de menor custo no free.
- O formato de backup deve ser separado do transporte: `exportSnapshot` gera JSON sync-ready com `metadata.sync`, enquanto mobile/web decidem como salvar, compartilhar ou enviar.
- Conexao Google Calendar deve ficar em `Usuario e Agenda`, com login/consentimento, escolha de calendario e camada de sync isolada do SQLite local.
- Enquanto Premium nao estiver liberado, Login Google e Google Calendar devem ficar visiveis mas desabilitados, sem permitir tentativa de autenticacao.
- A preparacao tecnica de Google Calendar deve usar servico proprio e preferencias locais, mantendo OAuth/sync real fora do fluxo free.
- Sincronia entre contas deve ser avaliada por custo-beneficio antes de implementar: backend proprio, Firebase/Supabase, Google Drive/Calendar ou modelo hibrido local-first.
- Google API de enderecos fica em roadmap futuro para localizacao/coordenadas.
- Notificacoes globais devem controlar o padrao dos novos cards, e resumo diario deve ser configuravel por hora cheia na tela Configuracoes.
- O resumo diario deve agendar/cancelar notificacao pelo servico central de notificacoes; no Expo Go Android pode ficar preparado sem entrega real completa.
- Em Configuracoes, os controles globais devem aparecer como `Notificacao` e `Resumo do dia`, com interruptor e combo box recolhida; `Resumo do dia` deve oferecer apenas 05h00, 06h00, 07h00 e 08h00.
- No Android, notificacoes locais devem usar canal `kaiplan-reminders`, permissao `POST_NOTIFICATIONS`, trigger `DATE` para cards e trigger `DAILY` para resumo do dia.
- Excluir item ou concluir tarefa deve cancelar lembrete local pendente do item.

## Validacao

- Nao rodar validacoes da stack antiga neste projeto.
- Rodar `node --check` em `App.js` e `src/**/*.js`.
- Criar e manter automacao mobile com Jest/React Native Testing Library para fluxos criticos antes do beta.
- Rodar `npx expo-doctor`.
- Rodar `npm audit --audit-level=high`.
- Rodar varredura de mojibake e marcadores pendentes em `App.js`, `src`, `.codex`, `docs` e `README.md`.
- Nunca commitar APK/AAB nem artefatos de build.
- APK/AAB gerado para teste deve ficar fora do git; se for necessario criar pasta nativa `android`, validar antes de commitar e nunca incluir artefatos como `*.apk`.
- `expo-notifications` fica como no-op seguro no Expo Go Android; notificacoes reais devem ser validadas em development build/APK nativo.
- APK `debug` depende do Metro/ADB reverse e nao deve ser enviado para teste externo; para aparelho fisico sem computador, gerar APK `release` ou AAB com bundle JS embutido.
- APK release local para teste fisico deve ser gerado por `npm run dist:android` e copiado para `dist/kaiplan-<versao>-release.apk`; artefatos `*.apk` nunca devem ser commitados.
- Publicacao/testes pela Play Console devem usar Android App Bundle via `npm run dist:android:aab`, gerando `dist/kaiplan-<versao>-release.aab`; artefatos `*.aab` tambem nunca devem ser commitados.
- Antes do envio real para a Play Console, configurar assinatura/upload key de producao; build assinado com debug keystore serve apenas para validacao tecnica local.
- Toda versao distribuida deve manter sincronizados `package.json`, `package-lock.json`, `app.json`, `android/app/build.gradle` e `src/constants/appInfo.js`.

## Estado atual e lacunas

- Migracao React Native esta funcional para beta Android interno, com Home/Dia/Semana/Mes/Tarefas/Configuracoes, backup, politica de privacidade, ADS-ready, temas, notificacoes e preparacao Google Calendar.
- Proxima prioridade de publicacao: gerar AAB, configurar assinatura/upload key de producao, completar ficha da Play Console e publicar em teste interno/fechado.
