import React from "react";
import { Button, Checkbox, Form, Input, Typography, Row } from "antd";
import { Eye, Mail, Triangle } from "react-feather";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from './actions';
import selectors from './selectors';
import Layout from "../Layout";

const FormItem = Form.Item;
const { Text } = Typography;
const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const HomePage  = () => {
   
    return <div>Hello viet name</div>;
};

export default Layout(HomePage);
