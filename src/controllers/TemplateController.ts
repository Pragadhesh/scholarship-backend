import boom from 'boom';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
const templateService = require('../services/templateService');
let args = {
	basePath: 'https://demo.docusign.net/restapi',
  	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwCAmtPR62baSAgAgNr23y5n2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkEgABAAAACwAAAGludGVyYWN0aXZlMAAA1wnQ62baSDcAEnQ7QQ-c_EGpK_ZxInmykQ.in6M6QLzdNvYYJTUnE2M7cz9rYKj0rUEouXmWBwHAdZHcDVt_ognV6DFrSbvxr_jMgbLfaLPSsq1qORoTpILT6CstsOZARFH92RpEo_l8O6pKQtubj5XfrCkit5itvuSmFMzxICYEQzCO910qxaNSfrsVwEDGghtkXDv_Lx1jFoOl6GMzrb6qzhkCLFhlMxFABbNDXjaYQiOEnwv_bQNFKkhcvwv3l0LDg59R-cG_Y1QpsVF684I6soFkTGcuYhTrfqmJ_2Om-6utFuQY1KlLUc60shlfIyrfL6Gn0z6ycC3UtmxXP9QMoMIKyZB6NZ4nt2CAZYOXc409h65UeK5pw',
  	accountId: '16751715',
  	templateName: 'scolarship-sample',
    description: 'description of the scholarship',
    eligibility: 'eligibility of the scholarship'
}


export const createTemplate = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document[]> => {
	try {
		let results = await templateService.createTemplate(args)
        console.log(results);
        return results
	} catch (err) {
		throw boom.boomify(err);
	}
};