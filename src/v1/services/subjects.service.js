const SubjectsModel = require('../models/subject.model');

class SubjectsService {
    static addSubject = async (data) => {
        return await SubjectsModel.create(data);
    };
}

module.exports = SubjectsService;