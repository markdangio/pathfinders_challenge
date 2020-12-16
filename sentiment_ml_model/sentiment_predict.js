exports.main = (req, res) => {
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
    res.set('Access-Control-Allow-Origin', '*');
    const projectId = 'capable-asset-297615';
    const location = 'us-central1';
    const modelId = 'TST1274600058406305792';
    const content = req.query.content || '';
    let result = [];
    
    // Imports the Google Cloud AutoML library
    const { PredictionServiceClient } = require('@google-cloud/automl').v1;

    // Instantiates a client
    const client = new PredictionServiceClient();

    async function predict() {
        // Construct request
        const request = {
            name: client.modelPath(projectId, location, modelId),
            payload: {
                textSnippet: {
                    content: content,
                    mimeType: 'text/plain', // Types: 'test/plain', 'text/html'
                },
            },
        };

        const [response] = await client.predict(request);

        for (const annotationPayload of response.payload) {
            result.push({
                predicted_sentiment_score: annotationPayload.textSentiment.sentiment
            });
        }

        res.status(200).send(result);
    }

    predict();
}
