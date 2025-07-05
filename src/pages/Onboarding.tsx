import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import Logo from '@/components/Logo';
import StatusIndicator from '@/components/StatusIndicator';
import OnboardingSteps from '@/components/OnboardingSteps';

const Onboarding = () => {
  const { moduleId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [deviceStatus, setDeviceStatus] = useState<{
    camera: 'waiting' | 'ready' | 'offline';
    microphone: 'waiting' | 'ready' | 'offline';
    audio: 'waiting' | 'ready' | 'offline';
  }>({
    camera: 'waiting',
    microphone: 'waiting',
    audio: 'waiting'
  });
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modules: Record<string, any> = {
    ml: { title: 'Machine Learning', icon: '🤖', difficulty: 'Advanced' },
    swe: { title: 'Software Engineering', icon: '⚙️', difficulty: 'Intermediate' },
    dsa: { title: 'Data Structures & Algorithms', icon: '📊', difficulty: 'Intermediate' }
  };

  const currentModule = modules[moduleId || 'ml'];
  const totalSteps = 4;

  const handleDeviceTest = async (device: string) => {
    setDeviceStatus(prev => ({ ...prev, [device]: 'waiting' }));
    
    // Simulate device testing
    setTimeout(() => {
      setDeviceStatus(prev => ({ ...prev, [device]: 'ready' }));
    }, 2000);
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeUploaded(true);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return resumeUploaded;
      case 2: return Object.values(deviceStatus).every(status => status === 'ready');
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="interview-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                📄 Upload Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Upload your resume to get personalized questions based on your experience and skills.
              </p>
              
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-4xl mb-4">📁</div>
                <p className="text-lg font-medium mb-2">
                  {resumeUploaded ? 'Resume Uploaded!' : 'Click to upload your resume'}
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOC, or DOCX files accepted
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>

              {resumeUploaded && (
                <Alert className="mt-4 border-success bg-success/10">
                  <AlertDescription className="text-success-foreground">
                    Great! Your resume has been uploaded and processed. We'll use this to tailor questions to your background.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="interview-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                🎥 Device Setup & Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Let's test your camera, microphone, and audio to ensure the best interview experience.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📹</span>
                    <div>
                      <p className="font-medium">Camera</p>
                      <p className="text-sm text-muted-foreground">Test your video feed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusIndicator status={deviceStatus.camera} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeviceTest('camera')}
                      disabled={deviceStatus.camera === 'waiting'}
                    >
                      {deviceStatus.camera === 'waiting' ? 'Testing...' : 'Test Camera'}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎤</span>
                    <div>
                      <p className="font-medium">Microphone</p>
                      <p className="text-sm text-muted-foreground">Test your audio input</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusIndicator status={deviceStatus.microphone} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeviceTest('microphone')}
                      disabled={deviceStatus.microphone === 'waiting'}
                    >
                      {deviceStatus.microphone === 'waiting' ? 'Testing...' : 'Test Mic'}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔊</span>
                    <div>
                      <p className="font-medium">Audio Output</p>
                      <p className="text-sm text-muted-foreground">Test your speakers/headphones</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusIndicator status={deviceStatus.audio} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeviceTest('audio')}
                      disabled={deviceStatus.audio === 'waiting'}
                    >
                      {deviceStatus.audio === 'waiting' ? 'Testing...' : 'Test Audio'}
                    </Button>
                  </div>
                </div>
              </div>

              {Object.values(deviceStatus).every(status => status === 'ready') && (
                <Alert className="mt-4 border-success bg-success/10">
                  <AlertDescription className="text-success-foreground">
                    Perfect! All your devices are working properly. You're ready to start the interview.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="interview-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                💡 Interview Tips & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">What to Expect</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Questions tailored to your resume and the {currentModule.title} domain
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Verbal responses only - no coding required
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Follow-up questions based on your answers
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      Real-time AI analysis and scoring
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      Speak clearly and at a moderate pace
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      Think out loud to show your problem-solving process
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      Ask clarifying questions when needed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      Use specific examples from your experience
                    </li>
                  </ul>
                </div>

                <Alert>
                  <AlertDescription>
                    <strong>Tip:</strong> Take your time to think before answering. The AI interviewer is designed to wait for your complete response.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="interview-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                🚀 Ready to Start!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">{currentModule.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">{currentModule.title} Interview</h2>
                  <Badge className="mb-4">{currentModule.difficulty}</Badge>
                </div>
                
                <div className="bg-muted/20 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Interview Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">45-60 minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Format</p>
                      <p className="font-medium">Audio/Video</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Questions</p>
                      <p className="font-medium">Adaptive & Personalized</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Feedback</p>
                      <p className="font-medium">Real-time AI Analysis</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  You're all set! Click the button below to enter the interview room and begin your session.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
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
              <Button variant="outline" asChild>
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Progress Header */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">Interview Setup</h1>
                <p className="text-muted-foreground">Get ready for your {currentModule.title} interview</p>
              </div>

              {/* Premium Step Indicator */}
              <OnboardingSteps 
                currentStep={currentStep}
                steps={[
                  { id: 1, title: 'Upload Resume', description: 'Personal tailoring' },
                  { id: 2, title: 'Device Setup', description: 'Test equipment' },
                  { id: 3, title: 'Interview Tips', description: 'Best practices' },
                  { id: 4, title: 'Ready to Start', description: 'Final confirmation' }
                ]}
              />
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  className="interview-button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNext()}
                >
                  Next Step
                </Button>
              ) : (
                <Button className="interview-button glow-primary" asChild>
                  <Link to={`/interview/${moduleId}`}>
                    Start Interview
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Onboarding;