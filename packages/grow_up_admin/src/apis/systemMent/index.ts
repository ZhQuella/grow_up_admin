import axios from "api/index";

import deptMentConfig from "./deptMent";
import accountMentConfig from "./accountMent";

axios.setConfig("deptMent", deptMentConfig);
axios.setConfig("accountMent", accountMentConfig);

export default axios;
