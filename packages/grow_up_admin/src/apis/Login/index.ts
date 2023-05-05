import axios from "api/index";

import LoginMethodConfig from "./Login";
import ForgetPasswordConfig from "./ForgetPassword";
import PhoneLoginConfig from "./PhoneLogin";

axios.setConfig("LoginMethod", LoginMethodConfig);
axios.setConfig("ForgetPassword", ForgetPasswordConfig);
axios.setConfig("PhoneLogin", PhoneLoginConfig);

export default axios;
