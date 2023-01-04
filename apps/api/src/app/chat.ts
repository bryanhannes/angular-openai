import { Configuration, OpenAIApi } from "openai";
import * as express from 'express';
export const router = express.Router();

const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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',
  });
const openai = new OpenAIApi(configuration);

  router.get("/chat", async (req, res) => {
    const { message } = req.query;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    });


    if (response.data) {
      if (response.data.choices) {
        res.send({message: response.data.choices[0].text});
      }
    }
  });

