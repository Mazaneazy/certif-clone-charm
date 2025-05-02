
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
import { Loader2 } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 items-center text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">ANOR Certification</CardTitle>
          <CardDescription>
            Connectez-vous à la plateforme de gestion des certifications
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@anor.cm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </CardFooter>
        </form>
        
        <div className="p-6 pt-0 text-center">
          <p className="text-sm text-muted-foreground mb-3">Utilisateurs de démonstration:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
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
