import { Resident } from "./../../../utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  results: Resident[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get current location id
  const id = req.query.id;
  const url = `${process.env.BASE_URL}/location/${id}`;

  // Fetch location data
  const response = await fetch(url);
  const locationData = await response.json();

  /**
   * @func fetchCharacters Making API request to the given url
   * @param url
   * @returns Single character details
   */
  async function fetchCharacters(url: string) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const result = {
        id: data.id,
        name: data.name,
        status: data.status,
        species: data.species,
        image: data.image,
      };

      return result;
    } catch (err) {
      console.log("Characters could not be fetched", err);
    }
  }

  let results = await Promise.all(
    locationData?.residents.map((resident: string) => fetchCharacters(resident))
  );
  res.status(200).json({ results });
}
