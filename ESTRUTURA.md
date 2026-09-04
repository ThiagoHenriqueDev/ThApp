# ThApp — Estrutura do Projeto

> Documento vivo. Atualizar conforme o desenvolvimento avança.

## Visão geral

App de tarefas com módulos de **financeiro**, **lista de mercado** e **tarefas domésticas**, desenvolvido com Node.js + TypeScript no backend e React + TypeScript no frontend.

- **Backend:** Node.js, TypeScript, Express, Prisma, PostgreSQL (hospedado no Neon)
- **Frontend:** React, TypeScript, Vite, CSS Modules
- **Autenticação:** JWT no backend, middleware para proteger as rotas de usuário e persistência do token no `localStorage` do frontend.

---

## Backend

### Estrutura de pastas

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── generated/prisma/       # Cliente Prisma gerado
├── src/
│   ├── config/prisma.ts
│   ├── middlewares/auth.middleware.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controllers/auth.controller.ts
│   │   │   ├── services/auth.service.ts
│   │   │   └── routes/auth.route.ts
│   │   └── usuario/
│   │       ├── controllers/usuario.controller.ts
│   │       ├── services/usuario.service.ts
│   │       ├── repositories/usuario.repository.ts
│   │       └── routes/usuario.route.ts
│   ├── utils/
│   │   ├── hash.ts
│   │   └── jwt.ts
│   ├── app.ts
│   └── server.ts
├── example.env
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

Padrão adotado: um módulo por domínio, com `controller` (recebe request/response), `service` (regra de negócio) e `repository` (acesso ao banco via Prisma). Autenticação transversal fica em `middlewares/` e utilitários ficam em `utils/`.

### Rotas disponíveis

| Método | Rota                  | Acesso  | Descrição                   |
| ------ | --------------------- | ------- | --------------------------- |
| POST   | `/auth/login`         | Público | Login e geração do JWT      |
| POST   | `/usuarios/cadastrar` | Público | Criar usuário               |
| GET    | `/usuarios/me`        | JWT     | Buscar o perfil autenticado |
| GET    | `/usuarios/:id`       | JWT     | Buscar usuário por id       |
| PUT    | `/usuarios/:id`       | JWT     | Atualizar usuário           |
| DELETE | `/usuarios/:id`       | JWT     | Deletar usuário             |

- Servidor roda na porta `3000`
- CORS habilitado (`app.use(cors())`)
- Banco: PostgreSQL via Prisma, hospedado no Neon
- Rotas protegidas esperam `Authorization: Bearer <token>`

### Pendências / próximos passos do backend

- [ ] Módulo financeiro
- [ ] Módulo lista de mercado
- [ ] Módulo tarefas domésticas

---

## Frontend

### Estrutura de pastas

```
frontend/
└── src/
    ├── components/
    │   ├── Button/
    │   │   ├── Button.tsx
    │   │   └── Button.module.css
    │   └── Input/
    │       ├── Input.tsx
    │       └── Input.module.css
    ├── pages/
    │   ├── Login/
    │   │   ├── Login.tsx
    │   │   └── Login.module.css
    │   ├── Cadastro/
    │   │   ├── Cadastro.tsx
    │   │   └── Cadastro.module.css
    │   └── Home/
    │       ├── Home.tsx
    │       └── Home.module.css
    ├── contexts/
    │   ├── authContext.ts
    │   ├── AuthProvider.tsx
    │   └── useAuth.ts
    ├── hooks/              # Hooks reutilizáveis (em expansão)
    ├── routes/
    │   └── RotaProtegida.tsx
    ├── services/
    │   ├── api.ts              # URL base da API
    │   ├── auth.service.ts     # login
    │   ├── token.ts            # token no localStorage
    │   └── usuario.service.ts  # cadastro e perfil
    ├── types/
    │   └── usuario.ts          # Usuario, LoginPayload, LoginResponse
    ├── App.tsx                # BrowserRouter e rotas da aplicação
    ├── App.css
    ├── main.tsx
    └── index.css
```

Padrões adotados:

- **CSS Modules** (`.module.css`) para estilo isolado por componente/página
- **`components/`**: peças reutilizáveis e "burras" (Input, Button) — só recebem props
- **`pages/`**: telas com lógica própria (estado, chamadas de API)
- **`services/`**: toda comunicação HTTP centralizada aqui, isolada das telas
- **`types/`**: interfaces TS compartilhadas entre services e páginas

### Fluxo de navegação atual

O `App.tsx` usa `react-router-dom` para definir as rotas. O `AuthProvider` mantém o usuário autenticado, recupera o perfil usando o token salvo e expõe `login` e `logout` pelo hook `useAuth`.

```
`/login` ⇄ `/cadastro`
    │
    ▼ (login com sucesso)
`/home` (rota protegida)
```

- `Login` → chama o serviço de autenticação → salva o JWT e atualiza o contexto
- `Cadastro` → chama `cadastrar()` do `usuario.service.ts`
- `AuthProvider` → ao iniciar, consulta `/usuarios/me` quando há token salvo
- `RotaProtegida` → redireciona para `/login` quando não há usuário autenticado
- `Home` → acessa o usuário pelo contexto e permite encerrar a sessão

### Funcionalidades prontas

- [x] Componentes base: `Input`, `Button`
- [x] Tela de Login (consumindo `/auth/login`)
- [x] Tela de Cadastro (consumindo `/usuarios/cadastrar`)
- [x] Tela Home básica pós-login
- [x] Navegação com `react-router-dom`
- [x] Context API para usuário logado
- [x] JWT salvo no `localStorage` e carregamento da sessão ao atualizar a página
- [x] Rota protegida para a Home

### Pendências / próximos passos do frontend

- [ ] Telas dos módulos: financeiro, lista de mercado, tarefas domésticas

---

## Decisões e observações registradas

- Cadastro pede só `email` e `senha` (mesmo formato do login) — por isso reaproveita o tipo `LoginPayload`
- O backend usa `cors()` e recebe JSON via `express.json()`
- O frontend usa `http://localhost:3000` como URL base da API em `services/api.ts`
- O token é armazenado com a chave `@ThApp:token`
