const { CREATED, OK } = require('../core/success.response');

const SubjectService = require('../services/subjects.service');

class SubjectController {
    static createSubject = async (req, res, next) => {
       new CREATED({
            message: 'Student created successfully!',
            metadata: await SubjectService.addSubject(req.body),
       }).sendData(res);
    }
}

module.exports = SubjectController;