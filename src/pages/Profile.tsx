import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';

interface InterviewHistory {
  id: string;
  module: string;
  date: string;
  score: number;
  duration: string;
  status: 'completed' | 'in-progress' | 'abandoned';
}

const Profile = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'March 2024',
    totalInterviews: 35,
    averageScore: 78,
    totalHours: 42
  });

  const [interviewHistory] = useState<InterviewHistory[]>([
    {
      id: '1',
      module: 'Machine Learning',
      date: '2024-03-15',
      score: 85,
      duration: '45 min',
      status: 'completed'
    },
    {
      id: '2', 
      module: 'Software Engineering',
      date: '2024-03-12',
      score: 72,
      duration: '38 min',
      status: 'completed'
    },
    {
      id: '3',
      module: 'Data Structures',
      date: '2024-03-10',
      score: 91,
      duration: '42 min',
      status: 'completed'
    },
    {
      id: '4',
      module: 'Machine Learning',
      date: '2024-03-08',
      score: 0,
      duration: '12 min',
      status: 'abandoned'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'abandoned': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Logo />
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="interview-card mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                    <p className="text-muted-foreground mb-4">{user.email}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Member since:</span>
                        <span className="ml-2 font-medium">{user.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="interview-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{user.totalInterviews}</div>
                  <p className="text-sm text-muted-foreground">Total Interviews</p>
                </CardContent>
              </Card>
              <Card className="interview-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success mb-2">{user.averageScore}%</div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </CardContent>
              </Card>
              <Card className="interview-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{user.totalHours}h</div>
                  <p className="text-sm text-muted-foreground">Practice Time</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="history" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">Interview History</TabsTrigger>
                <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* Interview History */}
              <TabsContent value="history">
                <Card className="interview-card">
                  <CardHeader>
                    <CardTitle>Recent Interview Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {interviewHistory.map((interview) => (
                        <div 
                          key={interview.id}
                          className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                              <span className="text-lg">
                                {interview.module.includes('ML') || interview.module.includes('Machine') ? '🤖' :
                                 interview.module.includes('Software') ? '⚙️' : '📊'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{interview.module} Interview</p>
                              <p className="text-sm text-muted-foreground">{interview.date} • {interview.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(interview.status)}>
                              {interview.status}
                            </Badge>
                            {interview.status === 'completed' && (
                              <div className="text-right">
                                <p className={`text-lg font-bold ${getScoreColor(interview.score)}`}>
                                  {interview.score}%
                                </p>
                              </div>
                            )}
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Analytics */}
              <TabsContent value="analytics">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="interview-card">
                    <CardHeader>
                      <CardTitle>Score Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <div className="text-4xl mb-2">📈</div>
                          <p>Score trend chart would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="interview-card">
                    <CardHeader>
                      <CardTitle>Module Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { module: 'Machine Learning', score: 85, attempts: 12 },
                          { module: 'Software Engineering', score: 72, attempts: 8 },
                          { module: 'Data Structures', score: 91, attempts: 15 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{item.module}</p>
                              <p className="text-sm text-muted-foreground">{item.attempts} attempts</p>
                            </div>
                            <div className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                              {item.score}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Achievements */}
              <TabsContent value="achievements">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: 'First Interview',
                      description: 'Complete your first AI interview',
                      icon: '🎯',
                      earned: true,
                      date: 'March 1, 2024'
                    },
                    {
                      title: 'ML Expert',
                      description: 'Score 90+ on a Machine Learning interview',
                      icon: '🤖',
                      earned: false,
                      date: null
                    },
                    {
                      title: 'Consistency Champion',
                      description: 'Complete 10 interviews in a month',
                      icon: '⭐',
                      earned: true,
                      date: 'March 15, 2024'
                    },
                    {
                      title: 'Perfect Score',
                      description: 'Achieve a 100% score on any interview',
                      icon: '💯',
                      earned: false,
                      date: null
                    }
                  ].map((achievement, index) => (
                    <Card 
                      key={index} 
                      className={`interview-card ${achievement.earned ? 'border-success/50 bg-success/5' : 'opacity-60'}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        {achievement.earned ? (
                          <Badge className="bg-success text-success-foreground">
                            Earned {achievement.date}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Earned</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;