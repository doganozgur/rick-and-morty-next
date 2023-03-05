/**
 * @func fetchCharacters Making API request to the given url
 * @param url
 * @returns Single character details
 */
export async function fetchCharacters(url: string) {
  try {
    const res = await fetch(url);
    const data = await res?.json();
    const result = {
      id: data?.id,
      name: data?.name,
      status: data?.status,
      species: data?.species,
      image: data?.image,
    };
    return result;
  } catch (err) {
    console.log("Characters could not be fetched", err);
  }
}
