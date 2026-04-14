import { mockStudents, type Student } from '../data/mockStudents';

export type { Student };

export async function getStudents(): Promise<Student[]> {
  return Promise.resolve(mockStudents);
}
