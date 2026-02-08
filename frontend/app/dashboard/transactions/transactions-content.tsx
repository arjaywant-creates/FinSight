"use client";

import { Card, CardBody } from "@heroui/react";
import { AddTransactionDialog } from "./add-transaction-dialog";
import { TransactionTable } from "./transaction-table";
import {
  ArrowLeftRight,
  TrendingDown,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import type { Transaction } from "@/lib/types";

interface TransactionsContentProps {
  transactions: Transaction[];
}

export function TransactionsContent({
  transactions,
}: TransactionsContentProps) {
  const totalExpenses = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalIncome = transactions
    .filter((t) => t.category === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
            <ArrowLeftRight className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight">
              Transactions
            </h1>
            <p className="text-sm text-default-500">
              Manage and track your spending
            </p>
          </div>
        </div>
        <AddTransactionDialog />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200/50 dark:border-blue-800/30">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-default-500 font-medium">
                  Total Transactions
                </p>
                <p className="text-xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-default-500 font-medium">
                  Total Income
                </p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 border border-red-200/50 dark:border-red-800/30">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-default-500 font-medium">
                  Total Expenses
                </p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">
                  ${totalExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <TransactionTable transactions={transactions} />
    </div>
  );
}
