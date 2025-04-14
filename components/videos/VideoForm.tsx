import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Category, ThemeColors } from './types';

interface VideoFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (video: { 
    description: string;
    videoUrl: string;
    category: string;
  }) => void;
  colors: ThemeColors;
  categories: Category[];
}

export const VideoForm: React.FC<VideoFormProps> = ({
  visible,
  onClose,
  onSubmit,
  colors,
  categories,
}) => {
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    if (!description.trim() || !videoUrl.trim() || !category) {
      return;
    }
    onSubmit({ description, videoUrl, category });
    setDescription('');
    setVideoUrl('');
    setCategory('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View 
          style={[
            styles.formContainer, 
            { 
              backgroundColor: colors.card,
              paddingBottom: Math.max(insets.bottom, 20)
            }
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: colors.text }]}>Share a Video</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="times" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Video URL (YouTube, Vimeo, etc.)"
              placeholderTextColor={colors.gray[400]}
              value={videoUrl}
              onChangeText={setVideoUrl}
            />

            <TextInput
              style={[styles.contentInput, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="What's this video about?"
              placeholderTextColor={colors.gray[400]}
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.categoryContainer}>
              <Text style={[styles.categoryLabel, { color: colors.text }]}>Category:</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
              >
                {categories.filter(cat => cat.id !== 'all').map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryPill,
                      {
                        backgroundColor: category === cat.id ? colors.tint : colors.subtle,
                      },
                    ]}
                    onPress={() => setCategory(cat.id)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        { color: category === cat.id ? 'white' : colors.tint },
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Share Video</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  formContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
    maxHeight: '90%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    flex: 1,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  contentInput: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    height: 120,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VideoForm;