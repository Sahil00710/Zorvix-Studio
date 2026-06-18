export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors?: Array<{ path?: string; message: string }>;
}

export class ApiError extends Error {
  status: number;
  errors?: ApiFailure["errors"];

  constructor(message: string, status: number, errors?: ApiFailure["errors"]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "https://zorvix-studio.onrender.com").replace(/\/$/, "");

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<ApiSuccess<T>> {
  const headers = new Headers(init.headers);
  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as ApiSuccess<T> | ApiFailure) : null;

  if (!response.ok || !payload || payload.success === false) {
    throw new ApiError(
      payload && "message" in payload ? payload.message : "Request failed",
      response.status,
      payload && "errors" in payload ? payload.errors : undefined,
    );
  }

  return payload;
}
