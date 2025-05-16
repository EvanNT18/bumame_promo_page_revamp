"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const UNKNOWN_ERROR = "Unknown error";

/**
 * Main API function using Fetch API
 */
export default async function api({
    url,
    method = "GET",
    data: body = null,
    headers = {},
    cache = "no-store",
}: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
    data?: any;
    headers?: HeadersInit;
    cache?: RequestCache;
}) {
    const fullUrl = `${API_URL}${url}`;
    const token = (await cookies()).get("token")?.value;

    // Determine if body is FormData
    const isFormData = body instanceof FormData;

    const fetchHeaders: HeadersInit & { "Content-Type"?: string } = {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
    };

    // Only set Content-Type if body is not FormData
    if (!isFormData) {
        fetchHeaders["Content-Type"] = "application/json";
    }

    const fetchConfig: RequestInit = {
        method,
        headers: fetchHeaders,
        body: isFormData ? body : body ? JSON.stringify(body) : null,
        credentials: "include" as RequestCredentials,
        cache,
    };

    let response: Response;

    try {
        response = await fetch(fullUrl, fetchConfig);
    } catch (error) {
        console.error("Network error:", error);
        throw new Error("Network error while calling API");
    }

    let data;
    const contentType = response.headers.get("content-type");

    try {
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }
    } catch (e) {
        console.warn("Failed to parse response", e);
        data = null;
    }

    if (!response.ok) {
        const errorText = data?.message || data || UNKNOWN_ERROR;
        throw new Error(`${errorText}`);
    }

    return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
    };
}