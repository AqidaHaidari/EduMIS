const express=require('express');
const router=express();
const Controller=require('../controllers/studentRegistration');

router.get('/studentRegistration',Controller.studentRegistration);
router.post('/studentRegistration',Controller.postStudent);
router.get('/applicants',Controller.applicants);
router.get('/registred',Controller.registred);
router.get('/passed/:studentId',Controller.passed);
router.get('/result',Controller.result);
router.post('/generateCard',Controller.generateCard);
router.get('/generateCard',Controller.generateCard);
router.post('/postCard',Controller.postCard);
router.post('/scores',Controller.postScore);
// router.get('/scores',Controller.postScore);
router.post('/NativeScore',Controller.postNativeScore)
router.post('/applicants',Controller.examResult)

router.get('/allStudent',Controller.allStudent);
router.get('/deleted',Controller.deletedStudent);
router.get('/onlineRegistration',Controller.onlineRgistration);
router.get('/editOnlineRgistration',Controller.editOnlineRgistration);
router.post('/editOnlineRgistration',Controller.postEditOnlineRgistration);
router.post('/detail',Controller.getDetail);
router.get('/detail',Controller.getDetail);
router.post('/updateDetail',Controller.postDetail);
router.get('/deleteStudent/:studentId',Controller.deleteStudent);
router.get('/undo/:studentId',Controller.undo);
router.get('/graph',Controller.graph);
//delete From Db...
router.post('/deleteFromDb',Controller.deleteFromDb)

//search....
router.post('/searchByStudentId',Controller.searchByStudentId)
router.post('/DepartamentList',Controller.DepartementListStudent);
router.post('/searchByDepartment',Controller.searchByDepartment)

//attendence............
router.post('/attendance',Controller.postAttendance);
router.get('/attendance',Controller.getAttendance);
// router.post('/attendance',Controller.postAttendance);
router.get('/generateAttendance',Controller.getgenerate_Attendance);

//register to class..........
router.get("/registerToClass",Controller.registerToClass);
router.post("/postToNewClass",Controller.postToNewClass)
//...........
router.post("/searchDepartment",Controller.searchDepartment);

module.exports=router;