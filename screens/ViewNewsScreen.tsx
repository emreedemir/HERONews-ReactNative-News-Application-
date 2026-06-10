import {
    View, Text, StyleSheet, ScrollView,
    Image, TouchableOpacity, StatusBar, Share,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  
  const COLORS = {
    primary: '#1a3a6b',
    secondary: '#1e4d8c',
    accent: '#4fc3f7',
    bg: '#f0f4f8',
    cardBg: '#ffffff',
    text: '#0d0d0d',
    textMuted: '#555555',
    border: '#e0e8f0',
  };
  
  function timeAgo(publishedAt: string): string {
    const diff = Math.floor((Date.now() - new Date(publishedAt).getTime()) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }
  
  export default function ViewNewsSection({ route }: any) {
    
    const { article } = route.params;

    const navigation = useNavigation();
  
    const handleShare = async () => {
      try {
        await Share.share({ message: `${article.title}\n\n${article.url}` });
      } catch (_) {}
    };
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <ScrollView showsVerticalScrollIndicator={false}>
  
          {/* Hero image */}
         
          <Image
            style={styles.heroImage}
            source={{ uri: article.urlToImage || 'https://placehold.co/600x400/1a3a6b/ffffff?text=News' }}/>

          <View style={styles.body}>
            {/* Source + time */}
            <View style={styles.metaRow}>
              {article.source?.name ? (
                <Text style={styles.source}>{article.source.name.toUpperCase()}</Text>
              ) : null}
              {article.publishedAt ? (
                <Text style={styles.time}>{timeAgo(article.publishedAt)}</Text>
              ) : null}
            </View>
  
            {/* Title */}
            <Text style={styles.title}>{article.title}</Text>
  
            {/* Accent bar */}
            <View style={styles.accentBar} />
  
            {/* Author */}
            {article.author ? (
              <Text style={styles.author}>By {article.author}</Text>
            ) : null}
  
            {/* Description */}
            {article.description ? (
              <Text style={styles.description}>{article.description}</Text>
            ) : null}
  
            {/* Content */}
            {article.content ? (
              <Text style={styles.content}>
                {article.content.replace(/\[\+\d+ chars\]/, '').trim()}
              </Text>
            ) : null}
  
            {/* Read more button */}
            <TouchableOpacity
              style={styles.readMoreBtn}
              onPress={() => {/* open in-app browser */}}
              activeOpacity={0.8}
            >
              <Text style={styles.readMoreText}>Read full article</Text>
            </TouchableOpacity>
  
            {/* Share */}
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.8}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.bg },
    heroImage: { width: '100%', height: 230, backgroundColor: COLORS.secondary },
    body: { backgroundColor: COLORS.cardBg, padding: 16 },
    metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    source: {
      fontSize: 11, fontWeight: '700', color: COLORS.primary,
      letterSpacing: 0.8,
    },
    time: { fontSize: 11, color: COLORS.textMuted },
    title: {
      fontSize: 22, fontWeight: '500', color: COLORS.text,
      lineHeight: 30, marginBottom: 12,
    },
    accentBar: {
      height: 3, width: 40, backgroundColor: COLORS.accent,
      marginBottom: 12, borderRadius: 2,
    },
    author: { fontSize: 13, color: COLORS.textMuted, marginBottom: 14, fontStyle: 'italic' },
    description: {
      fontSize: 16, color: COLORS.text, lineHeight: 26,
      marginBottom: 14, fontWeight: '500',
    },
    content: {
      fontSize: 15, color: COLORS.textMuted, lineHeight: 25, marginBottom: 20,
    },
    readMoreBtn: {
      backgroundColor: COLORS.primary, paddingVertical: 12,
      borderRadius: 4, alignItems: 'center', marginBottom: 10,
    },
    readMoreText: { color: '#ffffff', fontWeight: '500', fontSize: 14, letterSpacing: 0.5 },
    shareBtn: {
      borderWidth: 1, borderColor: COLORS.primary, paddingVertical: 12,
      borderRadius: 4, alignItems: 'center',
    },
    shareText: { color: COLORS.primary, fontWeight: '500', fontSize: 14 },
  });