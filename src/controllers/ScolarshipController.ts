import boom from 'boom';
import Scolarship from '../models/Scolarship';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
let account_details = {
	basePath: 'https://demo.docusign.net/restapi',
	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwCAmtPR62baSAgAgNr23y5n2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkEgABAAAACwAAAGludGVyYWN0aXZlMAAA1wnQ62baSDcAEnQ7QQ-c_EGpK_ZxInmykQ.in6M6QLzdNvYYJTUnE2M7cz9rYKj0rUEouXmWBwHAdZHcDVt_ognV6DFrSbvxr_jMgbLfaLPSsq1qORoTpILT6CstsOZARFH92RpEo_l8O6pKQtubj5XfrCkit5itvuSmFMzxICYEQzCO910qxaNSfrsVwEDGghtkXDv_Lx1jFoOl6GMzrb6qzhkCLFhlMxFABbNDXjaYQiOEnwv_bQNFKkhcvwv3l0LDg59R-cG_Y1QpsVF684I6soFkTGcuYhTrfqmJ_2Om-6utFuQY1KlLUc60shlfIyrfL6Gn0z6ycC3UtmxXP9QMoMIKyZB6NZ4nt2CAZYOXc409h65UeK5pw',
	accountId: '16751715'
}
const templateService = require('../services/templateService');

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