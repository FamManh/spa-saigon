import React, {useState} from 'react';
import { Input, Icon, Menu, Dropdown } from "antd";

const handleClick = () => {
    console.log("Click")
}



function Calculator() {
    const [history, setHistory] = useState([]);
    const [text, setText] = useState("")
    const menu = (
        <Menu>
            {history.map((item, index) => (
                <Menu.Item onClick={()=>setText(item)} key={index}>
                    {item}
                </Menu.Item>
            ))}
        </Menu>
    );
    const handlePressEnter = () => {
        try{
            const result = eval(text);
            setHistory([...history, text]);
            setText(result);
        }catch(error){

        }
    }
    return (
        <Input
            onPressEnter={handlePressEnter}
            value={text}
            onChange={e=>setText(e.target.value)}
            style={{ margin: "5px 0px" }}
            addonAfter={
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Icon type="caret-down" />
                </Dropdown>
            }
            defaultValue="Ô tính"
        />
    );
}

export default Calculator;
