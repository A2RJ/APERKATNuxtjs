export default async function ({ app, redirect }) {
  if (
    !app.$isAuthorized("sekniv") ||
    !app.$isAuthorized("warek") ||
    !app.$isAuthorized("warek2") ||
    !app.$isAuthorized("dirKeuangan") ||
    !app.$isAuthorized("fakultas")
  ) {
    return redirect("/");
  }

  if (app.$route().includes("pengajuan/supervisor/edit/")) {
    const { status } = await app.$isSubDivisi();
    if (status === "invalid") {
      return redirect("/");
    }
  }
}
