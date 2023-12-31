const aws = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY,
    },
});

const uploadArquivo = async (path, buffer, mimetype) => {
    const arquivo = await s3
        .upload({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: path,
            Body: buffer,
            ContentType: mimetype,
        })
        .promise();
    const url = arquivo.Location;
    return url;
};

const excluirArquivo = async (path) => {
    const resposta = await s3
        .deleteObject({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: path,
        })
        .promise();
    return resposta;
};
module.exports = {
    uploadArquivo,
    excluirArquivo,
};
