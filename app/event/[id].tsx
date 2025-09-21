import Countdown from "@/components/countdowns/Countdown";
import { useEvents } from "@/components/storage/EventsProvider";
import { Title } from "@/components/text/Title";
import { parseId } from "@/utils/utils";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export type EventDataType = {
  title: string;
  date: string;
  id: number;
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
          <Title>{eventData.title}</Title>
          <Title type="subtitle">{eventData.subtitle}</Title>
          <Countdown date={eventData.date} />
          <Link href={`/event/${id}/edit`}>Edit Event</Link>
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
