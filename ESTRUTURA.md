# ThApp — Estrutura do Projeto

> Documento vivo. Atualizar conforme o desenvolvimento avança.

## Visão geral

App de tarefas com módulos de **financeiro**, **lista de mercado** e **tarefas domésticas**, desenvolvido do zero (sem geradores/atalhos) para aprender programação com Node.js + TypeScript no backend e React + TypeScript no frontend.

- **Backend:** Node.js, TypeScript, Express, Prisma, PostgreSQL (hospedado no Neon)
- **Frontend:** React, TypeScript, Vite, CSS Modules
- **Autenticação:** ainda sem token (JWT) — login apenas confere credenciais e retorna o usuário. Sessão não persiste ao dar F5.

---

## Backend

### Estrutura de pastas

```
backend/
└── src/
    ├── config/
    │   └── prisma.ts
    ├── modules/
    │   ├── auth/
    │   │   ├── controllers/auth.controller.ts
    │   │   ├── services/auth.service.ts
    │   │   └── routes/auth.route.ts
    │   └── usuario/
    │       ├── controllers/usuario.controller.ts
    │       ├── services/usuario.service.ts
    │       ├── repositories/usuario.repository.ts
    │       └── routes/usuario.route.ts
    ├── utils/
    │   └── hash.ts
    ├── app.ts
    └── server.ts
```

Padrão adotado: um módulo por domínio, cada um com `controller` (recebe request/response), `service` (regra de negócio) e `repository` (acesso ao banco via Prisma).

### Rotas disponíveis

| Método | Rota                  | Descrição                     |
| ------ | --------------------- | ----------------------------- |
| POST   | `/auth/login`         | Login (email + senha)         |
| POST   | `/usuarios/cadastrar` | Criar usuário (email + senha) |
| GET    | `/usuarios/:id`       | Buscar usuário por id         |
| PUT    | `/usuarios/:id`       | Atualizar usuário             |
| DELETE | `/usuarios/:id`       | Deletar usuário               |

- Servidor roda na porta `3000`
- CORS habilitado (`app.use(cors())`)
- Banco: PostgreSQL via Prisma, hospedado no Neon

### Pendências / próximos passos do backend

- [ ] Autenticação por token (JWT)
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
    ├── services/
    │   ├── api.ts              # URL base da API
    │   ├── auth.service.ts     # login
    │   └── usuario.service.ts  # cadastrar
    ├── types/
    │   └── usuario.ts          # Usuario, LoginPayload, LoginResponse
    ├── App.tsx
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

Ainda sem `react-router-dom` — o `App.tsx` controla qual tela mostrar via `useState<"login" | "cadastro" | "home">`, e guarda o usuário logado em `useState<Usuario | null>`.

```
Login ⇄ Cadastro
  │
  ▼ (login com sucesso)
 Home (mostra email do usuário logado + botão Sair)
```

- `Login` → chama `login()` do `auth.service.ts` → em caso de sucesso, avisa o `App` via prop `onLoginSucesso`
- `Cadastro` → chama `cadastrar()` do `usuario.service.ts`
- `Home` → recebe `usuario` e `onSair` via props; ainda é uma página placeholder

### Funcionalidades prontas

- [x] Componentes base: `Input`, `Button`
- [x] Tela de Login (consumindo `/auth/login`)
- [x] Tela de Cadastro (consumindo `/usuarios/cadastrar`)
- [x] Tela Home básica pós-login
- [x] Navegação simples entre telas via estado no `App.tsx`

### Pendências / próximos passos do frontend

- [ ] React Router (substituir navegação por `useState`)
- [ ] Context API para usuário logado (substituir prop drilling do `App.tsx`)
- [ ] Persistência de sessão (token + localStorage) — depende do backend implementar JWT
- [ ] Telas dos módulos: financeiro, lista de mercado, tarefas domésticas

---

## Decisões e observações registradas

- Cadastro pede só `email` e `senha` (mesmo formato do login) — por isso reaproveita o tipo `LoginPayload`
- Sem CORS configurado inicialmente causou falha nas primeiras chamadas do front → resolvido com `cors()` no `app.ts`
