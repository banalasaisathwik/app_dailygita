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
import { ThemeColors } from './types';

interface BookFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (book: { 
    title: string; 
    author: string;
    description: string; 
    category: string;
  }) => void;
  colors: ThemeColors;
  categories: Array<{ id: string; name: string }>;
}

const BookForm: React.FC<BookFormProps> = ({
  visible,
  onClose,
  onSubmit,
  colors,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || !description.trim() || !category) {
      return;
    }
    onSubmit({ title, author, description, category });
    setTitle('');
    setAuthor('');
    setDescription('');
    setCategory('');
    onClose();
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
            <Text style={[styles.headerText, { color: colors.text }]}>Add New Book</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="times" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Book Title"
              placeholderTextColor={colors.gray[400]}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Author"
              placeholderTextColor={colors.gray[400]}
              value={author}
              onChangeText={setAuthor}
            />

            <TextInput
              style={[styles.contentInput, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Book Description"
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
              <Text style={styles.submitButtonText}>Add Book</Text>
            </TouchableOpacity>
          </View>
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
    height: '75%', // Increased from minHeight: '50%'
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between', // Added to ensure proper spacing
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
    height: '25%', // Made height relative to container
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
  closeButton: {
    padding: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookForm;