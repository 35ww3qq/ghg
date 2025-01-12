import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Package name must be at least 2 characters"),
  price: z.string(),
  features: z.string(),
  daThreshold: z.string(),
  paThreshold: z.string(),
  spamScoreThreshold: z.string(),
});

interface PackageFormProps {
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
  isEditing?: boolean;
}

const defaultValues: z.infer<typeof formSchema> = {
  name: "",
  price: "",
  features: "",
  daThreshold: "",
  paThreshold: "",
  spamScoreThreshold: "",
};

export default function PackageForm({
  onSubmit = (values) => console.log(values),
  initialData = defaultValues,
  isEditing = false,
}: PackageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  return (
    <Card className="w-[600px] bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Edit Package" : "Create New Package"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Premium Backlink Package" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="99.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter package features (one per line)"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="daThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DA Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PA Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spamScoreThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spam Score Threshold</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              {isEditing ? "Update Package" : "Create Package"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
