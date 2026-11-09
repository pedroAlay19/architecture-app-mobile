import { formatMoney } from '@/lib/format';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native';
import { BudgetCategoryCard } from '../../components/BudgetCategoryCard';
import { XLSX_MIME } from '../../constants/budget.constants';
import { useCreateBudget } from '../../hooks/useCreateBudget';
import { usePreviewBudget } from '../../hooks/usePreviewBudget';

export function LoadBudgetScreen() {
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const {
    mutate: previewFile,
    data: preview,
    isPending: isPreviewing,
    error: previewError,
    reset,
  } = usePreviewBudget(projectId);

  const { mutate: createBudget, isPending: isCreating } = useCreateBudget(projectId);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: XLSX_MIME,
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    previewFile(result.assets[0]);
  };

  const confirm = () => {
    if (!preview) return;
    createBudget(preview, { onSuccess: () => router.back() });
  };

  // Estado 1: elegir archivo
  if (!preview) {
    return (
      <View style={{ flex: 1, padding: 16, paddingTop: 60, gap: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>Cargar presupuesto</Text>
        <Text style={{ color: '#64748b' }}>
          Elige un .xlsx con la hoja PRESUPUESTO y las columnas CATEGORIA, CODIGO, DESCRIPCION,
          UNIDAD, CANTIDAD y PRECIO_UNITARIO.
        </Text>

        {previewError && (
          <ScrollView
            style={{ maxHeight: 220, backgroundColor: '#fee2e2', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#991b1b' }}>{previewError.message}</Text>
          </ScrollView>
        )}

        {isPreviewing ? (
          <ActivityIndicator />
        ) : (
          <>
            <Button title="Elegir archivo" onPress={pickFile} />
            <Button title="Cancelar" color="#64748b" onPress={() => router.back()} />
          </>
        )}
      </View>
    );
  }

  // Estado 2: revisar
  const { summary, warnings, categories } = preview;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 60, gap: 8 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Revisar presupuesto</Text>
      <Text>
        {summary.categories} categorías · {summary.items} rubros
      </Text>
      <Text style={{ fontSize: 16, fontWeight: '700' }}>Total: {formatMoney(summary.total)}</Text>

      {warnings.length > 0 && (
        <View style={{ backgroundColor: '#fef3c7', padding: 10, borderRadius: 8, gap: 4 }}>
          <Text style={{ fontWeight: '600', color: '#92400e' }}>
            Advertencias ({warnings.length})
          </Text>
          {warnings.map((w, i) => (
            <Text key={i} style={{ color: '#92400e', fontSize: 12 }}>
              • {w}
            </Text>
          ))}
        </View>
      )}

      {categories.map((category, i) => (
        <BudgetCategoryCard key={i} category={category} />
      ))}

      {isCreating ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button title="Confirmar y guardar" onPress={confirm} />
          <Button title="Elegir otro archivo" color="#64748b" onPress={() => reset()} />
        </>
      )}
    </ScrollView>
  );
}