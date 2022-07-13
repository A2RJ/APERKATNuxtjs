import axios from "axios";

export default function ({ app, route, store, redirect }) {
  const auth = store.state.auth;
  const fullPath = route.fullPath;

  if (auth.loggedIn) {
    console.log(app.$authMiddleware().isAuthorized("warek"));
  } else {
    if (fullPath !== "/login") return redirect("/login");
  }
}
