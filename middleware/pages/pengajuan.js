export default async function ({ app, route, redirect }) {
  const isValid = await app.$isYourSubmission();
  if (!isValid && !app.$isAuthorized("prodi")) {
    return redirect("/");
  }
}
