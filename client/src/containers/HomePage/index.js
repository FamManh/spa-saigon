import React from "react";
// import styled from "styled-components";
import Layout from "../Layout";
import { Redirect } from "react-router-dom";

// const Content = styled.div`
//     max-width: 400px;
//     z-index: 2;
//     min-width: 300px;
// `;

const HomePage  = () => {
   
    return <Redirect to="/shift"/>;
};

export default Layout(HomePage);
