db.students.insertOne({
  studentName: "John",
});
db.subjects.insertOne({
  subjectName: "Maths",
});
db.marks.insertOne({
  studentId: ObjectId("6808aac0d886234227cef652"),
  subjectId: ObjectId("6808aacbd886234227cef653"),
  score: 95,
});
//display studentName,subjectName,score

db.marks.aggregate([
  {
    $lookup: {
      from: "subjects",
      localField: "subjectId",
      foreignField: "_id",
      as: "subjects",
    },
  },
  {$unwind:"$subjects"},
  {
    $lookup: {
      from: "students",
      localField: "studentId",
      foreignField: "_id",
      as: "students",
    },
  },
  {$unwind:"$students"},
  {$project:{_id:0,"students.studentName":1,"subjects.subjectName":1,score:1}}
]);
