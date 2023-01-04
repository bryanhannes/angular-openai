import { Configuration, OpenAIApi } from 'openai';
import * as express from 'express';

export const router = express.Router();

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

router.get('/image', async (req, res, next) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      throw new Error('No prompt provided');
    }

    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 2,
    });

    res.send(response.data);
  } catch (e) {
    next(e);
  }
});
