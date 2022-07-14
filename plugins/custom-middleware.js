import axios from "axios";

// app, route, store, redirect
export default ({ app, route, store }, inject) => {
  inject("user", () => {
    const auth = store.state.auth.user;
    const user = auth[0];
    return {
      id_user: user.id_user,
      fullname: user.fullname,
      email: user.email,
      role: auth[1].level,
    };
  });

  inject("isAuthorized", (role) => {
    if (!role) throw new Error("Role is required");
    if (typeof role === "string") role = [role];
    return role.includes(store.state.auth.user[1].level);
  });

  inject("isYourSubmission", async () => {
    const { fullPath } = route;
    const lastRoute = fullPath.split("/").pop();

    const { data } = await app.$axios.get(`/pengajuan/${lastRoute}`);
    if (!data) return false;
    return +data.data.id_user === +store.state.auth.user[0].id_user;
  });

  inject("isSubDivisi", async (id_submission) => {
    if (!id_submission) throw new Error("Id submission is required");
    const { data } = await axios.get(`/pengajuan/${id_submission}`);
    return data;
  });
};
