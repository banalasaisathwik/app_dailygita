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
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Category, ThemeColors } from './types';

interface EventFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (event: {
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    category: string;
  }) => void;
  colors: ThemeColors;
  categories: Category[];
}

const EventForm: React.FC<EventFormProps> = ({
  visible,
  onClose,
  onSubmit,
  colors,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !location.trim() || !date || !time || !category) {
      return;
    }
    onSubmit({ title, description, location, date, time, category });
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setTime('');
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
            <Text style={[styles.headerText, { color: colors.text }]}>Create Event</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <FontAwesome name="times" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputsContainer}>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Event Title"
                placeholderTextColor={colors.gray[400]}
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Location"
                placeholderTextColor={colors.gray[400]}
                value={location}
                onChangeText={setLocation}
              />

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput, { backgroundColor: colors.background, color: colors.text }]}
                  placeholder="Date (YYYY-MM-DD)"
                  placeholderTextColor={colors.gray[400]}
                  value={date}
                  onChangeText={setDate}
                />
                <TextInput
                  style={[styles.input, styles.halfInput, { backgroundColor: colors.background, color: colors.text }]}
                  placeholder="Time (HH:MM)"
                  placeholderTextColor={colors.gray[400]}
                  value={time}
                  onChangeText={setTime}
                />
              </View>

              <TextInput
                style={[styles.contentInput, { backgroundColor: colors.background, color: colors.text }]}
                placeholder="Event Description"
                placeholderTextColor={colors.gray[400]}
                multiline
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.categoryContainer}>
                <Text style={[styles.categoryLabel, { color: colors.text }]}>Category:</Text>
                <View style={styles.categoriesContainer}>
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
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Event</Text>
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
    height: '80%',
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
    justifyContent: 'space-between',
  },
  inputsContainer: {
    flex: 1,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  contentInput: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    height: 100,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  categoryText: {
    fontSize: 12,
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

export default EventForm;