import { formatMoney } from '@/lib/format';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Alert, Button, ScrollView, Text, View } from 'react-native';
import { BudgetCategoryCard } from '../../components/BudgetCategoryCard';
import { useDeleteBudget } from '../../hooks/useDeleteBudget';
import { useProjectDetail } from '../../hooks/useProjectDetail';

export function ProjectDetailScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { data: project, isLoading, error, refetch } = useProjectDetail(projectId);
  const { mutate: deleteBudget, isPending: isDeleting } = useDeleteBudget(projectId);

  const confirmDelete = () =>
    Alert.alert(
      'Eliminar presupuesto',
      'Se borrarán todas las categorías y rubros de esta obra. ¿Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteBudget() },
      ],
    );

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

  const { budget } = project;
  const differs = budget.hasBudget && Math.abs(budget.total - project.totalBudget) > 0.01;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 60, gap: 8 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>{project.name}</Text>
      <Text>{project.location}</Text>
      <Text>Contratante: {project.client}</Text>
      <Text>Inicio: {project.startDate} · Plazo: {project.durationDays} días</Text>
      <Text>Fin estimado: {project.estimatedEndDate}</Text>
      <Text>Presupuesto contratado: {formatMoney(project.totalBudget)}</Text>

      <Text style={{ marginTop: 16, fontSize: 18, fontWeight: '600' }}>Presupuesto</Text>

      {!budget.hasBudget ? (
        <View style={{ gap: 8 }}>
          <Text style={{ color: '#64748b' }}>Esta obra aún no tiene presupuesto cargado.</Text>
          {/* paso 4: navegar a la pantalla de carga */}
          <Button title="Cargar presupuesto" onPress={() => router.push(`/projects/${projectId}/budget`)} />
        </View>
      ) : (
        <View style={{ gap: 8 }}>
          {differs && (
            <View style={{ backgroundColor: '#fef3c7', padding: 10, borderRadius: 8 }}>
              <Text style={{ color: '#92400e' }}>
                El total del presupuesto ({formatMoney(budget.total)}) no coincide con el monto
                contratado ({formatMoney(project.totalBudget)}).
              </Text>
            </View>
          )}

          {budget.categories.map((category) => (
            <BudgetCategoryCard key={category.id} category={category} />
          ))}

          <Text style={{ fontSize: 16, fontWeight: '700', alignSelf: 'flex-end' }}>
            Total: {formatMoney(budget.total)}
          </Text>

          {isDeleting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Eliminar presupuesto" color="#dc2626" onPress={confirmDelete} />
          )}
        </View>
      )}
    </ScrollView>
  );
}