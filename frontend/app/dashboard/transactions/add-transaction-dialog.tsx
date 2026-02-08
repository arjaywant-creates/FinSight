"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Plus, Loader2 } from "lucide-react";
import { CATEGORIES } from "@/lib/types";
import { createTransactionAction } from "./actions";
import { AnimatePresence, motion } from "framer-motion";

export function AddTransactionDialog() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.set("date", date);
    formData.set("category", category);
    formData.set("amount", amount);
    formData.set("description", description);

    const result = await createTransactionAction(formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setCategory("");
      setAmount("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      onClose();
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<Plus className="h-4 w-4" />}
        className="shadow-lg shadow-primary/25"
      >
        Add Transaction
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="font-serif text-xl">Add Transaction</h2>
                <p className="text-sm text-default-500 font-normal">
                  Enter the details of your transaction below.
                </p>
              </ModalHeader>
              <ModalBody className="pb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Date"
                    type="date"
                    isRequired
                    value={date}
                    onValueChange={setDate}
                  />
                  <Select
                    label="Category"
                    isRequired
                    selectedKeys={category ? [category] : []}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0] as string;
                      setCategory(val || "");
                    }}
                  >
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat}>{cat}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Amount ($)"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    isRequired
                    value={amount}
                    onValueChange={setAmount}
                  />
                  <Textarea
                    label="Description (optional)"
                    placeholder="What was this transaction for?"
                    minRows={2}
                    value={description}
                    onValueChange={setDescription}
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-danger bg-danger-50 p-2 rounded-lg"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={loading}
                    spinner={<Loader2 className="h-4 w-4 animate-spin" />}
                  >
                    {loading ? "Adding..." : "Add Transaction"}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
