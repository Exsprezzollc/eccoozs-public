export async function GET(request: Request) {
  return Response.redirect(
    new URL("/apps/vocabulary-adventure/index.html", request.url),
    307,
  );
}
