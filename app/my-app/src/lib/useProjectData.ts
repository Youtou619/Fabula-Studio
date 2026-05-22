import { useState, useEffect, useCallback } from 'react';
import { charactersService, locationsService, eventsService, relationsService } from '../lib/services';
import type { Character, Location, Event, Relation } from '../lib/database.types';

export function useProjectData(projectId: string | undefined) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [charsData, locsData, evtsData, relsData] = await Promise.all([
        charactersService.getAll(projectId).catch(() => []),
        locationsService.getAll(projectId).catch(() => []),
        eventsService.getAll(projectId).catch(() => []),
        relationsService.getAll(projectId).catch(() => []),
      ]);

      setCharacters(charsData);
      setLocations(locsData);
      setEvents(evtsData);
      setRelations(relsData);
    } catch (err) {
      console.error('Error loading project data:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    characters,
    locations,
    events,
    relations,
    loading,
    error,
    refresh,
    setCharacters,
    setLocations,
    setEvents,
    setRelations,
  };
}
