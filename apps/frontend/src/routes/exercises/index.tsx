import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AppFrame from "@/components/shared/AppFrame";
import { IExercise } from "@/interfaces/exercises";
import exerciseService from "@/services/exercises";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AddModal from "./-components/AddModal";
import ExerciseCard from "./-components/ExerciseCard";

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
      <AddModal setExercises={setExercises} />
      <div className="w-full flex flex-wrap gap-8 justify-center mt-8 md:justify-start">
        {exercises?.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            setExercises={setExercises}
          />
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
