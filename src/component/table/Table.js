import "./Table.css";
import React from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import session from "utils/session";

const CustomTable = (props) => {
  const { rowSelectionType, total, isPopup = false, size = "default" } = props;
  const isAdmin =
    session && session.role && session.role.toLowerCase() === "admin";

  const prepareRowSelection = () => {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        props.onSelectRows && props.onSelectRows(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: props.checkboxProps,
    };
    return rowSelection;
  };

  const editFunction = (event, record, onEdit) => {
    event.stopPropagation();
    onEdit && onEdit(record);
  };

  const viewFunction = (event, record, onView) => {
    event.stopPropagation();
    onView && onView(record);
  };

  const deleteFunction = (event, record, onDelete) => {
    event.stopPropagation();
    onDelete && onDelete(record);
  };

  const prepareColumns = () => {
    let { columns } = props;
    const { isEditable, isDeleteable, isViewable, onView, onEdit, onDelete } =
      props;
    if (isEditable || isDeleteable || isViewable) {
      columns = [
        ...columns,
        {
          title: "Actions",
          dataIndex: "actions",
          render: (_, record) => {
            return (
              <div className="action-btns-container">
                {isViewable && (
                  <Button
                    className="btn-style"
                    onClick={(event) => {
                      viewFunction(event, record, onView);
                    }}
                  >
                    <EyeOutlined className="mr-5" />
                  </Button>
                )}
                {isEditable && isAdmin && (
                  <Button
                    className="btn-style"
                    onClick={(event) => editFunction(event, record, onEdit)}
                    disabled={
                      record?.ticketStatusValue?.toLowerCase() === "resolved"
                    }
                  >
                    <EditOutlined className="mr-5" />
                  </Button>
                )}
                {isEditable && !isAdmin && (
                  <Button
                    className="btn-style"
                    onClick={(event) => editFunction(event, record, onEdit)}
                    disabled={
                      record?.promoStatus?.toLowerCase() === "live" ||
                      record?.promoStatus?.toLowerCase() === "live-errors" ||
                      record?.promoStatus?.toLowerCase() === "approved" ||
                      record?.promoStatus?.toLowerCase() === "expired" ||
                      record?.promoStatus?.toLowerCase() === "rejected"
                    }
                  >
                    <EditOutlined className="mr-5" />
                  </Button>
                )}
                {isDeleteable && (
                  <Button
                    className="btn-style"
                    onClick={(event) => {
                      deleteFunction(event, record, onDelete);
                    }}
                    disabled={
                      record?.role?.toLowerCase() === "admin" ||
                      record?.promoStatus?.toLowerCase() === "live" ||
                      record?.promoStatus?.toLowerCase() === "expired"
                    }
                  >
                    <DeleteOutlined className="mr-5" />
                  </Button>
                )}
              </div>
            );
          },
        },
      ];
    }

    return columns;
  };

  return (
    <div className="pag" style={{ overflowX: "auto" }}>
      <Table
        className={props.className && props.className}
        columns={prepareColumns()}
        onChange={prepareRowSelection.onChange}
        dataSource={props.rows}
        rowKey={props.rowKey || "key"}
        rowSelection={
          rowSelectionType
            ? { type: rowSelectionType, ...prepareRowSelection() }
            : null
        }
        pagination={
          props.current
            ? {
                showSizeChanger: total > 5 ? true : false,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
                total: total,
                current: props.current,
                position: ["bottomLeft"],
                onChange: (page) => {
                  props.onChange(page);
                },
                defaultPageSize: 5,
              }
            : {
                showSizeChanger: total > 5 ? true : false,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
                total: { total },
                position: ["bottomLeft"],
                defaultPageSize: 5,
              }
        }
        size={"small"}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              if (props.isViewable && isPopup === false) {
                props.onView(record);
              }
            },
          };
        }}
        rowClassName={(record, rowindex) => {
          if (props.isViewable) {
            return "clickable";
          }
        }}
      />
    </div>
  );
};

export default CustomTable;
