const privateRoutes = [
    {
        path: "/",
        exact: true,
        loader: () => import("./HomePage"),
        menu: {
            exact: true
        },
        label: "Trang chủ",
        permissionRequired: null,
        icon: "home"
    }
];

const authRoutes = [
    {
        path: "/signin",
        exact: true,
        loader: () => import("./SigninPage")
    }
];

const publicRoutes = [

];

const errorRoutes = [

]

export default {
    privateRoutes, 
    publicRoutes,
    authRoutes,
    errorRoutes
}