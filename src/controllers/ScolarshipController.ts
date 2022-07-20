import boom from 'boom';
import Scolarship from '../models/Scolarship';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
const templateService = require('../services/templateService');
const embeddedSigningService = require('../services/embeddedSigning');
const envelopeArgs = {
	signerClientId: 1,
	ccEmail: 'pragadhesh14@gmail.com',
	ccName: 'Pragadhesh krishnan',
};
let account_details = {
	basePath: 'https://demo.docusign.net/restapi',
	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCASCx2LmraSAgAgIhPhHFq2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkMACApOTaKGraSDcAEnQ7QQ-c_EGpK_ZxInmykQ.AUtFkOnzDnXLMVIJIEB6uT82zQ7tHZjy3yPkFC6GLG8ShPrTi4cZXqiv6C1LVgDhfo4soNq7hUjAFi4PdM-LxhZLyj3I3Pyr65P_Z2p_0ThmHsBIAZ5GUMCugwXJr3gnRWakX8nQ7GOflozexmndajqHIw081NOSf3m6SNEOqtjlpH11mHzegS8deNfH3m_UyD572Y2bO6ZJYbHl-qHdu53pSJ66QJp8oOiinBNq8Ln2BY3sTckkSSn2KFT7kml71REGyMr40if1joLyysU70LHuOxicB9K_Z0RaJtWLlvexNVFwxbCvA0lAilDrAVPEhy8tE0mtGy8mkkyutO0slw',
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
		req.body.envelopeArgs.templateId = req.body.templateId;
		req.body.envelopeArgs.signerName = req.body.signerName;
		req.body.envelopeArgs.signerName = req.body.signerName;
		req.body.envelopeArgs.signerEmail = req.body.signerEmail;
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