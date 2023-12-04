import { StyleSheet, Text, View } from "react-native";
import Header from "./header";

export default function HomeLaisGabriel() {
  return (
    <View>
      <Header />
      <View style={styles.div}>
        <View style={styles.container}>
          <Text style={styles.texto}>
            Equipe: Lais Betim e Gabriel Willian da Cruz.
          </Text>
          <Text style={styles.texto}>
            Disciplina: Dispositivos móveis 3 info.
          </Text>
          <Text style={styles.texto}>Professor: Renan Ponick.</Text>
          <Text style={styles.texto}>
            Esse é o trabalho final do curso: ensino médio integrado ao técnico
            de informática para internet.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: '90%',
  },  
  container: {
    width: "95%",
    height: "50%",
    backgroundColor: "#ADDBCD",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  texto: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
