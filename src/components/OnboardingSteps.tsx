import { Check } from 'lucide-react';

interface OnboardingStepsProps {
  currentStep: number;
  steps: { id: number; title: string; description: string }[];
}

export const OnboardingSteps = ({ currentStep, steps }: OnboardingStepsProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isUpcoming = currentStep < step.id;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`
                relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-success border-success text-white shadow-[0_0_15px_hsl(var(--success)/0.4)]'
                    : isCurrent
                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_hsl(var(--primary)/0.4)] animate-pulse'
                    : 'bg-muted border-border text-muted-foreground'
                }
              `}
            >
              {isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="font-semibold">{step.id}</span>
              )}
            </div>

            {/* Step Content */}
            <div className="ml-4 min-w-0 flex-1">
              <p
                className={`text-sm font-medium transition-colors duration-300 ${
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </p>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.description}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-4 transition-all duration-500 ${
                  currentStep > step.id ? 'bg-success' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingSteps;