import boom from 'boom';
import { Document } from 'mongoose';
import { ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
const templateService = require('../services/templateService');
let args = {
	basePath: 'https://demo.docusign.net/restapi',
  	accessToken: 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAFUi-kmbaSAgAgFVrzNVm2kgCANXOAolPuPBGlKZKRVQEeicVAAEAAAAYAAEAAAAFAAAADQAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkIgAkAAAAYTE4NGRkOTAtOWQ5YS00ZDBjLTkxNTAtZjUzMTI3ODZjOTRkMAAAQouih2baSDcAEnQ7QQ-c_EGpK_ZxInmykQ.LHbLto8hrxizsxo6Z2eVVdNbPNcvaKENrn0pGi-GVTdUS4XstcRmKltWIG6l_J79bSqJWDz6ZnEnxh_AbajFNGV3k-PhSydW0kTZTFpBRq4gbEh-OTt3eXplEgMhEgVHRJ1DDmxZuxVGI33NhYRoqqPpyTtibeCZjSJsFV4dsjuF-rjwq1na77d44vIBPMadVa35FG5hYjz3KadSXLOIlRAnYT1gcYPdvmdM82RGd7NOEeCV8tMETnXDtr6SXcXrbb2y5fU0TFgkBMdoG2cA7isFwD9pJyi6qv1Yg07L8XEyk1cTeOCFDf_CpKjQoAp3pmCg2tcLRVPH7_46awySng',
  	accountId: '16751715',
  	templateName: 'scolarship-sample',
    description: 'description of the scholarship',
    eligibility: 'eligibility of the scholarship'
}


export const createTemplate = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>): Promise<Document[]> => {
	try {
		let results = await templateService.createTemplate(args)
        console.log(results);
        return results;
	} catch (err) {
		throw boom.boomify(err);
	}
};