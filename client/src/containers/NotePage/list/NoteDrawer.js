import React, { useEffect, useState } from "react";
import { Drawer, Button, Divider, Row, Col, Checkbox, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../selectors";
import actions from "../actions";
import ListToolbar from "./ListToolbar";
import Text from "antd/lib/typography/Text";
const InputGroup = Input.Group;
const pStyle = {
    fontSize: 16,
    color: "rgba(0,0,0,0.85)",
    lineHeight: "24px",
    display: "block",
    marginBottom: 16
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: "22px",
            marginBottom: 7,
            color: "rgba(0,0,0,0.65)"
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: "inline-block",
                color: "rgba(0,0,0,0.85)"
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);

const NoteDrawer = () => {
    const dispatch = useDispatch();

    const visible = useSelector(selectors.selectVisible);
    const notes = useSelector(selectors.selectNotes); 
    const [drawerWidth, setDrawerWidth] = useState("576")

    let toggleMenuOnResize = () => {
        window.innerWidth < 576 ? setDrawerWidth("100%") : setDrawerWidth("576");
    };
    
    useEffect(() => {
        dispatch(actions.list({}));
        toggleMenuOnResize();
        window.addEventListener("resize", toggleMenuOnResize);
        return () => {
            window.removeEventListener("resize", toggleMenuOnResize);
        };
    }, []);

    const handleCheckedChange = (note)=>{
        dispatch(actions.doUpdate(note.id, {isRead: !note.isRead}));
    }

    const renderNote = (note, key) => {
        return (
            <div key={key}>
                <Checkbox
                    style={{
                        margin: "0px 5px",
                        padding: "0",
                        fontSize: "16px",
                        width: "100%"
                    }}
                    checked={note.isRead}
                    onChange={() => handleCheckedChange(note)}
                >
                    {note.isRead ? (
                        <Text delete>{note.content}</Text>
                    ) : (
                        <Text>{note.content}</Text>
                    )}
                </Checkbox>
                <Divider />
            </div>
        );
    };

    return (
        <Drawer
            title="Ghi chú"
            placement="right"
            width={drawerWidth}
            closable={true}
            onClose={() => dispatch(actions.doToggle())}
            visible={visible}
        >
            <ListToolbar />
            {notes.map((note, key) => renderNote(note, key))}
            <div style={{ textAlign: "center" }}>
                <Button
                    type="link"
                    onClick={() =>
                        dispatch(actions.readmore({ skip: notes.length }))
                    }
                >
                    Xem thêm
                </Button>
            </div>
        </Drawer>
    );
};

export default NoteDrawer;
