
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Month {
  name: string;
  count: number;
}

interface MonthSelectorProps {
  months: Month[];
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ 
  months, 
  currentMonth, 
  setCurrentMonth 
}) => {
  return (
    <Card className="col-span-1 h-fit">
      <CardHeader>
        <CardTitle className="text-xl text-anor-blue">Périodes</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col space-y-1">
          {months.map((month) => (
            <Button 
              key={month.name} 
              variant={currentMonth === month.name ? "default" : "ghost"}
              className={`justify-start h-9 ${currentMonth === month.name ? 'bg-anor-blue' : ''}`}
              onClick={() => setCurrentMonth(month.name)}
              aria-label={`Afficher l'historique de ${month.name}`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              <span>{month.name}</span>
              <Badge variant={currentMonth === month.name ? "secondary" : "outline"} className="ml-auto">
                {month.count}
              </Badge>
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default MonthSelector;
