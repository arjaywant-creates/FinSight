"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Card, CardBody, CardHeader, Input, Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Wand2, Sparkles, MailCheck, ArrowLeft } from "lucide-react";
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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
          {success ? (
            <Card shadow="lg" className="border-none text-center p-6">
              <CardHeader className="flex flex-col items-center gap-2">
                <motion.div
                  className="h-14 w-14 rounded-full bg-violet-500/10 flex items-center justify-center mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MailCheck className="h-7 w-7 text-violet-500" />
                </motion.div>
                <h2 className="font-serif text-3xl font-bold">
                  Spell Sent!
                </h2>
                <p className="text-default-500 text-sm">
                  We&apos;ve sent a magical reset link to your email address.
                </p>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-default-500 mb-6">
                  Check your inbox for the password reset enchantment. It should
                  arrive shortly.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    as={Link}
                    href="/auth/login"
                    variant="bordered"
                    className="w-full border-violet-500/30 text-violet-600 dark:text-violet-400"
                    size="lg"
                    startContent={<ArrowLeft className="h-4 w-4" />}
                  >
                    Back to Login
                  </Button>
                </motion.div>
              </CardBody>
            </Card>
          ) : (
            <Card shadow="lg" className="border-none border border-violet-500/10">
              <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-500 animate-twinkle" />
                    <h2 className="font-serif text-3xl font-bold tracking-tight">
                      Reset Password
                    </h2>
                  </div>
                  <Button
                    as={Link}
                    href="/auth/login"
                    variant="light"
                    size="sm"
                    startContent={<ArrowLeft className="h-4 w-4" />}
                    className="text-default-500"
                  >
                    Back
                  </Button>
                </div>
                <p className="text-default-500 text-sm">
                  Enter your email and we&apos;ll send a magical link to restore
                  your access
                </p>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@example.com"
                    isRequired
                    value={email}
                    onValueChange={setEmail}
                    isDisabled={isLoading}
                  />
                  {error && (
                    <div className="p-3 text-sm bg-danger-50 text-danger rounded-lg border border-danger-200">
                      {error}
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full magic-gradient-bg text-white magic-glow-sm"
                      size="lg"
                      isLoading={isLoading}
                      spinner={<Loader2 className="h-4 w-4 animate-spin" />}
                      startContent={
                        !isLoading ? (
                          <Wand2 className="h-4 w-4" />
                        ) : undefined
                      }
                    >
                      {isLoading ? "Casting spell..." : "Send Reset Link"}
                    </Button>
                  </motion.div>
                  <div className="text-center text-sm">
                    Remember your password?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-violet-500 hover:text-violet-600 hover:underline underline-offset-4"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
