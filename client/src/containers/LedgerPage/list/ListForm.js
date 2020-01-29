import { Button, Col, Form, Row, Select, Tooltip, Divider, Radio } from "antd";
import actions from "../actions";
import selectors from "../selectors";
import serviceActions from "../../ServicePage/actions";
import serviceSelectors from "../../ServicePage/selectors";
import shiftSelectors from "../../ShiftPage/selectors";
import React, { useEffect } from "react";
import FilterWrapper from "../../shared/styles/FilterWrapper";
import { useSelector, useDispatch } from "react-redux";
import DynamicFormItem from "./DynamicFormItem";
import Text from "antd/lib/typography/Text";
import Calculator from "../../../components/Calculator";
const { Option } = Select;

const descriptionTitle = (label, content) => {
    return (
        <Text style={{ fontSize: "14px", margin: "0px 5px" }}>
            {label}: <Text strong>{content}</Text>
        </Text>
    );
};

const calculateFields = (data, field) => {
    let sum = 0;
    data.forEach(item => {
        sum += item[field];
    });
    return sum;
};

const ListForm = ({ form }) => {
    const dispatch = useDispatch();
    const services = useSelector(serviceSelectors.selectServices);
    const lastSauna = useSelector(selectors.selectLastSauna);
    const lastMasseur = useSelector(selectors.selectLastMasseur);
    const serviceItems = useSelector(selectors.selectServiceItems);
    const link = useSelector(selectors.selectLink);
    const clear = useSelector(selectors.selectClear);
    const discount = useSelector(selectors.selectDiscount);
    const paymentMethod = useSelector(selectors.selectPaymentMethod);
    const shiftRecord = useSelector(shiftSelectors.selectRecord);
    const saveLoading = useSelector(selectors.selectSaveLoading);

    let doSubmit = () => {
        dispatch(actions.doCreate(serviceItems, shiftRecord.id));
    };

    let transformServiceItems = items => {
        let tempServiceItems = [];
        items.forEach(item => {
            let { vnname, runame, price, duration, sauna } = item;
            let temp = {
                vnname,
                runame,
                staff: sauna ? lastSauna : lastMasseur,
                cash:
                    paymentMethod === "cash"
                        ? (price / 100) * (100 - discount)
                        : 0,
                certificate:
                    paymentMethod === "certificate"
                        ? (price / 100) * (100 - discount)
                        : 0,
                duration,
                sauna,
                flag: false,
                price
            };
            tempServiceItems.push(temp);
        });
        return tempServiceItems;
    };

    let onServiceSelect = id => {
        let tempService = services.filter(service => service.id === id)[0];
        dispatch(
            actions.doServiceSelect(transformServiceItems(tempService.items))
        );
    };

    useEffect(() => {
        dispatch(serviceActions.list());
    }, []);
    return (
        <FilterWrapper>
            <Form
                layout="inline"
                onSubmit={e => {
                    e.preventDefault();
                    form.validateFields((err, values) => {
                        if (!err) {
                            doSubmit(values);
                        }
                    });
                }}
            >
                <Form.Item label="">
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Chọn mã dịch vụ"
                        onSelect={onServiceSelect}
                        // onFocus={this.onFocus}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {services.map((item, index) => (
                            <Option key={index} value={item.id}>
                                {item.code}
                            </Option>
                        ))}
                    </Select>
                    <Tooltip title="Giữ lại dịch vụ cũ?">
                        <Button
                            style={{
                                margin: "3px"
                            }}
                            onClick={() => dispatch(actions.doClearChange())}
                            type={clear ? "danger" : null}
                            icon="pushpin"
                        />
                    </Tooltip>
                    <Tooltip title="Liên kết các dịch vụ?">
                        <Button
                            style={{
                                margin: "3px"
                            }}
                            onClick={() => dispatch(actions.doLinkChange())}
                            type={link ? "primary" : null}
                            icon="link"
                        />
                    </Tooltip>
                </Form.Item>
                <Form.Item>
                    <Radio.Group
                        onChange={e =>
                            dispatch(actions.doDiscountChange(e.target.value))
                        }
                        defaultValue={discount}
                        buttonStyle="solid"
                    >
                        <Radio.Button value={0}>0</Radio.Button>
                        <Radio.Button value={5}>5</Radio.Button>
                        <Radio.Button value={10}>10</Radio.Button>
                        <Radio.Button value={15}>15</Radio.Button>
                        <Radio.Button value={20}>20</Radio.Button>
                    </Radio.Group>
                    {/* <InputNumber  onChange={async value => {await this.setState({discount: value}); this.calculatePrice()}} min={0} max={100} defaultValue={0}/> */}
                    {!!serviceItems.length &&
                        descriptionTitle(
                            "Tiền mặt",
                            calculateFields(serviceItems, "cash")
                        )}
                    {!!serviceItems.length &&
                        descriptionTitle(
                            "Certificate",
                            calculateFields(serviceItems, "certificate")
                        )}
                    {!!serviceItems.length &&
                        !!calculateFields(serviceItems, "certificate") &&
                        !!calculateFields(serviceItems, "cash") &&
                        descriptionTitle(
                            "Tổng",
                            calculateFields(serviceItems, "certificate") +
                                calculateFields(serviceItems, "cash")
                        )}
                </Form.Item>
                <DynamicFormItem />
                <Divider orientation="left">
                    <Radio.Group
                        defaultValue={paymentMethod}
                        buttonStyle="solid"
                        style={{ margin: "5px" }}
                        size="small"
                        onChange={e =>
                            dispatch(
                                actions.doPaymentMethodChange(e.target.value)
                            )
                        }
                    >
                        <Radio.Button value="cash">Cash</Radio.Button>
                        <Radio.Button value="certificate">
                            Certificate
                        </Radio.Button>
                    </Radio.Group>
                </Divider>
                <Row>
                    <Col span={24}>
                        <Button
                            loading={saveLoading}
                            icon="plus"
                            type="primary"
                            htmlType="submit"
                        >
                            Thêm tua
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span={24}>
                    <Calculator />
                </Col>
            </Row>
        </FilterWrapper>
    );
};

export default Form.create()(ListForm);
