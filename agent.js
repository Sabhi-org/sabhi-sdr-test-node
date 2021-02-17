// Core interfaces
const { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager } = require('@veramo/core');

// Core identity manager plugin
const { DIDManager } = require('@veramo/did-manager');

// Ethr did identity provider
const { EthrDIDProvider } = require('@veramo/did-provider-ethr');

// Web did identity provider
const { WebDIDProvider } = require('@veramo/did-provider-web');

// Core key manager plugin
const { KeyManager } = require('@veramo/key-manager');

// Custom key management system for RN
const { KeyManagementSystem } = require('@veramo/kms-local');

// Custom resolvers
const { DIDResolverPlugin } = require('@veramo/did-resolver');
const { Resolver } = require('did-resolver');
const ethrDidResolver = require('ethr-did-resolver').getResolver;
const webDidResolver = require('web-did-resolver').getResolver;

// Storage plugin using TypeOrm
const { Entities, KeyStore, DIDStore, IDataStoreORM, DataStore, DataStoreORM } = require('@veramo/data-store');

const { MessageHandler } = require('@veramo/message-handler');
const { DIDComm, DIDCommMessageHandler, IDIDComm } = require('@veramo/did-comm');
const { JwtMessageHandler } = require('@veramo/did-jwt');
const { W3cMessageHandler, CredentialIssuer } = require('@veramo/credential-w3c');
const { SdrMessageHandler, SelectiveDisclosure } = require('@veramo/selective-disclosure');

// TypeORM is installed with daf-typeorm
const { createConnection } = require('typeorm');

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite';

// You will need to get a project ID from infura https://www.infura.io
const INFURA_PROJECT_ID = '5ffc47f65c4042ce847ef66a3fa70d4c';

const dbConnection = createConnection({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
});


const agent = createAgent({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(),
            },
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:ethr:rinkeby',
            providers: {
                'did:ethr:rinkeby': new EthrDIDProvider({
                    defaultKms: 'local',
                    network: 'rinkeby',
                    rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
                }),
                'did:web': new WebDIDProvider({
                    defaultKms: 'local',
                }),
            },
        }),
        new DIDResolverPlugin({
            resolver: new Resolver({
                ethr: ethrDidResolver({
                    networks: [{ name: 'rinkeby', rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID }],
                }).ethr,
                web: webDidResolver().web,
            }),
        }),
        new DataStore(dbConnection),
        new DataStoreORM(dbConnection),
        new MessageHandler({
            messageHandlers: [
                new DIDCommMessageHandler(),
                new JwtMessageHandler(),
                new W3cMessageHandler(),
                new SdrMessageHandler(),
            ],
        }),
        new DIDComm(),
        new CredentialIssuer(),
        new SelectiveDisclosure(),
    ],
});


module.exports = {
    agent,
}