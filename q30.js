Create a folder replica-example

Inside replica-example, create 3 folders - data1, data2 and data3

start mongod -replSet rs1 -logpath d:\replica-example\data1\1.log --dbpath d:\replica-example\data1\ --port 27018

start mongod -replSet rs1 -logpath d:\replica-example\data2\2.log --dbpath d:\replica-example\data2\ --port 27019

start mongod -replSet rs1 -logpath d:\replica-example\data3\3.log --dbpath d:\replica-example\data3\ --port 27020