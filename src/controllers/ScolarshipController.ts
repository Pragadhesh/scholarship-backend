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
	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwAAtZiG22faSAgAAPW7lB5o2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkEgABAAAACwAAAGludGVyYWN0aXZlMAAAWzaE22faSDcAEnQ7QQ-c_EGpK_ZxInmykQ.mtvufphvGt4tNXWR8CGmYgpfGeQ93OPgAVakeJeQrG2sE7GRD7ggGU0kS5ouTdllAzheVTQ6SmA2aanvcpK_Nu0bqtaOhE5jvkEqban2-pbmZHf77h-r19NeLDr9ybD1fM0fOPfExFtTqxKUpATkK-XRy8J9FSW2Ej1j7fWeSp3Fb41jQqL8uGID5ZruSDJ3Tj7vpiObDk3Fg_mBaHFarzJH-jyX3kNoxZVepQhqT4X0nj2NC1E3v8-dqR1Yzyg9yJo4scjqxBTKdx5My52-3skiEh-lxQUhKO7KIg6pp4HJJxPU4HqK7iVHgwd_aKK4L-5gyjQLJxTGLjdnPDirTw',
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
		if (results.createdNewTemplate === true)
		{
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