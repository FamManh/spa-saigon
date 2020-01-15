import { Icon, Layout, Menu, Dropdown, Avatar } from 'antd';
import React, { Component } from 'react';
import HeaderWrapper from './styles/HeaderWrapper';
import selectors from './selectors';
import actions from './actions';
import {useDispatch, useSelector} from 'react-redux';
const { Header: AntHeader } = Layout;


const Header = () => {
  const dispatch = useDispatch();
  let doSignout = () => {
    // dispatch(actions.doSignout());
  };

  let doNavigateToProfile = () => {
    // getHistory().push('/profile');
  };

  let doToggleMenu = () => {
    dispatch(actions.doToggleMenu());
  };

  let userMenu = (
    <Menu selectedKeys={[]}>
      <Menu.Item
        onClick={doNavigateToProfile}
        key="userCenter"
      >
        <Icon type="user" />
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={doSignout} key="logout">
        <Icon type="logout" />
        Thoát
      </Menu.Item>
    </Menu>
  );


    return (
        <HeaderWrapper>
            <AntHeader>
                <Icon
                    className="trigger"
                    type={
                        useSelector(selectors.selectMenuVisible)
                            ? "menu-fold"
                            : "menu-unfold"
                    }
                    onClick={doToggleMenu}
                />
                <div>
                    <Dropdown
                        className="user-dropdown"
                        overlay={userMenu}
                        trigger={["click"]}
                    >
                        <span>
                            <Avatar
                                className="user-dropdown-avatar"
                                size="small"
                                src={undefined}
                                alt="avatar"
                            />
                            <span className="user-dropdown-text">
                                 Manh
                            </span>
                        </span>
                    </Dropdown>
                </div>
            </AntHeader>
        </HeaderWrapper>
    );
  
}

export default Header;
