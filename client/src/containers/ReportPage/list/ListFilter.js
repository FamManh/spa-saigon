import { Button, Col, Form, Row, DatePicker, Select, Checkbox } from "antd";
import actions from "../actions";
import branchSelectors from "../../BranchPage/selectors";
import branchActions from "../../BranchPage/actions";
import React, { useEffect } from "react";
import FilterWrapper, {
    formItemLayout
} from "../../shared/styles/FilterWrapper";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import selectors from "../selectors";
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const monthFormat = "YYYY/MM";
const dateFormat = "YYYY/MM/DD";
const ListFilter = ({ form }) => {
    const dispatch = useDispatch();
    const branchs = useSelector(branchSelectors.selectBranchs);
    const dataLoading = useSelector(selectors.selectDataLoading);
    const filter = useSelector(selectors.selectFilter);

    let doSubmit = values => {
        let start = values.date[0];
        let end = values.date[1];

        dispatch(
            actions.doFilterChange({
                start,
                end,
                flag: values.flag,
                groupByBranch: values.groupByBranch,
                branch: values.branch
            })
        );
        dispatch(
            actions.list(
                {
                    ...values,
                    start: start.format("x"),
                    end: end.format("x")
                },
                branchs
            )
        );
    };

    useEffect(() => {
        dispatch(branchActions.list());
    }, []);

    return (
        <FilterWrapper>
            <Form
                {...formItemLayout}
                onSubmit={e => {
                    e.preventDefault();
                    form.validateFields((err, values) => {
                        if (!err) {
                            doSubmit(values);
                        }
                    });
                }}
            >
                <Row gutter={24}>
                    <Col md={24} lg={12}>
                        <Form.Item label="Thời gian">
                            {form.getFieldDecorator("date", {
                                initialValue:
                                    filter && filter.start && filter.end
                                        ? [filter.start, filter.end]
                                        : null,
                                rules: [
                                    {
                                        type: "array",
                                        required: true,
                                        message: "Vui lòng chọn thời gian"
                                    }
                                ]
                            })(
                                <RangePicker />
                                // <MonthPicker
                                //     style={{ width: "100%" }}
                                //     placeholder="Chọn tháng"
                                //     allowClear={false}
                                // />
                            )}
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={12}>
                        <Form.Item label="Chi nhánh">
                            {form.getFieldDecorator("branch", {
                                initialValue:
                                    filter && filter.branch
                                        ? filter.branch
                                        : null
                            })(
                                <Select
                                    placeholder="Chọn chi nhánh"
                                    allowClear={true}
                                >
                                    {branchs.map((branch, key) => (
                                        <Option
                                            key={branch.id}
                                            value={branch.id}
                                        >
                                            {branch.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col md={24} lg={12}>
                        <Form.Item label="Loại báo cáo">
                            {form.getFieldDecorator("type", {
                                initialValue: "staff",
                                rules: [
                                    {
                                        required: true,
                                        message: "Vui lòng chọn thời gian"
                                    }
                                ]
                            })(
                                <Select placeholder="Chọn loại báo cáo">
                                    <Option value="staff">
                                        Theo nhân viên
                                    </Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col className="filter-buttons" span={24}>
                        {form.getFieldDecorator("flag", {
                            initialValue:
                                filter && filter.flag ? filter.flag : null,
                            valuePropName: "checked"
                        })(<Checkbox>Flag</Checkbox>)}
                        {form.getFieldDecorator("groupByBranch", {
                            initialValue:
                                filter && filter.groupByBranch
                                    ? filter.groupByBranch
                                    : null,

                            valuePropName: "checked"
                        })(<Checkbox>Gộp chi nhánh</Checkbox>)}
                        <Button
                            loading={dataLoading}
                            icon="search"
                            type="primary"
                            htmlType="submit"
                        >
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FilterWrapper>
    );
};

export default Form.create()(ListFilter);
