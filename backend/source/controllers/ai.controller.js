const aiservice = require('../services/ai.service.review');

module.exports.Generate = async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }
    try {
        const aiResponse = await aiservice(prompt);
        res.send(aiResponse);
    } catch (error) {
        console.error('Error generating AI content:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
