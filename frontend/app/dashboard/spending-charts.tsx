"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@heroui/react";
import { CATEGORY_COLORS } from "@/lib/types";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface SpendingChartsProps {
  categoryBreakdown: Record<string, number>;
  monthlySpending: Record<string, number>;
}

export function SpendingCharts({
  categoryBreakdown,
  monthlySpending,
}: SpendingChartsProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const pieData = Object.entries(categoryBreakdown)
    .map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name] || "#64748b",
    }))
    .sort((a, b) => b.value - a.value);

  const barData = Object.entries(categoryBreakdown)
    .map(([name, value]) => ({
      name: name.length > 12 ? name.slice(0, 12) + "..." : name,
      fullName: name,
      amount: value,
      fill: CATEGORY_COLORS[name] || "#64748b",
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8);

  const lineData = Object.entries(monthlySpending)
    .map(([month, amount]) => ({
      month: new Date(month + "-01").toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      amount,
    }))
    .sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
    );

  const total = pieData.reduce((s, d) => s + d.value, 0);

  if (pieData.length === 0) {
    return (
      <Card className="col-span-full">
        <CardBody className="flex items-center justify-center h-[300px]">
          <p className="text-default-500">
            No spending data yet. Add transactions to see charts.
          </p>
        </CardBody>
      </Card>
    );
  }

  const tooltipStyle = {
    borderRadius: "12px",
    border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
    background: isDark ? "#121a2d" : "#ffffff",
    color: isDark ? "#ECEDEE" : "#11181C",
    boxShadow: isDark
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.08)",
    padding: "8px 12px",
    fontSize: "13px",
  };

  const axisColor = isDark ? "#6b7a90" : "#94a3b8";
  const gridColor = isDark ? "#1e293b" : "#e2e8f0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader className="flex flex-col items-start gap-1">
          <h3 className="font-serif text-xl font-semibold">
            Spending Breakdown
          </h3>
          <p className="text-sm text-default-500">
            Visualize where your money goes
          </p>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Chart types" variant="bordered" fullWidth>
            <Tab key="pie" title="Pie Chart">
              <div className="flex flex-col lg:flex-row items-center gap-6 pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${((value / total) * 100).toFixed(1)}%)`,
                        "Amount",
                      ]}
                      contentStyle={tooltipStyle}
                      itemStyle={{ color: isDark ? "#ECEDEE" : "#11181C" }}
                      labelStyle={{ color: isDark ? "#94a3b8" : "#64748b" }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        color: isDark ? "#94a3b8" : "#64748b",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Tab>
            <Tab key="bar" title="Bar Chart">
              <div className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={gridColor}
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="name"
                      fontSize={11}
                      tickLine={false}
                      stroke={axisColor}
                    />
                    <YAxis
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(v) => `$${v.toLocaleString()}`}
                      stroke={axisColor}
                    />
                    <RechartsTooltip
                      formatter={(value: number) => [
                        `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                        "Amount",
                      ]}
                      contentStyle={tooltipStyle}
                      itemStyle={{ color: isDark ? "#ECEDEE" : "#11181C" }}
                      labelStyle={{ color: isDark ? "#94a3b8" : "#64748b" }}
                      cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                    />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Tab>
            <Tab key="trend" title="Trend">
              <div className="pt-4">
                {lineData.length > 1 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={gridColor}
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="month"
                        fontSize={11}
                        tickLine={false}
                        stroke={axisColor}
                      />
                      <YAxis
                        fontSize={11}
                        tickLine={false}
                        tickFormatter={(v) => `$${v.toLocaleString()}`}
                        stroke={axisColor}
                      />
                      <RechartsTooltip
                        formatter={(value: number) => [
                          `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                          "Spending",
                        ]}
                        contentStyle={tooltipStyle}
                        itemStyle={{ color: isDark ? "#ECEDEE" : "#11181C" }}
                        labelStyle={{ color: isDark ? "#94a3b8" : "#64748b" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#3b82f6"
                        strokeWidth={2.5}
                        dot={{ fill: "#3b82f6", r: 4, strokeWidth: 0 }}
                        activeDot={{
                          r: 6,
                          fill: "#3b82f6",
                          stroke: isDark ? "#121a2d" : "#ffffff",
                          strokeWidth: 2,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-default-500">
                    Need at least 2 months of data for trends.
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </motion.div>
  );
}
