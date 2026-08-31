# Lista de Tarefas

## Tarefa 1 — Login deve retornar um token de acesso [OK]

Descrição: Hoje o login apenas confirma email/senha e devolve os dados do usuário. É preciso que, ao autenticar com sucesso, a API também gere e retorne um token que identifique aquele usuário nas próximas requisições.

Requisitos:

O token deve carregar a identidade do usuário (id) de forma segura, sem poder ser forjado
O token deve ter validade (expirar após um tempo)
A resposta do login passa a incluir o token junto com os dados do usuário

## Tarefa 2 — Rotas de usuário devem exigir autenticação [OK]

Descrição: Atualmente qualquer pessoa pode buscar, alterar ou deletar qualquer usuário só sabendo o id na URL. Essas rotas precisam passar a exigir um token válido para serem acessadas.

Requisitos:

Requisição sem token, ou com token inválido/expirado, deve ser rejeitada antes de chegar na lógica da rota
Um usuário só pode alterar/deletar a própria conta, mesmo que tente informar o id de outra pessoa na URL
Buscar um usuário por id continua liberado (ou defina se isso também deve exigir login)

## Tarefa 3 — Frontend deve manter a sessão do usuário logado []

Descrição: Hoje, ao recarregar a página, o usuário perde o login e volta pra tela inicial. É preciso guardar a sessão de forma que ela sobreviva a um refresh da página.

Requisitos:

Ao logar com sucesso, o token recebido deve ser armazenado no navegador
Ao abrir o app, se existir um token salvo, o usuário deve continuar autenticado (sem precisar logar de novo)
Ao clicar em "Sair", o token deve ser removido e o usuário volta pra tela de login

## Tarefa 4 — Requisições autenticadas devem enviar o token []

Descrição: Toda chamada à API que exige login precisa informar o token salvo, para que o backend saiba quem está fazendo a requisição.

Requisitos:

Todas as chamadas a rotas protegidas devem incluir o token no cabeçalho da requisição
Se a API responder que o token é inválido/expirado, o usuário deve ser deslogado automaticamente e redirecionado pro login

## Tarefa 5 — Centralizar o estado de autenticação []

Descrição: Hoje a informação "quem está logado" é passada manualmente de tela em tela por props. Conforme o app cresce, isso fica insustentável. É preciso centralizar esse estado num lugar único que qualquer tela possa consultar.

Requisitos:

Qualquer página deve conseguir saber se existe um usuário logado e quem é ele, sem depender de receber isso via prop do componente pai
A ação de logar e deslogar deve estar disponível globalmente, não só na tela de Login
O comportamento das telas existentes (Login, Cadastro, Home) não pode mudar do ponto de vista do usuário final

## Tarefa 6 — Tela de perfil para editar os próprios dados []

Descrição: O usuário logado precisa de uma tela onde consiga visualizar e alterar suas próprias informações de cadastro (email, senha).

Requisitos:

A tela deve exibir os dados atuais do usuário logado
O usuário deve poder alterar email e/ou senha e salvar
A operação deve usar a rota de atualização já existente no backend, agora protegida por autenticação
O usuário deve receber feedback claro de sucesso ou erro ao salvar
Deve haver um caminho de navegação (link/botão) partindo da Home até essa tela

## Tarefa 7 — Navegação por rotas reais []

Descrição: Hoje a troca de tela é feita manualmente controlando uma variável de estado no componente principal. Com mais telas (Home, Perfil, futuros módulos), isso não escala. É preciso que cada tela tenha sua própria URL.

Requisitos:

Cada tela (Login, Cadastro, Home, Perfil) deve ter uma URL própria e acessível diretamente
Um usuário não autenticado tentando acessar uma tela protegida (Home, Perfil) deve ser redirecionado pro Login
Um usuário autenticado tentando acessar Login/Cadastro deve ser redirecionado pra Home
