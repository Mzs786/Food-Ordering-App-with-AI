import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "2,543", trend: "+12.3%", positive: true, icon: "👥" },
    { title: "Revenue", value: "$45,234", trend: "-3.2%", positive: false, icon: "💰" },
    { title: "Conversion", value: "3.8%", trend: "+2.4%", positive: true, icon: "📈" },
    { title: "Active Sessions", value: "1,234", trend: "+5.6%", positive: true, icon: "🔥" },
  ];

  const recentActivities = [
    { id: 1, title: "New order received", time: "5 min ago", type: "order" },
    { id: 2, title: "System update completed", time: "2 hours ago", type: "system" },
    { id: 3, title: "Database backup", time: "4 hours ago", type: "database" },
  ];

  const chartData = [
    { date: "Jan", value: 4000 },
    { date: "Feb", value: 3000 },
    { date: "Mar", value: 6000 },
    { date: "Apr", value: 4500 },
    { date: "May", value: 7000 },
    { date: "Jun", value: 8000 },
  ];

  const topProducts = [
    { name: "Product A", sales: 2342, progress: 70 },
    { name: "Product B", sales: 1893, progress: 55 },
    { name: "Product C", sales: 1500, progress: 40 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <DatePicker
              selected={new Date()}
              onChange={() => {}}
              className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {stat.title}
                  </h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        stat.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Revenue Overview
              </h2>
              <select className="bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 text-gray-900 text-sm rounded-lg p-2.5">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400">
                        {activity.type === "order" ? "🛒" : activity.type === "system" ? "⚙️" : "💾"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Top Selling Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.sales} sales
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${product.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;