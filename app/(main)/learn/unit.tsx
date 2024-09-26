import { LessonProgress, ProgressLesson } from "@/types/validators";
import { LessonButton } from "./lesson-button";

interface Props {
  lessons: LessonProgress[];
  lessonInProgress?: ProgressLesson | null;
}

export const Units = ({ lessons, lessonInProgress }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {" "}
      {/* Adicione items-center para centralizar horizontalmente */}
      <div className="w-full max-w-md">
        {" "}
        {/* Defina largura máxima para o conteúdo */}
        {lessons.map((lesson, index) => (
          <div
            key={lesson.lesson_id}
            className="flex flex-col items-center mb-6 "
          >
            <LessonButton
              lesson_id={lesson.lesson_id}
              lesson_title={lesson.lesson_title}
              lesson_description={lesson.lesson_description}
              unit_id={lesson.unit_id}
              is_completed={
                lessons.find((l) => l.lesson_id === lesson.lesson_id)
                  ?.LessonProgresses[0].completed_at !== null
              }
              current={lessonInProgress?.Lesson.lesson_id === lesson.lesson_id}
              index={index} // index passado para o LessonButton para controle dos estados
              totalCount={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
