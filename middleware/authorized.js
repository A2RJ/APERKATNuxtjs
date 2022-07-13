import axios from "axios";

export default function ({ route, store, redirect }) {
  const auth = store.state.auth;
  const fullPath = route.fullPath;

  if (auth.loggedIn) {
    const user = {
      prodi: false,
      fakultas: false,
      dirKeuangan: false,
      warek: false,
      warek2: false,
      rektor: false,
      sekniv: false,
      dirKeuanganAssist: false,
      userLogin: auth.user[0],
      level: auth.user[1].level,
    };

    if (user.userLogin == 120 || user.userLogin == 121) {
      user.dirKeuanganAssist = true;
    }

    if (user.userLogin == 23) {
      user.warek2 = true;
    }

    if (user.level == "prodi") {
      user.prodi = true;
    } else if (user.level == "fakultas") {
      user.fakultas = true;
    } else if (user.level == "dirKeuangan") {
      user.dirKeuangan = true;
    } else if (user.level == "warek") {
      user.warek = true;
    } else if (user.level == "rektor") {
      user.rektor = true;
    } else if (user.level == "sekniv") {
      user.sekniv = true;
    }

    store = user;
  } else {
    if (fullPath !== "/login") return redirect("/login");
  }
}
