import {Router} from "./core/routing/router";
import {SignInPage} from "./screens/signin/signin";
import {SignUpPage} from "./screens/signup/signup";
import {SettingsPage} from "./screens/settings/settings";
import {ChatPage} from "./screens/chat/chat";

export const router = new Router("app");

router
  .use("/", SignInPage)
  .use("/sign-up", SignUpPage)
  .use("/settings", SettingsPage)
  .use("/messenger", ChatPage)
  .start();
