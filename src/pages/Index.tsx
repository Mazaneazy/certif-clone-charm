
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart, Calendar, CreditCard, FileCheck, FileText, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  // Statistiques de démonstration
  const stats = [
    {
      title: "Dossiers",
      value: "124",
      description: "12 nouveaux ce mois",
      icon: FileText,
      color: "bg-blue-500",
      link: "/documents"
    },
    {
      title: "Certifications",
      value: "86",
      description: "5 expirées ce mois",
      icon: FileCheck,
      color: "bg-green-500",
      link: "/certifications"
    },
    {
      title: "Inspections",
      value: "28",
      description: "3 planifiées aujourd'hui",
      icon: Calendar,
      color: "bg-orange-500",
      link: "/inspections"
    },
    {
      title: "Paiements",
      value: "15.2M FCFA",
      description: "2.1M FCFA ce mois",
      icon: CreditCard,
      color: "bg-purple-500",
      link: "/payments"
    },
  ];

  // Activités récentes de démonstration
  const recentActivities = [
    {
      id: 1,
      action: "Certification ISO 9001 approuvée",
      user: "Charles Directeur",
      time: "Il y a 2 heures"
    },
    {
      id: 2,
      action: "Paiement enregistré pour ACME SARL",
      user: "Sophie Comptable",
      time: "Il y a 3 heures"
    },
    {
      id: 3,
      action: "Inspection réalisée chez XYZ Inc.",
      user: "Jean Inspecteur",
      time: "Il y a 1 jour"
    },
    {
      id: 4,
      action: "Nouveau dossier créé pour ABC Ltd",
      user: "Marie Gestionnaire",
      time: "Il y a 2 jours"
    },
  ];

  // Dossiers récents de démonstration
  const recentDocs = [
    {
      id: 1,
      title: "Demande ISO 22000 - ACME Foods",
      status: "En cours",
      date: "01/05/2025"
    },
    {
      id: 2,
      title: "Renouvellement ISO 9001 - Tech Solutions",
      status: "En attente de paiement",
      date: "30/04/2025"
    },
    {
      id: 3,
      title: "Certification produit - Savon Naturel",
      status: "En inspection",
      date: "28/04/2025"
    },
  ];

  // Filtrer les statistiques selon les permissions
  const filteredStats = stats;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue, {user?.name}!</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-md`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {stat.description}
                </p>
                <Button variant="link" className="p-0 h-auto text-xs mt-2" asChild>
                  <Link to={stat.link}>Voir tout</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
              <CardDescription>
                Événements des derniers jours sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="bg-muted rounded-full p-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dossiers récents</CardTitle>
              <CardDescription>
                Derniers dossiers de certification créés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocs.map((doc) => (
                  <div key={doc.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {doc.title}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{doc.status}</span>
                        <span className="mx-1">•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/documents">Détails</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques des certifications</CardTitle>
            <CardDescription>
              Répartition des certifications par statut et type
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center">
              <BarChart className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">
                Les graphiques statistiques seront bientôt disponibles
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
