/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: aptitudequestions
 * Interface for AptitudeQuestions
 */
export interface AptitudeQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  questionText?: string;
  /** @wixFieldType text */
  optionA?: string;
  /** @wixFieldType text */
  optionB?: string;
  /** @wixFieldType text */
  optionC?: string;
  /** @wixFieldType text */
  optionD?: string;
  /** @wixFieldType text */
  correctAnswer?: string;
  /** @wixFieldType text */
  topic?: string;
}


/**
 * Collection ID: codingquestions
 * Interface for CodingQuestions
 */
export interface CodingQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  problemStatement?: string;
  /** @wixFieldType text */
  difficulty?: string;
  /** @wixFieldType text */
  constraints?: string;
  /** @wixFieldType text */
  inputFormat?: string;
  /** @wixFieldType text */
  outputFormat?: string;
  /** @wixFieldType text */
  exampleTestCases?: string;
}


/**
 * Collection ID: companyspecificpreparation
 * Interface for CompanySpecificPreparation
 */
export interface CompanySpecificPreparation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType image */
  companyLogo?: string;
  /** @wixFieldType text */
  commonQuestions?: string;
  /** @wixFieldType text */
  interviewProcess?: string;
  /** @wixFieldType text */
  preparationTips?: string;
  /** @wixFieldType url */
  companyWebsite?: string;
}


/**
 * Collection ID: interviewpreparationplans
 * Interface for InterviewPreparationPlans
 */
export interface InterviewPreparationPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  topicsCovered?: string;
  /** @wixFieldType text */
  preparationStages?: string;
  /** @wixFieldType text */
  guidanceContent?: string;
  /** @wixFieldType number */
  estimatedDuration?: number;
  /** @wixFieldType image */
  thumbnailImage?: string;
}


/**
 * Collection ID: mocktests
 * Interface for MockTests
 */
export interface MockTests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  testName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  durationMinutes?: number;
  /** @wixFieldType number */
  totalQuestions?: number;
  /** @wixFieldType text */
  difficultyLevel?: string;
}
