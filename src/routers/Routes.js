import loadable from '@loadable/component'


export const Login = loadable(() => import("../pages/LoginComp"))
export const Signup = loadable(() => import("../pages/SignupComp"))
export const Home = loadable(() => import("../pages/HomeComp"))
export const SendMoney = loadable(() => import("../pages/SendMoneyComp"))
export const History = loadable(() => import("../pages/HistoryComp"))




