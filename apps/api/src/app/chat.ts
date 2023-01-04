import { Configuration, OpenAIApi } from 'openai';
import * as express from 'express';

export const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/chat', async (req, res, next) => {
  try {
    const { message } = req.query;

    if (!message || message === '') {
      throw new Error('No message provided');
    }

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    });

    if (response.data) {
      if (response.data.choices) {
        res.send({
          answer: response.data.choices[0].text,
          question: message,
          timestamp: new Date().toISOString(),
        });
      }
    }
  } catch (e) {
    next(e);
  }
});
