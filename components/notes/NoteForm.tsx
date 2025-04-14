import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ThemeColors } from './types';

interface NoteFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (note: {
    title: string;
    content: string;
    source: {
      type: 'video' | 'book' | 'other';
      title?: string;
      link?: string;
    };
  }) => void;
  colors: ThemeColors;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  visible,
  onClose,
  onSubmit,
  colors,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sourceType, setSourceType] = useState<'video' | 'book' | 'other'>('other');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceLink, setSourceLink] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      source: {
        type: sourceType,
        title: sourceTitle.trim() || undefined,
        link: sourceLink.trim() || undefined,
      },
    });

    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setSourceType('other');
    setSourceTitle('');
    setSourceLink('');
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
            { backgroundColor: colors.card }
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: colors.text }]}>
              Add Note
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <FontAwesome name="times" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Title"
              placeholderTextColor={colors.gray[400]}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.contentInput, { backgroundColor: colors.background, color: colors.text }]}
              placeholder="Note content"
              placeholderTextColor={colors.gray[400]}
              multiline
              textAlignVertical="top"
              value={content}
              onChangeText={setContent}
            />

            <View style={styles.sourceTypeContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Source Type:</Text>
              <View style={styles.sourceTypeButtons}>
                {(['video', 'book', 'other'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.sourceTypeButton,
                      {
                        backgroundColor: sourceType === type ? colors.tint : colors.subtle,
                      },
                    ]}
                    onPress={() => setSourceType(type)}
                  >
                    <Text
                      style={[
                        styles.sourceTypeText,
                        { color: sourceType === type ? 'white' : colors.tint },
                      ]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {sourceType !== 'other' && (
              <>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                  placeholder={`${sourceType.charAt(0).toUpperCase() + sourceType.slice(1)} title`}
                  placeholderTextColor={colors.gray[400]}
                  value={sourceTitle}
                  onChangeText={setSourceTitle}
                />

                <TextInput
                  style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                  placeholder={`${sourceType === 'video' ? 'Video' : 'Book'} link (optional)`}
                  placeholderTextColor={colors.gray[400]}
                  value={sourceLink}
                  onChangeText={setSourceLink}
                />
              </>
            )}

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Save Note</Text>
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
    paddingBottom: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    padding: 16,
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
  sourceTypeContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  sourceTypeButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sourceTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  sourceTypeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NoteForm;