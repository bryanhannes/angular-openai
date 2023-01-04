import { Configuration, OpenAIApi } from 'openai';
import * as express from 'express';

export const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/models', async (req, res, next) => {
  try {
    const response = await openai.listModels();

    if (response.data) {
      if (response.data.data) {
        res.send(response.data.data);
      }
    }
  } catch (e) {
    next(e);
  }
});
