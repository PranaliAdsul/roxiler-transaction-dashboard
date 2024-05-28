vercel deployed link :- "https://roxiler-transaction-dashboard-lxovhtra7-pranaliadsuls-projects.vercel.app/"

 Mock Api for Entire Data:-
"https://665345f5813d78e6d6d7ca04.mockapi.io/api/dashboard/DashBoardData"

 Mock Api for Monthly Sale Data 
"https://66532705813d78e6d6d75f24.mockapi.io/api/DashBoardData"

 Mock Api for Bar Chart Data
"https://66532705813d78e6d6d75f24.mockapi.io/api/MonthData"

# Roxiler-Transaction Dashboard Assignment
The dashboard is a dynamic transaction management tool that provides an interactive interface to view and analyze transaction data. It features a searchable, sortable table of transactions, real-time statistics, and visual representations with bar and pie charts. Users can filter data by month and seamlessly navigate through paginated results.
Imports:
The code imports necessary dependencies from React, Axios, Chart.js, Ant Design components, and Ant Design icons.
It also imports the CSS file for styling.
Effect Hooks:
useEffect hooks are used to trigger data fetching when component mounts or when dependencies change.
fetchData and fetchChartData are called when the selected month changes.
fetchTransactions is called when the selected month or current page changes
Ant Design Components:
Ant Design components like Select, Input, Button, Pagination, Card, Layout, Row, Col, and Table are used for UI layout and interaction.
Rendering:
The component returns JSX to render the layout of the transaction dashboard.
It includes a header, filters card, transaction details card, monthly sales card, and price range distribution card.
Chart Visualization:
The price range distribution is visualized using a bar chart from Chart.js.
Dependencies/Frameworks Used:
React for building UI components and managing state.
Axios for making HTTP requests to API endpoints.
Chart.js for visualizing data with charts.
Ant Design for UI components and icons.
CSS for styling the components.
Overall, the TransactionDashboard component fetches data from API endpoints, displays transaction details, provides filtering options, and visualizes data with charts to create a dashboard interface for managing transactions.
