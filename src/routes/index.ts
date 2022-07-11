import * as usersController from '../controllers/UsersController';
import { RouteOptions } from 'fastify';
import { AddUserSchema} from './documentation/UsersApi';


const postUsersRoute: RouteOptions = {
	method: 'POST',
	url: '/api/users',
	handler: usersController.AddUser,
	schema: AddUserSchema,
};
const routes = [postUsersRoute];

export default routes;
