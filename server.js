// adding dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { agent } = require('./agent');
const morgan = require('morgan');
const { apiInstance } = require('./axios-instance');
const { vc } = require('./vc');
// adding data configuration and enviroment file
require('dotenv').config();

// bodyparser urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// bodyparser json
app.use(bodyParser.json());

// HTTP request logger middleware
app.use(morgan('dev'));

// adding cors
app.use(cors());

// creating default port
const port = process.env.PORT || 4000;
// running server
app.listen(port, () => {
    console.log(`server is live on port ${port}`)
});

// creating homepage
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: `welcome to node-sdr generator api :)`
    });
});

app.get('/did', async (req, res) => {
    try {
        const identity = await agent.didManagerCreate();
        res.json({
            status: true,
            did: identity.did,
            identity: identity,
        })
    } catch (error) {
        res.send(error);
    }
});



app.post('/vp', async (req, res) => {
    try {
        console.log(req.body);
        const {
            fullName,
            fatherName,
            gender,
            countryOfStay,
            identityNumber,
            birthDate,
            issueDate,
            expireDate,
            temporaryAddress,
            permanentAddress,
            did,
            uri,
            profileImage,
            identityCardBackImage,
            identityCardFrontImage
        } = req.body;


        const verifiableCredential = await agent.createVerifiableCredential({
            credential: {
                issuer: { id: did },
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential'],
                issuanceDate: new Date().toISOString(),
                credentialSubject: {
                    id: did,
                    fullName,
                    fatherName,
                    gender,
                    countryOfStay,
                    identityNumber,
                    birthDate,
                    issueDate,
                    expireDate,
                    temporaryAddress,
                    permanentAddress,
                    profileImage,
                    identityCardBackImage,
                    identityCardFrontImage,
                },
            },
            proofFormat: 'jwt',
        });

        // console.log(verifiableCredential);
        const verifiablePresentation = await agent.createVerifiablePresentation({
            presentation: {
                verifier: [uri],
                holder: did,
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiablePresentation'],
                issuanceDate: new Date().toISOString(),
                verifiableCredential: verifiableCredential,
            },
            proofFormat: 'jwt',
            save: true,
        });
        const response = await apiInstance.post('user/vp', verifiablePresentation);
        // console.log('###############################################################################');
        console.log(response);
        res.send(verifiablePresentation);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});