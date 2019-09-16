## Overall Google Cloud Platfrom setup
1. Navigate to Google Cloud Platfrom

2. Create a project

3. Under API & Services, Click Credentials to create a GoogleApiKey for your project

4. Click Library under API & Services

5. In the library, enable "Place API", "Maps JavaScript API", "Directions API", "Cloud Vision API"

6. Follow instruction of the following Server Setup section

## Server Setup 

1. Run `npm install` from command line of final-server directory to install dependencies.

2. Run `psql` to enter postgreSQL from command line 

3. Run command `CREATE USER final WITH PASSWORD 'final';` to create user

4. Run command `CREATE DATABASE final_project WITH OWNER = final;` to create database 'finalProject' with user 'final'

5. Create .env file under final-server directory

6. Add 
  `DB_HOST=localhost
    DB_USER=final
    DB_PASS=final
    DB_NAME=final_project
    DB_PORT=5432
    PORT=8080
    GoogleAPIKey=[enter you key here]`
  into .env file

7. Run `\q` to exit command line postgreSQL


8. To re-enter datbase from command line postgreSQL RUN `psql final_project final` then enter passoword: final

9. Run `npm start` to start server
