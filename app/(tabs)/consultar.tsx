import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../../src/supabaseClient";

export default function consultarContato(){

    type Usuarios = {
        id: number;
        nome: string;
        senha: string;
    }

    const[usuarios, setUsuarios] = useState<Usuarios[]>([]);
    const[carregar, setCarregar] = useState(true);

    const carregarUsuarios = async () =>{
        setCarregar(true);
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .order("id", { ascending: false });

        if(error){
            console.error("Erro ao consultar dados: ", error.message);
        }else{
            setUsuarios(data || []);
        }
        
        setCarregar(false);
    };

    useFocusEffect(useCallback(()=>{carregarUsuarios();},[]));

    const gerarItem = ({ item }:{ item: Usuarios})=>(
        <View>
            <Text>{ item.nome }</Text>
            <Text>{ item.senha }</Text>
        </View>
    );

    return(
        <SafeAreaView style={styles.container}>
            {
                carregar ? (
                    <Text>Carregando dados...</Text>
                ) : usuarios.length === 0 ? (
                    <Text>Nenhum contato encontrado</Text>
                ) : (
                    <FlatList
                        data={usuarios}
                        renderItem={gerarItem}
                    />
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 25,
        backgroundColor: "#fff",
    }
})