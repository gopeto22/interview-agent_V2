import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import StatusIndicator from '@/components/StatusIndicator';
import VoiceWaveform from '@/components/VoiceWaveform';

interface Question {
  id: string;
  text: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  followUpTemplates?: string[];
  idealAnswerSummary: string;
}

const InterviewRoom = () => {
  const { moduleId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState<'ready' | 'live' | 'paused'>('ready');
  const [userResponse, setUserResponse] = useState('');
  
  // Mock questions based on module
  const questions: Question[] = [
    {
      id: '1',
      text: "Can you explain the difference between supervised and unsupervised learning? Give me an example of when you might use each approach.",
      type: 'conceptual',
      difficulty: 'Intermediate',
      idealAnswerSummary: "Should cover definitions, key differences, and practical examples"
    },
    {
      id: '2', 
      text: "Tell me about a machine learning project you've worked on. What was the problem, what approach did you take, and what challenges did you face?",
      type: 'experience',
      difficulty: 'Intermediate',
      idealAnswerSummary: "Should demonstrate practical experience and problem-solving skills"
    },
    {
      id: '3',
      text: "How would you approach evaluating a machine learning model? What metrics would you consider and why?",
      type: 'methodology',
      difficulty: 'Advanced',
      idealAnswerSummary: "Should cover multiple evaluation metrics and their appropriate use cases"
    }
  ];

  const modules: Record<string, any> = {
    ml: { title: 'Machine Learning', icon: '🤖' },
    swe: { title: 'Software Engineering', icon: '⚙️' },
    dsa: { title: 'Data Structures & Algorithms', icon: '📊' }
  };

  const currentModule = modules[moduleId || 'ml'];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (interviewStatus === 'live') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartInterview = () => {
    setInterviewStatus('live');
    setIsRecording(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserResponse('');
    } else {
      // Interview complete
      window.location.href = `/results/${moduleId}`;
    }
  };

  const handlePauseResume = () => {
    if (interviewStatus === 'live') {
      setInterviewStatus('paused');
      setIsRecording(false);
    } else {
      setInterviewStatus('live');
      setIsRecording(true);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <Layout>
      <div className="min-h-screen bg-black/95">
        {/* Header */}
        <header className="border-b border-border/30 bg-card/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{currentModule.icon}</span>
                <div>
                  <h1 className="text-lg font-semibold">{currentModule.title} Interview</h1>
                  <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-xl font-mono font-bold">{formatTime(timeElapsed)}</div>
                  <div className="text-xs text-muted-foreground">Elapsed</div>
                </div>
                
                <StatusIndicator 
                  status={interviewStatus === 'live' ? 'live' : interviewStatus === 'paused' ? 'waiting' : 'ready'}
                  label={interviewStatus === 'live' ? 'Recording' : interviewStatus === 'paused' ? 'Paused' : 'Ready'}
                />
                
                <Button variant="outline" size="sm">
                  End Interview
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Interview Area */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Video Feed */}
            <div className="lg:col-span-1">
              <Card className="bg-black border-border/30">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    📹 Video Feed
                    {isRecording && <div className="status-indicator status-live" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted/10 rounded-lg flex items-center justify-center relative">
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">👤</div>
                      <p className="text-sm">Camera Feed</p>
                    </div>
                    {isRecording && (
                      <div className="absolute top-3 right-3 bg-destructive text-white px-2 py-1 rounded text-xs font-medium">
                        REC
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      🎤 Mute
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      📹 Video
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card className="mt-4 bg-card/50 border-border/30">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {interviewStatus === 'ready' ? (
                      <Button 
                        className="w-full interview-button glow-primary"
                        onClick={handleStartInterview}
                      >
                        Start Interview
                      </Button>
                    ) : (
                      <>
                        <Button 
                          className="w-full"
                          variant={interviewStatus === 'paused' ? 'default' : 'outline'}
                          onClick={handlePauseResume}
                        >
                          {interviewStatus === 'paused' ? 'Resume' : 'Pause'}
                        </Button>
                        <Button 
                          className="w-full interview-button"
                          onClick={handleNextQuestion}
                          disabled={interviewStatus !== 'live'}
                        >
                          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Question Panel */}
            <div className="lg:col-span-2">
              <Card className="interview-card h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">💭</span>
                      Interview Question
                    </CardTitle>
                    <Badge variant="outline">{currentQ?.difficulty}</Badge>
                  </div>
                  <Progress 
                    value={((currentQuestion + 1) / questions.length) * 100} 
                    className="h-2"
                  />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                      <p className="text-lg leading-relaxed">{currentQ?.text}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-muted-foreground">Key Points to Address:</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Be specific and provide concrete examples
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Explain your thought process step by step
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Consider different approaches and trade-offs
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          Draw from your actual experience when possible
                        </li>
                      </ul>
                    </div>

                     {interviewStatus === 'live' && (
                       <div className="bg-success/10 border border-success/20 rounded-xl p-6">
                         <div className="flex items-center gap-4 mb-4">
                           <div className="status-indicator status-live" />
                           <span className="text-sm font-medium text-success">AI Listening...</span>
                           <VoiceWaveform isActive={isRecording} className="ml-4" />
                         </div>
                         <p className="text-sm text-muted-foreground">
                           Speak your answer clearly. The AI will analyze your response in real-time.
                         </p>
                       </div>
                     )}
                  </div>
                </CardContent>
              </Card>

              {/* Response Analysis (mock) */}
              {interviewStatus === 'live' && (
                <Card className="mt-4 bg-muted/5 border-border/30">
                  <CardHeader>
                    <CardTitle className="text-sm">Real-time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-success">85%</div>
                        <div className="text-xs text-muted-foreground">Clarity</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-warning">72%</div>
                        <div className="text-xs text-muted-foreground">Depth</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">90%</div>
                        <div className="text-xs text-muted-foreground">Relevance</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default InterviewRoom;