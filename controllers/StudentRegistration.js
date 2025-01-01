const Student=require('../Models/StudentRegistration')
const text=require('../Models/text');
const department=require('../Models/department');
const newClass=require('../Models/class');

exports.studentRegistration=(req,res)=>{
    department.find()
    .then(dp=>{
        res.render('./StudentRegistration.ejs',{
            title:"Add New Student",
            subTitle:"This is the best app ever!",
            dp:dp
        })
    })
   
}

exports.postStudent=(req,res)=>{
    const name=req.body.name;
    const lname=req.body.lname;
    const fname=req.body.fname;
    const email=req.body.email;
    const phone=req.body.phone;
    const nationalId=req.body.nationalId;
    const address=req.body.address;
    const dateOfBirth=req.body.dateOfBirth;
    const c=req.body.class;
    const major=req.body.major;
    const image=req.file;
    const imageUrl=(image==null?'null':image.path);
    const other=req.body.other;
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' +dd ;
    const dateOfRegistration= today;
    var firstLatter;
    department.find({_id:c})
    .then((department)=>{
        firstLatter=department[0].depname.slice(0,1);
        return firstLatter
    })
    .then((firstLatter)=>{
        const student=
        new Student({name:name,lname:lname,fname:fname,email:email,phone:phone,nationalId:nationalId,address:address,dateOfBirth:dateOfBirth,photo:imageUrl,classId:c,major:major,other:other,dateOfRegistration:dateOfRegistration,score:null,status:"Pinding",dateOfExpire:null,dateOfIssue:null,nativeScore:null,
        deleted:0,result:null,description:null,registerToClass:null,studentDp:firstLatter ,studentYear:yyyy,cardNumber:0,studentId:null});
        student.save()
        .then(result=>{
            res.redirect('./applicants')
        })
        .catch(err=>console.log(err))
    })
 
}
exports.applicants=(req,res)=>{
  
    Student.find().sort({_id:-1}).populate('classId')
    .then(students=>{
    res.render('./applicants.ejs',{
        students:students,
        title:"result"
    }
    )
    })
    .catch(err=>console.log(err))
}

exports.registred=(req,res)=>{
    Student.find()
    .then((student)=>{
        res.render('./registred.ejs',{
            title:"All Students",
            students:student
        })
    })
    .catch(err=>console.log(err))
}
exports.generateCard=(req,res)=>{
    const id=req.body.myInput;
    var studentId;
    var date;
    var count=1;

    // let StudentPurpose;
    Student.findById(id)
    .then((student)=>{
        const studentYear = student.studentYear;
        const studentDp = student.studentDp;

        Student.find({$and: 
            [
                {studentYear: student.studentYear}, 
                {studentDp: student.studentDp}
            ]}).sort({"cardNumber": -1}).limit(1)
            .then(studentDoc => {
                const cardNumber = ++studentDoc[0].cardNumber
                return cardNumber;
            })
            .then(idNumber => {
                Student.findById(id)
                .then(S=>{
                    S.studentId=studentDp+"_"+studentYear+"_"+idNumber
                    S.cardNumber=idNumber;
                    S.save();
                    res.render('./generateCard.ejs',{
                            title:"Generate Card",
                            student:S,
                            studentId:studentId
                        })
                })
            })

        })
        .then()
        .catch(err=>console.log(err))
        // date=student.dateOfRegistration.slice(0,4); 


        // if(student.classId.depname=="Full Stack"){
        //     studentId="F"
            
           
        // }
        // else if(student.classId.depname=="Graphic"){
        //     studentId="G"
        // }
        // else if(student.classId.depname=="Unity"){
        //     studentId="U"
        // }
        // else{
        //     studentId="M"
        // }
        // student.studentId=studentId+"_"+date+"_"+count;
        // student.save()
        // res.render('./generateCard.ejs',{
        //     title:"Generate Card",
        //     student:student,
        //     studentId:studentId
        // })
 
}


exports.postScore=(req,res,next)=>{
    const id = req.body.id;
    const score= req.body.score;
    const nativeScore=req.body.nativeScore;

    Student.findById(id)
    .then(student => {
      student.score = score;
      student.save()
    })
    .then(result => {
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
    }


  exports.examResult=(req,res)=>{
    const id = req.body.id;
    const result=req.body.result;
   
    Student.findById(id)
    .then(student => {
      student.result = result;
      student.save()
    })
    .then(result => {
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
    }

    exports.result=(req,res)=>{
        Student.find().sort({_id:-1}).populate('classId')
        .then(students=>{
        res.render('./result.ejs',{
            students:students,
            title:"Result"
        })
        })
        .catch(err=>console.log(err))
    }

exports.postNativeScore=(req,res,next)=>{
    const nativeScore=req.body.nativeScore;
   
    
    Student.find()
    .then(student => {
        for(var i=0; i<=student.length;i++){
      student[i].nativeScore = nativeScore;
      student[i].save()
    }
    })
    .then(result => {
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
exports.postCard=(req,res)=>{
    const dateOfExpire=req.body.dateOfExpire;
    const dateOfIssue=req.body.dateOfIssue;

    const id=req.body.ID;
    Student.findById(id)
    .then((student)=>{
        student.dateOfExpire=dateOfExpire;
        student.dateOfIssue=dateOfIssue;
        student.status="Present"
        student.save();
    })
    .then(()=>{
        res.redirect('./result');
    })
    .catch(err=>console.log(err));

}




exports.allStudent = (req, res) => {
  department
    .find ()
    .then (dp => {
      // 'dp' represents the list of departments
      Student.find ()
        .then (students => {
          // 'students' represents the list of students
          // Render the EJS template and pass the data
          res.render ('./AllStudent.ejs', {
            title: 'All Students',
            students: students,
            dp: dp, // Pass 'dp' to the template
          });
        })
        .catch (err => {
          console.error ('Error fetching students:', err);
            res.status(500).send('Internal Server Error');
            
        });
    })
    .catch (err => {
      console.error ('Error fetching departments:', err);
      res.status (500).send ('Internal Server Error');
    });
};

exports.deletedStudent=(req,res)=>{
    Student.find()
    .then((student)=>{
        res.render('./deleted.ejs',{
            title:"Deleted Students",
            students:student
        })
    })
    .catch(err=>console.log(err))
}
exports.onlineRgistration=(req,res)=>{
    text.find()
    .then((para)=>{
        res.render('./onlineRegistration.ejs',{
            title:"fffffffffff",
            para:para
        }); 
    })  
}

exports.editOnlineRgistration=(req,res)=>{
    text.find()
    .then((caption)=>{
        res.render('./editInformation.ejs',{
            title:"Edit Information",
            caption:caption
        })
    })  
}
exports.postEditOnlineRgistration=(req,res)=>{
    const title=req.body.title;
    const information=req.body.information;
    text.find()
    .then((caption)=>{
        caption[0].title=title;
        caption[0].information=information;
        caption[0].save();
    })
    .then(()=>{
        res.redirect('./onlineRegistration')
    })
    .catch(err=>console.log(err))
}

exports.getDetail=(req,res)=>{
    const studentId=req.body.studentId;
    let dep;
    department.find()
    .then((dp)=>{
        dep=dp
    })
    Student.findById(studentId).populate('classId')
    .then((student)=>{
        res.render('./detail.ejs',{
            title:'Student Details',
            student:student,
            dp:dep
        });
    })
    .catch(err=>console.log(err))
   
} 
exports.postDetail=(req,res)=>{
    let dep;
    department.find()
    .then((dp)=>{
        dep=dp
    })
    const name=req.body.name;
    const lname=req.body.lname;
    const fname=req.body.fname;
    const email=req.body.email;
    const phone=req.body.phone;
    const nationalId=req.body.nationalId;
    const address=req.body.address;
    const dateOfBirth=req.body.dateOfBirth;
    const dateOfRegistration=req.body.dateOfRegistration;  
    const image=req.file;
    const c=req.body.class;
    const major=req.body.major;
    const imageUrl=(image==null?'':image.path);
    const status=req.body.status;
    const cardId=req.body.cardId;
    const description=req.body.description;
    let studentId=req.body.studentId;
    Student.findById(studentId).populate('classId')
    .then(student=>{
        student.name=name;
        student.lname=lname;
        student.fname=fname;
        student.major=major;
        student.classId=c;
        student.email=email;
        student.phone=phone
        student.dateOfBirth=dateOfBirth;
        student.dateOfRegistration=dateOfRegistration;
        student.nationalId=nationalId;
        student.address=address;
        student.studentId=cardId;
        student.status=status;
        student.description=description;
        student.photo=(imageUrl==''?student.photo:imageUrl);
        student.save();
        return student;
    })
     .then(()=>{
        Student.findById(studentId).populate('classId')
        .then((student)=>{
            res.render('./detail.ejs',{
                title:'Student Details',
                student:student,
                dp:dep
            });
        })
       
    })
    .catch(err=>console.log(err))
}

exports.deleteStudent=(req,res,next)=>{
    const studentId=req.params.studentId
    Student.findById(studentId)
    .then((student)=>{
        student.deleted=1;
       student.save()
       .then(()=>{
            res.redirect('/allStudent')
       
           })
    })
    
}


exports.undo=(req,res,next)=>{
    const studentId=req.params.studentId
    Student.findById(studentId)
    .then((student)=>{
        student.deleted=0;
      return  student.save()
        .then(result=>{
         res.redirect('/deleted')
       
           })
    })
    .catch(err=>console.log(err))
}

exports.passed=(req,res)=>{
    const studentId=req.params.studentId
    Student.findById(studentId)
    .then((student)=>{
        student.result="Passed";
        return student.save()
        .then(result=>{
            res.redirect('/registred')
        })
    })
}

exports.graph=(req,res)=>{
    res.render('./graph.ejs',{
        title:"graph"
    })
}
//deleteFromDb...
exports.deleteFromDb=(req,res)=>{
    const id=req.body.studentId;
    Student.findByIdAndRemove(id)
    .then(result=>{
        res.redirect('/deleted')
    })
    .catch(err=>console.log(err))
}


//search by student StudentId,name,last name....
exports.searchByStudentId = (req, res) => {
  const start = req.body.start;

  // Fetch department data first
  department
    .find ()
    .then (dp => {
      // Then search for students
      return Student.find ({
        $or: [{studentId: start}, {name: start}, {lname: start}],
      }).then (students => {
        // Render the page with students and department data
        res.render ('./AllStudent', {
          students: students,
          dp: dp,
          title: 'All Students',
          message: students.length ? null : 'No results found.', // Pass a message if no students found
        });
      });
    })
    .catch (err => {
      console.error ('Error occurred:', err);
      res.status (500).send ('An error occurred while searching for students.');
    });
};


//search by status............

exports.DepartementListStudent=(req,res)=>{
    const selectValue=req.body.mySelect;
    Student.find({status:selectValue})
    .then(student=>{
        res.render('./AllStudent.ejs',{
            students:student,
            title:"All Student"
        })
    })
}


//search by department............
exports.searchByDepartment=(req,res)=>{
   const valueSelect=req.body.valueSelect;
   department.find()
   .then((dp)=>{
    Student.find({classId:valueSelect})
    .then((student)=>{
      res.render('./AllStudent',{
         students:student,
         dp:dp,
         title:"All Student"
     })
    })
   })
 
}


//attendnce.................................


exports.postAttendance=(req,res,next)=>{
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' +dd ;
   
        // {$and: [{depname:depname}, {year:year}, {satus: "present"}]}
        
    // Student.find().populate({studentId})
    const selectValue=req.body.selectValue;
    console.log(selectValue)
    Student.find({registerToClass:selectValue})
    .then(students=>{
        res.render('./attendance.ejs',{
            title:"Attendance",
            today:today,
            students:students          
        })
    })   
    .catch(err=> console.log(err))
}


exports.getgenerate_Attendance=(req,res)=>{
    newClass.find()
    .then(newClass=>{
        res.render('./GenerateAttendance.ejs',{
            title:"Attendance",
            newClass:newClass,
        })
    })
}

exports.getAttendance=(req,res)=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' +dd ;
   
        // {$and: [{depname:depname}, {year:year}, {satus: "present"}]}
        
    // Student.find().populate({studentId})
    
    Student.find().sort({_id:-1})
    .then(students=>{
        res.render('./attendance.ejs',{
            title:"Attendance",
            today:today,
            students:students          
        })
    })   
    .catch(err=> console.log(err))
}

exports.registerToClass=(req,res)=>{
    Student.find()
    .then((student)=>{
        newClass.find()
        .then((newClass)=>{
            department.find()
            .then(dp=>{
                res.render('./registerToClass.ejs',{
                    title:"Register To Class",
                    students:student,
                    newClass:newClass,
                    dp:dp
                })
            })
            
        })
        
    })
    .catch(err=>console.log(err))
}


exports.postToNewClass=(req,res,next)=>{
    const belongsToClass=req.body.belongsToClass;
    const id=req.body.id;
    
    Student.findById(id)
    .then(student => {
        student.registerToClass=belongsToClass;
        student.save();
        
    })
    .then(result => {
      res.status(201).json({
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.searchDepartment=(req,res)=>{
    const option=req.body.option;
    Student.find({classId:option})
    .then((student)=>{
        newClass.find()
        .then((newClass)=>{
            department.find()
            .then(dp=>{
                res.render('./registerToClass.ejs',{
                    title:"Register To Class",
                    students:student,
                    newClass:newClass,
                    dp:dp
                })
            })
            
        })
        
    })
}