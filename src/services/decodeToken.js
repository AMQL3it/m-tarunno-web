export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1]; // token = header.payload.signature
    const decodedPayload = JSON.parse(atob(payload)); // base64 decode
    return decodedPayload;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
