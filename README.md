Após clonar:

Rode o "yarn" para instalar as dependências.

Verifique se possui alguma aplicação rodando na porta 5432.
sudo lsof -i:5432

Caso sim, finalize a aplicação que estiver rodando.
sudo kill PID_DA_APLICACAO

Para iniciar conexão, rode o seguinte comando:
docker-compose up

Para iniciar a aplicação, rode o seguinte comando em um novo terminal:
yarn dev
