import App from "./App";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/pages/About";
import TestComp from "./components/pages/TestComp";
import Logout from "./components/auth/Logout";

export default [
    {path: '/', name:'home', component: LandingPage},
    {path: '/todo', name:'app', component: App, meta: { requiresAuth: true }},
    {path: '/login', name:'login', component: Login, meta: { requiresVisitor: true }, props:true},
    {path: '/logout', name:'logout', component: Logout},
    {path: '/register', name:'register', component: Register, meta: { requiresVisitor: true }},
    {path: '/about', name:'about', component: About},
    {path: '/test-param/:id', name:'test-param', component: TestComp},

]