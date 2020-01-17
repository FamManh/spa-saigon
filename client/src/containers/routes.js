const privateRoutes = [
    {
        path: "/",
        exact: true,
        loader: () => import("./HomePage"),
        menu: true,
        label: "Trang chủ",
        permissionRequired: null,
        icon: "home"
    },
    {
        path: "/branch",
        exact: true,
        loader: () => import("./BranchPage/list/ListPage"),
        menu: true,
        label: "Chi nhánh",
        permissionRequired: null,
        icon: "home"
    },
    {
        path: "/branch/new",
        exact: true,
        loader: () => import("./BranchPage/form/FormPage"),
        menu: false,
        label: "Tạo mới chi nhánh",
        permissionRequired: null,
        icon: "home"
    },
    {
        path: "/branch/:id/edit",
        loader: () => import("./BranchPage/form/FormPage"),
        menu: false,
        label: "Tạo mới chi nhánh",
        permissionRequired: null,
        exact: true
    },
    {
        path: "/branch/:id/view",
        loader: () => import("./BranchPage/view/ViewPage"),
        menu: false,
        label: "Thông tin chi nhánh",
        permissionRequired: null,
        exact: true
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
    {
        path: "/401",
        exact: true,
        loader: () => import("./shared/error/Error401Page")
    },
    {
        path: "/403",
        exact: true,
        loader: () => import("./shared/error/Error403Page")
    },
    {
        path: "/404",
        exact: true,
        loader: () => import("./shared/error/Error404Page")
    },
    {
        path: "/500",
        exact: true,
        loader: () => import("./shared/error/Error500Page")
    }
];

export default {
    privateRoutes, 
    publicRoutes,
    authRoutes,
    errorRoutes
}