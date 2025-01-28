/* eslint-disable @typescript-eslint/no-explicit-any */

export async function fetchApi<T = any>(
  url: string,
  options?: RequestInit,
  responseType?: "json"
): Promise<T>;
export async function fetchApi(
  url: string,
  options?: RequestInit,
  responseType?: "blob"
): Promise<Blob>;
export async function fetchApi<T = any>(
  url: string,
  options?: RequestInit,
  responseType: "json" | "blob" = "json"
): Promise<T | Blob> {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("API URL is not defined in environment variables.");
  }

  // Set default headers if not already set
  const headers = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });
  // Return the appropriate response type
  if (responseType === "blob") {
    return response.blob(); // For binary responses like files
  }

  return response.json();
}
