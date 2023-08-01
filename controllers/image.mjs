import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
//import Clarifai from Clarifai;

const stub = ClarifaiStub.grpc();

const app = new Clarifai.App({
    apiKey: 'bbc3f9c5d7a847e2b22eb8fb55f7978e'
   });

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key");


const handleApiCall = (req, res, db)=> {
stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "a403429f2ddf4b49b307e318f00e528b",
        version_id: '34ce21a40cc24b6b96ffee54aabff139',
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }

        console.log("Predicted concepts, with confidence values:")
        for (const c of response.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
        }
        res.json(response)
    }
);
}
   
const handleImage = (req, res, db)=> {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })  
    .catch(err => res.status(400).json('unable to get entries'))      
};

export  {handleApiCall, handleImage};