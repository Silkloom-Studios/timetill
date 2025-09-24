import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { computeCountdown, CountdownResult } from "@/utils/countdown";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import ModalBase, { modalStyles } from "../modal/ModalBase";
import Btn from "../pressable/Btn";
import { Title } from "../text/Title";
import CountdownWidget from "./CountDownWidget";

interface CountdownProps {
  date: string;
}

export default function Countdown({ date }: CountdownProps) {
  const [cdData, setCdData] = useState<CountdownResult | undefined>();
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const handleModalClose = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    setCdData(computeCountdown(date));

    const interval = setInterval(() => {
      setCdData(computeCountdown(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (!cdData) {
    return null;
  }

  const { hasPassed, isToday, days, hours, minutes, seconds } = cdData;

  return (
    <View style={styles.container}>
      <View style={styles.countdownWrapper}>
        <CountdownWidget number={days} text={"DAYS"} index={0} />
        <CountdownWidget number={hours} text={"HOURS"} index={1} />
        <CountdownWidget number={minutes} text={"MINUTES"} index={2} />
        <CountdownWidget number={seconds} text={"SECONDS"} index={3} />

        {isToday ? (
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
                  It&apos;s Today!
                </Title>
                <Title center type="subtitle">
                  {"\nRemeber to celebrate!"}
                </Title>
              </View>
              <View style={modalStyles.modalBtnContainer}>
                <Btn type="dark" onPress={handleModalClose} text={"close"} style={modalStyles.modalBtnTop} />
              </View>
            </ModalBase>
          </Modal>
        ) : null}
        {!isToday && hasPassed ? (
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
                  Event ended on:
                </Title>
                <Title center type="subtitle" style={{ color: addOpacity(Colors.gold, 80) }}>
                  {date}
                </Title>
              </View>
              <View style={modalStyles.modalBtnContainer}>
                <Btn type="dark" onPress={handleModalClose} text={"close"} style={modalStyles.modalBtnTop} />
              </View>
            </ModalBase>
          </Modal>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  countdownWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
  },
  //
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
