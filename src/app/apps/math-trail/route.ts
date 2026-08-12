import {mathTrailHtml} from "./source";

export const dynamic = "force-static";
export async function GET(){
  return new Response(mathTrailHtml,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=0, must-revalidate"}});
}
