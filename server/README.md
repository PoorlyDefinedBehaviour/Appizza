# How to run it

> Using docker compose

```sh
cd server
sudo docker-compose up
```

> Using only docker

```sh
sudo docker run --name appizzas_mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql

cd server
yarn start
```

> Without docker

Just make sure mysql is running on port 3306 and the root password is 'password'

```sh
cd server
yarn start
```
