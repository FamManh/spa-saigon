import React, { useState, useEffect } from "react";
import Icon from "@ant-design/icons";
import { Row, Col, Form, Input, Button, Checkbox, Collapse } from "antd";

import {ChevronRight} from 'react-feather';
import pdfMakeCus from "./pdfMakeCus";
import { getRandomInt, gererateQrCodeText } from "./helpers";
const { Panel } = Collapse;

const TaxiInvoice = ({ form }) => {
    const [iframeDataUrl, setIframeDataUrl] = useState("");
    const [number, setNumber] = useState(getRandomInt(50, 900));
    const [shift, setShift] = useState(getRandomInt(number - 50, number + 100));
    const [date, setDate] = useState("21.09.1997");
    const [time, setTime] = useState("15:23");
    const [price, setPrice] = useState("730,00");
    const [phone, setPhone] = useState("+79995817317");
    const [print, setPrint] = useState(false);
    const header = [
        {
            text: 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "ЯНДЕКС.ТАКСИ"',
            style: "pageHeaderNormal",
            alignment: "center"
        },
        {
            text: "ИНН:  7704340310",
            style: "pageHeaderNormal",
            alignment: "center"
        },
        {
            text: "taxi.yandex.ru",
            style: "pageHeaderNormal",
            alignment: "center"
        },
        {
            text: "Кассовый чек. Приход",
            style: "pageHeaderBold",
            alignment: "center"
        }
    ];

    const sectionOne = [
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "60%",
                    text: `N ${number}`,
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "40%",
                    text: "N АВТ 720760",
                    style: "paragraph"
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "60%",
                    text: `Смена N ${shift}`,
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "40%",
                    text: `${date}  ${time}`,
                    style: "paragraph"
                }
            ],
            columnGap: 10
        }
    ];

    const sectionTwo = [
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "5%",
                    text: "N",
                    style: "paragraph",
                    alignment: "center"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "40%",
                    text: "Наим. пр.",
                    style: "paragraph",
                    alignment: "left"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "20%",
                    text: "Цена за ед. пр.",
                    style: "paragraph",
                    alignment: "right"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "15%",
                    text: "Колич. пр.",
                    style: "paragraph",
                    alignment: "right"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "7%",
                    text: "НДС",
                    style: "paragraph",
                    alignment: "right"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "13%",
                    text: "Сум. пр.",
                    style: "paragraph",
                    alignment: "right"
                }
            ],
            columnGap: 15
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "5%",
                    text: "1.",
                    style: "paragraph",
                    alignment: "center"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "40%",
                    text: "Перевозка пассажиров и багажа",
                    style: "paragraph",
                    alignment: "left"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "20%",
                    text: `${price}`,
                    style: "paragraph",
                    alignment: "right"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "15%",
                    text: "1,000",
                    style: "paragraph",
                    alignment: "right"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "7%",
                    text: "-",
                    style: "paragraph",
                    alignment: "right"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "13%",
                    text: `${price}`,
                    style: "paragraph",
                    alignment: "right"
                }
            ],
            columnGap: 15
        }
    ];

    const sectionThree = [
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "СУММА - ",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: "0,00",
                    style: "paragraph",
                    alignment: "right"
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "АГЕНТ",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: " ",
                    style: "paragraph",
                    alignment: "right"
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "Итого",
                    style: "paragraphBold"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: `${price}`,
                    style: "paragraphBold",
                    alignment: "right",
                    fontSize: 14
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "БЕЗНАЛИЧНЫМИ",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: `${price}`,
                    style: "paragraph",
                    alignment: "right"
                }
            ],
            columnGap: 10
        }
    ];

    const sectionFour = [
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "N ККТ: 0001563332021630",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: "N ФД: 146588",
                    style: "paragraph",
                    alignment: "left"
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "N ФН: 9289000100616591",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: "ФП: 2908364410",
                    style: "paragraph"
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "СНО: ОСН",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: "ЗН ККТ: 00000000381006612955",
                    style: "paragraph"
                }
            ],
            columnGap: 10
        }
    ];

    const sectionFive = [
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: "Эл. адр. получателя:",
                    style: "paragraph"
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: "Эл. адр. отправителя:",
                    style: "paragraph"
                }
            ],
            columnGap: 10
        },
        {
            columns: [
                {
                    // auto-sized columns have their widths based on their content
                    width: "*",
                    text: `${phone}`
                },
                {
                    // star-sized columns fill the remaining space
                    // if there's more than one star-column, available width is divided equally
                    width: "*",
                    text: "support@taxi.yandex.ru"
                }
            ],
            columnGap: 10
        },
        { text: "Сайт ФНС: nalog.ru", margin: [0, 10, 0, 0] }
    ];

    const renderPDF = async () => {
        console.log("render");
        let pageSize = {
            width: 620.2,
            height: "auto"
        };
        let pageMargins = [57.6, 48, 57.6, 48]; // left top right bottom
        let styles = {
            pageHeaderNormal: {
                fontSize: 12,
                margin: [0, 3, 0, 3]
            },
            pageHeaderBold: {
                fontSize: 18,
                bold: true,
                margin: [0, 5, 0, 10]
            },
            header: {
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 10,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            paragraph: {
                margin: [0, 5, 0, 5]
            },
            paragraphBold: {
                margin: [0, 5, 0, 5],
                bold: true
            },
            table: {
                margin: [0, 15, 0, 15]
            },
            tableHeader: {
                fontSize: 10,
                color: "black"
            }
        };
        let defaultStyle = {
            font: "dvs"
        };

        let content = [
            header,
            sectionOne,
            {
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 5,
                        x2: 595 - 2 * 40,
                        y2: 5,
                        dash: {
                            length: 1,
                            space: 1
                        }
                    }
                ]
            },
            sectionTwo,
            {
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 5,
                        x2: 595 - 2 * 40,
                        y2: 5,
                        dash: {
                            length: 1,
                            space: 1
                        }
                    }
                ]
            },
            sectionThree,
            {
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 10,
                        x2: 595 - 2 * 40,
                        y2: 10,
                        dash: {
                            length: 1,
                            space: 1
                        }
                    }
                ]
            },
            sectionFour,
            {
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 10,
                        x2: 595 - 2 * 40,
                        y2: 10,
                        dash: {
                            length: 1,
                            space: 1
                        }
                    }
                ]
            },
            {
                qr: gererateQrCodeText(date, time, price),
                alignment: "center",
                margin: [0, 15, 0, 15]
            },
            {
                canvas: [
                    {
                        type: "line",
                        x1: 0,
                        y1: 10,
                        x2: 595 - 2 * 40,
                        y2: 10,
                        dash: {
                            length: 1,
                            space: 1
                        }
                    }
                ]
            },
            sectionFive
        ];

        let pdfGen = new pdfMakeCus(
            pageSize,
            pageMargins,
            styles,
            defaultStyle
        );
        let pdfDocGenerator = await pdfGen.renderPDF(content, date, print);
        if (print) {
            pdfDocGenerator.download(date + ".pdf");
        } else {
            pdfDocGenerator.getDataUrl(dataUrl => {
                setIframeDataUrl(dataUrl);
            });
        }
    };

    useEffect(() => {
        setShift(getRandomInt(number - 30, number + 100));
        return () => {};
    }, [number]);

    let handleSubmit = ({ date, time, price, phone }) => {
        setDate(date);
        setTime(time);
        setPrice(price);
        setPhone(phone);
        renderPDF();
        setNumber(getRandomInt(50, 900));
    };
    return (
        <div style={{ height: "100vh" }}>
            <Row>
                <Col span={18} push={6} style={{ height: "100vh" }}>
                    {iframeDataUrl && (
                        <iframe
                            title={date}
                            width="100%"
                            height="100%"
                            type="application/pdf"
                            src={iframeDataUrl}
                        ></iframe>
                    )}
                </Col>
                <Col
                    span={6}
                    pull={18}
                    style={{
                        padding: "20px 10px",
                        height: "100vh",
                        overflowY: "scroll"
                    }}
                >
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            form.validateFields((err, values) => {
                                if (!err) {
                                    handleSubmit(values);
                                }
                            });
                        }}
                    >
                        <Form.Item label="Ngày">
                            {form.getFieldDecorator("date", {
                                initialValue: "21.09.1997",
                                rules: [
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Vui lòng chọn ngày"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            {form.getFieldDecorator("time", {
                                initialValue: "10:31",
                                rules: [
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Vui lòng chọn thời gian"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Giá">
                            {form.getFieldDecorator("price", {
                                initialValue: "550,00",
                                rules: [
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Vui lòng chọn giá"
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => (
                                <ChevronRight
                                    rotate={isActive ? 90 : 0}
                                />
                            )}
                            style={{ marginBottom: "10px" }}
                            className="site-collapse-custom-collapse"
                        >
                            <Panel
                                header="Tham số"
                                key="1"
                                className="site-collapse-custom-panel"
                            >
                                <Form.Item label="Số">
                                    {form.getFieldDecorator("number", {
                                        initialValue: number
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Ca số">
                                    {form.getFieldDecorator("shift", {
                                        initialValue: shift
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Số điện thoại">
                                    {form.getFieldDecorator("phone", {
                                        initialValue: phone,
                                        rules: [
                                            {
                                                type: "string",
                                                required: true,
                                                message: "Vui lòng chọn sdt"
                                            }
                                        ]
                                    })(<Input />)}
                                </Form.Item>
                            </Panel>
                        </Collapse>
                        <Button icon="search" type="primary" htmlType="submit">
                            Tạo hóa đơn
                        </Button>
                        <Checkbox
                            style={{ margin: "0px 10px" }}
                            checked={print}
                            onChange={() => setPrint(!print)}
                        >
                            Print
                        </Checkbox>
                        <p>
                            * Lưu ý: Chọn chế độ print sẽ hiện thị kết quả xem
                            trước
                        </p>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Form.create()(TaxiInvoice);
