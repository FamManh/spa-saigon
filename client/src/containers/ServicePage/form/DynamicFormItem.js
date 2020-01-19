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
    Tooltip
} from "antd";
import selectors from "../selectors";
import { tailFormItemLayout } from "../../shared/styles/FormWrapper";
import { useSelector } from "react-redux";

const dynamicFormItemLayout = {
    wrapperCol: {
        md: {
            span: 18,
            offset: 6
        },
        lg: {
            span: 12,
            offset: 4
        }
    }
};

const DynamicFormItem = ({ match, onChange, initialValue }) => {
    let isEditing = () => {
        return !!match.params.id;
    };
    let serviceSchema = {
        vnname: "",
        runame: "",
        price: "",
        duration: "",
        sauna: false
    };
    const [serviceItems, setServiceItems] = useState(null);
        console.log(initialValue);
    const handleChange = (name, value, index) => {
        // console.log("name: " + name + " .value: " + value + ". key: " + index);
        // console.log(serviceItems);
        // let tempServiceItem = [...serviceItems];
        // tempServiceItem[index][name] = value;
        // // console.log(tempServiceItem);
        // setServiceItems(tempServiceItem);

        let temp = serviceItems.map(({ ...val }, key) => {
            if (index === key) {
                val[name] = value;
            }
            return val;
        });
        setServiceItems(temp);
    };

    const add = () => {
        setServiceItems([...serviceItems, serviceSchema]);
    };

    const remove = index => {
        let tempServiceItems = [...serviceItems];
        tempServiceItems.splice(index, 1);
        setServiceItems(tempServiceItems);
    };

    useEffect(() => {
        setServiceItems(initialValue ? [...initialValue] : [serviceSchema]);
    }, [initialValue]);

    useEffect(() => {
        onChange(serviceItems);
    }, [serviceItems]);

    const renderFormItem = () => {
        console.log('ngu lo');
        console.log(serviceItems);
        return serviceItems
            ? serviceItems.map((service, key) => {
                  return (
                      <Form.Item key={key} {...dynamicFormItemLayout}>
                          <Row gutter={8} style={{ verticalAlign: "center" }}>
                              <Col xs={24} sm={2}>
                                  <Tooltip title="Dịch vụ phòng xông?">
                                      <Button
                                          onClick={_ =>
                                              handleChange(
                                                  "sauna",
                                                  !service.sauna,
                                                  key
                                              )
                                          }
                                          type={
                                              service.sauna
                                                  ? "primary"
                                                  : "default"
                                          }
                                          icon="bg-colors"
                                      />
                                  </Tooltip>
                              </Col>
                              <Col
                                  xs={24}
                                  sm={6}
                                  style={{ padding: "0px 4px" }}
                              >
                                  <Input
                                      value={service.vnname}
                                      name="vnname"
                                      onChange={e =>
                                          handleChange(
                                              e.target.name,
                                              e.target.value,
                                              key
                                          )
                                      }
                                      placeholder="Tên (tiếng việt)"
                                  />
                              </Col>
                              <Col
                                  xs={24}
                                  sm={6}
                                  style={{ padding: "0px 4px" }}
                              >
                                  <Input
                                      value={service.runame}
                                      name="runame"
                                      onChange={e =>
                                          handleChange(
                                              e.target.name,
                                              e.target.value,
                                              key
                                          )
                                      }
                                      placeholder="Tên (tiếng nga)"
                                  />
                              </Col>
                              <Col
                                  xs={24}
                                  sm={4}
                                  style={{ padding: "0px 4px" }}
                              >
                                  <InputNumber
                                      value={service.price}
                                      name="price"
                                      onChange={value =>
                                          handleChange("price", value, key)
                                      }
                                      placeholder="Tiền"
                                      style={{ width: "100%" }}
                                  />
                              </Col>
                              <Col
                                  xs={24}
                                  sm={4}
                                  style={{ padding: "0px 4px" }}
                              >
                                  <InputNumber
                                      value={service.duration}
                                      name="duration"
                                      onChange={value =>
                                          handleChange("duration", value, key)
                                      }
                                      placeholder="Thời gian"
                                      style={{ width: "100%" }}
                                  />
                              </Col>
                              {serviceItems && serviceItems.length > 1 && (
                                  <Col
                                      xs={24}
                                      sm={2}
                                      style={{ padding: "0px 4px" }}
                                  >
                                      <Icon
                                          onClick={() => remove(key)}
                                          className="dynamic-delete-button"
                                          type="minus-circle-o"
                                      />
                                  </Col>
                              )}
                          </Row>
                      </Form.Item>
                  );
              })
            : null;
    };

    return (
        <div>
            {renderFormItem()}
            <Form.Item className="form-buttons" {...tailFormItemLayout}>
                <Button onClick={add} icon="plus">
                    Thêm
                </Button>
            </Form.Item>
        </div>
    );
};

export default DynamicFormItem;
