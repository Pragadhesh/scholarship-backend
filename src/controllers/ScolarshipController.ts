import boom from 'boom';
import Scolarship from '../models/Scolarship';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';

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

export const addScolarship = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const scolarship = new Scolarship(req.body);
		return await scolarship.save();
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