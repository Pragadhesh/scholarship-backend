import boom from 'boom';
import Users from '../models/Users';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';



export const AddUser = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const user = new Users(req.body);
		return await user.save();
	} catch (err) {
		throw boom.boomify(err);
	}
};
