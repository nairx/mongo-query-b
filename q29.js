
https://www.mongodb.com/try/download/database-tools
set enviroment variables to bin folder

on command prompt
mongodump -d mydb-b -o d:\bck

mongosh
db.dropDatabase("mydb-b")

on command prompt
mongorestore -d mydb-b d:\bck\mydb-b

mongosh
use mydb-b 
show collections