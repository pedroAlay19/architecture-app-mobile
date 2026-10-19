import { useSessionStore } from '@/modules/auth/store/sesion.store';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { useProjects } from '../../hooks/useProject';

export function ProjectsListScreen() {
  const logout = useSessionStore((s) => s.logout);
  const { data, isLoading, error, refetch } = useProjects();

  if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        <Text>{error.message}</Text>
        <Button title="Reintentar" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Mis proyectos</Text>
      {/* <Button title="Nueva obra" onPress={() => router.push('/projects/new')} /> */}
      <Button title="Cerrar sesión" onPress={logout} />

      <FlatList
        data={data?.projects}
        keyExtractor={(p) => p.id}
        ListEmptyComponent={<Text>Aún no tienes obras</Text>}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginTop: 8 }}>
            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
            <Text>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}