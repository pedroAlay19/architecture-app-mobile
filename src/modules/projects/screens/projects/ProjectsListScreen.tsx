import { useSessionStore } from '@/modules/auth/store/sesion.store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { StatusTabs } from '../../components/StatusTab';
import { useProjects } from '../../hooks/useProject';
import { ProjectStatus } from '../../interfaces/project.interface';

export function ProjectsListScreen() {
  const router = useRouter(); 
  const logout = useSessionStore((s) => s.logout);
  const [status, setStatus] = useState<ProjectStatus>('in_progress');
  const { data, isLoading, error, refetch } = useProjects(status);

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Mis proyectos</Text>
      <Button title="Nuevo proyecto" onPress={() => router.push('/projects/new')} /> 
      <Button title="Cerrar sesión" onPress={logout} />

      <StatusTabs value={status} onChange={setStatus} />

      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <View style={{ gap: 8 }}>
          <Text>{error.message}</Text>
          <Button title="Reintentar" onPress={() => refetch()} />
        </View>
      ) : (
        <FlatList
          data={data?.projects}
          keyExtractor={(p) => p.id}
          ListEmptyComponent={
            <Text>
              {status === 'in_progress' ? 'No tienes obras en progreso' : 'Aún no hay obras finalizadas'}
            </Text>
          }
          renderItem={({ item }) => (
            <View style={{ padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginTop: 8 }}>
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              <Text>{item.location}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}