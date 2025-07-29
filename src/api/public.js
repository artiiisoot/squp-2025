export const fetchTracksData = async () => {
  try {
    const res = await fetch("/2025/data/TracksData.json");
    return await res.json();
  } catch (error) {
    console.error("JSON Fetch error:", error);
    throw error;
  }
};
export const fetchEventData = async () => {
  try {
    const res = await fetch("/2025/data/EventData.json");
    return await res.json();
  } catch (error) {
    console.error("JSON Fetch error:", error);
    throw error;
  }
};
export const fetchExhibitionData = async () => {
  try {
    const res = await fetch("/2025/data/ExhibitionData.json");
    return await res.json();
  } catch (error) {
    console.error("JSON Fetch error:", error);
    throw error;
  }
};
export const fetchPreviousData = async () => {
  try {
    const res = await fetch("/2025/data/PreviousData.json");
    return await res.json();
  } catch (error) {
    console.error("JSON Fetch error:", error);
    throw error;
  }
};

// console.log("log", serverMode);
