import type { Context } from "@netlify/edge-functions"

export default async (request: Request, context: Context) => {
  // if request type is document

  const requestType = request.headers.get("sec-fetch-dest")

  const response = await context.next()

  if (requestType === "document") {
    //console.log("request type is document")
    //console.log(context)
    //console.log(Netlify.env.get("URL"))
    //console.log(Netlify.env.get("CONTEXT"))
    //console.log(request)
    //response.headers.set("X-Your-Custom-Header", "A custom value")

    if (
      request.url.includes("localhost") ||
      request.url.includes("netlify.app")
    ) {
      // parse domain string, return full domain
      const url = new URL(request.url)
      const domain = url.hostname
      console.log("domain string: " + domain)
    } else {
      // remove all subdomains
      const url = new URL(request.url)
      const domain = url.hostname.replace(/^([^\.]+)\./, "")
      console.log("domain string: " + domain)
    }

    return response
  }

  return response
}
