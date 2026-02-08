"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { Sparkles, Wand2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={item}
            className="flex flex-col items-center gap-2 text-center"
          >
            <Link
              href="/"
              className="flex items-center gap-2 font-serif font-bold text-2xl mb-4 group"
            >
              <motion.span
                animate={{ rotate: [0, 15, -5, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Wand2 className="h-8 w-8 text-violet-500 transition-transform group-hover:scale-110" />
              </motion.span>
              FinSight
            </Link>
          </motion.div>

          <motion.div variants={item}>
            <Card shadow="lg" className="border-none text-center p-6">
              <CardHeader className="flex flex-col items-center gap-2">
                <motion.div
                  className="h-16 w-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-4"
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-8 w-8 text-violet-500" />
                </motion.div>
                <h2 className="font-serif text-2xl font-bold magic-gradient-text">
                  Welcome Aboard!
                </h2>
                <p className="text-default-500 text-sm">
                  Your magical account has been created successfully.
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-sm text-default-500">
                  You can now log in and start exploring your magical financial
                  portal!
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    as={Link}
                    href="/auth/login"
                    className="w-full magic-gradient-bg text-white magic-glow-sm"
                    size="lg"
                    startContent={<ArrowLeft className="h-4 w-4" />}
                  >
                    Back to Login
                  </Button>
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
