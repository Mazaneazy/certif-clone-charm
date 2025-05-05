
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Inspection } from '@/types/inspection';

interface InspectionCalendarViewProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  datesWithInspections: Date[];
  inspectionsForSelectedDate: Inspection[];
  updateInspectionStatus: (id: string, newStatus: 'planned' | 'completed' | 'cancelled') => void;
  onAddInspection: () => void;
}

const InspectionCalendarView: React.FC<InspectionCalendarViewProps> = ({
  date,
  setDate,
  datesWithInspections,
  inspectionsForSelectedDate,
  updateInspectionStatus,
  onAddInspection,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="bg-white rounded-lg shadow p-4 flex-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          modifiersClassNames={{
            selected: 'bg-primary text-white',
          }}
          modifiers={{
            inspection: datesWithInspections,
          }}
          modifiersStyles={{
            inspection: {
              fontWeight: 'bold',
              border: '2px solid #10b981',
              borderRadius: '100%',
            }
          }}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex-1">
        <h2 className="text-lg font-semibold mb-4">
          {date ? (
            `Inspections du ${format(date, 'dd MMMM yyyy', { locale: fr })}`
          ) : (
            'Sélectionnez une date'
          )}
        </h2>
        
        {inspectionsForSelectedDate.length > 0 ? (
          <div className="space-y-4">
            {inspectionsForSelectedDate.map(inspection => (
              <div key={inspection.id} className="border rounded-lg p-4">
                <h3 className="font-medium">{inspection.title}</h3>
                <p className="text-sm text-gray-600">Entreprise: {inspection.company}</p>
                <p className="text-sm text-gray-600">Lieu: {inspection.location}</p>
                <p className="text-sm text-gray-600">Inspecteur: {inspection.inspectorName}</p>
                {inspection.notes && <p className="text-sm text-gray-600 mt-2">{inspection.notes}</p>}
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={inspection.status === 'planned' ? 'bg-yellow-100' : ''}
                    onClick={() => updateInspectionStatus(inspection.id, 'planned')}
                  >
                    Planifiée
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={inspection.status === 'completed' ? 'bg-green-100' : ''}
                    onClick={() => updateInspectionStatus(inspection.id, 'completed')}
                  >
                    Terminée
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className={inspection.status === 'cancelled' ? 'bg-red-100' : ''}
                    onClick={() => updateInspectionStatus(inspection.id, 'cancelled')}
                  >
                    Annulée
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune inspection</h3>
            <p className="mt-1 text-sm text-gray-500">
              Aucune inspection n'est planifiée pour cette date.
            </p>
            <div className="mt-6">
              <Button onClick={onAddInspection}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Planifier une inspection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionCalendarView;
