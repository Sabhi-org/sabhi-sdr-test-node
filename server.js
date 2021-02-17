// adding dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { agent } = require('./agent');

// adding data configuration and enviroment file
require('dotenv').config();

// bodyparser urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// bodyparser json
app.use(bodyParser.json());

// adding cors
app.use(cors());

// creating default port
const port = process.env.PORT || 4000;
// running server
app.listen(port, () => {
    console.log(`server is live on port ${port}`)
});


const uri = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE2MTM1MDk1NTcsInR5cGUiOiJzZHIiLCJ0YWciOiJTRFIiLCJyZXBseVRvIjpbInNhYmhpLWRldmVsb3BtZW50LXNlcnZlciJdLCJyZXBseVVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTIzNDUvdXNlci92cCIsImNsYWltcyI6W3sicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJmdWxsbmFtZSJ9LHsicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJhZGRyZXNzIn0seyJyZWFzb24iOiJXZSB3aWxsIHNob3cgdGhpcyBvbiB5b3VyIHByb2ZpbGUiLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6InBob25lbnVtYmVyIn0seyJyZWFzb24iOiJXZSB3aWxsIHNob3cgdGhpcyBvbiB5b3VyIHByb2ZpbGUiLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6ImVtYWlsIn0seyJyZWFzb24iOiJXZSB3aWxsIHNob3cgdGhpcyBvbiB5b3VyIHByb2ZpbGUiLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6ImRvYiJ9LHsicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJwaG90byJ9LHsicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJuYXRpeyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE2MTM1MDk1NTcsInR5cGUiOiJzZHIiLCJ0YWciOiJTRFIiLCJyZXBseVRvIjpbInNhYmhpLWRldmVsb3BtZW50LXNlcnZlciJdLCJyZXBseVVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MTIzNDUvdXNlci92cCIsImNsYWltcyI6W3sicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJmdWxsbmFtZSJ9LHsicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJhZGRyZXNzIn0seyJyZWFzb24iOiJXZSB3aWxsIHNob3cgdGhpcyBvbiB5b3VyIHByb2ZpbGUiLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6InBob25lbnVtYmVyIn0seyJyZWFzb24iOiJXZSB3aWxsIHNob3cgdGhpcyBvbiB5b3VyIHByb2ZpbGUiLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6ImVtYWlsIn0seyJyZWFzb24iOiJXZSB3aWxsIHNob3cgdGhpcyBvbiB5b3VyIHByb2ZpbGUiLCJlc3NlbnRpYWwiOnRydWUsImNsYWltVHlwZSI6ImRvYiJ9LHsicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJwaG90byJ9LHsicmVhc29uIjoiV2Ugd2lsbCBzaG93IHRoaXMgb24geW91ciBwcm9maWxlIiwiZXNzZW50aWFsIjp0cnVlLCJjbGFpbVR5cGUiOiJuYXRpb25hbElkIn1dLCJjcmVkZW50aWFscyI6WyJKV1QtcHVibGljLXByb2ZpbGUuLi4iXSwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweGI0ZTJlMmE5M2U0NzA1MzI0MjNiYjZlMzQ3ODJjNjc3ZTljYjc4Y2UifQ.aJ36tSr3Hh6wRVhnXPFIg4WOK-Wev4_hqOpchwfAlgJBAeQe-K5gb0TW8kv0cH9qUc68D970iYWyT8MDfNG8QwAb25hbElkIn1dLCJjcmVkZW50aWFscyI6WyJKV1QtcHVibGljLXByb2ZpbGUuLi4iXSwiaXNzIjoiZGlkOmV0aHI6cmlua2VieToweGI0ZTJlMmE5M2U0NzA1MzI0MjNiYjZlMzQ3ODJjNjc3ZTljYjc4Y2UifQ.aJ36tSr3Hh6wRVhnXPFIg4WOK-Wev4_hqOpchwfAlgJBAeQe-K5gb0TW8kv0cH9qUc68D970iYWyT8MDfNG8QwA";
console.log(uri.length);
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
        const { did } = req.body;
        // let data = {
        //     issuer: did,
        //     subject: issuer,
        //     tag: tag, // tag: "login"
        //     '@context': ['https://www.w3.org/2018/credentials/v1'],
        //     type: ['VerifiablePresentation'],
        //     verifiableCredential: [],
        //     audience: [issuer],
        // };

        // const vp = await agent.handleAction({
        //     type: 'sign.w3c.vp.jwt',
        //     save: true,
        //     data,
        // });


        const verifiableCredential = await agent.createVerifiableCredential({
            credential: {
                issuer: { id: did },
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential'],
                issuanceDate: new Date().toISOString(),
                credentialSubject: {
                    id: 'did:web:uport.me',
                    name: 'hamza',
                },
            },
            proofFormat: 'jwt',
        })


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
        })


        console.log(verifiableCredential);

        res.send(verifiablePresentation);

    } catch (error) {
        console.log(error);
    }
})
