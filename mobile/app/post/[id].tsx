import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetPost } from '../../src/hooks/blog/useGetPost';
import { useDeletePost } from '../../src/hooks/blog/useDeletePost';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: post, isLoading, isError } = useGetPost(id);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  function handleDelete() {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          deletePost(id, {
            onSuccess: () => router.back(),
            onError: () => Alert.alert('Error', 'Failed to delete post.'),
          }),
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#111" />
      </View>
    );
  }

  if (isError || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Post not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.statusRow}>
        <View style={[styles.badge, post.status === 'published' ? styles.published : styles.draft]}>
          <Text style={styles.badgeText}>{post.status}</Text>
        </View>
        <Text style={styles.date}>{new Date(post.created_at).toLocaleDateString()}</Text>
      </View>

      <Text style={styles.title}>{post.title}</Text>

      {post.excerpt ? (
        <Text style={styles.excerpt}>{post.excerpt}</Text>
      ) : null}

      <View style={styles.divider} />

      <Text style={styles.body}>{post.content}</Text>

      <TouchableOpacity
        style={[styles.deleteBtn, isDeleting && styles.deleteBtnDisabled]}
        onPress={handleDelete}
        disabled={isDeleting}
      >
        <Text style={styles.deleteBtnText}>
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  published: { backgroundColor: '#d1fae5' },
  draft: { backgroundColor: '#fef3c7' },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#444',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    lineHeight: 30,
    marginBottom: 10,
  },
  excerpt: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  body: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 15,
    color: '#ef4444',
  },
  deleteBtn: {
    marginTop: 32,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteBtnDisabled: {
    opacity: 0.6,
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
