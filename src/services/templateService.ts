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
    /*
    let description = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "1",
      xPosition: "73",
      yPosition: "169",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
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
      tabLabel: "text",
      locked: "true", //making this as readonly
      value: "This is a sample eligibility field",
      required: "false",
    }),
    firstname = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "227",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "First name",
      required: "true",
    }),
    lastname = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "255",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Last name",
      required: "true",
    }),
    dob = docusign.Date.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "282",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "DOB",
      required: "true",
    }),
    gender = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "310",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Gender",
      required: "true",
    }),
    citizenship = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "334",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Citizenship",
      required: "true",
    }),
    email = docusign.Email.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "361",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "email",
      value: "Email",
      required: "true",
    }),
    address = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "334",
      width: "300",
      height: "200",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Address",
      required: "true",
    }),
    zipcode = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "494",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Zipcode",
      required: "true",
    }),
    country = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "519",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Country",
      required: "true",
    }),
    studystatus = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "545",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "StudyStatus",
      required: "true",
    }),
    contact = docusign.email.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "573",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Contact",
      required: "true",
    }),
    date = docusign.Date.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "122",
      yPosition: "707",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "Date Signed",
      required: "true",
    }),
    place = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "122",
      yPosition: "735",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Place",
      required: "true",
    }),
    signHere = docusign.SignHere.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "410",
      yPosition: "695",
    });
    */
    let description = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "1",
      xPosition: "73",
      yPosition: "169",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
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
      tabLabel: "text",
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
      tabLabel: "text",
      locked: "true", //making this as readonly
      value: "Welcome to our online Scholarship Application system. To be considered for a scholarship make sure you meet all the eligibility criteria defined above. Please make sure you submit all the details asked below through the below scholarship application form.",
      required: "false",
    }),
    firstname = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "226",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "First name",
      required: "true",
    }),
    lastname = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "253",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Last name",
      required: "true",
    }),
    dob = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "280",
      font: "georgia",
      fontSize: "size14",
      required: "true",
      value:"DOB"
    }),
    gender = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "307",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Gender",
      required: "true",
    }),
    citizenship = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "333",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Citizenship",
      required: "true",
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
      tabLabel: "text",
      value: "Address",
      required: "true",
    }),
    zipcode = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "490",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Zipcode",
      required: "true",
    }),
    country = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "517",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Country",
      required: "true",
    }),
    studystatus = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "543",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Studystatus",
      required: "true",
    }),
    place = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "3",
      xPosition: "119",
      yPosition: "178",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Place",
      required: "true",
    }),
    contact = docusign.Text.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "569",
      font: "georgia",
      fontSize: "size14",
      tabLabel: "text",
      value: "Contact",
      required: "true",
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
    }),
    signHere = docusign.SignHere.constructFromObject({
      documentId: "1",
      pageNumber: "3",
      xPosition: "404",
      yPosition: "139",
    }),
    email = docusign.EmailAddress.constructFromObject({
      documentId: "1",
      pageNumber: "2",
      xPosition: "266",
      yPosition: "358",
      font: "georgia",
      fontSize: "size14",
      value: "Email",
      required: "true",
    });
    
    // Tabs are set per recipient / signer
    let signer1Tabs = docusign.Tabs.constructFromObject({
      emailAddressTabs: [email],
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