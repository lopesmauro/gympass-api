# App

GymPass API é uma plataforma backend robusta e segura para gerenciamento de academias, usuários e check-ins.
Ela oferece funcionalidades para cadastro, autenticação, controle de acesso por níveis de usuário (administradores e usuários comuns), gerenciamento de check-ins, busca por academias próximas e muito mais.

Desenvolvida utilizando TypeScript, Fastify, Prisma e PostgreSQL, Docker a GymPass API foi criada para ser escalável, segura e de fácil manutenção, atendendo requisitos funcionais e regras de negócio específicas para o controle de acesso e operações de check-in.

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [x] Deve ser possivel o usuario buscar academias proximas;
- [x] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizer check-in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [x] Primeiro usuário cadastrado no sistema será automaticamente promovido a administrador;
- [x] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuario nao pode fazer dois check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-ins se nao estiver perto(100m) da academia;
- [x] O check-in so pode ser validado ate 20 minutos apos criado;
- [x] O check-in so pode ser validado por adminstradores;
- [x] A academia so pode ser cadastrada por adminstradores;

## RNFs (Requisitos nao funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
- [x] Todas listas de dados precisam estar paginas com 20 itens por paginas;
- [x] O usuario deve ser identificado po um JWT (Json web token);

## Rotas principais

- `POST /users` - cadastra usuario;
- `POST /users/login` - autentica usuario;
- `GET /users/checkins?page=1` - lista historico de check-ins do usuario logado;
- `GET /users/checkins/count` - retorna total de check-ins do usuario logado;
- `POST /gym` - cadastra academia, apenas admin;
- `GET /gyms/search?query=nome&page=1` - busca academias por nome;
- `GET /gyms/nearby?latitude=-3.1&longitude=-60.0&page=1` - busca academias proximas em ate 10km;
- `POST /gyms/:gymId/check-ins` - realiza check-in em uma academia;
- `PATCH /check-ins/:checkInId/validate` - valida check-in, apenas admin.
