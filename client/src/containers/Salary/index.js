import React, { useState, useEffect } from "react";
import PageTitle from "../shared/styles/PageTitle";
import FormWrapper from "../shared/styles/FormWrapper";
import { Input, InputNumber, Form, Button, Row, Col } from "antd";
import FilterWrapper from "../shared/styles/FilterWrapper";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import ContentWrapper from "../Layout/styles/ContentWrapper";
import Layout from "../Layout";

const SalaryPage = () => {
    const [revenue, setRevenue] = useState(0);
    const [change, setChange] = useState(26);
    const [prize, setPrize] = useState(0);
    const [dot, setDot] = useState(1);
    const [salary, setSalary] = useState(0);
    const [hardSalary, setHardSalary] = useState(0);
    const [percent, setPercent] = useState(0);

    const calculatePercent = () => {
        let percent = 0;
        if (0 <= revenue && revenue <= 120000) {
            percent = 5;
        } else if (120001 <= revenue && revenue <= 130000) {
            percent = 5.5;
        } else if (130001 <= revenue && revenue <= 140000) {
            percent = 6;
        } else if (140001 <= revenue && revenue <= 150000) {
            percent = 6.5;
        } else if (150001 <= revenue && revenue <= 160000) {
            percent = 7;
        } else if (160001 <= revenue && revenue <= 170000) {
            percent = 7.5;
        } else if (170001 <= revenue && revenue <= 180000) {
            percent = 8;
        } else if (180001 <= revenue && revenue <= 190000) {
            percent = 8.5;
        } else if (190001 <= revenue && revenue <= 200000) {
            percent = 9;
        } else if (200001 <= revenue && revenue <= 210000) {
            percent = 9.1;
        } else if (210001 <= revenue && revenue <= 220000) {
            percent = 9.2;
        } else if (220001 <= revenue && revenue <= 230000) {
            percent = 9.3;
        } else if (230001 <= revenue && revenue <= 240000) {
            percent = 9.4;
        } else if (240001 <= revenue && revenue <= 250000) {
            percent = 9.5;
        } else if (250001 <= revenue && revenue <= 260000) {
            percent = 9.6;
        } else if (260001 <= revenue && revenue <= 270000) {
            percent = 9.7;
        } else if (270001 <= revenue && revenue <= 280000) {
            percent = 9.8;
        } else if (280001 <= revenue && revenue <= 290000) {
            percent = 9.9;
        } else if (290001 <= revenue && revenue <= 300000) {
            percent = 10;
        }
        return percent;
    };

    const calculateSalary = e => {
        e.preventDefault();
        setPercent(calculatePercent());
        setHardSalary(6100 * dot * (change / 26));

        // hardSalary * dot + revenue * percent + prize
        setSalary(
            6100 * dot * (change / 26) + (revenue / 100) * percent + prize
        );
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 }
        }
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 20,
                offset: 4
            },
            sm: {
                span: 20,
                offset: 4
            }
        }
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
    return (
        <ContentWrapper>
            <PageTitle>Tính lương</PageTitle>
            <FormWrapper>
                <Form {...formItemLayout} onSubmit={calculateSalary}>
                    <Form.Item label="Tiền làm khách">
                        <InputNumber
                            min={0}
                            max={400000}
                            defaultValue={revenue}
                            style={{ width: "100%" }}
                            onChange={value => setRevenue(value)}
                        />
                    </Form.Item>
                    <Form.Item label="Chấm">
                        <InputNumber
                            min={1}
                            max={5}
                            defaultValue={dot}
                            style={{ width: "100%" }}
                            onChange={value => setDot(value)}
                        />
                    </Form.Item>
                    <Form.Item label="Số ngày làm việc">
                        <InputNumber
                            defaultValue={change}
                            min={0}
                            max={31}
                            style={{ width: "100%" }}
                            onChange={value => setChange(value)}
                        />
                    </Form.Item>
                    <Form.Item label="Thưởng">
                        <InputNumber
                            defaultValue={prize}
                            min={0}
                            max={20000}
                            style={{ width: "100%" }}
                            onChange={value => setPrize(value)}
                        />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Tính lương
                        </Button>
                    </Form.Item>
                </Form>
            </FormWrapper>
            <Row>
                <Col md={24}>
                    <Text type="secondary">* Công thức tính lương:</Text>
                    <br />
                    <Text type="danger">
                        {" "}
                        Lương cứng (26 ngày = 6100) * chấm + Tiền làm khách *
                        phần trăm + tiền thưởng
                    </Text>
                </Col>
            </Row>

            <FilterWrapper>
                <Row>
                    <Col md={24} lg={12}>
                        <DescriptionItem
                            title="Lương cứng"
                            content={new Intl.NumberFormat().format(hardSalary)}
                        />
                    </Col>
                    <Col md={24} lg={12}>
                        <DescriptionItem
                            title="Phần trăm"
                            content={percent + " %"}
                        />
                    </Col>
                    <Col md={24} lg={12}>
                        <DescriptionItem
                            title="Tiền làm khách"
                            content={new Intl.NumberFormat().format(
                                (revenue / 100) * percent
                            )}
                        />
                    </Col>
                    <Col md={24} lg={12}>
                        <DescriptionItem
                            title="Tiền thưởng"
                            content={new Intl.NumberFormat().format(prize)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <Title level={2}>
                            Lương của bạn là:{" "}
                            <Text type="danger">
                                {new Intl.NumberFormat().format(
                                    hardSalary +
                                        (revenue / 100) * percent +
                                        prize
                                )}
                            </Text>
                        </Title>
                    </Col>
                </Row>
            </FilterWrapper>
        </ContentWrapper>
    );
};

export default Layout(SalaryPage);
