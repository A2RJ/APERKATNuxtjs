export default async function ({ app, route, redirect }) {
  if (!app.$isAuthorized("prodi")) {
    return redirect("/");
  }

  if (app.$route().includes("/pengajuan/subordinate/edit")) {
    const { status } = await app.$isYourSubmission();
    if (status === "invalid") {
      return redirect("/");
    }
  }
}
