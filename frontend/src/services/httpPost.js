/**
 * Generic POST fetch utility
 * @param {string} url - API endpoint
 * @param {object} body - Request payload
 * @param {object} headers - Additional headers (optional)
 */
export const httpPost = async (url, body, headers = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error || "Request failed";
    throw new Error(message);
  }

  return data;
};
