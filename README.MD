# Rodar o Postgres via Docker enquanto estiver em producao, dados persistentes.

### Executar no cmd
docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -d postgres


### Colocar no server/.env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/postgres"


### Credenciais para dbeaver
host: localhost
user: postgres
password: 1234
database: postgres