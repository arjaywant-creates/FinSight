"use client";

import { useEffect } from "react";
import { Card, CardBody, CardHeader, Chip, Tooltip } from "@heroui/react";
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Wand2,
} from "lucide-react";
import { SpendingCharts } from "./spending-charts";
import { CATEGORY_COLORS } from "@/lib/types";
import { format } from "date-fns";
import {
  useSparkleConfetti,
  SparkleConfetti,
  FloatingSparkles,
} from "@/components/magic-sparkles";

interface DashboardContentProps {
  userEmail: string;
  stats: {
    totalSpent: number;
    totalIncome: number;
    netSavings: number;
    transactionCount: number;
    categoryBreakdown: Record<string, number>;
    monthlySpending: Record<string, number>;
    recentTransactions: Array<{
      id: string;
      date: string;
      category: string;
      amount: number;
      description: string | null;
    }>;
  };
}

export function DashboardContent({ userEmail, stats }: DashboardContentProps) {
  const { particles, fire } = useSparkleConfetti();

  // Fire confetti when user enters the dashboard
  useEffect(() => {
    const timeout = setTimeout(() => fire(), 400);
    return () => clearTimeout(timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const statCards = [
    {
      title: "Total Income",
      tooltip: "Sum of all income transactions",
      value: `$${stats.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      bgGradient:
        "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
      borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
      trend: stats.totalIncome > 0 ? "positive" : "neutral",
    },
    {
      title: "Total Spent",
      tooltip: "Sum of all expense transactions",
      value: `$${stats.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: TrendingDown,
      iconColor: "text-red-500",
      bgGradient:
        "from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20",
      borderColor: "border-red-200/50 dark:border-red-800/30",
      trend: "negative" as const,
    },
    {
      title: "Net Savings",
      tooltip: "Income minus expenses",
      value: `$${stats.netSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: PiggyBank,
      iconColor:
        stats.netSavings >= 0 ? "text-blue-500" : "text-orange-500",
      bgGradient:
        stats.netSavings >= 0
          ? "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20"
          : "from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20",
      borderColor:
        stats.netSavings >= 0
          ? "border-blue-200/50 dark:border-blue-800/30"
          : "border-orange-200/50 dark:border-orange-800/30",
      trend: stats.netSavings >= 0 ? "positive" : "negative",
    },
    {
      title: "Transactions",
      tooltip: "Total number of recorded transactions",
      value: stats.transactionCount.toString(),
      icon: DollarSign,
      iconColor: "text-violet-500",
      bgGradient:
        "from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20",
      borderColor: "border-violet-200/50 dark:border-violet-800/30",
      trend: "neutral" as const,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto w-full relative">
      <SparkleConfetti particles={particles} />
      <FloatingSparkles count={8} />

      <div className="flex items-center gap-3 relative z-10">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
          <Wand2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-default-500">
            Welcome back, {userEmail.split("@")[0]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Tooltip key={stat.title} content={stat.tooltip} delay={400}>
            <Card
              className={`bg-gradient-to-br ${stat.bgGradient} ${stat.borderColor} border hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
            >
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-default-500 font-medium uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-10 w-10 rounded-xl bg-background/80 flex items-center justify-center">
                      <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                    </div>
                    {stat.trend === "positive" && (
                      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    )}
                    {stat.trend === "negative" && (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tooltip>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingCharts
            categoryBreakdown={stats.categoryBreakdown}
            monthlySpending={stats.monthlySpending}
          />
        </div>

        <div className="space-y-6">
          <Tooltip content="Your top 5 expense categories by total amount" delay={400}>
          <Card>
            <CardHeader className="pb-2">
              <div>
                <h3 className="font-serif text-lg font-semibold">
                  Top Categories
                </h3>
                <p className="text-sm text-default-500">
                  Your biggest spending areas
                </p>
              </div>
            </CardHeader>
            <CardBody className="pt-2">
              <div className="space-y-3">
                {Object.entries(stats.categoryBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([category, amount]) => {
                    const total = stats.totalSpent || 1;
                    const percent = ((amount / total) * 100).toFixed(1);
                    return (
                      <div key={category} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{category}</span>
                          <span className="text-default-500">
                            ${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })} ({percent}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-default-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor:
                                CATEGORY_COLORS[category] || "#64748b",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                {Object.keys(stats.categoryBreakdown).length === 0 && (
                  <p className="text-sm text-default-500">
                    No spending data yet.
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
          </Tooltip>

          <Tooltip content="Your 5 most recent transactions" delay={400}>
          <Card>
            <CardHeader className="pb-2">
              <div>
                <h3 className="font-serif text-lg font-semibold">
                  Recent Transactions
                </h3>
                <p className="text-sm text-default-500">Latest activity</p>
              </div>
            </CardHeader>
            <CardBody className="pt-2">
              <div className="space-y-3">
                {stats.recentTransactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            CATEGORY_COLORS[t.category] || "#64748b",
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {t.description || t.category}
                        </p>
                        <p className="text-xs text-default-500">
                          {format(new Date(t.date), "MMM d")}
                        </p>
                      </div>
                    </div>
                    <Chip
                      size="sm"
                      variant="bordered"
                      classNames={{
                        base:
                          t.category === "Income"
                            ? "border-emerald-500/30"
                            : "border-default-300",
                        content:
                          t.category === "Income"
                            ? "text-emerald-500"
                            : "text-default-600",
                      }}
                    >
                      {t.category === "Income" ? "+" : "-"}$
                      {Math.abs(Number(t.amount)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Chip>
                  </div>
                ))}
                {stats.recentTransactions.length === 0 && (
                  <p className="text-sm text-default-500">
                    No transactions yet.
                  </p>
                )}
              </div>
            </CardBody>
          </Card>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
