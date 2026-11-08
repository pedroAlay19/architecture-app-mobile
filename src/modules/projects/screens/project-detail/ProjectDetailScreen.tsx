import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native';
import { useProjectDetail } from '../../hooks/useProjectDetail';

export function ProjectDetailScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { data: project, isLoading, error, refetch } = useProjectDetail(projectId);

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (error || !project) {
    return (
      <View style={{ flex: 1, padding: 16, paddingTop: 60, gap: 8 }}>
        <Text>{error?.message ?? 'No se pudo cargar la obra'}</Text>
        <Button title="Reintentar" onPress={() => refetch()} />
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 60, gap: 8 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>{project.name}</Text>
      <Text>{project.location}</Text>
      <Text>Contratante: {project.client}</Text>
      <Text>Inicio: {project.startDate} · Plazo: {project.durationDays} días</Text>
      <Text>Fin estimado: {project.estimatedEndDate}</Text>
      <Text>Presupuesto total: ${project.totalBudget.toFixed(2)}</Text>

      <Text style={{ marginTop: 16, fontWeight: '600' }}>
        {project.budget.hasBudget ? 'Presupuesto cargado' : 'Sin presupuesto'}
      </Text>
    </ScrollView>
  );
}