const path = require('path');
const bodyParser = require('body-parser');

const ReportModel = require('../models/progress.model').ReportModel;

const uploadReport = (req,res) =>{
    //console.log('report uploaded');
    if(req.body.studentId && req.body.marks) {
        const schoolId = req.body.schoolId;
        const teacherId = req.body.teacherId;
        const studentId = req.body.studentId;
        const section = req.body.section;
        const marks = req.body.marks;
        
        //case for an existing progress report
        ReportModel.find({studentId},(err,reports) =>{
            if(err) throw err;
            //filtering the valid progress report
            let validReport = reports.filter(tempReport => {
                return tempReport.valid === true;
            });
            //if a valid report exists, update operation is proceeded
            if(validReport.length){
                let report = validReport[0];
                //the type of test (internals,sem exams etc) that is being submitted
                const testType = Object.keys(marks)[0];
                
                switch(testType) {
                    case 'Internals':
                        //Immutability check for the report
                        if(report.internals.length){
                            res.status(400).send('Progress report for this test already exists');
                        } else {
                            report.internals = marks[testType];
                        };
                        break;
                    case 'Projects':
                        //Immutability check for the report
                        if(report.projects.length){
                            res.status(400).send('Progress report for this test already exists');
                        } else {
                            report.projects = marks[testType];
                        };
                        break;
                    case 'Term exams':
                        //Immutability check for the report
                        if(report.termExams.length){
                            res.status(400).send('Progress report for this test already exists');
                        } else {
                            report.termExams = marks[testType];
                        };
                        break;
                    case 'Semester exams':
                        //Immutability check for the report
                        if(report.semExams.length){
                            res.status(400).send('Progress report for this test already exists');
                        } else {
                            report.semExams = marks[testType];
                        };
                        break;
                    case 'Practicals':
                        //Immutability check for the report
                        if(report.practicals.length){
                            res.status(400).send('Progress report for this test already exists');
                        } else {
                            report.practicals = marks[testType];
                        };
                }
                
                report.save();
                res.status(202).send("Progress report updated");
            }else {
                //The case for a new report has to be created
                let report = {};
                for(let testType in marks) {
                    console.log(testType);
                    switch(testType) {
                        case 'Internals':
                            const internals = marks[testType];
                            report = {
                                schoolId,
                                teacherId,
                                studentId,
                                section,
                                internals,
                            }
                            break;
                        case 'Projects':
                            const projects = marks[testType];
                            report = {
                                schoolId,
                                teacherId,
                                studentId,
                                section,
                                projects
                            }
                            break;
                        case 'Term exams':
                            const termExams = marks[testType];
                            report = {
                                schoolId,
                                teacherId,
                                studentId,
                                section,
                                termExams
                            }
                            break;
                        case 'Semester exams':
                            const semExams = marks[testType];
                            report = {
                                schoolId,
                                teacherId,
                                studentId,
                                section,
                                semExams
                            }
                            break;
                        case 'Practicals':
                            const practicals = marks[testType];
                            report = {
                                schoolId,
                                teacherId,
                                studentId,
                                section,
                                practicals
                            }
                    }
                }

                ReportModel.create(report,(err,reports) =>{
                    if(err) throw err;
                    console.log(reports);
                    res.status(201).send('Report uploaded!')
                });

            }
        });
    }
}

const getReport = (req,res) =>{
    //const studentId = req.params.studentId;
    const query = {
        studentId: req.params.studentId,
        valid: true
    };
    ReportModel.find(query,(err,reportArray) =>{
        if(err) throw err;
        //console.log(report);
        res.json(reportArray[0]);
    })
}

const discardReport = (req,res) =>{
    const query = {
        studentId: req.params.studentId,
        valid: true
    };

    ReportModel.find(query,(err,reportArray) =>{
        if(err) throw err;
        let report = reportArray[0];
        //discarding a report by validity boolean, but still keeping the discarded report
        report.valid = false;
        report.save();
        res.status(202).send('Report deleted');
    })
}
module.exports = {uploadReport, getReport, discardReport};