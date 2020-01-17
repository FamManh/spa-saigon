import { Layout as AntLayout, Menu as AntMenu, Icon } from "antd";
import React, { useEffect, useState } from "react";
import SiderWrapper from "./styles/SiderWrapper";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import selectors from "./selectors";
import actions from "./actions";
import routes from "../routes";
const { Sider } = AntLayout;

const Menu = ({ url }) => {
    const dispatch = useDispatch();
    const [selectedKeys, setSelectedKeys] = useState(null);
    // constructor(props) {
    //   super(props);
    //   this.state = { width: 0, height: 0 };
    // }

    // componentDidMount() {
    //   this.toggleMenuOnResize();
    //   window.addEventListener(
    //     'resize',
    //     this.toggleMenuOnResize,
    //   );
    // }

    // componentWillUnmount() {
    //   window.removeEventListener(
    //     'resize',
    //     this.toggleMenuOnResize,
    //   );
    // }

    let hideMenu = () => {
        dispatch(actions.doHideMenu());
    };

    let showMenu = () => {
        dispatch(actions.doShowMenu());
    };

    let toggleMenuOnResize = () => {
        window.innerWidth < 576 ? hideMenu() : showMenu();
    };

    let getSelectedKeys = () => {
        const match = routes.privateRoutes.find(option => {
            // if (option.menu.exact) {
            //     return setSelectedKeys(url);
            // }
            return setSelectedKeys([url]);

            // return setSelectedKeys(url.startsWith(option.path));
        });

        if (match) {
            return setSelectedKeys([match.path]);
        }

        return null;
    };

    let match = permission => {
        // const permissionChecker = new PermissionChecker(
        //   this.props.currentUser,
        // );
        // return permissionChecker.match(permission);
    };

    useEffect(() => {
        toggleMenuOnResize();
        window.addEventListener("resize", toggleMenuOnResize);
        getSelectedKeys();
        return () => {
            window.removeEventListener("resize", toggleMenuOnResize);
        };
    }, []);
    return (
        <SiderWrapper
            style={{
                display: useSelector(selectors.selectMenuVisible)
                    ? "block"
                    : "none"
            }}
        >
            <Sider theme="light" trigger={null}>
                <div className="logo">
                    <h2>Saigon</h2>
                </div>

                <AntMenu
                    theme="light"
                    mode="inline"
                    selectedKeys={selectedKeys}
                >
                    {routes.privateRoutes
                        .filter(privateRoute => !!privateRoute.menu)
                        .map(route => (
                            <AntMenu.Item key={route.path}>
                                <Link to={route.path}>
                                    <Icon type={route.icon} />
                                    <span>{route.label}</span>
                                </Link>
                            </AntMenu.Item>
                        ))}
                </AntMenu>
            </Sider>
        </SiderWrapper>
    );
};

export default Menu;
