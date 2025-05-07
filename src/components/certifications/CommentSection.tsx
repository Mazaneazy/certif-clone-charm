
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CommentItem } from '@/types/workflow';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CommentSectionProps {
  comments: CommentItem[];
  onAddComment: (text: string, isInternal: boolean) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrer les commentaires en fonction du rôle de l'utilisateur et du statut interne
  const visibleComments = comments.filter(comment => {
    // Si c'est un producteur, il ne peut voir que les commentaires publics
    if (user?.role === 'producteur') {
      return !comment.isInternal;
    }
    // Le personnel ANOR peut voir tous les commentaires
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    
    // Appel de la fonction de callback
    onAddComment(commentText, isInternal);
    
    // Réinitialisation
    setCommentText('');
    setIsSubmitting(false);
  };

  // Déterminer si l'option de commentaire interne doit être disponible
  const canAddInternalComment = user?.role !== 'producteur';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Commentaires</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto p-1">
        {visibleComments.length > 0 ? (
          visibleComments.map((comment) => (
            <div 
              key={comment.id}
              className={`p-3 rounded-lg ${
                comment.isInternal 
                  ? 'bg-amber-50 border border-amber-100' 
                  : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.userName || comment.author || "Utilisateur"}</span>
                  <span className="text-xs text-gray-500">{comment.userRole || ""}</span>
                  {comment.isInternal && (
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded">Interne</span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.timestamp || comment.date || new Date()), { 
                    addSuffix: true,
                    locale: fr
                  })}
                </span>
              </div>
              
              <p className="mt-1 text-sm">{comment.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">
            Aucun commentaire pour le moment.
          </div>
        )}
      </div>
      
      {user && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="Ajouter un commentaire..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[80px]"
          />
          
          {canAddInternalComment && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="internal-comment"
                checked={isInternal}
                onCheckedChange={(checked) => setIsInternal(checked === true)}
              />
              <label 
                htmlFor="internal-comment" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Commentaire interne (visible uniquement par le personnel ANOR)
              </label>
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={!commentText.trim() || isSubmitting}
          >
            Envoyer
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
