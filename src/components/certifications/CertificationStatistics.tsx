
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { BarChart, PieChart, Cell, Bar, Pie, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ChartPie } from 'lucide-react';

// Type pour une certification
interface CertificationForStats {
  id: number;
  title: string;
  status: 'valid' | 'expired' | 'pending';
  type: string;
}

interface CertificationStatisticsProps {
  certifications: CertificationForStats[];
}

const CertificationStatistics: React.FC<CertificationStatisticsProps> = ({ certifications }) => {
  // Préparation des données pour le graphique de statut
  const statusCounts = certifications.reduce((acc, cert) => {
    acc[cert.status] = (acc[cert.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = [
    { name: 'Valide', value: statusCounts.valid || 0, color: '#16a34a' },
    { name: 'Expiré', value: statusCounts.expired || 0, color: '#dc2626' },
    { name: 'En attente', value: statusCounts.pending || 0, color: '#f59e0b' },
  ];

  // Préparation des données pour le graphique par type
  const typeCounts = certifications.reduce((acc, cert) => {
    acc[cert.type] = (acc[cert.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Couleurs pour les types
  const typeColors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', 
    '#6366f1', '#0ea5e9', '#84cc16', '#a855f7', '#f43f5e'
  ];

  // Formatage du nom du type pour l'affichage
  const formatTypeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Configuration des graphiques
  const chartConfig = {
    status: {
      valid: { label: 'Valide', theme: { light: '#16a34a', dark: '#22c55e' } },
      expired: { label: 'Expiré', theme: { light: '#dc2626', dark: '#ef4444' } },
      pending: { label: 'En attente', theme: { light: '#f59e0b', dark: '#f59e0b' } },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ChartPie className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Statistiques des certifications</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graphique de répartition par statut */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Répartition par statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={chartConfig.status}
                className="w-full h-full"
              >
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Valide: {statusCounts.valid || 0}
              </Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                Expiré: {statusCounts.expired || 0}
              </Badge>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
                En attente: {statusCounts.pending || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Graphique de répartition par type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Répartition par type de produit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={typeData.slice(0, 5)} // Limiter à 5 types pour éviter la surcharge
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background p-2 shadow-md">
                            <p className="text-[0.70rem] text-muted-foreground">{formatTypeName(data.name)}</p>
                            <p className="font-bold text-[0.85rem]">{data.value} certification{data.value > 1 ? "s" : ""}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="value"
                    nameKey="name"
                    label={{ position: 'right', formatter: (value: number) => value }}
                  >
                    {typeData.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={typeColors[index % typeColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {typeData.slice(0, 5).map((type, index) => (
                <Badge key={type.name} variant="outline" style={{ 
                  backgroundColor: `${typeColors[index % typeColors.length]}20`,
                  color: typeColors[index % typeColors.length],
                  borderColor: typeColors[index % typeColors.length]
                }}>
                  {formatTypeName(type.name)}: {type.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CertificationStatistics;
