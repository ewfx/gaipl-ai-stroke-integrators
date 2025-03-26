const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const extractContext = async (incidentDescription) => {
  try {
    const summary = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: incidentDescription,
      parameters: { max_length: 100 }
    });
    return {
      summary: summary.summary_text,
      connectivity: "Stable", // Mocked for now
      upstream: "Service A",  // Mocked for now
      downstream: "Service B" // Mocked for now
    };
  } catch (error) {
    console.error('Error extracting context:', error);
    throw new Error('Failed to extract context');
  }
};

module.exports = { extractContext };