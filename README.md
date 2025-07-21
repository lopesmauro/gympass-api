# App

GymPass API é uma plataforma backend robusta e segura para gerenciamento de academias, usuários e check-ins.
Ela oferece funcionalidades para cadastro, autenticação, controle de acesso por níveis de usuário (administradores e usuários comuns), gerenciamento de check-ins, busca por academias próximas e muito mais.

Desenvolvida com TypeScript, Fastify, Prisma e PostgreSQL, a GymPass API foi criada para ser escalável, segura e de fácil manutenção, atendendo requisitos funcionais e regras de negócio específicas para o controle de acesso e operações de check-in.

## RFs (Requisitos funcionais)

- [ x ] Deve ser possivel se cadastrar;
- [ x ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario realizer check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [ x ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [ x ] Primeiro usuário cadastrado no sistema será automaticamente promovido a administrador;
- [ x ] O usuario nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuario nao pode fazer dois check-ins no mesmo dia;
- [ ] O usuario nao pode fazer check-ins se nao estiver perto(100m) da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por adminstradores;
- [ x ] A academia so pode ser cadastrada por adminstradores;

## RNFs (Requisitos nao funcionais)

- [ x ] A senha do usuario precisa estar criptografada;
- [ x ] Os dados da aplicacao precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginas com 20 itens por paginas;
- [ x ] O usuario deve ser identificado po um JWT (Json web token);
