import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCreatePost } from '../../src/hooks/blog/useCreatePost';
import { PostForm } from '../../src/components/PostForm';
import type { CreatePostPayload } from '../../src/types/blog';

export default function CreatePostScreen() {
  const router = useRouter();
  const { mutate: createPost, isPending } = useCreatePost();

  function handleSubmit(payload: CreatePostPayload) {
    createPost(payload, {
      onSuccess: () => {
        Alert.alert('Success', 'Post created!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      },
      onError: () => {
        Alert.alert('Error', 'Failed to create post. Check your connection.');
      },
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <PostForm onSubmit={handleSubmit} isLoading={isPending} submitLabel="Create Post" />
      </ScrollView>
    </KeyboardAvoidingView>
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
});
