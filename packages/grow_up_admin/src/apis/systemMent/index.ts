import axios from "api/index";

import deptMentConfig from "./deptMent";
import accountMentConfig from "./accountMent";
import roleMentConfig from "./roleMent";

axios.setConfig("deptMent", deptMentConfig);
axios.setConfig("accountMent", accountMentConfig);
axios.setConfig("roleMent", roleMentConfig);

export default axios;
