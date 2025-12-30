import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { CodingQuestions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CodingPage() {
  const [questions, setQuestions] = useState<CodingQuestions[]>([]);
  const [loading, setLoading] = useState(true);
  const [solutions, setSolutions] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<CodingQuestions>('codingquestions');
    setQuestions(items);
    setLoading(false);
  };

  const difficulties = ['All', ...Array.from(new Set(questions.map(q => q.difficulty).filter(Boolean)))];

  const filteredQuestions = selectedDifficulty === 'All' 
    ? questions 
    : questions.filter(q => q.difficulty === selectedDifficulty);

  const handleSolutionChange = (questionId: string, value: string) => {
    setSolutions(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitSolution = (questionId: string) => {
    setSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
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
            Coding Practice
          </h1>
          <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
            Sharpen your programming skills with challenging problems across various difficulty levels
          </p>
        </div>
      </section>

      {/* Difficulty Filter */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {difficulties.map(difficulty => (
              <Button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                className={selectedDifficulty === difficulty ? 'bg-primary text-primary-foreground' : ''}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="mb-8">
          <p className="font-paragraph text-base text-gray-600">
            {filteredQuestions.length} problems available
          </p>
        </div>

        <div className="space-y-8">
          {filteredQuestions.map((question, index) => {
            const isSubmitted = submitted[question._id];

            return (
              <motion.div
                key={question._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Badge variant="outline" className="font-paragraph">
                      #{index + 1}
                    </Badge>
                    {question.difficulty && (
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    )}
                    {isSubmitted && (
                      <CheckCircle2 className="text-green-600 ml-auto" size={24} />
                    )}
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-secondary mb-4">
                    {question.title}
                  </h2>

                  <div className="space-y-6">
                    {/* Problem Statement */}
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-secondary mb-2">
                        Problem Statement
                      </h3>
                      <p className="font-paragraph text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {question.problemStatement}
                      </p>
                    </div>

                    {/* Input Format */}
                    {question.inputFormat && (
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-secondary mb-2">
                          Input Format
                        </h3>
                        <p className="font-paragraph text-base text-gray-700 leading-relaxed whitespace-pre-line">
                          {question.inputFormat}
                        </p>
                      </div>
                    )}

                    {/* Output Format */}
                    {question.outputFormat && (
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-secondary mb-2">
                          Output Format
                        </h3>
                        <p className="font-paragraph text-base text-gray-700 leading-relaxed whitespace-pre-line">
                          {question.outputFormat}
                        </p>
                      </div>
                    )}

                    {/* Constraints */}
                    {question.constraints && (
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-secondary mb-2">
                          Constraints
                        </h3>
                        <p className="font-paragraph text-base text-gray-700 leading-relaxed whitespace-pre-line">
                          {question.constraints}
                        </p>
                      </div>
                    )}

                    {/* Example Test Cases */}
                    {question.exampleTestCases && (
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-secondary mb-2">
                          Example Test Cases
                        </h3>
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                          <pre className="font-paragraph text-sm text-gray-700 whitespace-pre-wrap">
                            {question.exampleTestCases}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Solution Input */}
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-secondary mb-2">
                        Your Solution
                      </h3>
                      <Textarea
                        value={solutions[question._id] || ''}
                        onChange={(e) => handleSolutionChange(question._id, e.target.value)}
                        placeholder="Write your code here..."
                        className="font-mono text-sm min-h-[300px]"
                        disabled={isSubmitted}
                      />
                    </div>

                    {/* Submit Button */}
                    {!isSubmitted ? (
                      <Button
                        onClick={() => handleSubmitSolution(question._id)}
                        disabled={!solutions[question._id]?.trim()}
                        className="bg-primary text-primary-foreground"
                      >
                        <Code2 size={18} className="mr-2" />
                        Submit Solution
                      </Button>
                    ) : (
                      <div className="bg-green-50 border border-green-200 p-4 rounded">
                        <p className="font-paragraph text-sm text-green-700 flex items-center gap-2">
                          <CheckCircle2 size={18} />
                          Solution submitted successfully! Keep practicing with more problems.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
