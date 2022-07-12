import * as usersController from '../controllers/UsersController';
import * as scolarshipController from '../controllers/ScolarshipController';
import { RouteOptions } from 'fastify';
import { AddUserSchema} from './documentation/UsersApi';
import { AddScolarshipSchema, GetScolarshipSchema, GetScolarshipsSchema, PutScolarshipSchema, DeleteScolarshipSchema } from './documentation/ScolarshipApi';

//user
const postUsersRoute: RouteOptions = {
	method: 'POST',
	url: '/api/users',
	handler: usersController.AddUser,
	schema: AddUserSchema,
};

//scolarship 
const getScolarshipsRoute: RouteOptions = {
	method: 'GET',
	url: '/api/scolarships',
	handler: scolarshipController.getScolarships,
	schema: GetScolarshipsSchema,
};
const getScolarshipRoute: RouteOptions = {
	method: 'GET',
	url: '/api/scolarships/:id',
	handler: scolarshipController.getSingleScolarship,
	schema: GetScolarshipSchema,
};
const postScolarshipRoute: RouteOptions = {
	method: 'POST',
	url: '/api/scolarships',
	handler: scolarshipController.addScolarship,
	schema: AddScolarshipSchema,
};
const putScolarshipRoute: RouteOptions = {
	method: 'PUT',
	url: '/api/scolarships/:id',
	handler: scolarshipController.updateScolarship,
	schema: PutScolarshipSchema,
};
const deleteScolarshipRoute: RouteOptions = {
	method: 'DELETE',
	url: '/api/cars/:id',
	handler: scolarshipController.deleteScolarship,
	schema: DeleteScolarshipSchema,
};

const routes = [postUsersRoute,
				getScolarshipsRoute, getScolarshipRoute, postScolarshipRoute, putScolarshipRoute, deleteScolarshipRoute
				];

export default routes;
