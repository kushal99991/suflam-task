export const SEASON_COLUMNS = [
  {
    title: "Product Name",
    isSortable: true,
    dataIndex: "seasonName",
    key: "seasonName",
    width: "30%",
    sorter: (a, b) => a.seasonName.localeCompare(b.seasonName),

    // onFilter: (value, record) => {
    //   return record.status?.props?.children === value;
    // },
  },
  {
    title: "Price",
    isSortable: true,
    dataIndex: "price",
    key: "price",
    width: "10%",
    // sorter: (a, b) => a.price.localeCompare(b.price),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    width: "5%",
  },
  {
    title: "Sale",
    isSortable: true,
    dataIndex: "sale",
    key: "sale",
    width: "5%",
    // sorter: (a, b) => a.sale.localeCompare(b.sale),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "15%",
  },
];
