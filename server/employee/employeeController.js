const jwt = require('jwt-simple');
const employeeModel = require('./employeeModel.js');
const mongoose = require ('mongoose');
const helper = require('../config/helper.js')


module.exports = {
	addEmp:(req, res)=>{
		let employeeData  = req.body.employee;
		employeeModel.findOne({userName : employeeData.userName}, (err, employeeEX)=> {
			if (employeeEX) {
				res.json({isemployeeExist : true })
			}else {
				employeeModel.create(employeeData, (err, data)=> {
					if (err) {
						res.status(500).send(err);
					}else{
						res.json(data);
					}
				});
			}
		})
	},

	signin : (req, res) => {
		let employeeData = req.body.employee
		employeeModel.findOne({username : employeeData.userName}, (err, user)=> {
			if (!user) {
				res.json({isUser : false});
			}else{
				if(user.password === req.body.password){
					var token = jwt.encode(user, 'secret');
					res.setHeader('x-access-token',token);
					res.json({token: token, id : user._id, userName : user.firstName + " " + user.lastName});
				}else{
					res.json({isValidPass : false});
				}
			}
		})
	}
}
