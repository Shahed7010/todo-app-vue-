import App from "./App";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/pages/About";
import TestComp from "./components/pages/TestComp";

export default [
    {path: '/', name:'home', component: LandingPage},
    {path: '/todo', name:'app', component: App},
    {path: '/login', name:'login', component: Login},
    {path: '/register', name:'register', component: Register},
    {path: '/about', name:'about', component: About},
    {path: '/test-param/:id', name:'test-param', component: TestComp},

]