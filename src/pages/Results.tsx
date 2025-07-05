import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';

interface ResultsData {
  overallScore: number;
  percentile: number;
  duration: string;
  questionsAnswered: number;
  totalQuestions: number;
  breakdown: {
    clarity: number;
    depth: number;
    relevance: number;
    examples: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
}

const Results = () => {
  const { moduleId } = useParams();

  const modules: Record<string, any> = {
    ml: { title: 'Machine Learning', icon: '🤖' },
    swe: { title: 'Software Engineering', icon: '⚙️' },
    dsa: { title: 'Data Structures & Algorithms', icon: '📊' }
  };

  const currentModule = modules[moduleId || 'ml'];

  // Mock results data
  const results: ResultsData = {
    overallScore: 78,
    percentile: 82,
    duration: '42 minutes',
    questionsAnswered: 8,
    totalQuestions: 10,
    breakdown: {
      clarity: 85,
      depth: 72,
      relevance: 90,
      examples: 65
    },
    feedback: {
      strengths: [
        "Excellent understanding of core ML concepts",
        "Clear communication and structured responses",
        "Good use of real-world examples"
      ],
      improvements: [
        "Could provide more technical depth in algorithm explanations",
        "Consider discussing trade-offs more thoroughly",
        "Include more specific metrics and evaluation criteria"
      ],
      recommendations: [
        "Review advanced optimization algorithms",
        "Practice explaining complex concepts simply",
        "Study recent research papers in your domain"
      ]
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
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
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to={`/onboarding/${moduleId}`}>Retake Interview</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{currentModule.icon}</div>
              <h1 className="text-4xl font-bold mb-2">Interview Complete!</h1>
              <p className="text-xl text-muted-foreground">{currentModule.title} Assessment Results</p>
            </div>

            {/* Enhanced Overall Score Card */}
            <Card className="premium-card mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-primary/10" />
              <CardContent className="p-8 relative z-10">
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className={`text-8xl font-bold gradient-text mb-4`}>
                      {results.overallScore}%
                    </div>
                    <div className="absolute -top-2 -right-8 bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                      Top {100 - results.percentile}%
                    </div>
                  </div>
                  <p className="text-2xl font-semibold mb-2">Great Performance! 🎉</p>
                  <p className="text-muted-foreground">You're ready for technical interviews at top companies</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="stats-card text-center">
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}%
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <div className="text-xs text-success mt-1">Above average</div>
                  </div>
                  <div className="stats-card text-center">
                    <div className="text-3xl font-bold mb-2 text-primary">
                      {results.percentile}nd
                    </div>
                    <p className="text-sm text-muted-foreground">Percentile</p>
                    <div className="text-xs text-primary mt-1">Industry ready</div>
                  </div>
                  <div className="stats-card text-center">
                    <div className="text-2xl font-bold mb-2 text-accent">
                      {results.duration}
                    </div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <div className="text-xs text-muted-foreground mt-1">Optimal timing</div>
                  </div>
                  <div className="stats-card text-center">
                    <div className="text-2xl font-bold mb-2 text-warning">
                      {results.questionsAnswered}/{results.totalQuestions}
                    </div>
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <div className="text-xs text-success mt-1">High completion</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="interview-card mb-8">
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(results.breakdown).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{category}</span>
                        <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                      </div>
                      <Progress value={score} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Strengths */}
              <Card className="interview-card border-success/20 bg-success/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    ✅ Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.feedback.strengths.map((strength, index) => (
                      <li key={index} className="text-sm">
                        <span className="text-success">•</span> {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="interview-card border-warning/20 bg-warning/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    🎯 Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.feedback.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm">
                        <span className="text-warning">•</span> {improvement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="interview-card border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    💡 Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.feedback.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm">
                        <span className="text-primary">•</span> {recommendation}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="interview-button h-12" asChild>
                <Link to={`/onboarding/${moduleId}`}>
                  🔄 Retake Interview
                </Link>
              </Button>
              <Button variant="outline" className="h-12" asChild>
                <Link to="/dashboard">
                  📊 View All Results
                </Link>
              </Button>
            </div>

            {/* Share Results */}
            <Card className="interview-card mt-8">
              <CardHeader>
                <CardTitle>Share Your Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Proud of your performance? Share your results with your network or add to your portfolio.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      📤 Share
                    </Button>
                    <Button variant="outline" size="sm">
                      📄 Export PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Results;