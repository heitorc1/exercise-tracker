import { useState } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import exerciseService from "@/services/exercises";
import { IExercise } from "@/interfaces/exercises";

type DeleteModalProps = {
  exercise: IExercise;
};

function DeleteModal({ exercise }: DeleteModalProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    exerciseService.deleteExercise(exercise.id).subscribe({
      next: () => {
        toast.success("Exercise deleted successfully");
        setOpen(false);
      },
      error: () => {
        toast.error("Failed to delete exercise");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="h-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete your exercise</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            exercise.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
