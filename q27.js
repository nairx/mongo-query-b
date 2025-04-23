db.posts.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "userId",
      as: "posts",
    },
  },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "userId",
      as: "posts",
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      "posts.title": 1,
      "posts.desc": 1,
    },
  },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "userId",
      as: "posts",
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      "posts.title": 1,
      "posts.desc": 1,
    },
  },
  { $match: { "posts.title": "title 1" } },
]);

db.users.aggregate([
  {
    $lookup: {
      from: "posts",
      let: { uid: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: [ "$userId","$$uid" ] } } },
        {$match:{title:"title 1"}}
      ],
      as: "posts",
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      "posts.title": 1,
      "posts.desc": 1,
    },
  },
  {$unwind:"$posts"}
]);
