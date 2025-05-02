
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Clock, AlertCircle } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Certification professionnelle",
      description: "Certification de niveau expert dans le domaine professionnel",
      progress: 70,
      status: "in-progress",
      validUntil: "12 mai 2026",
      steps: [
        { name: "Dépôt des documents", completed: true },
        { name: "Validation du dossier", completed: true },
        { name: "Évaluation des compétences", completed: false },
        { name: "Certification finale", completed: false },
      ],
    },
    {
      id: 2,
      title: "Certification technique",
      description: "Certification dans les compétences techniques spécifiques",
      progress: 30,
      status: "in-progress",
      validUntil: "28 juin 2026",
      steps: [
        { name: "Dépôt des documents", completed: true },
        { name: "Validation du dossier", completed: false },
        { name: "Examen technique", completed: false },
        { name: "Certification finale", completed: false },
      ],
    },
    {
      id: 3,
      title: "Certification de management",
      description: "Certification en gestion d'équipe et leadership",
      progress: 100,
      status: "completed",
      validUntil: "15 janvier 2027",
      steps: [
        { name: "Dépôt des documents", completed: true },
        { name: "Validation du dossier", completed: true },
        { name: "Évaluation des compétences", completed: true },
        { name: "Certification finale", completed: true },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Complétée</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">En cours</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expirée</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground">Suivez le statut de vos certifications.</p>
        </div>

        <div className="grid gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {cert.title}
                      {getStatusBadge(cert.status)}
                    </CardTitle>
                    <CardDescription className="mt-1">{cert.description}</CardDescription>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(cert.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Progression</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-2" />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Étapes</h4>
                    <ul className="space-y-3">
                      {cert.steps.map((step, index) => (
                        <li key={index} className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                            step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {step.completed && <CheckCircle className="h-3 w-3" />}
                          </div>
                          <span className={`text-sm ${step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                            {step.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {cert.status === 'completed' && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Valide jusqu'au </span>
                      <span className="font-medium">{cert.validUntil}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Voir les détails
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Certifications;
