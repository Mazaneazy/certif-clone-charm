
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/ui/Logo';
import { Loader2, Info, Copy, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Si déjà authentifié, rediriger vers la page d'accueil
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      // L'erreur est déjà gérée dans le contexte d'authentification
      console.error('Erreur de connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
    toast({
      title: "Compte de démonstration",
      description: `Identifiants du compte ${demoEmail} prêts à être utilisés`,
    });
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText('password');
    toast({
      title: "Copié !",
      description: "Mot de passe copié dans le presse-papier",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <Card className="w-full max-w-md shadow-anor">
        <CardHeader className="space-y-2 items-center text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-anor-blue">Evaluation de Conformité des Produits Locaux</CardTitle>
          <CardDescription className="text-base">
            Connectez-vous pour accéder à la platefome
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Adresse Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@anor.cm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible-ring"
                aria-label="Adresse email de connexion"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Mot de passe</Label>
                <a href="#" className="anor-link text-sm" aria-label="Récupérer votre mot de passe oublié">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible-ring"
                aria-label="Mot de passe"
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-anor-blue hover:bg-anor.darkBlue" disabled={isLoading} aria-label="Se connecter au système">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </CardFooter>
        </form>
        
        <div className="p-6 pt-0 text-center">
          <div className="flex items-center justify-center mb-3 text-sm bg-blue-50 p-2 rounded-md">
            <Info className="h-4 w-4 mr-2 text-anor-blue" aria-hidden="true" />
            <p className="text-sm font-medium text-anor-blue">Comptes de démonstration</p>
            <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0" 
              onClick={handleCopyPassword} title="Copier le mot de passe">
              <Copy className="h-3.5 w-3.5 text-anor-blue" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {[
              'admin@anor.cm',
              'gestionnaire@anor.cm',
              'accueil@anor.cm',
              'technique@anor.cm',
              'laboratoire@anor.cm',
              'inspections@anor.cm',
              'evaluations@anor.cm',
              'inspecteur@anor.cm',
              'responsable@anor.cm',
              'directeur@anor.cm',
              'comptable@anor.cm',
              'producteur@anor.cm'
            ].map((demoEmail) => (
              <Button
                key={demoEmail}
                variant="outline"
                size="sm"
                className="h-8 text-left justify-start text-gray-700 hover:bg-blue-50 hover:text-anor-blue"
                onClick={() => handleDemoLogin(demoEmail)}
              >
                <User className="h-3.5 w-3.5 mr-2" />
                {demoEmail}
              </Button>
            ))}
          </div>
          <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground p-2 bg-gray-50 rounded-md">
            <p>Mot de passe: <span className="font-medium">"password"</span> pour tous</p>
            <Button variant="ghost" size="sm" className="ml-1 h-6 w-6 p-0" 
              onClick={handleCopyPassword} title="Copier le mot de passe">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
