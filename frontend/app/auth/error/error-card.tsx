"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function ErrorCard({ children }: { children: React.ReactNode }) {
  return (
    <Card shadow="lg" className="border-none p-4">
      <CardHeader className="flex flex-col items-center gap-2">
        <motion.div
          className="h-14 w-14 rounded-full bg-danger/10 flex items-center justify-center mb-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <AlertTriangle className="h-7 w-7 text-danger" />
        </motion.div>
        <h2 className="font-serif text-2xl font-bold">
          Spell Gone Wrong
        </h2>
      </CardHeader>
      <CardBody className="space-y-4 text-center">
        {children}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            as={Link}
            href="/"
            variant="bordered"
            className="w-full border-violet-500/30 text-violet-600 dark:text-violet-400"
            size="lg"
            startContent={<ArrowLeft className="h-4 w-4" />}
          >
            Return Home
          </Button>
        </motion.div>
      </CardBody>
    </Card>
  );
}
