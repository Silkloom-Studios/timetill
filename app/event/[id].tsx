import { useEvents } from "@/components/storage/EventsProvider";
import { parseId } from "@/utils/utils";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

/*
**
TODO:
1. check if date has passed or is today
  a. show celebration message
  b. handle time calculations
2. check how many years left
  a. months
  b. days
  c. hours
**
*/

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
      router.push("..");
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
  }, [getEvent, id]);
  return (
    <View>
      {eventData ? (
        <View>
          <Text>{eventData.title}</Text>
          <Text>{eventData.subtitle}</Text>
          <Text>{eventData.date}</Text>
          <Link href={`/event/${id}/edit`}>Edit Event</Link>
          <Link href="..">Go back to Home screen!</Link>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Trash</Text>
          </Pressable>
        </View>
      ) : null}

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
            <Pressable style={[styles.button, styles.buttonClose]} onPress={handleDelete}>
              <Text style={styles.textStyle}>delete</Text>
            </Pressable>
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
