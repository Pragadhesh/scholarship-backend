import * as fastify from 'fastify';
import mongoose from 'mongoose';
import routes from './routes';
import { Options } from './config/swagger';
import { config } from './config';
import swagger from 'fastify-swagger';
const env = process.env.NODE_ENV;
import cors from 'cors';

// Configure App
const app = fastify.default({ logger: true });
app.register(swagger, Options);
app.use(cors({
    origin: '*'
}));

routes.forEach(route => {
	app.route(route);
});

const start = async (): Promise<void> => {
	try {
		await app.listen(config.app.port);
		app.swagger();
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();

export default app;

// Configure DB
if (env !== 'test') {
	mongoose
		.connect(`mongodb+srv://${config.db.username}:${config.db.password}@course-organizer.hxipzhp.mongodb.net/?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => app.log.info('MongoDB connected...'))
		.catch(err => app.log.error(err));
}
