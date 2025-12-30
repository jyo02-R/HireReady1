import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { AptitudeQuestions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AptitudePage() {
  const [questions, setQuestions] = useState<AptitudeQuestions[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<AptitudeQuestions>('aptitudequestions');
    setQuestions(items);
    setLoading(false);
  };

  const topics = ['All', ...Array.from(new Set(questions.map(q => q.topic).filter(Boolean)))];

  const filteredQuestions = selectedTopic === 'All' 
    ? questions 
    : questions.filter(q => q.topic === selectedTopic);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (!submitted) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    filteredQuestions.forEach(question => {
      if (selectedAnswers[question._id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-24 text-center">
          <p className="font-paragraph text-lg text-gray-600">Loading questions...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-backgrounddark text-secondary-foreground py-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <h1 className="font-heading text-5xl lg:text-6xl font-black mb-4">
            Aptitude Practice
          </h1>
          <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
            Test your quantitative, logical, and verbal reasoning skills with our comprehensive question bank
          </p>
        </div>
      </section>

      {/* Topic Filter */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {topics.map(topic => (
              <Button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                variant={selectedTopic === topic ? 'default' : 'outline'}
                className={selectedTopic === topic ? 'bg-primary text-primary-foreground' : ''}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Score Display */}
      {submitted && (
        <section className="bg-primary text-primary-foreground py-8">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-2">
                  Your Score: {score} / {filteredQuestions.length}
                </h2>
                <p className="font-paragraph text-lg opacity-90">
                  {((score / filteredQuestions.length) * 100).toFixed(1)}% Correct
                </p>
              </div>
              <Button
                onClick={handleReset}
                className="bg-background text-secondary hover:bg-gray-100"
              >
                <RotateCcw size={18} className="mr-2" />
                Retry Quiz
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Questions */}
      <section className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-paragraph text-base text-gray-600">
            {filteredQuestions.length} questions available
          </p>
          {!submitted && Object.keys(selectedAnswers).length > 0 && (
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
              Submit Quiz
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((question, index) => {
            const isAnswered = selectedAnswers[question._id];
            const isCorrect = submitted && selectedAnswers[question._id] === question.correctAnswer;
            const isWrong = submitted && selectedAnswers[question._id] && selectedAnswers[question._id] !== question.correctAnswer;

            return (
              <motion.div
                key={question._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`p-6 ${isCorrect ? 'border-green-500 bg-green-50' : isWrong ? 'border-red-500 bg-red-50' : ''}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <Badge variant="outline" className="font-paragraph">
                      Q{index + 1}
                    </Badge>
                    {question.topic && (
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {question.topic}
                      </Badge>
                    )}
                    {submitted && isCorrect && (
                      <CheckCircle2 className="text-green-600 ml-auto" size={24} />
                    )}
                    {submitted && isWrong && (
                      <XCircle className="text-red-600 ml-auto" size={24} />
                    )}
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-secondary mb-6">
                    {question.questionText}
                  </h3>

                  <div className="space-y-3">
                    {['A', 'B', 'C', 'D'].map(option => {
                      const optionText = question[`option${option}` as keyof AptitudeQuestions] as string;
                      const isSelected = selectedAnswers[question._id] === option;
                      const isCorrectOption = submitted && question.correctAnswer === option;

                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswerSelect(question._id, option)}
                          disabled={submitted}
                          className={`w-full text-left p-4 rounded border-2 transition-all ${
                            isSelected && !submitted
                              ? 'border-primary bg-primary/5'
                              : isCorrectOption
                              ? 'border-green-500 bg-green-50'
                              : isSelected && isWrong
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-heading font-bold ${
                              isCorrectOption ? 'text-green-600' : isSelected && isWrong ? 'text-red-600' : 'text-secondary'
                            }`}>
                              {option}.
                            </span>
                            <span className="font-paragraph text-base text-secondary">
                              {optionText}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                      <p className="font-paragraph text-sm text-gray-700">
                        <span className="font-semibold">Correct Answer:</span> {question.correctAnswer}
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {!submitted && filteredQuestions.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="bg-primary text-primary-foreground px-12 py-6 text-lg"
            >
              Submit Quiz
            </Button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
