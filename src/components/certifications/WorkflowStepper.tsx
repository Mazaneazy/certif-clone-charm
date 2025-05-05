
import React from 'react';
import { Check, Clock, Hourglass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkflowStep } from '@/types/workflow';

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  currentStepId?: string;
}

const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ steps, currentStepId }) => {
  // Trier les étapes par ordre
  const sortedSteps = [...steps].sort((a, b) => a.order - b.order);

  return (
    <div className="py-4">
      <div className="flex flex-col space-y-4">
        {sortedSteps.map((step, index) => {
          const isLast = index === sortedSteps.length - 1;
          
          return (
            <div key={step.id} className="flex">
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full z-10",
                    step.isCompleted 
                      ? "bg-green-600 text-white" 
                      : step.isActive 
                        ? "bg-blue-600 text-white border-2 border-blue-300"
                        : "bg-gray-200 text-gray-500"
                  )}
                >
                  {step.isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : step.isActive ? (
                    <Clock className="w-5 h-5" />
                  ) : (
                    <Hourglass className="w-5 h-5" />
                  )}
                </div>
                {!isLast && (
                  <div className={cn(
                    "w-1 h-full",
                    step.isCompleted ? "bg-green-600" : "bg-gray-200"
                  )} />
                )}
              </div>
              <div className="ml-4 mt-1 pb-8">
                <div className="flex items-center">
                  <h3 className={cn(
                    "text-lg font-medium",
                    step.isActive ? "text-blue-600 font-bold" : step.isCompleted ? "text-green-600" : "text-gray-500"
                  )}>
                    {step.name}
                  </h3>
                  {step.dateCompleted && (
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(step.dateCompleted).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
                {step.description && (
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                )}
                {step.actionRequired && step.isActive && (
                  <div className="mt-2 text-sm font-medium text-blue-700">
                    Action requise : {step.actionRequired}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowStepper;
