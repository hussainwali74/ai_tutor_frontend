import { char, index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const prompt = pgTable('prompt',{
    id:serial('id').primaryKey(),
    type:text('type').notNull(),
    entity:text('entity'), // can be class, subject, topic
    entity_id:integer('entity_id'), // the id of the entity for which this prompt
    prompt:text('prompt'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const Class = pgTable('class',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    imageSrc:text('image_src'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const subject = pgTable('subject',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    imageSrc:text('image_src'),
    summary:text('summary'),
    class_id: integer('class_id').references(()=>Class.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const topic = pgTable('topic',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    imageSrc:text('image_src'),
    summary:text('summary'),
    subject_id: integer('subject_id').references(()=>subject.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const lesson = pgTable('lesson',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    imageSrc:text('image_src').default('lesson_modal_heading.png'),
    summary:text('summary'),
    context:text('context').default('-'),
    topic:text('topic'),
    subject:text('subject'),
    topic_id: integer('topic_id').references(()=>topic.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const test = pgTable('test',{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    type:text('type').notNull(), //mcq or long form
    subject_id: integer('subject_id').references(()=>subject.id),
    lesson_id: integer('lesson_id').references(()=>lesson.id),
    topic_id: integer('topic_id').references(()=>topic.id),
    imageSrc:text('image_src'),
    summary:text('summary'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const question = pgTable('question',{
    id:serial('id').primaryKey(),
    question:text('question').notNull(),
    type:text('type').notNull(),
    option1:text('option1').notNull(),
    option2:text('option2').notNull(),
    option3:text('option3').notNull(),
    option4:text('option4').notNull(),
    correct_answer:text('correct_answer').notNull(),
    imageSrc:text('image_src'),
    summary:text('summary'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const user = pgTable('user',{
    id:serial('id').primaryKey(),
    clerk_id:varchar('clerk_id',{length:100}).unique(),
    name:text('name').notNull(),
    email:text('email').notNull(),
    contact:text('contact'),
    address:text('address'),
    imageSrc:text('image_src'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
},(table)=>{
    return {
        clerkIdx:index('cleck_idx').on(table.clerk_id)
    }
})

export const student = pgTable('student',{
    id:serial('id').primaryKey(),
    user_id: integer('user_id').references(()=>user.id, {onDelete:'cascade'}),
    class_id: integer('class_id').references(()=>Class.id, {onUpdate:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const student_test = pgTable('student_test',{
    id:serial('id').primaryKey(),
    remarks:text('remarks').notNull(),
    aiFeedback:text('ai_feedback').notNull(),
    total_marks:integer('total_marks'),
    obtained_marks:integer('obtained_marks'),

    student_id: integer('student_id').references(()=>student.id, {onDelete:'cascade'}),
    test_id: integer('test_id').references(()=>test.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const student_question = pgTable('student_question',{
    id:serial('id').primaryKey(),
    answer:text('answer').notNull(),
    remarks:text('remarks').notNull(),
    aiFeedback:text('ai_feedback').notNull(),
    total_marks:integer('total_marks'),
    obtained_marks:integer('obtained_marks'),
    
    student_id: integer('student_id').references(()=>student.id, {onDelete:'cascade'}),
    question_id: integer('question_id').references(()=>question.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const student_class = pgTable('student_class',{
    id:serial('id').primaryKey(),
    progress:integer('progress').default(0),
    enrolled_date:timestamp('enrolled_date').notNull(),
    
    student_id: integer('student_id').references(()=>student.id, {onDelete:'cascade'}),
    class_id: integer('class_id').references(()=>Class.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const student_topic = pgTable('student_topic',{
    id:serial('id').primaryKey(),
    progress:integer('progress').default(0),
    start_date:timestamp('start_date').notNull(),
    
    student_id: integer('student_id').references(()=>student.id, {onDelete:'cascade'}),
    topic_id: integer('topic_id').references(()=>topic.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})

export const student_lesson = pgTable('student_lesson',{
    id:serial('id').primaryKey(),
    progress:integer('progress').default(0),
    start_date:timestamp('start_date').notNull(),
    notes:text('notes'),
    
    student_id: integer('student_id').references(()=>student.id, {onDelete:'cascade'}),
    lesson_id: integer('lesson_id').references(()=>lesson.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})
// ---new 
export const student_bot_chat = pgTable('student_bot_chat',{
    id:serial('id').primaryKey(),
    // progress:integer('progress').default(0),
    // start_date:timestamp('start_date').notNull(),
    role:varchar('role', {length:10}),
    content:text('content'),
    feedback:integer('feedback').default(0),
    
    student_id: integer('student_id').references(()=>student.id, {onDelete:'cascade'}),
    lesson_id: integer('lesson_id').references(()=>lesson.id, {onDelete:'cascade'}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
})
