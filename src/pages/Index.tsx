import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';
import InterviewCard from '@/components/InterviewCard';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  // Interview categories and sample interviews
  const interviewCategories = [
    'Software Engineering', 'Data Science', 'Machine Learning', 'Product Management', 
    'Business & Consulting', 'Finance', 'Design', 'Marketing'
  ];

  const featuredInterviews = [
    {
      title: 'Software Engineering New Grad: Technical Interview #1',
      duration: '30m',
      difficulty: 'Medium',
      description: 'System design, coding patterns, and architectural thinking',
      category: 'Software Engineering'
    },
    {
      title: 'Machine Learning Model Evaluation',
      duration: '25m',
      difficulty: 'Advanced',
      description: 'Discuss model selection, validation, and performance metrics',
      category: 'Machine Learning'
    },
    {
      title: 'Data Structures: Trees & Graphs',
      duration: '20m',
      difficulty: 'Medium',
      description: 'Master traversal algorithms and complex data structures',
      category: 'Software Engineering'
    },
    {
      title: 'Product Strategy Case Study',
      duration: '35m',
      difficulty: 'Medium',
      description: 'Build a product roadmap and define success metrics',
      category: 'Product Management'
    },
    {
      title: 'Deep Learning Neural Networks',
      duration: '40m',
      difficulty: 'Advanced',
      description: 'Discuss CNN, RNN architectures and training strategies',
      category: 'Machine Learning'
    },
    {
      title: 'System Design: Chat Application',
      duration: '45m',
      difficulty: 'Advanced',
      description: 'Design a scalable real-time messaging system',
      category: 'Software Engineering'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Logo size="md" />
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="outline" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button className="interview-button" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
                Your perfect interview starts here
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Practice with 100+ expert-vetted interviews, get feedback on your performance, 
                and land your dream opportunity.
              </p>
            </div>
          </div>
        </section>

        {/* Interview Categories */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {interviewCategories.map((category, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="rounded-full px-6 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Interviews Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {featuredInterviews.map((interview, index) => (
                <InterviewCard
                  key={index}
                  title={interview.title}
                  duration={interview.duration}
                  difficulty={interview.difficulty as 'Easy' | 'Medium' | 'Advanced' | 'Hard'}
                  description={interview.description}
                  category={interview.category}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Interviews
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose TalentSync?</h2>
              <p className="text-xl text-muted-foreground">Advanced AI technology meets real-world interview experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="interview-card text-center p-8">
                <CardContent>
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-3">AI-Powered Questions</h3>
                  <p className="text-muted-foreground">
                    Get questions tailored to your experience level and target role. Practice exactly what you'll face in real interviews.
                  </p>
                </CardContent>
              </Card>

              <Card className="interview-card text-center p-8">
                <CardContent>
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-3">Instant Feedback</h3>
                  <p className="text-muted-foreground">
                    Receive detailed analysis on your performance with scores for clarity, depth, and technical accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card className="interview-card text-center p-8">
                <CardContent>
                  <div className="text-5xl mb-4">🎤</div>
                  <h3 className="text-xl font-semibold mb-3">Voice-First Experience</h3>
                  <p className="text-muted-foreground">
                    Practice speaking your answers naturally with real-time transcription and voice analysis.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div className="stats-card">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Expert-Vetted Interviews</p>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-success mb-2">50K+</div>
                <p className="text-sm text-muted-foreground">Candidates Trained</p>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of candidates who have improved their interview skills with TalentSync
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link to="/auth">Start Practicing Now</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <Logo />
              <div className="text-sm text-muted-foreground">
                © 2024 TalentSync. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
