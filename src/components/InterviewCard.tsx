import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface InterviewCardProps {
  title: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced' | 'Hard';
  description: string;
  category: string;
  onClick?: () => void;
}

export const InterviewCard = ({ 
  title, 
  duration, 
  difficulty, 
  description, 
  category, 
  onClick 
}: InterviewCardProps) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced':
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="interview-card hover:scale-105 transition-all duration-300 group cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded">
                {category}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              🕒 {duration}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
        </div>
        
        <Button 
          className="w-full interview-button transition-all" 
          asChild
        >
          <Link to="/auth">Start Interview</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterviewCard;
