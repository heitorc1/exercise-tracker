import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AppFrame from "@/components/shared/AppFrame";
import { IExercise } from "@/interfaces/exercises";
import exerciseService from "@/services/exercises";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddModal from "./-components/AddModal";
import EditModal from "./-components/EditModal";
import DeleteModal from "./-components/DeleteModal";

export const Route = createFileRoute("/exercises/")({
  component: Exercises,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      return { to: "/" };
    }
  },
});

function Exercises() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const obs = exerciseService.getExerciseList(page, 10).subscribe((res) => {
      setExercises(res.data);
      setTotalItems(res.meta.total);
    });

    return () => obs.unsubscribe();
  }, [page]);

  const handlePagination = (type: "increment" | "decrement") => {
    if (type === "decrement" && page - 1 === 0) {
      return;
    }

    if (type === "increment" && page + 1 > Math.ceil(totalItems / 10)) {
      return;
    }

    type === "decrement"
      ? setPage((prev) => prev - 1)
      : setPage((prev) => prev + 1);
  };

  return (
    <AppFrame title="Exercises">
      <AddModal setExercises={setExercises} />
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Duration (minutes)</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises?.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell className="font-medium">
                {exercise.description}
              </TableCell>
              <TableCell>{format(new Date(exercise.date), "PPPP")}</TableCell>
              <TableCell className="text-center">{exercise.duration}</TableCell>
              <TableCell>
                {format(new Date(exercise.createdAt), "Pp")}
              </TableCell>
              <TableCell className="flex justify-center items-center gap-4">
                <EditModal exercise={exercise} setExercises={setExercises} />
                <DeleteModal exercise={exercise} setExercises={setExercises} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex flex-wrap gap-8 justify-center mt-8 md:justify-start">
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePagination("decrement")}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              {page < Math.ceil(totalItems / 10) && (
                <PaginationNext
                  onClick={() => handlePagination("increment")}
                  className="cursor-pointer"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AppFrame>
  );
}
