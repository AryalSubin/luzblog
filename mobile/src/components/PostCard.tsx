import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { PostListItem } from '../types/blog';

interface PostCardProps {
  post: PostListItem;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/post/${post.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{post.title}</Text>
        <View style={[styles.badge, post.status === 'published' ? styles.published : styles.draft]}>
          <Text style={styles.badgeText}>{post.status}</Text>
        </View>
      </View>
      {post.excerpt ? (
        <Text style={styles.excerpt} numberOfLines={3}>{post.excerpt}</Text>
      ) : null}
      <Text style={styles.date}>{new Date(post.created_at).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  published: {
    backgroundColor: '#d1fae5',
  },
  draft: {
    backgroundColor: '#fef3c7',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#444',
  },
  excerpt: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginBottom: 8,
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
});
