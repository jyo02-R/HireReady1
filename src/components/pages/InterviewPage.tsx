import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { InterviewPreparationPlans } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Clock, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InterviewPage() {
  const [plans, setPlans] = useState<InterviewPreparationPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<InterviewPreparationPlans | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setLoading(true);
    const { items } = await BaseCrudService.getAll<InterviewPreparationPlans>('interviewpreparationplans');
    setPlans(items);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-24 text-center">
          <p className="font-paragraph text-lg text-gray-600">Loading preparation plans...</p>
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
            Interview Preparation
          </h1>
          <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
            Comprehensive guides and structured plans to help you ace your technical and HR interviews
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      {!selectedPlan && (
        <section className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-2">
              Preparation Plans
            </h2>
            <p className="font-paragraph text-base text-gray-600">
              Choose a plan that matches your preparation timeline and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                  {plan.thumbnailImage && (
                    <div className="aspect-video bg-gray-100">
                      <Image
                        src={plan.thumbnailImage}
                        alt={plan.planName || 'Preparation plan'}
                        width={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                      {plan.planName}
                    </h3>
                    
                    <p className="font-paragraph text-sm text-gray-600 mb-4 flex-1">
                      {plan.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      {plan.estimatedDuration && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock size={16} />
                          <span className="font-paragraph text-xs">
                            {plan.estimatedDuration} days
                          </span>
                        </div>
                      )}
                      {plan.topicsCovered && (
                        <Badge variant="outline" className="text-xs">
                          Multiple Topics
                        </Badge>
                      )}
                    </div>

                    <Button
                      onClick={() => setSelectedPlan(plan)}
                      className="w-full bg-primary text-primary-foreground"
                    >
                      View Plan
                      <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Plan Details */}
      {selectedPlan && (
        <section className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16">
          <Button
            onClick={() => setSelectedPlan(null)}
            variant="outline"
            className="mb-8"
          >
            ← Back to Plans
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 lg:p-12">
              <div className="mb-8">
                <h1 className="font-heading text-4xl font-black text-secondary mb-4">
                  {selectedPlan.planName}
                </h1>
                <p className="font-paragraph text-lg text-gray-600">
                  {selectedPlan.description}
                </p>
              </div>

              {selectedPlan.estimatedDuration && (
                <div className="flex items-center gap-2 mb-8 p-4 bg-primary/5 rounded">
                  <Clock className="text-primary" size={24} />
                  <div>
                    <p className="font-heading font-semibold text-secondary">
                      Estimated Duration
                    </p>
                    <p className="font-paragraph text-sm text-gray-600">
                      {selectedPlan.estimatedDuration} days of focused preparation
                    </p>
                  </div>
                </div>
              )}

              {selectedPlan.topicsCovered && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-primary" size={24} />
                    <h2 className="font-heading text-2xl font-bold text-secondary">
                      Topics Covered
                    </h2>
                  </div>
                  <div className="bg-gray-50 p-6 rounded">
                    <p className="font-paragraph text-base text-gray-700 whitespace-pre-line leading-relaxed">
                      {selectedPlan.topicsCovered}
                    </p>
                  </div>
                </div>
              )}

              {selectedPlan.preparationStages && (
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-secondary mb-4">
                    Preparation Stages
                  </h2>
                  <div className="bg-gray-50 p-6 rounded">
                    <p className="font-paragraph text-base text-gray-700 whitespace-pre-line leading-relaxed">
                      {selectedPlan.preparationStages}
                    </p>
                  </div>
                </div>
              )}

              {selectedPlan.guidanceContent && (
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-secondary mb-4">
                    Detailed Guidance
                  </h2>
                  <div className="bg-gray-50 p-6 rounded">
                    <p className="font-paragraph text-base text-gray-700 whitespace-pre-line leading-relaxed">
                      {selectedPlan.guidanceContent}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </section>
      )}

      {/* Tips Section */}
      {!selectedPlan && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-8 text-center">
              General Interview Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="font-heading text-xl font-bold text-secondary mb-4">
                  Before the Interview
                </h3>
                <ul className="space-y-3">
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Research the company thoroughly
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Review your resume and be ready to discuss every point
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Prepare answers for common interview questions
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Practice coding problems on a whiteboard
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Prepare thoughtful questions to ask the interviewer
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-xl font-bold text-secondary mb-4">
                  During the Interview
                </h3>
                <ul className="space-y-3">
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Think out loud while solving problems
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Ask clarifying questions before jumping to solutions
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Discuss trade-offs and alternative approaches
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Stay calm and composed under pressure
                  </li>
                  <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Be honest if you don't know something
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
