import { revalidateSecret } from "@/actions/client/api";
// import { Auth } from "googleapis";
// import axios from "axios";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// const jwtClient = new Auth.JWT(
//   key.client_email,
//   undefined,
//   key.private_key,
//   ["https://www.googleapis.com/auth/indexing"],
//   undefined
// );

// async function indexSite(body: { _type: string; slug: string }) {
//   jwtClient.authorize(async function (err, tokens: any) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "https://indexing.googleapis.com/v3/urlNotifications:publish",
//         {
//           url: `${
//             body?._type === "project"
//               ? `https://sebastianaanstad.com/project/${body?.slug}`
//               : body?._type === "page"
//                 ? `https://sebastianaanstad.com/${body?.slug}`
//                 : "https://sebastianaanstad.com/"
//           }`,
//           type: "URL_UPDATED",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${tokens.access_token}`,
//           },
//         }
//       );
//       console.info(response);
//       if (response.status === 200) {
//         return new NextResponse(response.statusText, {
//           status: response.status,
//           statusText: response.statusText,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   try {
//     const response = await axios.get(
//       body?._type === "project"
//         ? `https://bing.com/indexnow?url=https://sebastianaanstad.com/project/${body?.slug}&key=beb76b749c654ab7a61b3dfb732ecfac`
//         : body?._type === "page"
//           ? `https://bing.com/indexnow?url=https://sebastianaanstad.com/${body?.slug}&key=beb76b749c654ab7a61b3dfb732ecfac`
//           : "https://bing.com/indexnow?url=https://sebastianaanstad.com&key=beb76b749c654ab7a61b3dfb732ecfac"
//     );
//     console.info(response);
//     return new NextResponse(response.request?.finished, {
//       status: response.status,
//       statusText: response.statusText,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, revalidateSecret);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
