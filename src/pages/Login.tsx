
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
import { Loader2, Info } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <Card className="w-full max-w-md shadow-anor">
        <CardHeader className="space-y-2 items-center text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-anor-blue">Système de Certification</CardTitle>
          <CardDescription className="text-base">
            Connectez-vous à la plateforme de gestion des certifications
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
            <p className="text-sm font-medium text-anor-blue">Utilisateurs de démonstration</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground bg-gray-50 p-3 rounded-md">
            <div>admin@anor.cm</div>
            <div>gestionnaire@anor.cm</div>
            <div>inspecteur@anor.cm</div>
            <div>responsable@anor.cm</div>
            <div>directeur@anor.cm</div>
            <div>comptable@anor.cm</div>
            <div>producteur@anor.cm</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Mot de passe: "password" pour tous</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
