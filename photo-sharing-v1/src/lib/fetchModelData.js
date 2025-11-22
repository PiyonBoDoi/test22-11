// lib/fetchModelData.js
const API_BASE = "https://nqjjg5-8081.csb.app/api"; // đổi nếu backend chạy port khác

export async function fetchModel(modelName, id = null) {
  let url = "";
  switch (modelName) {
    case "userList":
      url = `${API_BASE}/user/list`;
      break;
    case "userDetail":
      if (!id) throw new Error("User ID required for userDetail");
      url = `${API_BASE}/user/${id}`;
      break;
    case "photosOfUser":
      if (!id) throw new Error("User ID required for photosOfUser");
      url = `${API_BASE}/photo/photosOfUser/${id}`;
      break;
    default:
      throw new Error("Unknown model: " + modelName);
  }

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch model");
  }
  return response.json();
}
