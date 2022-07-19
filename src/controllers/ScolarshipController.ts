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
	signerClientId: 1,
	ccEmail: 'pragadhesh14@gmail.com',
	ccName: 'Pragadhesh krishnan',
	templateId: 'a8d713eb-0fa6-464e-879c-cbee73083dd8'
};
let account_details = {
	basePath: 'https://demo.docusign.net/restapi',
	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCA0TM0XmnaSAgAgBFXQqFp2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkMACAYEk2XWnaSDcAEnQ7QQ-c_EGpK_ZxInmykQ.cbQGTCuX8p8Uum_YdpZ5QduiYEGZW84GSn0fNQioOztJjL2eie0fZyKlpOVZYzan4CB_X6kl36Sx8WldErYRTebwfh8GApIEycN4tbR3dhxtq2uvD8C19BRy3OguUOGfJtl8Mt3-XfrJ_3-MT0dCUZuckGxnAkCzrelzayVyjbkSJIqZEw2A6N542Fe7bq3W15DXaiTAVmMcDZekuvpIDPWrFjZvFbAF9-ctkvDRor_xCAyydQ6OdpBeZM9ysLfCgTBj9qDOi-FYCChD75CW_aw87u4vl2-R-gaHRnwNVljVQ7UX6hvJfYSxyJel6aJZ5UCgIKZ3BSus27cesbXlUQ',
	accountId: '16751715',
	//templateId: 'a8d713eb-0fa6-464e-879c-cbee73083dd8',
	//signerEmail: 'pragadhesh14@gmail.com',
	//signerName: 'Pragadhesh G',
	ccEmail: 'pragadhesh14@gmail.com',
	ccName: 'Pragadhesh Gopalakrishnan',
	dsReturnUrl: 'http://localhost:4200/',
	signerClientId: 1,
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
		//Input - name,signerEmail,signerName,templateId
		req.body.envelopeArgs = envelopeArgs;
		req.body.basePath = account_details.basePath;
		req.body.accessToken = account_details.accessToken;
		req.body.accountId = account_details.accountId;
		req.body.ccEmail = account_details.ccEmail;
		req.body.ccName = account_details.ccName;
		req.body.signerClientId = 1;

		let results = await embeddedSigningService.sendEnvelopeForEmbeddedSigning(req.body)
		return results
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