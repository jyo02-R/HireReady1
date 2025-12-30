import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { CompanySpecificPreparation, MockTests } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, ExternalLink, Clock, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanySpecificPreparation[]>([]);
  const [mockTests, setMockTests] = useState<MockTests[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<CompanySpecificPreparation | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [companiesData, mockTestsData] = await Promise.all([
      BaseCrudService.getAll<CompanySpecificPreparation>('companyspecificpreparation'),
      BaseCrudService.getAll<MockTests>('mocktests'),
    ]);
    setCompanies(companiesData.items);
    setMockTests(mockTestsData.items);
    setLoading(false);
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
          <p className="font-paragraph text-lg text-gray-600">Loading data...</p>
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
            Company Preparation
          </h1>
          <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
            Access company-specific preparation materials and practice with mock tests
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <Tabs defaultValue="companies" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="companies" className="font-paragraph">
              Company Guides
            </TabsTrigger>
            <TabsTrigger value="mock-tests" className="font-paragraph">
              Mock Tests
            </TabsTrigger>
          </TabsList>

          {/* Companies Tab */}
          <TabsContent value="companies">
            {!selectedCompany ? (
              <div>
                <div className="mb-8">
                  <h2 className="font-heading text-3xl font-bold text-secondary mb-2">
                    Company-Specific Guides
                  </h2>
                  <p className="font-paragraph text-base text-gray-600">
                    Detailed preparation materials tailored for specific companies
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {companies.map((company, index) => (
                    <motion.div
                      key={company._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
                        {company.companyLogo && (
                          <div className="mb-4 h-24 flex items-center justify-center bg-gray-50 rounded">
                            <Image
                              src={company.companyLogo}
                              alt={company.companyName || 'Company logo'}
                              width={200}
                              className="max-h-20 object-contain"
                            />
                          </div>
                        )}

                        <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                          {company.companyName}
                        </h3>

                        {company.companyWebsite && (
                          <a
                            href={company.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-sm text-primary hover:underline mb-4 flex items-center gap-1"
                          >
                            Visit Website
                            <ExternalLink size={14} />
                          </a>
                        )}

                        <Button
                          onClick={() => setSelectedCompany(company)}
                          className="mt-auto bg-primary text-primary-foreground"
                        >
                          View Details
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => setSelectedCompany(null)}
                  variant="outline"
                  className="mb-8"
                >
                  ← Back to Companies
                </Button>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-8">
                      {selectedCompany.companyLogo && (
                        <div className="h-20 w-20 flex items-center justify-center bg-gray-50 rounded">
                          <Image
                            src={selectedCompany.companyLogo}
                            alt={selectedCompany.companyName || 'Company logo'}
                            width={80}
                            className="max-h-16 object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h1 className="font-heading text-4xl font-black text-secondary mb-2">
                          {selectedCompany.companyName}
                        </h1>
                        {selectedCompany.companyWebsite && (
                          <a
                            href={selectedCompany.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-paragraph text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            Visit Website
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {selectedCompany.interviewProcess && (
                      <div className="mb-8">
                        <h2 className="font-heading text-2xl font-bold text-secondary mb-4">
                          Interview Process
                        </h2>
                        <div className="bg-gray-50 p-6 rounded">
                          <p className="font-paragraph text-base text-gray-700 whitespace-pre-line leading-relaxed">
                            {selectedCompany.interviewProcess}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedCompany.commonQuestions && (
                      <div className="mb-8">
                        <h2 className="font-heading text-2xl font-bold text-secondary mb-4">
                          Common Questions
                        </h2>
                        <div className="bg-gray-50 p-6 rounded">
                          <p className="font-paragraph text-base text-gray-700 whitespace-pre-line leading-relaxed">
                            {selectedCompany.commonQuestions}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedCompany.preparationTips && (
                      <div className="mb-8">
                        <h2 className="font-heading text-2xl font-bold text-secondary mb-4">
                          Preparation Tips
                        </h2>
                        <div className="bg-gray-50 p-6 rounded">
                          <p className="font-paragraph text-base text-gray-700 whitespace-pre-line leading-relaxed">
                            {selectedCompany.preparationTips}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </div>
            )}
          </TabsContent>

          {/* Mock Tests Tab */}
          <TabsContent value="mock-tests">
            <div className="mb-8">
              <h2 className="font-heading text-3xl font-bold text-secondary mb-2">
                Mock Tests
              </h2>
              <p className="font-paragraph text-base text-gray-600">
                Practice with timed mock tests to simulate real placement exams
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockTests.map((test, index) => (
                <motion.div
                  key={test._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-primary/10 p-3 rounded">
                        <FileQuestion className="text-primary" size={24} />
                      </div>
                      {test.difficultyLevel && (
                        <Badge className={getDifficultyColor(test.difficultyLevel)}>
                          {test.difficultyLevel}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                      {test.testName}
                    </h3>

                    <p className="font-paragraph text-sm text-gray-600 mb-4 flex-1">
                      {test.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {test.durationMinutes && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} />
                          <span className="font-paragraph text-sm">
                            {test.durationMinutes} minutes
                          </span>
                        </div>
                      )}
                      {test.totalQuestions && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FileQuestion size={16} />
                          <span className="font-paragraph text-sm">
                            {test.totalQuestions} questions
                          </span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full bg-primary text-primary-foreground">
                      Start Test
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  );
}
