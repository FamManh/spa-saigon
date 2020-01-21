import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Checkbox,
    InputNumber,
    Icon,
    Button,
    Tooltip,
    Select
} from "antd";
import selectors from "../selectors";
import staffSelectors from "../../StaffPage/selectors";
import { tailFormItemLayout } from "../../shared/styles/FormWrapper";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions";

const { Option } = Select;

const DynamicFormItem = () => {
    const dispatch = useDispatch();
    const staffs = useSelector(staffSelectors.selectStaffs);

    const link = useSelector(selectors.selectLink);
    const clear = useSelector(selectors.selectClear);
    const discount = useSelector(selectors.selectDiscount);
    const paymentMethod = useSelector(selectors.selectPaymentMethod);
    const serviceItems = useSelector(selectors.selectServiceItems);

    const handleChange = (name, value, index) => {
        dispatch(actions.doServiceItemsChange(name, value, index));
    };

    const add = () => {
        // setServiceItems([...serviceItems, serviceSchema]);
    };

    const remove = index => {
        // let tempServiceItems = [...serviceItems];
        // tempServiceItems.splice(index, 1);
        // setServiceItems(tempServiceItems);
    };

    const renderFormItem = () => {
        return serviceItems.map((service, key) => (
            <Row key={key} style={{ margin: "5px 0px" }}>
                <Col xs={24} md={5} style={{ padding: "0px 4px" }}>
                    <Select
                        name="staff"
                        showSearch
                        placeholder="Nhân viên"
                        value={service.staff}
                        onChange={async value => {
                            if (service.sauna) {
                                await dispatch(actions.doSaunaChange(value));
                            } else {
                                await dispatch(actions.doMasseurChange(value));
                            }
                            handleChange("staff", value, key);
                        }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {staffs.map((staff, index) => (
                            <Option key={index} value={staff.id}>
                                {staff.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} md={5} style={{ padding: "0px 4px" }}>
                    <Input
                        value={service.vnname}
                        name="vnname"
                        onChange={e =>
                            handleChange(e.target.name, e.target.value, key)
                        }
                        placeholder="Tên (tiếng việt)"
                    />
                </Col>

                <Col xs={24} md={4} style={{ padding: "0px 4px" }}>
                    <InputNumber
                        value={service.cash}
                        name="cash"
                        onChange={value => handleChange("price", value, key)}
                        placeholder="Tiền mặt"
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col xs={24} md={4} style={{ padding: "0px 4px" }}>
                    <InputNumber
                        value={service.certificate}
                        name="certificate"
                        onChange={value =>
                            handleChange("certificate", value, key)
                        }
                        placeholder="Certificate"
                        style={{ width: "100%" }}
                    />
                </Col>

                <Col xs={24} md={6} style={{ padding: "0px 4px" }}>
                    <Tooltip title="Đánh dấu?">
                        <Button
                            onClick={_ =>
                                handleChange("flag", !service.flag, key)
                            }
                            type={service.flag ? "primary" : "default"}
                            icon="flag"
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            onClick={() =>
                                dispatch(actions.doServiceItemRemoveClick(key))
                            }
                            icon="minus"
                        />
                    </Tooltip>
                    <Tooltip title="Thêm">
                        <Button
                            onClick={() =>
                                dispatch(actions.doServiceItemAddClick(key))
                            }
                            icon="plus"
                        />
                    </Tooltip>
                </Col>
            </Row>
        ));
    };

    return <div>{renderFormItem()}</div>;
};

export default DynamicFormItem;
