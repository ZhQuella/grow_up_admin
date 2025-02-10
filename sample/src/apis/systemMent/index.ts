import axios from "api/index";

import deptMentConfig from "./deptMent";
import accountMentConfig from "./accountMent";
import roleMentConfig from "./roleMent";
import menuMentConfig from "./menuMent";

axios.setConfig("deptMent", deptMentConfig);
axios.setConfig("accountMent", accountMentConfig);
axios.setConfig("roleMent", roleMentConfig);
axios.setConfig("menuMent", menuMentConfig);

export default axios;
