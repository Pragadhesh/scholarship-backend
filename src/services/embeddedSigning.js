import * as fs from "fs-extra";
import * as docusign from "docusign-esign";
const embeddedSigningService = exports;
 
 /**
  * This function does the work of creating the envelope and the
  * embedded signing
  * @param {object} args
  */
 embeddedSigningService.sendEnvelopeForEmbeddedSigning = async (args) => {
   // Data for this method
   // args.basePath
   // args.accessToken
   // args.accountId
   // args.envelopeargs
 
   let dsApiClient = new docusign.ApiClient();
   dsApiClient.setBasePath(args.basePath);
   dsApiClient.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
   let envelopesApi = new docusign.EnvelopesApi(dsApiClient),
     results = null;
   // Step 1. Make the envelope request body
   let envelope = makeEnvelope(args.envelopeArgs);
   // Step 2. call Envelopes::create API method
   // Exceptions will be caught by the calling function
   results = await envelopesApi.createEnvelope(args.accountId, {
     envelopeDefinition: envelope,
   });
   let envelopeId = results.envelopeId;
   console.log(`Envelope was created. EnvelopeId ${envelopeId}`);
 
   // Step 3. create the recipient view, the embedded signing
   let viewRequest = makeRecipientViewRequest(args.envelopeArgs);
   // Call the CreateRecipientView API
   // Exceptions will be caught by the calling function
   results = await envelopesApi.createRecipientView(args.accountId, envelopeId, {
     recipientViewRequest: viewRequest,
   });
 
   return { envelopeId: envelopeId, redirectUrl: results.url };
 };
 
 /**
  * Creates envelope
  * @function
  * @param {Object} args parameters for the envelope:
  * @returns {Envelope} An envelope definition
  * @private
  */

  // used to make an envelope from the template
  function makeEnvelope(args) {
    // Data for this method
    // args.signerEmail
    // args.signerName
    // args.ccEmail
    // args.ccName
    // args.templateId
  
    // The envelope has two recipients.
    // recipient 1 - signer
    // recipient 2 - cc
  
    // create the envelope definition
    let env = new docusign.EnvelopeDefinition();
    env.templateId = args.templateId;
  
    // Create template role elements to connect the signer and cc recipients
    // to the template
    // We're setting the parameters via the object creation
    let signer1 = docusign.TemplateRole.constructFromObject({
      email: args.signerEmail,
      name: args.signerName,
      clientUserId: args.signerClientId,
      roleName: "signer",
    });
  
    // Create a cc template role.
    // We're setting the parameters via setters
    let cc1 = new docusign.TemplateRole();
    cc1.email = args.ccEmail;
    cc1.name = args.ccName;
    cc1.roleName = "cc";
  
    // Add the TemplateRole objects to the envelope object
    env.templateRoles = [signer1, cc1];
    env.status = "sent"; // We want the envelope to be sent
  
    return env;
  }

 function makeRecipientViewRequest(args) {
   // Data for this method
   // args.dsReturnUrl
   // args.signerEmail
   // args.signerName
   // args.signerClientId
   // args.dsPingUrl
 
   let viewRequest = new docusign.RecipientViewRequest();
 
   // Set the url where you want the recipient to go once they are done signing
   // should typically be a callback route somewhere in your app.
   // The query parameter is included as an example of how
   // to save/recover state information during the redirect to
   // the DocuSign signing. It's usually better to use
   // the session mechanism of your web framework. Query parameters
   // can be changed/spoofed very easily.
   viewRequest.returnUrl = "http://localhost:4200/scholarships";
 
   // How has your app authenticated the user? In addition to your app's
   // authentication, you can include authenticate steps from DocuSign.
   // Eg, SMS authentication
   viewRequest.authenticationMethod = "none";
 
   // Recipient information must match embedded recipient info
   // we used to create the envelope.
   viewRequest.email = args.signerEmail;
   viewRequest.userName = args.signerName;
   viewRequest.clientUserId = args.signerClientId;
 
   // DocuSign recommends that you redirect to DocuSign for the
   // embedded signing. There are multiple ways to save state.
   // To maintain your application's session, use the pingUrl
   // parameter. It causes the DocuSign signing web page
   // (not the DocuSign server) to send pings via AJAX to your
   // app,
   //viewRequest.pingFrequency = 600; // seconds
   // NOTE: The pings will only be sent if the pingUrl is an https address
   //viewRequest.pingUrl = args.dsPingUrl; // optional setting
 
   return viewRequest;
 }
 