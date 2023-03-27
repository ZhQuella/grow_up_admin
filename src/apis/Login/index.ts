import type { RequestItem } from "types/Request";
import axios from "api/index";

import LoginMethodConfig from "./Login";
import ForgetPasswordConfig from "./ForgetPassword";
import PhoneLoginConfig from "./PhoneLogin";

axios.setConfig("LoginMethod", LoginMethodConfig as RequestItem[]);
axios.setConfig("ForgetPassword", ForgetPasswordConfig as RequestItem[]);
axios.setConfig("PhoneLogin", PhoneLoginConfig as RequestItem[]);

export default axios;
