import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Table, Select, Input, Button, Pagination, Card, Layout, Row, Col } from "antd";
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons'; // Import icons
import "chart.js/auto";
import "./Transaction-Dashboard.css";

const { Header, Content } = Layout;
const { Option } = Select;

const TransactionDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({});
  const [chartData, setChartData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://66532705813d78e6d6d75f24.mockapi.io/api/DashBoardData`,
        {
          params: {
            month: selectedMonth,
          },
        }
      );
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [selectedMonth]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://665345f5813d78e6d6d7ca04.mockapi.io/api/dashboard/DashBoardData`,
        {
          params: {
            month: selectedMonth,
            page: currentPage,
            limit: 4,
          },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [selectedMonth, currentPage]);

  const fetchChartData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://66532705813d78e6d6d75f24.mockapi.io/api/MonthData`,
        {
          params: {
            month: selectedMonth,
          },
        }
      );
      const chartData = response.data[0];
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchData();
    fetchChartData();
  }, [fetchData, fetchChartData]);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage, fetchTransactions]);

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    const filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.title.toLowerCase().includes(searchText.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchText.toLowerCase()) ||
        String(transaction.price).includes(searchText)
    );
    setTransactions(filteredTransactions);
  };

  const clearSearch = () => {
    setSearchText("");
    fetchTransactions();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="Transaction" className="transaction-image" />,
    },
  ];

  return (
    <Layout style={{ backgroundColor: "rgb(163 174 191)" }}> 
      <Header style={{ color: "white", fontSize: "24px", textAlign: "center" }}>Transaction Dashboard</Header>
      <Content style={{ padding: '20px' }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Card title="Filters" bordered={true} className="filters-card">
              <Row gutter={[16, 16]} align="middle">
                <Col span={8}>
                  <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    style={{ width: "100%" }}
                  >
                    <Option value="January">January</Option>
                    <Option value="February">February</Option>
                    <Option value="March">March</Option>                    
                    <Option value="April">April</Option>
                    <Option value="May">May</Option>
                    <Option value="June">June</Option>
                    <Option value="July">July</Option>
                    <Option value="August">August</Option>
                    <Option value="September">September</Option>
                    <Option value="October">October</Option>
                    <Option value="November">November</Option>
                    <Option value="December">December</Option>
                  </Select>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Input
    placeholder="Search transaction..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    style={{ width: 'calc(100% - 32px)', padding: "4px 143px;",  marginRight: '4px' }} // Adjust width to leave space for buttons
  />
  <Button type="primary" onClick={handleSearch} style={{ marginRight: '4px' }}>
    <SearchOutlined /> Search
  </Button>
  <Button onClick={clearSearch} style={{ marginRight: '-330px' }}>
    <CloseCircleOutlined /> Clear
  </Button>
</Col>
              </Row>
            </Card>
          </Col>
          <Col>
          <Card title="Transaction Details" bordered={true} className="details-card" style={{ height: '300px' }}>
              <Table
                columns={columns}
                dataSource={transactions}
                pagination={false}
                rowKey="id"
                scroll={{ y: 115 }}
              />
              <Pagination
                current={currentPage}
                pageSize={5}
                onChange={(page) => setCurrentPage(page)}
                total={50} // Set this to your total number of transactions
                style={{ marginTop: '16px', textAlign: 'center' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={20} xl={20}>
            <Card title="Monthly Sales Data" bordered={true} className="monthly-sales-card" style={{ height: '300px' }}>
              {data ? (
                <Table
                  dataSource={[
                    { key: 'totalSales', data: 'Total Sales', value: `$${data.totalSales}` },
                    { key: 'totalSoldItems', data: 'Total Sold Items', value: data.totalSoldItems },
                    { key: 'totalNonSoldItems', data: 'Total Non-Sold Items', value: data.totalNonSoldItems },
                  ]}
                  columns={[
                    { title: 'Data', dataIndex: 'data', key: 'data' },
                    { title: 'Value', dataIndex: 'value', key: 'value' },
                  ]}
                  pagination={false}
                />
              ) : (
                <p>No data available for the selected month.</p>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={22} xl={22}>
            <Card title="Price Range Distribution" bordered={true} className="price-range-card" >
              {chartData ? (
                <Bar
                  data={{
                    labels: [
                      "0-100",
                      "101-200",
                      "201-300",
                      "301-400",
                      "401-500",
                      "501-600",
                      "601-700",
                      "701-800",
                      "801-900",
                      "901-above",
                    ],
                    datasets: [
                      {
                        label: "Number of Items",
                        data: [
                          chartData["0-100"],
                          chartData["101-200"],
                          chartData["201-300"],
                          chartData["301-400"],
                          chartData["401-500"],
                          chartData["501-600"],
                          chartData["601-700"],
                          chartData["701-800"],
                          chartData["801-900"],
                          chartData["901-above"],
                        ],
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: true,
                    scales: {
                      x: {
                        type: 'category',
                        title: {
                          display: true,
                          text: "Price Range",
                        },
                      },
                      y: {
                        type: 'linear',
                        title: {
                          display: true,
                          text: "Number of Items",
                        },
                      },
                    },
                  }}
                />
              ) : (
                <p>No chart data available for the selected month.</p>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TransactionDashboard;
