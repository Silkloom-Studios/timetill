import { useEvents } from "@/components/storage/EventsProvider";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
type FormDataType = {
  date?: string;
  title?: string;
  subtitle?: string;
};

export default function EventForm() {
  const { addEvent } = useEvents();

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const [formData, setFormData] = useState<FormDataType>({
    date: formatLocalDate(tomorrow),
    title: undefined,
    subtitle: undefined,
  });
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: true,
    message: "This is a test error please ignore",
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
        const newEvent = { title: formData.title, id: Date.now(), date: formData.date, ...formData };
        const savedEvent = await addEvent(newEvent);
        if (savedEvent) {
          setModalVisible(true);
          setError({ error: true, message: "No error here!" });
        } else {
          setError({ error: true, message: "unable to store new event" });
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
    setFormData({
      date: formatLocalDate(tomorrow),
      title: undefined,
      subtitle: undefined,
    });
  };

  return (
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Success!</Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={handleModalClose}>
                <Text style={styles.textStyle}>Create new</Text>
              </Pressable>
              <Link href="..">See All</Link>
            </View>
          </View>
        </Modal>
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={(text) => {
            handleChange(text, "title");
          }}
          value={formData.title}
          maxLength={50}
          placeholder="Event title"
        />
        <TextInput
          style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={(text) => {
            handleChange(text, "subtitle");
          }}
          value={formData.subtitle}
          maxLength={50}
          placeholder="subtitle"
        />
        <View style={{ marginBottom: 12 }}>
          <DateTimePicker
            value={formData.date ? new Date(formData.date) : tomorrow}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={tomorrow}
          />
        </View>
        {error.error ? (
          <View>
            <Text>{error.message}</Text>
          </View>
        ) : null}
        <Button title="Save" disabled={!formData.title || !formData.date || isLoading} onPress={handleSubmit} />
      </View>
      <View>
        <Link href="..">Go back to Home screen!</Link>
      </View>
    </View>
  );
}

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
