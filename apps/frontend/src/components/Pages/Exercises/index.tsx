import { useEffect, useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
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

const Exercises = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const obs = exerciseService.getExerciseList(page, 10).subscribe({
      next: (res) => {
        setExercises(res.data);
        setTotalItems(res.meta.total);
      },
      error: (err) => {
        toast.error(err);
        setIsError(true);
      },
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

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <AppFrame title="Exercises">
      <div className="w-full flex flex-wrap gap-8 justify-center md:justify-start">
        {isError && <div>Error fetching exercises</div>}
        {exercises?.map((exercise) => (
          <Card key={exercise.id} className="p-2">
            <CardHeader className="w-64">
              <CardTitle>{dateFormatter(exercise.date)}</CardTitle>
            </CardHeader>
            <CardContent>Duration: {exercise.duration} minutes</CardContent>
            <CardFooter>
              <div className="flex w-full justify-between px-2">
                <Pencil1Icon
                  onClick={handleEdit}
                  className="h-4 cursor-pointer"
                />
                <TrashIcon
                  onClick={handleDelete}
                  className="h-4 cursor-pointer"
                />
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
};

export default Exercises;
