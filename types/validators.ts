import { z } from "zod";

const sectionProgressSchema = z.object({
  in_progress: z.boolean(),
  is_locked: z.boolean(),
  completed_at: z.date().nullable(),
  Section: z.object({
    section_id: z.number().int(),
    section_title: z.string(),
    section_description: z.string(),
    level_id: z.number().int(),
  }),
});

const unitProgressSchema = z.object({
  in_progress: z.boolean(),
  is_locked: z.boolean(),
  completed_at: z.date().nullable(),
  Unit: z.object({
    unit_id: z.number().int(),
    unit_title: z.string(),
    unit_description: z.string(),
    level_id: z.number().int(),
  }),
});

const lessonProgressSchema = z.object({
  in_progress: z.boolean(),
  is_locked: z.boolean(),
  completed_at: z.date().nullable(),
  Lesson: z.object({
    lesson_id: z.number().int(),
    lesson_title: z.string(),
    lesson_description: z.string(),
    unit_id: z.number().int(),
  }),
});

const lessonSchema = z.object({
  lesson_id: z.number().int(),
  lesson_title: z.string(),
  lesson_description: z.string(),
  unit_id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
});

const QuestionSchema = z.object({
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
});
const UserSchema = z.object({
  first_name: z.string().min(1, "Nome não deve ser vazio."),
  last_name: z.string().min(1, "Sobrenome não deve ser vazio."),
  xp: z.number().int({ message: "XP deve ser um número inteiro." }),
  level_id: z
    .number()
    .int({ message: "ID do nível deve ser um número inteiro." }),
  created_at: z.date(),
  updated_at: z.date(),
});

const ExplanationSchema = z.object({
  explanation_id: z.number().int(),
  content: z.string(),
  part: z.enum(["PART_1", "PART_2", "PART_3"]),
  lesson_id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type SectionProgess = z.infer<typeof sectionProgressSchema>;
export type UnitProgress = z.infer<typeof unitProgressSchema>;
export type LessonProgress = z.infer<typeof lessonProgressSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type User = z.infer<typeof UserSchema>;
export type Explanation = z.infer<typeof ExplanationSchema>;
