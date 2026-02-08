"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { Trash2, Search, Filter, Loader2 } from "lucide-react";
import type { Transaction } from "@/lib/types";
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/types";
import { deleteTransactionAction } from "./actions";
import { format } from "date-fns";

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      !search ||
      t.description?.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await deleteTransactionAction(deleteId);
    setDeleting(false);
    setDeleteId(null);
    onClose();
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    onOpen();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search transactions..."
            value={search}
            onValueChange={setSearch}
            startContent={
              <Search className="h-4 w-4 text-default-400" />
            }
            isClearable
            onClear={() => setSearch("")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-default-400" />
          <Select
            selectedKeys={[categoryFilter]}
            onSelectionChange={(keys) => {
              const val = Array.from(keys)[0] as string;
              setCategoryFilter(val || "all");
            }}
            className="w-[180px]"
            aria-label="Filter by category"
            size="sm"
          >
            {["all", ...CATEGORIES].map((cat) => (
              <SelectItem key={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-divider overflow-hidden">
        <Table
          aria-label="Transactions table"
          removeWrapper
          classNames={{
            th: "bg-default-100",
          }}
        >
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn className="text-right">Amount</TableColumn>
            <TableColumn className="w-[50px]">{""}</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No transactions found.">
            {filtered.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium text-sm">
                  {format(new Date(t.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <Chip
                    variant="bordered"
                    size="sm"
                    style={{
                      borderColor: CATEGORY_COLORS[t.category] || "#64748b",
                      color: CATEGORY_COLORS[t.category] || "#64748b",
                      backgroundColor: `${CATEGORY_COLORS[t.category] || "#64748b"}15`,
                    }}
                  >
                    {t.category}
                  </Chip>
                </TableCell>
                <TableCell className="text-sm text-default-500 max-w-[200px] truncate">
                  {t.description || "-"}
                </TableCell>
                <TableCell
                  className={`text-right font-mono font-medium ${t.category === "Income" ? "text-emerald-500" : "text-foreground"}`}
                >
                  {t.category === "Income" ? "+" : "-"}$
                  {Math.abs(Number(t.amount)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Tooltip content="Delete">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-default-400 hover:text-danger"
                      onPress={() => openDeleteModal(t.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Transaction</ModalHeader>
              <ModalBody>
                <p className="text-default-500">
                  Are you sure you want to delete this transaction? This action
                  cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={deleting}
                  spinner={<Loader2 className="h-4 w-4 animate-spin" />}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
