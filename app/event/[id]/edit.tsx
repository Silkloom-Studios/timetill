import EventForm from "@/components/forms/EventForm";
import Btn from "@/components/pressable/Btn";
import { useEvents } from "@/components/storage/EventsProvider";
import { parseId } from "@/utils/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export type EventDataType = {
  title?: string;
  date?: string;
  id?: number;
  subtitle?: string;
};

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getEvent, removeEvent } = useEvents();

  const [eventData, setEventData] = useState<EventDataType | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleModalClose = () => {
    setModalVisible(!modalVisible);
  };

  const handleDelete = () => {
    if (eventData?.id) {
      removeEvent(eventData.id);
      router.dismissAll();
    } else {
      router.push("..");
    }
  };

  useEffect(() => {
    const idNum = parseId(id);
    if (idNum) {
      const selectedEvent = getEvent(idNum);
      if (selectedEvent) {
        setEventData(selectedEvent);
      }
    }
  }, [id, getEvent]);

  return (
    <View>
      <View>
        {eventData && <EventForm {...eventData} />}
        <View style={styles.inputContainer}>
          <Btn type="red" onPress={() => setModalVisible(true)} text="delete" />
        </View>
      </View>
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
              <Text style={styles.textStyle}>cancel</Text>
            </Pressable>
            <View style={styles.inputContainer}>
              <Btn type="dark" onPress={handleDelete} text="delete" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
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
