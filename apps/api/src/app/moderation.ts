import { Configuration, OpenAIApi } from 'openai';
import * as express from 'express';

export const router = express.Router();

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

router.post('/moderation', async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw new Error('No input provided');
    }

    const response = await openai.createModeration({
      input: `${text}`,
    });
    // console .log(response);
    res.send(response.data.results);
  } catch (e) {
    next(e);
  }
});
