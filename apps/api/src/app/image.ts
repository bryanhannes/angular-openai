import { Configuration, OpenAIApi } from 'openai';
import * as express from 'express';

export const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
      // n: 2,
    });

    res.send(response.data);
  } catch (e) {
    next(e);
  }
});
