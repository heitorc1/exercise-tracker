import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AppFrame from "@/components/shared/AppFrame";
import { dateFormatter } from "@/helper/dateFormatter";
import exerciseService from "@/services/exercises";
import { IExercise } from "@/interfaces/exercises";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

    if (type === "increment" && page + 1 > totalItems / 10) {
      return;
    }

    type === "decrement"
      ? setPage((prev) => prev - 1)
      : setPage((prev) => prev + 1);
  };

  return (
    <AppFrame title="Exercises">
      <div className="w-full flex flex-wrap gap-8 justify-center md:justify-start">
        {exercises?.map((exercise) => (
          <Card key={exercise.id} className="p-2">
            <CardHeader className="w-64">
              <CardTitle>{dateFormatter(exercise.date)}</CardTitle>
            </CardHeader>
            <CardContent>Duration: {exercise.duration} minutes</CardContent>
            <CardFooter>
              <div className="flex w-full justify-between px-2">
                <EditModal exercise={exercise} />
                <DeleteModal exercise={exercise} />
              </div>
            </CardFooter>
          </Card>
        ))}
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
              {page !== totalItems / 10 && (
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
