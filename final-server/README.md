## Database Setup 

1. From command line run `psql` to enter postgreSQL

2. Run command `CREATE USER final WITH PASSWORD 'final';` to create user

3. Run command `CREATE DATABASE final_project WITH OWNER = final;` to create database 'finalProject' with user 'final'

4. Run `\q` to exit command line postgreSQL

5. To re-enter datbase from command line postgreSQL RUN `psql final_project final` then enter passoword: final

5. Add `DB_HOST=localhost
        DB_USER=final
        DB_PASS=final
        DB_NAME=final_project
        DB_PORT=5432
        PORT=8080`
   into .env under root directory
