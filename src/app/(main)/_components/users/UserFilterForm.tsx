import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import styles from "./UserFilterForm.module.scss";

const filterFormSchema = z.object({
  organization: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional().or(z.string().length(0)),
  date: z.date().optional().nullable(),
  phoneNumber: z.string().optional(),
  status: z.string().optional(),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

interface UserFilterFormProps {
  onFilter: (values: FilterFormValues) => void;
  onReset: () => void;
}

const UserFilterForm = ({ onFilter, onReset }: UserFilterFormProps) => {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      organization: undefined,
      username: "",
      email: "",
      date: null,
      phoneNumber: "",
      status: undefined,
    },
  });

  const handleSubmit = (values: FilterFormValues) => {
    onFilter(values);
  };

  const handleReset = () => {
    form.reset();
    onReset();
  };

  return (
    <div className={styles.filterForm}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={styles.selectTrigger}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={styles.select}>
                    <SelectItem value="lendsqr">Lendsqr</SelectItem>
                    <SelectItem value="irorun">Irorun</SelectItem>
                    <SelectItem value="lendstar">Lendstar</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="User" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          styles.dateButton,
                          !field.value && styles.dateButtonEmpty
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Date</span>
                        )}
                        <CalendarIcon className={styles.calendarIcon} />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className={styles.calendarWrapper}
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={styles.selectTrigger}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className={styles.select}>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="blacklisted">Blacklisted</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className={styles.resetButton}
            >
              Reset
            </Button>
            <Button type="submit" className={styles.filterButton}>
              Filter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserFilterForm;
