import boom from 'boom';
import Scolarship from '../models/Scolarship';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
const templateService = require('../services/templateService');
const embeddedSigningService = require('../services/embeddedSigning');
const envelopeArgs = {
	signerEmail: 'pragadhesh14@gmail.com',
	signerName: 'Pragadhesh G',
	signerClientId: 1000,
	ccEmail: 'pragadhesh14@gmail.com',
	ccName: 'Pragadhesh krishnan',
	templateId: 'fdc139f7-61f1-470d-9afe-fdf450614871'
};
let account_details = {
	basePath: 'https://demo.docusign.net/restapi',
	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwAAgo5ObmjaSAgAAMKxXLFo2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkEgABAAAACwAAAGludGVyYWN0aXZlMACAvsRMbmjaSDcAEnQ7QQ-c_EGpK_ZxInmykQ.fP1LhE6lhFOXCoJYrTa2O1LTd0yRJKz9WnedsLnIxELaX6JGDV3csyhV51liYdozPmp-E6ugN8GKPGBx7cYljyEKpL5arTNx0TQe5ujcqxN3EnGj6xJC2LFwDBIwBwPi_mCqCMieJycLZrh-TZTS8XI1MWeprOJ2HJz03zAm8Rn5Nhny4yHZeWe6zpN2dlMs4Rc74KMArBUhaF4cbHAPFjw-_hyP2gIEXbY6op6mgONJFK7AHbWLFYSS18JMDwdCv0-3dYS-aZs6UetAEcLu63PsAHUfPsj1bD3t7yQ1sInEIoE0vPi-DcOdzh_hq3eY3S786ixpfyeYmFzdGTfFNg',
	accountId: '16751715',
	templateId: 'fdc139f7-61f1-470d-9afe-fdf450614871',
	signerEmail: 'pragadhesh14@gmail.com',
	signerName: 'Pragadhesh G',
	ccEmail: 'pragadhesh14@gmail.com',
	ccName: 'Pragadhesh krishnan',
	dsReturnUrl: 'http://localhost:4200/scholarships',
	signerClientId: 1000,
	envelopeArgs: envelopeArgs
	// args.signerEmail
    // args.signerName
    // args.ccEmail
    // args.ccName
    // args.templateId
}



export const addScolarship = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		req.body.templateName = req.body.name;
		req.body.basePath = account_details.basePath;
		req.body.accessToken = account_details.accessToken;
		req.body.accountId = account_details.accountId;
		let results = await templateService.createTemplate(req.body);
		console.log(results)
		if (results.createdNewTemplate === true)
		{
		req.body.templateid = results.templateId;
		const scolarship = new Scolarship(req.body);
		return await scolarship.save();
		}
		else
		{
			throw "Error occured during scholarship creation"
		}
	} catch (err) {
		throw boom.boomify(err);
	}
};

export const applyScolarship = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		console.log("Entered apply scolarship controller")
		let results = await embeddedSigningService.sendEnvelopeForEmbeddedSigning(account_details)
		console.log(results)
	} catch (err) {
		throw boom.boomify(err);
	}
};






export const getScolarships = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document[]> => {
	try {
		const scolarships = await Scolarship.find();
		return scolarships;
	} catch (err) {
		throw boom.boomify(err);
	}
};

export const getSingleScolarship = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const id = req.params.id;
		const scolarship = await Scolarship.findById(id);
		return scolarship;
	} catch (err) {
		throw boom.boomify(err);
	}
};



export const updateScolarship = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const id = req.params.id;
		const scolarship = req.body;
		const { ...updateData } = scolarship;
		const update = await Scolarship.findByIdAndUpdate(id, updateData, { new: true });
		return update;
	} catch (err) {
		throw boom.boomify(err);
	}
};

export const deleteScolarship = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const id = req.params.id;
		const scolarship = await Scolarship.findByIdAndRemove(id);
		return scolarship;
	} catch (err) {
		throw boom.boomify(err);
	}
};