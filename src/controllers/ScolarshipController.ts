import boom from 'boom';
import Scolarship from '../models/Scolarship';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
const templateService = require('../services/templateService');
const embeddedSigningService = require('../services/embeddedSigning');
const envelopeArgs = {
	signerClientId: 2,
	ccEmail: 'pragadhesh14@gmail.com',
	ccName: 'Pragadhesh krishnan',
};
let account_details = {
	basePath: 'https://demo.docusign.net/restapi',
	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwCAWIw5uGvaSAgAgJivR_tr2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkEgABAAAACwAAAGludGVyYWN0aXZlMAAAlcI3uGvaSDcAEnQ7QQ-c_EGpK_ZxInmykQ.LiLr0sTP0km-Lys96pYQxvbYGBEdfiv8aV5_fgMJgPMyWlQJPsqwDrKg9JiP7MYZejgJBEEtXZo3QyhbXrmeBFHw0xASPuRpuv3To4PvK9863HeiFOYveQ9PembGagtt79MFmCpdj8LAqrsYriqoccWL8t1fqCNpf9NeFXiiUyohSLhd8tmQ2niZ5xv755pPNGVVZEW74-H-l9uxx-1Q8i7GQRdRDHXLlJ3TJGhHxkx0p61k5tkNvG_XX5gvY0Smrqfqx9fXf4_Uyw8KAGorQyYq9l_seTXJ9YI2NrjRbuBq1xc25oyqd1rXkY5YxLvvhdxIWzNItYRyNS8XgUMY9A',
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

export const getconsent = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<object> => {
	try {
		let consent_url = "https://demo.docusign.net/clickapi/v1/accounts/8f3374ab-f1e6-4eaa-8e2a-43a46f9d4b3e/clickwraps/987bf924-c519-4bf8-a58b-927bc0808c2a/view?client_user_id="+account_details.signerClientId+"&return_url="+"http://localhost:4200/scholarships?templateid="+req.body.templateid;
		return Promise.resolve({consent_url: consent_url});
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