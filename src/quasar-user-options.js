import "./styles/quasar.sass";
import "@quasar/extras/material-icons/material-icons.css";
import auth from './boot/auth'
// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {},
  boot: [auth],
};
