/**
 * @author Pavith Madusara
 *
 * Created at 01-Aug-2021
 * Sunday at 7:59 PM
 */
import {Answer} from './answer';

export class Question {
  title: string;
  answers: Answer[];
  correctAnswer: number;
  time: number;
  images: string[];

  givenAnswer: number;
  timeTaken: number;
}
