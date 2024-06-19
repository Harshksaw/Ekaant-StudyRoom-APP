const pingProblemController = require('../src/controllers/problem.controller');
const NotFound = require('../src/errors/notfound.error');
const problemService = require('../src/services/problem.service')
const {StatusCodes} = require('http-status-codes')

jest.mock('../src/services/problem.service');

describe("tests", ()=>{
    beforeEach(()=>{
        req = {};
        res = {
            status: jest.fn(()=> res),
            json: jest.fn()
        }
        next = jest.fn();
    })
    test('should get all problem', async ()=>{

        const problems = [];
        problemService.prototype.getAllProblems.mockResolvedValue(problems);
    
        await pingProblemController.getProblems(req, res, next);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    
        expect(problemService.prototype.getAllProblems).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();
    
    })
    test('getProblem should call next with error if service throws error', async()=>{
        const mockError = new Error('id', 123)
        problemService.prototype.getProblem.mockResolvedValue(mockError)
        req.params = {id: 10}
        await prolemController.getProblem(req, res,next);

        expect(next).toHaveBeenCalledWith(mockError)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        
    })
})
