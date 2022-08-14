/**
 * @author Pavith Madusara
 *
 * Created at 01-Aug-2021
 * Sunday at 8:07 PM
 */
import {Question} from './question';

export class PaperMetaData {
  subject: string;
  title: string;
  publishDate: Date;
  expireDate: Date;
  documentId?: string;
  questionCount: number;
  totalTime: number;
}

export class Paper extends PaperMetaData {
  description: string;
  questions: Question[];
  answerSet: number[];
}
