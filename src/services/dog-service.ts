import { GoogleGenerativeAI } from "@google/generative-ai";

import { apiKey } from "../consts";
import { BreedList } from "../types/dog";

const dogApi = {
  fetchBreedsList: "https://dog.ceo/api/breeds/list/all",
};

const fetchBreedsList = async (): Promise<BreedList> => {
  const response = await fetch(dogApi.fetchBreedsList, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch breed list");
  }

  return response.json();
};

const getAiResult = async (userDescription: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Be a dog Expert, I would add a list of dog breeds and my needs,
     please pick one dog breed that would best match my prefrences and needs.
     
     dog breed List: ${await fetchBreedsList()}
     my needs: ${userDescription}
     please respond only with the dog breed `;

  const result = await model.generateContent(prompt);
  
  return result.response.text();
};

export { dogApi, fetchBreedsList, getAiResult };
