export default function ({ route, store, redirect }) {
  const fullPath = route.fullPath;
  const auth = store.state.auth;

  if (fullPath.includes("/user") && auth.user[0].id !== 21) {
    return redirect("/");
  }
}
