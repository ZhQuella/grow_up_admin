import type { RequestItem } from "types/Request";
import axios from "api/index";
import LoginMethodConfig from "./Login";

axios.setConfig("LoginMethod", LoginMethodConfig as RequestItem[]);

export default axios;
