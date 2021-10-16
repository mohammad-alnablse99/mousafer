const assetsPath = require('./assetsPath');
const Exception = require('../errorHandlers/Exception');
const errors = require('../constants/errors');
const statusCodes = require('../constants/statusCodes');
var axios = require('axios');
var fs = require('fs');
var FormData = require('form-data');
const { removeBg } = require('configKeys');

module.exports = {
	uploadFileUrl: (file, type, policy = 'public') => {
		const fileName = file.originalname.split('.')[0] + Date.now();
		const name = assetsPath[policy] + assetsPath[type] + fileName;
		return { url: '.' + assetsPath['assets'] + name, name: name };
	},
	uploadFile: async (url, name) => {
		// SEND FILE TO CLOUDINARY
		const cloudinary = require('cloudinary').v2;
		cloudinary.config({
			cloud_name: 'dh5mgn3vy',
			api_key: '931631348435283',
			api_secret: 'TGTHih7qUGFobmfxE3qLbpMvCjA',
		});
		cloudinary.uploader.upload((path = url), { public_id: name.substring(1) }, function (err, image) {
			if (err) throw new Exception(errors.Mongoose_OBJECT_ID);
			console.log('file uploaded to Cloudinary');
			var fs = require('fs');
			fs.unlinkSync(url);
		});
	},
	deleteFile: (url) => {
		const cloudinary = require('cloudinary').v2;
		cloudinary.config({
			cloud_name: 'dh5mgn3vy',
			api_key: '931631348435283',
			api_secret: 'TGTHih7qUGFobmfxE3qLbpMvCjA',
		});
		let name = url.split('/dh5mgn3vy/image/upload/w_600/')[1];
		if (name) {
			console.log(name);
			cloudinary.uploader.destroy(name, function (error, result) {
				if (error) throw new Exception(errors.Mongoose_OBJECT_ID);
			});
		}
	},
	cutImageEdges: async (imageFile, url) => {
		// var bodyFormData = new FormData();
		// bodyFormData.append('image_file', imageFile);
		// bodyFormData.append('size', 'auto');
		// console.log(bodyFormData);
		// await axios({
		// 	method: 'post',
		// 	url: 'https://api.remove.bg/v1.0/removebg',
		// 	formData: bodyFormData,
		// 	headers: { 'X-Api-Key': removeBg },
		// 	encoding: null,
		// })
		// 	.then((res) => {
		// 		console.log(res);
		// 		console.log(`statusCode: ${res.statusCode}`);
		// 		fs.writeFileSync(url, res.body);
		// 	})
		// 	.catch((error) => {
		// 		//console.error(error);
		// 		throw new Exception({
		// 			httpStatus: statusCodes.VALIDATION_ERROR.code,
		// 			responseStatus: statusCodes.VALIDATION_ERROR.status,
		// 			error: 'Internal Server Error',
		// 		});
		// 	});
		var request = require('request');
		var fs = require('fs');
		request.post(
			{
				url: 'https://api.remove.bg/v1.0/removebg',
				formData: {
					image_file: fs.createReadStream('C:/Users/MHD/Desktop/ss.jpg'),
					size: 'auto',
				},
				headers: {
					'X-Api-Key': removeBg,
				},
				encoding: null,
			},
			function (error, response, body) {
				if (error) return console.error('Request failed:', error);
				if (response.statusCode != 200)
					return console.error('Error:', response.statusCode, body.toString('utf8'));
				fs.writeFileSync(url, body);
			}
		);
	},
};
