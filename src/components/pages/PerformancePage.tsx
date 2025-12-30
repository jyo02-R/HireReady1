import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Code, FileText, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function PerformancePage() {
  const [stats] = useState({
    aptitudeScore: 78,
    codingScore: 85,
    resumeScore: 72,
    overallProgress: 78,
    questionsAttempted: 145,
    questionsCorrect: 112,
    testsCompleted: 8,
    studyStreak: 12,
  });

  const weeklyProgress = [
    { day: 'Mon', score: 65 },
    { day: 'Tue', score: 70 },
    { day: 'Wed', score: 68 },
    { day: 'Thu', score: 75 },
    { day: 'Fri', score: 78 },
    { day: 'Sat', score: 82 },
    { day: 'Sun', score: 85 },
  ];

  const modulePerformance = [
    { module: 'Aptitude', score: 78 },
    { module: 'Coding', score: 85 },
    { module: 'Resume', score: 72 },
    { module: 'Interview', score: 80 },
  ];

  const topicDistribution = [
    { name: 'Quantitative', value: 35 },
    { name: 'Logical', value: 30 },
    { name: 'Verbal', value: 20 },
    { name: 'Technical', value: 15 },
  ];

  const COLORS = ['#5C5CF6', '#6E6EFF', '#8B8BFF', '#A8A8FF'];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-backgrounddark text-secondary-foreground py-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <h1 className="font-heading text-5xl lg:text-6xl font-black mb-4">
            Performance Tracking
          </h1>
          <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
            Monitor your progress and identify areas for improvement with detailed analytics
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-gray-600">
                  Overall Progress
                </h3>
              </div>
              <div className="font-heading text-4xl font-black text-primary mb-1">
                {stats.overallProgress}%
              </div>
              <p className="font-paragraph text-xs text-gray-600">
                Keep up the great work!
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-gray-600">
                  Questions Attempted
                </h3>
              </div>
              <div className="font-heading text-4xl font-black text-secondary mb-1">
                {stats.questionsAttempted}
              </div>
              <p className="font-paragraph text-xs text-gray-600">
                {stats.questionsCorrect} correct ({((stats.questionsCorrect / stats.questionsAttempted) * 100).toFixed(1)}%)
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded">
                  <Award className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-gray-600">
                  Tests Completed
                </h3>
              </div>
              <div className="font-heading text-4xl font-black text-secondary mb-1">
                {stats.testsCompleted}
              </div>
              <p className="font-paragraph text-xs text-gray-600">
                Across all modules
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-3 rounded">
                  <Calendar className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-gray-600">
                  Study Streak
                </h3>
              </div>
              <div className="font-heading text-4xl font-black text-secondary mb-1">
                {stats.studyStreak}
              </div>
              <p className="font-paragraph text-xs text-gray-600">
                Days in a row
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="font-heading text-xl font-bold text-secondary mb-6">
                Weekly Progress
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" className="font-paragraph text-xs" />
                  <YAxis stroke="#666" className="font-paragraph text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontFamily: 'open sans'
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#5C5CF6" strokeWidth={3} dot={{ fill: '#5C5CF6', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Module Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6">
              <h2 className="font-heading text-xl font-bold text-secondary mb-6">
                Module Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modulePerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="module" stroke="#666" className="font-paragraph text-xs" />
                  <YAxis stroke="#666" className="font-paragraph text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontFamily: 'open sans'
                    }}
                  />
                  <Bar dataKey="score" fill="#5C5CF6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Module Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="font-heading text-xl font-bold text-secondary mb-6">
                Module Breakdown
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="text-primary" size={20} />
                      <span className="font-heading font-semibold text-secondary">
                        Aptitude
                      </span>
                    </div>
                    <span className="font-heading font-bold text-primary">
                      {stats.aptitudeScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${stats.aptitudeScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code className="text-primary" size={20} />
                      <span className="font-heading font-semibold text-secondary">
                        Coding
                      </span>
                    </div>
                    <span className="font-heading font-bold text-primary">
                      {stats.codingScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${stats.codingScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="text-primary" size={20} />
                      <span className="font-heading font-semibold text-secondary">
                        Resume
                      </span>
                    </div>
                    <span className="font-heading font-bold text-primary">
                      {stats.resumeScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${stats.resumeScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Topic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="p-6">
              <h2 className="font-heading text-xl font-bold text-secondary mb-6">
                Topic Focus
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={topicDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {topicDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontFamily: 'open sans'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {topicDistribution.map((topic, index) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-paragraph text-sm text-gray-700">
                        {topic.name}
                      </span>
                    </div>
                    <span className="font-paragraph text-sm font-semibold text-gray-700">
                      {topic.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="p-8 bg-primary text-primary-foreground">
            <h2 className="font-heading text-2xl font-bold mb-4">
              Personalized Recommendations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  Focus Areas
                </h3>
                <ul className="space-y-2">
                  <li className="font-paragraph text-sm opacity-90">
                    • Improve resume score by adding more quantifiable achievements
                  </li>
                  <li className="font-paragraph text-sm opacity-90">
                    • Practice more verbal reasoning questions
                  </li>
                  <li className="font-paragraph text-sm opacity-90">
                    • Complete at least 2 mock tests this week
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  Strengths
                </h3>
                <ul className="space-y-2">
                  <li className="font-paragraph text-sm opacity-90">
                    • Excellent coding performance - keep it up!
                  </li>
                  <li className="font-paragraph text-sm opacity-90">
                    • Consistent study streak shows dedication
                  </li>
                  <li className="font-paragraph text-sm opacity-90">
                    • Strong quantitative aptitude skills
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
