import type { Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  // if request type is document

  const requestType = request.headers.get("sec-fetch-dest")

  const response = await context.next()

  if (requestType === "document") {
    if (
      request.url.includes("localhost") ||
      request.url.includes("netlify.app")
    ) {
      // parse domain string, return full domain
      const url = new URL(request.url)
      const domain = url.hostname
      console.log("domain string: " + domain)
    } else {
      // remove all subdomains except top level
      const url = new URL(request.url)
      const domain = url.hostname.replace(/^([^\.]+)\./, "")
      console.log("domain string: " + domain)
    }

    return response
  }

  return response
}
