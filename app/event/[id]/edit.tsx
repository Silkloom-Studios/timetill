import EventForm from "@/components/forms/EventForm";
import ModalBase, { modalStyles } from "@/components/modal/ModalBase";
import Btn from "@/components/pressable/Btn";
import { useEvents } from "@/components/storage/EventsProvider";
import { Title } from "@/components/text/Title";
import { parseId } from "@/utils/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";

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
        <ModalBase>
          <View>
            <Title center type="subtitle">
              Are you sure you want to delete this event?
            </Title>
          </View>
          <View style={modalStyles.modalBtnContainer}>
            <Btn type="dark" onPress={handleModalClose} text="cancel" style={modalStyles.modalBtnTop} />
            <Btn type="red" onPress={handleDelete} text="delete" />
          </View>
        </ModalBase>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
});
