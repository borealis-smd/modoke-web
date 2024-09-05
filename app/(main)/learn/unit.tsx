import { LessonButton } from "./lesson-button";

type Lesson = {
   id: number;
   order: number;
   title: string;
   description: string;
   completed: boolean;
   activeLesson: boolean;
   activeLessonPercentage: number;
};

const lessons: Lesson[] = [
   { id: 1, order: 0, title: "Lição 1", description: "Introdução", completed: false, activeLesson: true, activeLessonPercentage: 0 },
   { id: 2, order: 1, title: "Lição 2", description: "Fundamentos", completed: true, activeLesson: false, activeLessonPercentage: 100 },
   { id: 3, order: 2, title: "Lição 3", description: "Teste", completed: false, activeLesson: false, activeLessonPercentage: 0 },
   { id: 4, order: 3, title: "Lição 4", description: "Final", completed: false, activeLesson: false, activeLessonPercentage: 0 },
];

export const Unit = () => {
   return (
      <div className="flex flex-col justify-center items-center"> {/* Adicione items-center para centralizar horizontalmente */}
         <div className="w-full max-w-md"> {/* Defina largura máxima para o conteúdo */}
            {lessons.map((lesson, index) => (
               <div key={lesson.id} className="flex flex-col items-center mb-6 ">
                  <LessonButton
                     lesson_id={lesson.id}
                     lesson_title={lesson.title}
                     lesson_description={lesson.description}
                     lesson_principle={0}
                     unit_id={0}
                     is_completed={lesson.completed}
                     current={lesson.activeLesson}
                     index={index} // index passado para o LessonButton para controle dos estados
                     totalCount={0}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};