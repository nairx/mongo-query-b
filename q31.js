Sharding
create a folder sharding-example then create following folders inside
conf
rconf
s1
s1r
s2
s2r

##
mongod --configsvr --port 27018 --replSet rs1 --dbpath d:\dbshards\conf
##
mongod --configsvr --port 27019 --replSet rs1 --dbpath d:\dbshards\rconf
##
mongosh -port 27018

rs.initiate({_id:'rs1',members:[{_id:0,host:'localhost:27018'},{_id:1,host:'localhost:27019'}]})

##

mongod --shardsvr --port 27020 --replSet rs2 --dbpath d:\dbshards\s1
##
mongod --shardsvr --port 27021 --replSet rs2 --dbpath d:\dbshards\s1r
##
mongosh -port 27020
rs.initiate({_id:'rs2',members:[{_id:0,host:'localhost:27020'},{_id:1,host:'localhost:27021'}]})

##
mongod --shardsvr --port 27022 --replSet rs3 --dbpath d:\dbshards\s2
##
mongod --shardsvr --port 27023 --replSet rs3 --dbpath d:\dbshards\s2r
##
mongosh -port 27022
rs.initiate({_id:'rs3',members:[{_id:0,host:'localhost:27022'},{_id:1,host:'localhost:27023'}]})
##
mongos  --configdb rs1/localhost:27018,localhost:27019 --port 27050
##
mongosh --port 27050
sh.addShard("rs2/localhost:27020,localhost:27021")
sh.addShard("rs3/localhost:27022,localhost:27023")
sh.status()


use xyz

sh.enableSharding("xyz")
sh.shardCollection("xyz.customers", { name: 1 })

sh.status()

sh.moveChunk("xyz.customers",{_id:MinKey()},"rs2")

sh.getShardedDataDistribution()
