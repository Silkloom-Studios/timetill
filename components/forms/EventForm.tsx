import { useEvents } from "@/components/storage/EventsProvider";
import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { formatLocalDate, parseLocalDate } from "@/utils/dates";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import ModalBase, { modalStyles } from "../modal/ModalBase";
import Btn from "../pressable/Btn";
import BtnLink from "../pressable/BtnLink";
import { Title } from "../text/Title";

const MAX_TITLE_CHARS = 24;
const MAX_SUBTITLE_CHARS = 40;
type FormDataType = {
  date?: string;
  title?: string;
  subtitle?: string;
};

interface EventFormProps {
  date?: string;
  title?: string;
  subtitle?: string;
  id?: number;
}

export default function EventForm({ date, title, subtitle, id }: EventFormProps) {
  const { addEvent, updateEvent } = useEvents();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const [isEdit] = useState<boolean>(id ? true : false);

  const [formData, setFormData] = useState<FormDataType>({
    date: date || formatLocalDate(tomorrow),
    title: title || undefined,
    subtitle: subtitle || undefined,
  });
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: "No error here!",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleChange = (text: string, formDataKey: "title" | "subtitle" | "date") => {
    setFormData({ ...formData, ...{ [formDataKey]: text } });
  };

  const handleDateChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const eventDate = formatLocalDate(selectedDate);
      setFormData({ ...formData, date: eventDate });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (formData.date && formData.title) {
      const tomorrowStr = formatLocalDate(tomorrow);
      if (formData.date >= tomorrowStr) {
        const newEvent = { title: formData.title, date: formData.date, ...formData };
        let savedEvent = false;
        if (id && isEdit) {
          savedEvent = await updateEvent(id, { ...newEvent, id: id });
        } else {
          savedEvent = await addEvent({ ...newEvent, id: Date.now() });
        }

        if (savedEvent) {
          setModalVisible(true);
          setError({ error: false, message: "No error here!" });
        } else {
          setError({ error: true, message: "Unable to store new event" });
        }
      } else {
        setError({ error: true, message: "Date must be later than today." });
      }
    } else {
      setError({ error: true, message: "Missing required field data." });
    }
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setModalVisible(!modalVisible);
    if (!isEdit) {
      setFormData({
        date: formatLocalDate(tomorrow),
        title: undefined,
        subtitle: undefined,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <ModalBase>
              <View>
                <Title center type="subtitle">
                  Success!
                </Title>
              </View>
              <View style={modalStyles.modalBtnContainer}>
                <Btn
                  type="dark"
                  onPress={handleModalClose}
                  text={isEdit ? "continue editing" : "create new"}
                  style={modalStyles.modalBtnTop}
                />
                <BtnLink
                  href=".."
                  type="goldOutline"
                  onPress={handleModalClose}
                  text={isEdit ? "return to event" : "see all events"}
                  style={modalStyles.modalBtnTop}
                />
              </View>
            </ModalBase>
          </Modal>
          <View style={[styles.inputContainer, { marginTop: 0 }]}>
            <Text style={styles.inputTitle}>Title:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                handleChange(text, "title");
              }}
              value={formData.title}
              maxLength={MAX_TITLE_CHARS}
            />
            <Text style={styles.inputSubText}>{MAX_TITLE_CHARS} chars Max</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Subtitle:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => {
                handleChange(text, "subtitle");
              }}
              value={formData.subtitle}
              maxLength={MAX_SUBTITLE_CHARS}
            />
            <Text style={styles.inputSubText}>{MAX_SUBTITLE_CHARS} chars Max</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={[styles.inputTitle, { paddingBottom: 8 }]}>Date</Text>
            <DateTimePicker
              style={styles.datePicker}
              value={formData.date ? parseLocalDate(formData.date) : tomorrow}
              mode="date"
              display="default"
              onChange={handleDateChange}
              accentColor={Colors.gold}
            />
          </View>
          {error.error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>*{error.message}</Text>
            </View>
          ) : null}
          <View style={[styles.inputContainer, error.error ? { marginTop: 0 } : {}]}>
            <Btn
              type="dark"
              onPress={handleSubmit}
              text="save"
              disabled={!formData.title || !formData.date || isLoading}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  inputTitle: {
    fontSize: 16,
    color: Colors.text,
  },
  textInput: {
    height: 28,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gold,
    color: addOpacity(Colors.text, 70),
  },
  inputSubText: {
    fontSize: 14,
    color: addOpacity(Colors.text, 60),
    paddingTop: 4,
  },
  datePicker: {
    backgroundColor: addOpacity(Colors.gold, 0),
    marginLeft: -10,
  },
  errorContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  errorText: {
    color: addOpacity(Colors.red, 80),
  },
});
