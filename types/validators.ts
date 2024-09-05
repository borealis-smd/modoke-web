import { z } from "zod";

export const QuestionSchema = z.array(
  z.object({
    question_id: z
      .number()
      .int({ message: "ID da pergunta deve ser um número inteiro." }),
    question_text: z.string().min(1, "Texto da pergunta não deve ser vazio."),
    is_entrance_question: z.boolean({
      message: "Status de pergunta de entrada deve ser um booleano.",
    }),
    xp: z.number().int({ message: "XP deve ser um número inteiro." }),
    lesson_id: z
      .number()
      .int({ message: "ID da lição deve ser um número inteiro." })
      .nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    Options: z.array(
      z.object({
        option_id: z
          .number()
          .int({ message: "ID da opção deve ser um número inteiro." }),
        option_text: z.string().min(1, "Texto da opção não deve ser vazio."),
        is_correct: z.boolean({
          message: "Status de opção correta deve ser um booleano.",
        }),
        question_id: z
          .number()
          .int({ message: "ID da pergunta deve ser um número inteiro." }),
        created_at: z.date(),
        updated_at: z.date(),
      })
    ),
  })
);

export type Lesson = z.infer<typeof QuestionSchema>;
