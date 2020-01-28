import React, { useState } from "react";
import Toolbar from "../../shared/styles/Toolbar";
import { Button, Input, Form } from "antd";
import {useSelector, useDispatch} from 'react-redux';
import selectors from "../selectors";
import actions from "../actions";
const InputGroup = Input.Group;
const  ListToolbar = () => {
    // const dataLoading = useSelector(selectors.selectDataLoading);
    const saveLoading = useSelector(selectors.selectSaveLoading);
    const dispatch = useDispatch();
    const [note, setNote] = useState("")



 

   
    // const onReload = () => {
    //     dispatch(actions.list());
    // }

    const onSubmit = (event)=>{
        event.preventDefault();
        dispatch(actions.doCreate({ content: note }));
    }

    return (
        <Toolbar style={{ marginBottom: "60px" }}>
            <Form onSubmit={onSubmit}>
                <InputGroup compact>
                    <Input
                        style={{ width: "86%" }}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                    <Button
                        icon="check"
                        htmlType="submit"
                        style={{ width: "10%" }}
                        loading={saveLoading}
                    ></Button>
                </InputGroup>
            </Form>
        </Toolbar>
    );
}

export default ListToolbar;
