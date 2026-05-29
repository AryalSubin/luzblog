import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { CreatePostPayload } from '../types/blog';

interface PostFormProps {
  initialValues?: Partial<CreatePostPayload>;
  onSubmit: (payload: CreatePostPayload) => void;
  isLoading: boolean;
  submitLabel?: string;
}

export function PostForm({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel = 'Save',
}: PostFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt ?? '');
  const [status, setStatus] = useState<'draft' | 'published'>(
    initialValues?.status ?? 'draft'
  );
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    setError('');
    onSubmit({ title: title.trim(), content: content.trim(), excerpt: excerpt.trim(), status });
  }

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Post title"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Excerpt</Text>
      <TextInput
        style={styles.input}
        value={excerpt}
        onChangeText={setExcerpt}
        placeholder="Short summary (optional)"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Content *</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={content}
        onChangeText={setContent}
        placeholder="Write your post..."
        placeholderTextColor="#aaa"
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusRow}>
        {(['draft', 'published'] as const).map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.statusBtn, status === s && styles.statusBtnActive]}
            onPress={() => setStatus(s)}
          >
            <Text style={[styles.statusBtnText, status === s && styles.statusBtnTextActive]}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, isLoading && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitBtnText}>{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#fafafa',
  },
  textarea: {
    height: 160,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  statusBtnActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },
  statusBtnText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  statusBtnTextActive: {
    color: '#fff',
  },
  submitBtn: {
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 8,
  },
});
