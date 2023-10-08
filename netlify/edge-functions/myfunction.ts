import type { Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  // if request type is document

  const requestType = request.headers.get("sec-fetch-dest")

  const response = await context.next()

  if (requestType === "document") {
    console.log("request type is document")
    response.headers.set("X-Your-Custom-Header", "A custom value")
    return response
  }

  return response
}
