export default ({ app, route, store, redirect }, inject) => {
  inject("authMiddleware", () => {
    const auth = store.state.auth.user;
    return {
      id_user: auth[0].id_user,
      fullname: auth[0].fullname,
      email: auth[0].email,
      role: auth[1].level,
      /**
       * isAuthorized
       * @param {array or string} role
       * @returns true or false
       */
      isAuthorized: (role) => {
        if (!role)
          throw new Error("Role is required in authMiddleware function");
        if (typeof role === "string") role = [role];
        return role.includes(auth[1].level);
      },
    };
  });
};
