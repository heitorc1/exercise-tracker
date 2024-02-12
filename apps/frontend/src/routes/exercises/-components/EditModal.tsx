import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { type SubmitHandler, useForm } from "react-hook-form";
import { distinctUntilChanged } from "rxjs";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IExercise } from "@/interfaces/exercises";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import exerciseService from "@/services/exercises";
import { toast } from "@/components/ui/use-toast";

type EditModalProps = {
  exercise: IExercise;
  setExercises: Dispatch<SetStateAction<IExercise[]>>;
};

type InputProps = {
  description: string;
  duration: number;
  date: string;
};

const schema = z.object({
  description: z.string().min(3).max(255),
  duration: z.coerce.number().min(1),
  date: z.coerce.date(),
});

function EditModal({ exercise, setExercises }: EditModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<InputProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    },
  });

  const handleEdit: SubmitHandler<InputProps> = (edit: InputProps) => {
    exerciseService
      .editExercise({
        id: exercise.id,
        description: edit.description,
        duration: edit.duration,
        date: edit.date,
      })
      .pipe(distinctUntilChanged())
      .subscribe({
        next: () => {
          const updateData = {
            ...exercise,
            description: edit.description,
            duration: edit.duration,
            date: edit.date,
          };
          setExercises((state) =>
            state.map((e) => (e.id === exercise.id ? updateData : e))
          );
          toast({ description: "Exercise updated successfully" });
          setOpen(false);
        },
        error: () => {
          toast({
            description: "Failed to update exercise",
            variant: "destructive",
          });
          setOpen(false);
        },
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form
          id="edit-form"
          onSubmit={form.handleSubmit(handleEdit)}
          className="space-y-2"
        >
          <DialogTrigger>
            <Pencil1Icon className="mt-2 h-4 cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit your exercise</DialogTitle>
              <DialogDescription>
                Change your exercise details here.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Duration" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="w-full">
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" form="edit-form">
                Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

export default EditModal;
