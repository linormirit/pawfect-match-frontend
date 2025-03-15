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

export { fetchBreedsList };
