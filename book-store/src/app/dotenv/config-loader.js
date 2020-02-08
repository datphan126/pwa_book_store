const convict = require("convict");

const config = convict({
    env: {
        doc: 'The application environment.',
        format: String,
        default: '.env'
    },
    cfg: {
        backendHost: {
            doc: 'Host Name/IP of the backend server',
            format: String,
            default: 'localhost'
        },
        backendPort: {
            doc: 'Port of the backend server',
            format: String,
            default: '8080'
        },
        backendProtocol: {
            doc: 'Protocol of the backend server',
            format: String,
            default: 'http://'
        }
    }
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile('./src/app/dotenv/' + env + '.json');

// // Perform validation
// config.validate({allowed: 'strict'});
// module.exports = config;

config.validate({ allowed: "strict" });

module.exports = () => {
    return { code: "module.exports = " + JSON.stringify(config.getProperties()) };
};