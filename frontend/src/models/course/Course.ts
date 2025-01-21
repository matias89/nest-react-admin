export default interface Course {
  id: string;
  name: string;
  description: string;
  dateCreated: Date;
}

export interface CourseResult {
  data: Course[];
  total: number;
}
