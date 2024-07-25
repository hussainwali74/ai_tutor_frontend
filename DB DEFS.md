prompt :{
    id
    type
    entity
    entity_id
    prompt
    created_at
    updated_at
    deleted_at
}

classs:{
    id
    title
    image_src
    created_at
    updated_at
    deleted_at
}

subjects:{
    title: title of the subject
    icon_img_src: icon
    summary
    class_id: class has subjects
    created_at
    updated_at
    deleted_at
}

topics:{
    title
    icon_img_src
    summary
    subject_id
    created_at
    updated_at
    deleted_at
}

lesson:{
    title
    summary
    context
    icon_img_src
    topic_id
    created_at
    updated_at
    deleted_at
}
test :{
    lesson_id
    title
    type
    created_at
    updated_at
    deleted_at
}

question:{
    question
    test_id
    type:[mcq, long form]
    option1
    option2
    option3
    option4
    correct answer 
    created_at
    updated_at
    deleted_at
}
user {
    name
    email
    contact
    address
    image_src
}

student: {
    user_id
    class_id
    created_at
    updated_at
    deleted_at
}

<!-- student attempted a test -->
student_test:{
    student_id
    test_id
    total_marks
    obtained_marks
    ai_feedback
    remarks
    created_at
    updated_at
    deleted_at
}

student_question:{
    answer
    remarks <!-- for teacher to provide feedback to student -->
    ai_feedback
    total_marks
    obtained_marks

    student_id
    question_id
    created_at
    updated_at
    deleted_at
}

student_class
 :{
    progress
    enrolled_date
    student_id
    class_id
    created_at
    updated_at
    deleted_at
}

student_subject
 :{
    student_id
    subject_id
    progress
    start_date
    created_at
    updated_at
    deleted_at
}

student_topic:{
   progress
    start_date
   student_id
   topic_id
    created_at
    updated_at
    deleted_at
}

student_lesson:{
   progress
   notes
   student_id
   lesson_id
    start_date
    created_at
    updated_at
    deleted_at
}
