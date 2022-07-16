const templateService = exports;
const fs = require("fs-extra");
const docusign = require("docusign-esign");
const path = require('path');
const DocumentPath = path.resolve(__dirname, '../documents/');
const FileName = 'scolarship-template.pdf';
const docFile = path.resolve(DocumentPath,FileName);

templateService.createTemplate = async (args:any) => {
    // Data for this method
    // args.basePath
    // args.accessToken
    // args.accountId
    // args.templateName
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(args.basePath);
    dsApiClient.addDefaultHeader("Authorization", "Bearer " + args.accessToken);
    let templatesApi = new docusign.TemplatesApi(dsApiClient),
      results = null,
      templateId = null, // the template that exists or will be created.
      resultsTemplateName = null,
      createdNewTemplate = null;
    // Step 1. See if the template already exists
    // Exceptions will be caught by the calling function
    results = await templatesApi.listTemplates(args.accountId, {
      searchText: args.templateName,
    });
    if (results.resultSetSize > 0) {
      templateId = results.envelopeTemplates[0].templateId;
      resultsTemplateName = results.envelopeTemplates[0].name;
      createdNewTemplate = false;
    } else {
      // Template doesn't exist. Therefore create it...
      // Step 2 Create the template
      let templateReqObject = makeTemplate(args);
      results = await templatesApi.createTemplate(args.accountId, {
        envelopeTemplate: templateReqObject,
      });
      createdNewTemplate = true;
      // Retrieve the new template Name / TemplateId
      results = await templatesApi.listTemplates(args.accountId, {
        searchText: args.templateName,
      });
      templateId = results.envelopeTemplates[0].templateId;
      resultsTemplateName = results.envelopeTemplates[0].name;
    }
  
    return {
      templateId: templateId,
      templateName: resultsTemplateName,
      createdNewTemplate: createdNewTemplate,
    };
  };

  function makeTemplate(args:any) {
    // Data for this method
    // demoDocsPath -- module global
    // docFile -- module global
    // templateName -- module global
  
    // document 1 (pdf) has tag /sn1/
    //
    // The template has two recipient roles.
    // recipient 1 - signer
    // recipient 2 - cc
    // The template will be sent first to the signer.
    // After it is signed, a copy is sent to the cc person.
  
    let docPdfBytes;
    // read file from a local directory
    // The reads could raise an exception if the file is not available!
    docPdfBytes = fs.readFileSync(docFile);
  
    // add the documents
    let doc = new docusign.Document(),
      docB64 = Buffer.from(docPdfBytes).toString("base64");
    doc.documentBase64 = docB64;
    doc.name = "scolarship"; // can be different from actual file name
    doc.fileExtension = "pdf";
    doc.documentId = "1";
  
    // create a signer recipient to sign the document, identified by name and email
    // We're setting the parameters via the object creation
    let signer1 = docusign.Signer.constructFromObject({
      roleName: "signer",
      recipientId: "1",
      routingOrder: "1",
    });
    // routingOrder (lower means earlier) determines the order of deliveries
    // to the recipients. Parallel routing order is supported by using the
    // same integer as the order for two or more recipients.
  
    // create a cc recipient to receive a copy of the documents, identified by name and email
    // We're setting the parameters via setters
    let cc1 = new docusign.CarbonCopy();
    cc1.roleName = "cc";
    cc1.routingOrder = "2";
    cc1.recipientId = "2";

    //Creating fields 
    //Description
    let description = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "1",
      xPosition: "73",
      yPosition: "169",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "description",
      locked: "true", //making this as readonly
      value: "This is a sample description field",
      required: "false",
    }),
    eligibility = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "1",
      xPosition: "73",
      yPosition: "376",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "eligibility",
      locked: "true", //making this as readonly
      value: "This is a sample eligibility field",
      required: "false",
    }),
    heading = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "69",
      yPosition: "105",
      width: "525",
      height: "100",
      font: "georgia",
      fontSize: "size16",
      tabLabel: "heading",
      locked: "true", //making this as readonly
      value: `Welcome to ${args.templateName} . To be considered for this scholarship make sure you meet all the eligibility criteria defined above. Please make sure you submit all the details asked below through the below scholarship application form.`,
      required: "false",
    }),
    firstname = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "226",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "firstname",
      value: "First name",
      required: "true",
      locked: "false",
    }),
    lastname = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "253",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "lastname",
      value: "Last name",
      required: "true",
      locked: "false",
    }),
    dob = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "280",
      font: "georgia",
      fontSize: "size14",
      required: "true",
      value:"DOB",
      locked: "false",
    }),
    gender = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "307",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "gender",
      value: "Gender",
      required: "true",
      locked: "false",
    }),
    citizenship = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "333",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "citizenship",
      value: "Citizenship",
      required: "true",
      locked: "false",
    }),
    address = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "385",
      width: "200",
      height: "100",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "address",
      value: "Address",
      required: "true",
      locked: "false",
    }),
    zipcode = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "490",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "zipcode",
      value: "Zipcode",
      required: "true",
      locked: "false",
    }),
    country = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "517",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "country",
      value: "Country",
      required: "true",
      locked: "false",
    }),
    studystatus = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "543",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "studystatus",
      value: "Studystatus",
      required: "true",
      locked: "false",
    }),
    place = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "3",
      xPosition: "119",
      yPosition: "178",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "place",
      value: "Place",
      required: "true",
      locked: "false",
    }),
    contact = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "569",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "contact",
      value: "Contact",
      required: "true",
      locked: "false",
    }),
    idproof = docusign.SignerAttachment.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "269",
      yPosition: "597",
      required: "true",
    }),
    date = docusign.DateSigned.constructFromObject({
      documentId: "1",
      pageNumber: "3",
      xPosition: "119",
      yPosition: "149",
      font: "georgia",
      fontSize: "size14",
      required: "true",
      locked: "false",
    }),
    signHere = docusign.SignHere.constructFromObject({
      documentId: "1",
      pageNumber: "3",
      xPosition: "404",
      yPosition: "139",
    }),
    email = docusign.Email.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "358",
      font: "georgia",
      fontSize: "size14",
      value: "user@docusign.com",
      required: "true",
      locked: "false",
    });
    
    // Tabs are set per recipient / signer
    let signer1Tabs = docusign.Tabs.constructFromObject({
      emailTabs: [email],
      signHereTabs: [signHere],
      dateSignedTabs: [date],
      textTabs: [description,eligibility,firstname,lastname,gender,eligibility,
                address,zipcode,country,studystatus,place,contact,dob,citizenship,
              heading],
      signerAttachmentTabs: [idproof]
       
        
    });
    signer1.tabs = signer1Tabs;
  
    // Add the recipients to the env object
    let recipients = docusign.Recipients.constructFromObject({
      signers: [signer1],
      carbonCopies: [cc1],
    });
  
    // create the overall template definition
    let template = new docusign.EnvelopeTemplate.constructFromObject({
      // The order in the docs array determines the order in the env
      documents: [doc],
      emailSubject: "Please sign this document",
      description: "Please sign this document",
      name: args.templateName,
      shared: "false",
      recipients: recipients,
      status: "created",
    });
  
    return template;
  }