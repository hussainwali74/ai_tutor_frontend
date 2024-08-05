export interface FilterInterface {
  id?: number;
  // filter_type: string;
  topic: string;
  sub_topic: string;
  subject: string;
  date?: Date;
}
export interface UserInterface {
  created_at:Date
  id: number;
  clerk_id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface LessonInterface {
  id?: number;
  title: string;
  imageSrc?: string;
  summary?: string;
  context: string;
  subject?: string;
  topic_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface TopicInterface {
  id?: number;
  title: string;
  subject_id?: string;
  subject?: string;
  summary?: string;
  imageSrc?: string;
  detail?: string;
  lessons?: any[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface Class_Interface {
  id?: number;
  title: string;
  imageSrc: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface SubjectInterface {
  id?: number;
  // filter_type: string;
  title: string;
  summary: string;
  imageSrc: string;
  class_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  lessons?: number;
}
