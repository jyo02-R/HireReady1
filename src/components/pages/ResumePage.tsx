import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalysis(null);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        score: Math.floor(Math.random() * 30) + 70,
        strengths: [
          'Clear and concise professional summary',
          'Well-structured work experience section',
          'Relevant technical skills highlighted',
          'Quantifiable achievements mentioned',
          'Proper formatting and layout',
        ],
        improvements: [
          'Add more action verbs to describe responsibilities',
          'Include specific metrics and numbers for achievements',
          'Expand on leadership experiences',
          'Add relevant certifications or courses',
          'Include links to portfolio or GitHub profile',
        ],
        suggestions: [
          'Tailor your resume for each job application',
          'Use industry-specific keywords from job descriptions',
          'Keep resume length to 1-2 pages maximum',
          'Ensure consistent formatting throughout',
          'Proofread for grammar and spelling errors',
          'Use a professional email address',
          'Include relevant projects with brief descriptions',
          'Highlight soft skills alongside technical skills',
        ],
      };
      
      setAnalysis(mockAnalysis);
      setAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-backgrounddark text-secondary-foreground py-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <h1 className="font-heading text-5xl lg:text-6xl font-black mb-4">
            Resume Analyzer
          </h1>
          <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
            Get instant feedback and actionable suggestions to improve your resume and stand out to recruiters
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Card */}
          <div>
            <Card className="p-8">
              <h2 className="font-heading text-2xl font-bold text-secondary mb-6">
                Upload Your Resume
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="font-paragraph text-base text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="font-paragraph text-sm text-gray-400">
                    PDF, DOC, or DOCX (Max 5MB)
                  </p>
                </label>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-gray-50 rounded flex items-center gap-3">
                  <FileText className="text-primary" size={24} />
                  <div className="flex-1">
                    <p className="font-paragraph text-sm font-semibold text-secondary">
                      {file.name}
                    </p>
                    <p className="font-paragraph text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!file || analyzing}
                className="w-full mt-6 bg-primary text-primary-foreground"
              >
                {analyzing ? 'Analyzing...' : 'Analyze Resume'}
              </Button>
            </Card>

            {/* Tips Card */}
            <Card className="p-8 mt-6 bg-primary/5 border-primary/20">
              <h3 className="font-heading text-xl font-bold text-secondary mb-4">
                Resume Tips
              </h3>
              <ul className="space-y-3">
                <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  Keep your resume concise and focused on relevant experience
                </li>
                <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  Use action verbs and quantify your achievements
                </li>
                <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  Tailor your resume for each job application
                </li>
                <li className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  Ensure consistent formatting and no typos
                </li>
              </ul>
            </Card>
          </div>

          {/* Analysis Results */}
          <div>
            {!analysis && !analyzing && (
              <div className="h-full flex items-center justify-center text-center p-12">
                <div>
                  <TrendingUp className="mx-auto mb-4 text-gray-300" size={64} />
                  <p className="font-paragraph text-lg text-gray-500">
                    Upload your resume to see detailed analysis and suggestions
                  </p>
                </div>
              </div>
            )}

            {analyzing && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="font-paragraph text-lg text-gray-600">
                    Analyzing your resume...
                  </p>
                </div>
              </div>
            )}

            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <Card className={`p-8 ${getScoreBgColor(analysis.score)}`}>
                  <div className="text-center">
                    <p className="font-paragraph text-sm text-gray-600 mb-2">
                      Resume Score
                    </p>
                    <div className={`font-heading text-6xl font-black ${getScoreColor(analysis.score)} mb-2`}>
                      {analysis.score}
                    </div>
                    <p className="font-paragraph text-sm text-gray-600">
                      out of 100
                    </p>
                  </div>
                </Card>

                {/* Strengths */}
                <Card className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-green-600" size={24} />
                    <h3 className="font-heading text-xl font-bold text-secondary">
                      Strengths
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Areas for Improvement */}
                <Card className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-yellow-600" size={24} />
                    <h3 className="font-heading text-xl font-bold text-secondary">
                      Areas for Improvement
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-yellow-600 mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Suggestions */}
                <Card className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-primary" size={24} />
                    <h3 className="font-heading text-xl font-bold text-secondary">
                      Suggestions
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="font-paragraph text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
