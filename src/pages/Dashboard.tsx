import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';

interface InterviewModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  questionsCount: number;
  completedCount: number;
  icon: string;
}

const Dashboard = () => {
  const [modules] = useState<InterviewModule[]>([
    {
      id: 'ml',
      title: 'Machine Learning',
      description: 'Deep dive into ML concepts, algorithms, and real-world applications',
      difficulty: 'Advanced',
      duration: '45-60 min',
      questionsCount: 50,
      completedCount: 12,
      icon: '🤖'
    },
    {
      id: 'swe',
      title: 'Software Engineering',
      description: 'System design, architecture patterns, and engineering best practices',
      difficulty: 'Intermediate',
      duration: '30-45 min',
      questionsCount: 40,
      completedCount: 8,
      icon: '⚙️'
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Core CS concepts, complexity analysis, and problem-solving approaches',
      difficulty: 'Intermediate',
      duration: '30-45 min',
      questionsCount: 35,
      completedCount: 15,
      icon: '📊'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success';
      case 'Intermediate': return 'bg-warning';
      case 'Advanced': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button variant="outline">Sign Out</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome back, John! 👋</h1>
            <p className="text-xl text-muted-foreground">Ready for your next AI-powered interview?</p>
          </div>

          {/* Enhanced Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-primary">35</div>
                  <div className="text-primary bg-primary/10 p-2 rounded-lg">🎯</div>
                </div>
                <p className="text-sm font-medium">Interviews Completed</p>
                <div className="text-xs text-success mt-1">+5 this week</div>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-success">87%</div>
                  <div className="text-success bg-success/10 p-2 rounded-lg">📈</div>
                </div>
                <p className="text-sm font-medium">Average Score</p>
                <div className="text-xs text-success mt-1">+12% improvement</div>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-accent">18h</div>
                  <div className="text-accent bg-accent/10 p-2 rounded-lg">⏱️</div>
                </div>
                <p className="text-sm font-medium">Practice Time</p>
                <div className="text-xs text-muted-foreground mt-1">3h this week</div>
              </CardContent>
            </Card>
            <Card className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl font-bold text-warning">92</div>
                  <div className="text-warning bg-warning/10 p-2 rounded-lg">🏆</div>
                </div>
                <p className="text-sm font-medium">Percentile Rank</p>
                <div className="text-xs text-success mt-1">Top 10%</div>
              </CardContent>
            </Card>
          </div>

          {/* Achievement Badges */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                🔥 5-day Streak
              </div>
              <div className="bg-success/10 border border-success/20 px-4 py-2 rounded-full text-sm font-medium text-success">
                ⭐ 90+ Score
              </div>
              <div className="bg-accent/10 border border-accent/20 px-4 py-2 rounded-full text-sm font-medium text-accent">
                🎯 ML Expert
              </div>
              <div className="bg-warning/10 border border-warning/20 px-4 py-2 rounded-full text-sm font-medium text-warning">
                🏆 Top 10%
              </div>
            </div>
          </div>

          {/* Interview Modules */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Choose Your Interview Domain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card key={module.id} className="interview-card hover:scale-105 transition-transform duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{module.icon}</span>
                      <Badge 
                        className={`${getDifficultyColor(module.difficulty)} text-white`}
                      >
                        {module.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{module.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span className="font-medium">{module.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Questions:</span>
                        <span className="font-medium">{module.questionsCount}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{module.completedCount}/{module.questionsCount}</span>
                      </div>
                      <Progress 
                        value={(module.completedCount / module.questionsCount) * 100} 
                        className="h-2"
                      />
                    </div>

                    <Button className="w-full interview-button" asChild>
                      <Link to={`/onboarding/${module.id}`}>
                        Start Interview
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="interview-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { module: 'Machine Learning', score: 85, date: '2 days ago' },
                  { module: 'System Design', score: 72, date: '1 week ago' },
                  { module: 'Data Structures', score: 91, date: '2 weeks ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium">{activity.module} Interview</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">{activity.score}%</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;