
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, Building } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Données de démonstration pour les entreprises
const demoCompanies = [
  {
    id: 1,
    name: "TechCorp Cameroon",
    contactName: "Jean Mbarga",
    phone: "699123456",
    email: "techcorp@example.com",
    status: "active"
  },
  {
    id: 2,
    name: "FoodPro SA",
    contactName: "Marie Nkolo",
    phone: "677889900",
    email: "foodpro@example.com",
    status: "active"
  },
  {
    id: 3,
    name: "ACME Industries",
    contactName: "Paul Tamba",
    phone: "654321987",
    email: "acme@example.com",
    status: "inactive"
  }
];

const Companies = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filtrage des entreprises
  const filteredCompanies = demoCompanies.filter(company => {
    if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !company.contactName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Entreprises</h1>
            <p className="text-muted-foreground">Gestion des entreprises partenaires</p>
          </div>
          <Button 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nouvelle entreprise</span>
          </Button>
        </div>

        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou contact..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredCompanies.length > 0 ? (
          <div className="border rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.id}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.contactName}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {company.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-lg bg-white p-8 text-center">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune entreprise trouvée</h3>
            <p className="text-muted-foreground mb-6">
              Aucune entreprise ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Réinitialiser la recherche
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Companies;
