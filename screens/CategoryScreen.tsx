import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  Image, TouchableOpacity, ActivityIndicator,
  StatusBar, RefreshControl,
} from 'react-native';
import { getNews } from '../service/newService';

const COLORS = {
  primary: '#1a3a6b',
  secondary: '#1e4d8c',
  accent: '#4fc3f7',
  bg: '#f0f4f8',
  cardBg: '#ffffff',
  text: '#0d0d0d',
  textMuted: '#666666',
  border: '#e0e8f0',
  labelBg: '#e8f0fa',
  labelText: '#1a3a6b',
};

function timeAgo(publishedAt: string): string {
  const diff = Math.floor((Date.now() - new Date(publishedAt).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function HeroCard({ item, onPress }: { item: any; onPress: () => void }) {
    return (
      <TouchableOpacity style={styles.heroCard} onPress={onPress} activeOpacity={0.9}>
        <Image
          style={styles.heroImage}
          source={{ uri: item.urlToImage || 'https://placehold.co/600x400/1a3a6b/ffffff?text=News' }}
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroLabelRow}>
            <Text style={styles.heroLabel}>TOP STORY</Text>
          </View>
          <Text style={styles.heroTitle} numberOfLines={3}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.heroDesc} numberOfLines={2}>{item.description}</Text>
          ) : null}
          <Text style={styles.heroTime}>{timeAgo(item.publishedAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  }


function NewsCard({ item, onPress }: { item: any; onPress: () => void }) {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <Image
          style={styles.thumbnail}
          source={{ uri: item.urlToImage || 'https://placehold.co/200x160/1a3a6b/ffffff?text=News' }}
        />
        <View style={styles.cardBody}>
          {item.source?.name ? (
            <Text style={styles.sourceLabel} numberOfLines={1}>{item.source.name.toUpperCase()}</Text>
          ) : null}
          <Text style={styles.cardTitle} numberOfLines={3}>{item.title}</Text>
          <Text style={styles.cardTime}>{timeAgo(item.publishedAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

export default function CategoryScreen({ route, navigation }: any) {
  const { category } = route.params;
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = useCallback(async () => {
    const data = await getNews(category);
    if (data?.articles) setNews(data.articles);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    fetchNews().finally(() => setLoading(false));
  }, [fetchNews]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  const handlePressedReadNews = (item: any) => {
    navigation.navigate('ViewNews', { article: item });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const [hero, ...rest] = news;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <FlatList
        data={rest}
        keyExtractor={(item, index) => item.url ?? index.toString()}
        ListHeaderComponent={
          <>
            {hero && (
              <View style={styles.heroSection}>
                <HeroCard item={hero} onPress={() => handlePressedReadNews(hero)} />
              </View>
            )}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>LATEST</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <NewsCard item={item} onPress={() => handlePressedReadNews(item)} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  loadingContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.bg, gap: 12,
  },
  loadingText: { color: COLORS.primary, fontSize: 14 },
  list: { paddingBottom: 24 },

  // Hero
  heroSection: { backgroundColor: COLORS.primary, padding: 12 },
  heroCard: { borderRadius: 4, overflow: 'hidden', backgroundColor: COLORS.cardBg },
  heroImage: { width: '100%', height: 200, backgroundColor: COLORS.secondary },
  heroOverlay: {
    padding: 14,
    borderTopWidth: 3,
    borderTopColor: COLORS.accent,
  },
  heroLabelRow: { flexDirection: 'row', marginBottom: 6 },
  heroLabel: {
    fontSize: 10, fontWeight: '700', color: COLORS.labelText,
    backgroundColor: COLORS.labelBg, paddingHorizontal: 6,
    paddingVertical: 2, borderRadius: 2, letterSpacing: 0.5,
  },
  heroTitle: { fontSize: 18, fontWeight: '500', color: COLORS.text, lineHeight: 26, marginBottom: 6 },
  heroDesc: { fontSize: 13, color: COLORS.textMuted, lineHeight: 19, marginBottom: 6 },
  heroTime: { fontSize: 11, color: COLORS.textMuted },

  // Section header
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 14, paddingTop: 16, paddingBottom: 10,
  },
  sectionAccent: { width: 3, height: 16, backgroundColor: COLORS.primary, borderRadius: 1 },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: COLORS.primary,
    letterSpacing: 1,
  },

  // News card
  card: {
    flexDirection: 'row', backgroundColor: COLORS.cardBg,
    marginHorizontal: 12, marginBottom: 8, borderRadius: 4,
    overflow: 'hidden', borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  thumbnail: { width: 96, height: 80, backgroundColor: COLORS.secondary },
  cardBody: { flex: 1, padding: 10, justifyContent: 'space-between' },
  sourceLabel: {
    fontSize: 10, fontWeight: '700', color: COLORS.labelText,
    letterSpacing: 0.5, marginBottom: 4,
  },
  cardTitle: { fontSize: 14, fontWeight: '500', color: COLORS.text, lineHeight: 20, flex: 1 },
  cardTime: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
});